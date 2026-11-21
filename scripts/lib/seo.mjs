// <head> SEO block: title/description/robots/canonical/hreflang/OG/Twitter + JSON-LD @graph.
import fs from 'node:fs';
import crypto from 'node:crypto';

export const cfg = JSON.parse(fs.readFileSync(new URL('../pages.json', import.meta.url)));
export const SITE = cfg.site;
export const byPath = new Map(cfg.pages.map(p => [p.path, p]));
const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;
export const CONTACTS = {
  tg: 'https://t.me/infiniteunion_manager', wa: 'https://wa.me/380688286969', viber: 'viber://chat?number=%2B380688286969',
  tel: '+380688286969', email: 'supportinfiniteunion@gmail.com', instagram: 'https://instagram.com/infinite_union',
  channel: 'https://t.me/infinite_union_channel', maps: 'https://maps.app.goo.gl/sDMRaLPPcaLcZkHH9',
};
const AREA = ['UA', 'PL', 'DE', 'NL', 'CZ', 'SK', 'GB'].map(c => ({ '@type': 'Country', name: c }));
const LOCALE = { uk: 'uk_UA', en: 'en_US' };

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = p => SITE + p;
export const sha256 = s => "'sha256-" + crypto.createHash('sha256').update(s).digest('base64') + "'";

export function chain(p) {
  const out = [p];
  let cur = p;
  while (cur.parent && byPath.has(cur.parent)) { cur = byPath.get(cur.parent); out.unshift(cur); }
  if (/^\/blog\/.+/.test(p.path) && byPath.has('/blog/') && !out.some(x => x.path === '/blog/')) out.unshift(byPath.get('/blog/'));
  const home = byPath.get(p.lang === 'en' ? '/en/' : '/');
  if (p.path !== home.path) out.unshift(home);
  return out;
}

function offerCatalog() {
  const items = cfg.pages.filter(p => p.lang === 'uk' && p.type === 'service' && p.price && !p.parent);
  return {
    '@type': 'OfferCatalog', name: 'Послуги Infinite Union',
    itemListElement: items.map(p => ({
      '@type': 'Offer', url: abs(p.path),
      itemOffered: { '@type': 'Service', name: p.name, url: abs(p.path) },
      priceSpecification: { '@type': 'PriceSpecification', minPrice: p.price, priceCurrency: 'USD' },
    })),
  };
}

