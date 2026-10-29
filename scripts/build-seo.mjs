// Regenerates the SEO layer of every page listed in scripts/pages.json:
// <head> meta (title, description, robots, canonical, hreflang, OG, Twitter, icons, JSON-LD),
// the language switcher in the top nav, and the shared footer with breadcrumbs.
// Page body copy between <!-- iu:content --> markers is never touched (except reading the FAQ).
// Idempotent: safe to run repeatedly.  Usage: node scripts/build-seo.mjs
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { parse } from 'node-html-parser';

const cfg = JSON.parse(fs.readFileSync(new URL('./pages.json', import.meta.url)));
const SITE = cfg.site;
const pages = cfg.pages;
const byPath = new Map(pages.map(p => [p.path, p]));
export const fileOf = p => (p.path === '/' ? 'index.html' : p.path.slice(1) + 'index.html');

const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;
const CONTACTS = {
  tg: 'https://t.me/infiniteunion_manager',
  wa: 'https://wa.me/380688286969',
  viber: 'viber://chat?number=%2B380688286969',
  tel: '+380688286969',
  email: 'supportinfiniteunion@gmail.com',
  instagram: 'https://instagram.com/infinite_union',
  channel: 'https://t.me/infinite_union_channel',
  maps: 'https://maps.app.goo.gl/sDMRaLPPcaLcZkHH9',
};
const AREA = ['UA', 'PL', 'DE', 'NL', 'CZ', 'SK', 'GB'].map(c => ({ '@type': 'Country', name: c }));

const T = {
  uk: { home: 'Головна', blog: 'Блог', locale: 'uk_UA', dev: 'Розробка', ads: 'Реклама і SEO', company: 'Компанія',
        contacts: 'Контакти', other: 'English', city: 'Харків, Україна', crumbs: 'Ви тут',
        copy: 'Infinite Union — веб-студія з Харкова. Сайти, Telegram-боти, реклама та SEO.' },
  en: { home: 'Home', blog: 'Blog', locale: 'en_US', dev: 'Development', ads: 'Marketing', company: 'Company',
        contacts: 'Contact', other: 'Українською', city: 'Kharkiv, Ukraine', crumbs: 'You are here',
        copy: 'Infinite Union — web development agency from Kharkiv, Ukraine. Websites, Telegram bots, ads and SEO.' },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = path => SITE + path;
const clean = s => s.replace(/\s+/g, ' ').trim();

function homeOf(p) { return p.lang === 'en' ? '/en/' : '/'; }

// Breadcrumb chain: home → parent(s) → page
function chain(p) {
  const out = [p];
  let cur = p;
  while (cur.parent && byPath.has(cur.parent)) { cur = byPath.get(cur.parent); out.unshift(cur); }
  const home = byPath.get(homeOf(p));
  if (p.path !== home.path) out.unshift(home);
  return out;
}

// Closest page in the other language (exact alternate, else parent's alternate, else other home)
function otherLang(p) {
  if (p.alt) return p.alt;
  let cur = p;
  while (cur.parent && byPath.has(cur.parent)) { cur = byPath.get(cur.parent); if (cur.alt) return cur.alt; }
  return p.lang === 'en' ? '/' : '/en/';
}

function extractFaq(html) {
  const start = html.indexOf('<!-- iu:content -->');
  const end = html.indexOf('<!-- /iu:content -->');
  if (start < 0 || end < 0) return [];
  const root = parse(html.slice(start, end));
  const items = [];
  for (const item of root.querySelectorAll('.faq-item')) {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) continue;
    const qt = clean(q.text).replace(/\s*[+×]\s*$/, '');
    const at = clean(a.text);
    if (qt && at) items.push({ q: qt, a: at });
  }
  return items;
}

