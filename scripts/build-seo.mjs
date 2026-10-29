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
<style>
.iu-crumbs{padding:28px 40px 0;font:400 13px/1.6 'Inter',system-ui,sans-serif;color:rgba(255,255,255,.55);}
.iu-crumbs ol{list-style:none;display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;}
.iu-crumbs li+li::before{content:'/';margin-right:6px;color:rgba(255,255,255,.3);}
.iu-crumbs a{color:rgba(255,255,255,.75);text-decoration:none;}
.iu-crumbs a:hover{color:#fff;}
footer.iu-foot{display:block!important;border-top:1px solid rgba(255,255,255,.08);padding:56px 40px 32px!important;margin:0;background:#060404;color:#fff;text-align:left;position:relative;z-index:1;}
.iu-foot-grid{display:grid;grid-template-columns:1.2fr repeat(3,1fr);gap:40px;max-width:1400px;margin:0 auto;}
.iu-foot-brand{font:700 15px/1 'Space Grotesk',sans-serif;letter-spacing:.12em;color:#fff;text-decoration:none;}
.iu-foot-brand span{color:#D40000;}
.iu-foot p{font:400 13px/1.7 'Inter',system-ui,sans-serif;color:rgba(255,255,255,.6);margin:16px 0 0;max-width:320px;}
.iu-foot h2{font:600 11px/1 'Space Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#D40000;margin:0 0 16px;}
.iu-foot ul{list-style:none;margin:0;padding:0;}
.iu-foot li{margin:0 0 10px;}
.iu-foot a{font:400 14px/1.4 'Inter',system-ui,sans-serif;color:rgba(255,255,255,.72);text-decoration:none;}
.iu-foot a:hover,.iu-foot a:focus-visible{color:#fff;text-decoration:underline;}
.iu-foot-bottom{max-width:1400px;margin:40px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,.08);display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;font:400 12px/1.6 'Inter',system-ui,sans-serif;color:rgba(255,255,255,.55);}
.iu-foot-bottom a{font-size:12px;}
.iu-lang{font:600 12px/1 'Space Grotesk',sans-serif;letter-spacing:.12em;color:rgba(255,255,255,.75)!important;text-decoration:none;padding:8px 10px;border:1px solid rgba(255,255,255,.18);margin:0 12px 0 auto;display:inline-flex;align-items:center;min-height:32px;}
.iu-lang:hover,.iu-lang:focus-visible{color:#fff!important;border-color:rgba(255,255,255,.5);}
@media(max-width:768px){table:not(.iu-keep){display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;}}
@media(max-width:900px){.iu-foot-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:560px){.iu-foot-grid{grid-template-columns:1fr;gap:28px;}footer.iu-foot{padding:40px 20px 28px!important;}.iu-crumbs{padding:24px 20px 0;}.iu-lang{margin-right:8px;padding:6px 8px;}}
</style>
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
    <span><a href="${CONTACTS.instagram}" rel="noopener noreferrer">Instagram</a> · <a href="${CONTACTS.channel}" rel="noopener noreferrer">Telegram-канал</a> · ${privacy}</span>
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

export function build({ quiet = false } = {}) {
  let n = 0;
  for (const p of pages) {
    const f = fileOf(p);
    if (!fs.existsSync(f)) { console.warn(`! missing ${f}`); continue; }
    let html = fs.readFileSync(f, 'utf8');
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${p.lang}"`);
    html = rebuildHead(html, p);
    html = injectLang(html, p);
    html = injectFooter(html, p);
    fs.writeFileSync(f, html);
    n++;
  }
  if (!quiet) console.log(`build-seo: ${n} pages updated`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) build();