// faq: [{q,a}] taken from the visible page; items: portfolio ItemList [{name,url}]
export function jsonLd(p, { faq = [], items = [] } = {}) {
  const url = abs(p.path);
  const graph = [];
  const crumbs = chain(p);
  if (p.type === 'home' || p.type === '404') {
    graph.push({
      '@type': ['Organization', 'ProfessionalService'], '@id': ORG_ID,
      name: 'Infinite Union', alternateName: 'IU', url: abs('/'),
      logo: abs('/icon-512.png'), image: abs('/og-image.png'),
      description: byPath.get('/').description,
      telephone: CONTACTS.tel, email: CONTACTS.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Kharkiv', addressRegion: 'Kharkiv Oblast', addressCountry: 'UA' },
      geo: { '@type': 'GeoCoordinates', latitude: 49.983, longitude: 36.233 },
      areaServed: AREA, priceRange: '$$',
      sameAs: [CONTACTS.instagram, CONTACTS.channel, CONTACTS.maps],
      contactPoint: [{ '@type': 'ContactPoint', telephone: CONTACTS.tel, email: CONTACTS.email, contactType: 'sales', availableLanguage: ['uk', 'en'] }],
      hasOfferCatalog: offerCatalog(),
    });
    graph.push({ '@type': 'WebSite', '@id': WEBSITE_ID, url: abs('/'), name: 'Infinite Union', inLanguage: ['uk', 'en'], publisher: { '@id': ORG_ID } });
  }
  if (p.type === '404') return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  const pageType = { portfolio: 'CollectionPage', blog: 'CollectionPage' }[p.type] || 'WebPage';
  graph.push({
    '@type': pageType, '@id': `${url}#webpage`, url, name: p.title, description: p.description,
    inLanguage: p.lang, isPartOf: { '@id': WEBSITE_ID }, about: { '@id': ORG_ID },
    ...(crumbs.length > 1 ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(items.length ? { mainEntity: { '@id': `${url}#items` } } : {}),
  });
  if (crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
    });
  }
  if (items.length) {
    graph.push({
      '@type': 'ItemList', '@id': `${url}#items`, numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, ...(it.url ? { url: it.url } : {}) })),
    });
  }
  if (p.type === 'service' || p.type === 'tool') {
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
      datePublished: p.date || '2026-07-30', dateModified: p.modified || p.date || '2026-07-30',
      inLanguage: p.lang, mainEntityOfPage: { '@id': `${url}#webpage` }, image: abs('/og-image.png'),
      author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID },
    });
  }
  if (faq.length) {
    graph.push({
      '@type': 'FAQPage', '@id': `${url}#faq`,
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  // `}}` / `{{` never appear back-to-back (DESIGN_SYSTEM §7) — pretty-print guarantees whitespace between braces
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1);
}

export function seoHead(p, opts = {}) {
  const url = abs(p.path);
  const L = [];
  L.push(`<title>${esc(p.title)}</title>`);
  L.push(`<meta name="description" content="${esc(p.description)}">`);
  L.push(`<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">`);
  if (p.type !== '404') L.push(`<link rel="canonical" href="${url}">`);
  if (p.alt && !p.noindex) {
    const uk = p.lang === 'uk' ? p.path : p.alt, en = p.lang === 'en' ? p.path : p.alt;
    L.push(`<link rel="alternate" hreflang="uk" href="${abs(uk)}">`);
    L.push(`<link rel="alternate" hreflang="en" href="${abs(en)}">`);
    L.push(`<link rel="alternate" hreflang="x-default" href="${abs(uk)}">`);
  }
  L.push('<link rel="icon" href="/favicon.ico" sizes="any">');
  L.push('<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">');
  L.push('<link rel="apple-touch-icon" href="/apple-touch-icon.png">');
  L.push('<link rel="manifest" href="/manifest.json">');
  L.push('<meta name="theme-color" content="#0a0706">');
  const og = opts.ogImage || '/og-image.png';
  L.push(`<meta property="og:type" content="${p.type === 'post' ? 'article' : 'website'}">`);
  L.push('<meta property="og:site_name" content="Infinite Union">');
  L.push(`<meta property="og:locale" content="${LOCALE[p.lang]}">`);
  if (p.alt) L.push(`<meta property="og:locale:alternate" content="${LOCALE[p.lang === 'uk' ? 'en' : 'uk']}">`);
  if (p.type !== '404') L.push(`<meta property="og:url" content="${url}">`);
  L.push(`<meta property="og:title" content="${esc(p.title)}">`);
  L.push(`<meta property="og:description" content="${esc(p.description)}">`);
  L.push(`<meta property="og:image" content="${abs(og)}">`);
  L.push('<meta property="og:image:width" content="1200">');
  L.push('<meta property="og:image:height" content="630">');
  L.push(`<meta property="og:image:alt" content="${esc(p.name || 'Infinite Union')} — Infinite Union">`);
  L.push('<meta name="twitter:card" content="summary_large_image">');
  L.push(`<meta name="twitter:title" content="${esc(p.title)}">`);
  L.push(`<meta name="twitter:description" content="${esc(p.description)}">`);
  L.push(`<meta name="twitter:image" content="${abs(og)}">`);
  L.push(`<script type="application/ld+json">\n${jsonLd(p, opts)}\n</script>`);
  return L.join('\n');
}

export const GTM = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WXZW3NHF');";
export const GTAG = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18360841103');";
// First-paint flags: ?static=1 (tests), returning visitor (no preloader), arriving through the page-transition veil.
export const BOOT = "(function(d){var h=d.documentElement,c=h.classList;c.add('js');try{if(/[?&]static=1/.test(location.search)){c.add('static','no-loader');return}var s=sessionStorage;if(s.getItem('iu_seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)c.add('no-loader');if(s.getItem('iu_veil')){s.removeItem('iu_veil');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)c.add('veil-in')}}catch(e){}})(document);";

export function csp(hashes) {
  return [
    "default-src 'self'",
    `script-src 'self' 'wasm-unsafe-eval' ${hashes.join(' ')} https://www.googletagmanager.com https://googleads.googleapis.com https://www.googleadservices.com https://www.google.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://js-de.sentry-cdn.com https://browser.sentry-cdn.com https://static.cloudflareinsights.com`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.infiniteunion.com.ua https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://ad.doubleclick.net https://www.google.com https://res.cloudinary.com https://o4511772270002176.ingest.de.sentry.io https://browser.sentry-cdn.com https://static.cloudflareinsights.com blob:",
    "worker-src 'self' blob:",
    "frame-src https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
  ].join('; ');
}