function datePublished(html) {
  const m = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

function jsonLd(p, html) {
  const url = abs(p.path);
  const graph = [];
  const crumbs = chain(p);
  const org = {
    '@type': ['Organization', 'ProfessionalService'], '@id': ORG_ID,
    name: 'Infinite Union', alternateName: 'IU', url: abs('/'),
    logo: abs('/icon-512.png'), image: abs('/og-image.png'),
    description: byPath.get('/').description,
    telephone: CONTACTS.tel, email: CONTACTS.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Kharkiv', addressRegion: 'Kharkiv Oblast', addressCountry: 'UA' },
    geo: { '@type': 'GeoCoordinates', latitude: 49.9935, longitude: 36.2304 },
    areaServed: AREA, priceRange: '$$',
    sameAs: [CONTACTS.instagram, CONTACTS.channel, CONTACTS.maps],
    contactPoint: [{ '@type': 'ContactPoint', telephone: CONTACTS.tel, contactType: 'sales', availableLanguage: ['uk', 'en'] }],
  };
  if (p.type === 'home') {
    graph.push(org, { '@type': 'WebSite', '@id': WEBSITE_ID, url: abs('/'), name: 'Infinite Union', inLanguage: ['uk', 'en'], publisher: { '@id': ORG_ID } });
  }
  const pageType = { portfolio: 'CollectionPage', blog: 'CollectionPage' }[p.type] || 'WebPage';
  graph.push({
    '@type': pageType, '@id': `${url}#webpage`, url, name: p.title, description: p.description,
    inLanguage: p.lang, isPartOf: { '@id': WEBSITE_ID }, about: { '@id': ORG_ID },
    ...(crumbs.length > 1 ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  });
  if (crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
    });
  }
  if (p.type === 'service') {
    graph.push({
      '@type': 'Service', '@id': `${url}#service`, name: p.name, serviceType: p.keyword,
      description: p.description, url, provider: { '@id': ORG_ID }, areaServed: AREA, inLanguage: p.lang,
      ...(p.price ? { offers: { '@type': 'Offer', url, priceCurrency: 'USD', price: String(p.price),
        priceSpecification: { '@type': 'PriceSpecification', minPrice: p.price, priceCurrency: 'USD' } } } : {}),
    });
  }
  if (p.type === 'post') {
    graph.push({
      '@type': 'BlogPosting', '@id': `${url}#article`, headline: p.title, description: p.description,
      datePublished: datePublished(html) || p.date || '2026-07-30', dateModified: p.lastmod || undefined,
      inLanguage: p.lang, mainEntityOfPage: { '@id': `${url}#webpage` }, image: abs('/og-image.png'),
      author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID },
    });
  }
  const faq = extractFaq(html);
  if (faq.length) {
    graph.push({
      '@type': 'FAQPage', '@id': `${url}#faq`,
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1);
}

function seoBlock(p, html) {
  const url = abs(p.path);
  const t = T[p.lang];
  const lines = [];
  lines.push(`<title>${esc(p.title)}</title>`);
  lines.push(`<meta name="description" content="${esc(p.description)}">`);
  lines.push(`<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">`);
  lines.push(`<link rel="canonical" href="${url}">`);
  if (p.alt && !p.noindex) {
    const uk = p.lang === 'uk' ? p.path : p.alt;
    const en = p.lang === 'en' ? p.path : p.alt;
    lines.push(`<link rel="alternate" hreflang="uk" href="${abs(uk)}">`);
    lines.push(`<link rel="alternate" hreflang="en" href="${abs(en)}">`);
    lines.push(`<link rel="alternate" hreflang="x-default" href="${abs(uk)}">`);
  }
  lines.push(`<link rel="icon" href="/favicon.ico" sizes="any">`);
  lines.push(`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">`);
  lines.push(`<link rel="apple-touch-icon" href="/apple-touch-icon.png">`);
  lines.push(`<link rel="manifest" href="/manifest.json">`);
  lines.push(`<meta name="theme-color" content="#060404">`);
  lines.push(`<link rel="stylesheet" href="/assets/css/site-shared.css">`);
  lines.push(`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`);
  lines.push(`<meta property="og:type" content="${p.type === 'post' ? 'article' : 'website'}">`);
  lines.push(`<meta property="og:site_name" content="Infinite Union">`);
  lines.push(`<meta property="og:locale" content="${t.locale}">`);
  if (p.alt) lines.push(`<meta property="og:locale:alternate" content="${T[p.lang === 'uk' ? 'en' : 'uk'].locale}">`);
  lines.push(`<meta property="og:url" content="${url}">`);
  lines.push(`<meta property="og:title" content="${esc(p.title)}">`);
  lines.push(`<meta property="og:description" content="${esc(p.description)}">`);
  lines.push(`<meta property="og:image" content="${abs('/og-image.png')}">`);
  lines.push(`<meta property="og:image:width" content="1200">`);
  lines.push(`<meta property="og:image:height" content="630">`);
  lines.push(`<meta property="og:image:alt" content="Infinite Union">`);
  lines.push(`<meta name="twitter:card" content="summary_large_image">`);
  lines.push(`<meta name="twitter:title" content="${esc(p.title)}">`);
  lines.push(`<meta name="twitter:description" content="${esc(p.description)}">`);
  lines.push(`<meta name="twitter:image" content="${abs('/og-image.png')}">`);
  lines.push(`<script type="application/ld+json">\n${jsonLd(p, html)}\n</script>`);
  return `<!-- iu:seo -->\n${lines.join('\n')}\n<!-- /iu:seo -->`;
}

// Tags in <head> that the SEO block owns — removed before the block is (re)inserted
const HEAD_STRIP = [
  /<!-- iu:seo -->[\s\S]*?<!-- \/iu:seo -->\s*/g,
  /<title>[\s\S]*?<\/title>\s*/gi,
  /<meta\s+name="(?:description|description:ru|keywords|robots|googlebot|theme-color|twitter:[^"]*)"[^>]*>\s*/gi,
  /<meta\s+property="og:[^"]*"[^>]*>\s*/gi,
  /<link\s+rel="(?:canonical|icon|shortcut icon|apple-touch-icon|manifest)"[^>]*>\s*/gi,
  /<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>\s*/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
  // analytics goes through GTM only: drop the direct gtag.js loader (the inline gtag() shim stays)
  /<script\s+async\s+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"]*"><\/script>\s*/gi,
];

// <style> is not allowed in <body>: move any body-level style blocks to the end of <head> (order preserved)
function hoistStyles(html) {
  const bs = html.indexOf('<body');
  const body = html.slice(bs);
  const styles = [];
  const rest = body.replace(/<style>[\s\S]*?<\/style>\s*/g, m => { styles.push(m.trim()); return ''; });
  if (!styles.length) return html;
  const head = html.slice(0, bs);
  const he = head.lastIndexOf('</head>');
  return head.slice(0, he) + styles.join('\n') + '\n' + head.slice(he) + rest;
}

function rebuildHead(html, p) {
  const hs = html.indexOf('<head>');
  const he = html.indexOf('</head>');
  if (hs < 0 || he < 0) throw new Error('no <head>');
  let head = html.slice(hs + 6, he);
  for (const re of HEAD_STRIP) head = head.replace(re, '');
  const vp = (head.match(/<meta\s+name="viewport"\s+content="([^"]*)"\s*\/?>/i) || [])[1] || 'width=device-width, initial-scale=1';
  head = head.replace(/<meta\s+charset="[^"]*"\s*\/?>\s*/gi, '').replace(/<meta\s+name="viewport"[^>]*>\s*/gi, '');
  const top = `\n<meta charset="UTF-8">\n<meta name="viewport" content="${vp}">\n${seoBlock(p, html)}\n`;
  return html.slice(0, hs + 6) + top + head.replace(/^\s+/, '') + html.slice(he);
}

function langSwitch(p) {
  const target = otherLang(p);
  const code = p.lang === 'uk' ? 'en' : 'uk';
  const label = p.lang === 'uk' ? 'EN' : 'UA';
  const title = p.lang === 'uk' ? 'English version' : 'Українська версія';
  return `<!-- iu:lang --><a class="iu-lang" href="${target}" hreflang="${code}" lang="${code}" title="${title}">${label}</a><!-- /iu:lang -->`;
}

function injectLang(html, p) {
  html = html.replace(/<!-- iu:lang -->[\s\S]*?<!-- \/iu:lang -->\n?[ \t]*/g, '');
  const ns = html.search(/<nav[\s>]/);
  if (ns < 0) return html;
  const ne = html.indexOf('</nav>', ns);
  const nav = html.slice(ns, ne);
  const m = nav.match(/<a\s[^>]*class="[^"]*\b(?:nav-cta|n-cta)\b[^"]*"/);
  const at = m ? ns + m.index : ne;
  return html.slice(0, at) + langSwitch(p) + '\n  ' + html.slice(at);
}

function footerHtml(p) {
  const t = T[p.lang];
  const link = path => {
    const q = byPath.get(path);
    return q ? `<li><a href="${path}">${esc(q.name)}</a></li>` : '';
  };
  const inLang = pages.filter(q => q.lang === p.lang && !q.noindex);
  const dev = inLang.filter(q => q.group === 'dev').map(q => q.path);
  const mkt = inLang.filter(q => q.group === 'ads' || q.group === 'seo').map(q => q.path);
  const company = inLang.filter(q => q.group === 'info').map(q => q.path);
  if (p.lang === 'uk') company.push('/blog/');
  const crumbs = chain(p);
  const crumbsHtml = crumbs.length > 1
    ? `<div class="iu-crumbs" role="navigation" aria-label="${t.crumbs}"><ol>${crumbs.map((c, i) =>
        i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${c.path}">${esc(c.name)}</a></li>`).join('')}</ol></div>`
    : '';
  const privacy = p.lang === 'uk'
    ? `<a href="/services/privacy/">Політика конфіденційності</a>`
    : `<a href="/services/privacy/" hreflang="uk">Privacy policy (UA)</a>`;
  return `<!-- iu:footer -->
${crumbsHtml}
<footer class="iu-foot">
  <div class="iu-foot-grid">
    <div>
      <a href="${homeOf(p)}" class="iu-foot-brand">INFINITE <span>UNION</span></a>
      <p>${esc(t.copy)}</p>
    </div>
    <div><h2>${t.dev}</h2><ul>${dev.map(link).join('')}</ul></div>
    <div><h2>${t.ads}</h2><ul>${mkt.map(link).join('')}</ul></div>
    <div><h2>${t.company}</h2><ul>${company.map(link).join('')}<li><a href="${otherLang(p)}" hreflang="${p.lang === 'uk' ? 'en' : 'uk'}">${t.other}</a></li></ul>
      <h2 style="margin-top:28px">${t.contacts}</h2><ul>
        <li><a href="${CONTACTS.tg}" rel="noopener noreferrer">Telegram</a></li>
        <li><a href="${CONTACTS.wa}" rel="noopener noreferrer">WhatsApp</a></li>
        <li><a href="tel:${CONTACTS.tel}">${CONTACTS.tel}</a></li>
        <li><a href="mailto:${CONTACTS.email}">${CONTACTS.email}</a></li>
      </ul></div>
  </div>
  <div class="iu-foot-bottom">
    <span>© 2026 Infinite Union · ${t.city}</span>
    <span><a href="${CONTACTS.instagram}" rel="noopener noreferrer">Instagram</a> · <a href="${CONTACTS.channel}" rel="noopener noreferrer">${p.lang === 'uk' ? 'Telegram-канал' : 'Telegram channel'}</a> · ${privacy}</span>
  </div>
</footer>
<!-- /iu:footer -->`;
}

function injectFooter(html, p) {
  const s = html.indexOf('<!-- iu:footer -->');
  const e = html.indexOf('<!-- /iu:footer -->');
  if (s < 0 || e < 0) throw new Error('no footer markers');
  return html.slice(0, s) + footerHtml(p) + html.slice(e + '<!-- /iu:footer -->'.length);
}

export function build({ quiet = false, only = [] } = {}) {
  let n = 0;
  for (const p of pages) {
    if (only.length && !only.includes(p.path)) continue;
    const f = fileOf(p);
    if (!fs.existsSync(f)) { console.warn(`! missing ${f}`); continue; }
    let html = fs.readFileSync(f, 'utf8');
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${p.lang}"`);
    html = rebuildHead(html, p);
    html = hoistStyles(html);
    html = injectLang(html, p);
    html = injectFooter(html, p);
    fs.writeFileSync(f, html);
    n++;
  }
  if (!quiet) console.log(`build-seo: ${n} pages updated`);
}

// optional args: page paths to rebuild, e.g. node scripts/build-seo.mjs / /pricing/
if (import.meta.url === pathToFileURL(process.argv[1]).href) build({ only: process.argv.slice(2) });
