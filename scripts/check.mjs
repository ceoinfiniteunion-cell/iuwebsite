// Site-wide SEO / integrity checks. Exits non-zero on any error.
// Usage: node scripts/check.mjs            (static checks)
//        node scripts/check.mjs --lighthouse (also runs Lighthouse mobile on key pages against a local server)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { parse } from 'node-html-parser';

const cfg = JSON.parse(fs.readFileSync('scripts/pages.json'));
const SITE = cfg.site;
const pages = cfg.pages;
const byPath = new Map(pages.map(p => [p.path, p]));
const fileOf = p => (p.path === '/' ? 'index.html' : p.path.slice(1) + 'index.html');
const errors = [];
const warns = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const CYR = /[а-яА-ЯіїєґІЇЄҐ]/;

// ---------- every HTML file in the repo must be a registered page (or 404) ----------
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || ['node_modules', 'vendor', 'test-results', 'tests', 'docs', 'audit-screens', 'scripts', 'src', '_site'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const htmlFiles = walk('.').map(f => f.replace(/^\.\//, ''));
const registered = new Set(pages.map(fileOf));
for (const f of htmlFiles) if (f !== '404.html' && !registered.has(f)) err(f, 'HTML file not registered in scripts/pages.json');

// ---------- per-page checks ----------
const linkTargets = new Map(); // path -> Set(source)
const titles = new Map();
const descs = new Map();
const docs = new Map();

function resolveHref(href, fromPath) {
  if (!href) return null;
  href = href.trim();
  if (/^(mailto:|tel:|viber:|javascript:|#|data:)/i.test(href)) return null;
  let u;
  try { u = new URL(href, SITE + fromPath); } catch { return { bad: href }; }
  if (u.origin !== SITE) return null;
  return { path: decodeURIComponent(u.pathname), raw: href };
}

for (const p of pages) {
  const f = fileOf(p);
  if (!fs.existsSync(f)) { err(f, 'file missing'); continue; }
  const html = fs.readFileSync(f, 'utf8');
  const root = parse(html, { comment: false });
  docs.set(p.path, { html, root });

  // html lang
  const lang = (html.match(/<html[^>]*\blang="([^"]+)"/) || [])[1];
  if (lang !== p.lang) err(f, `<html lang="${lang}"> expected "${p.lang}"`);

  // head basics
  const title = root.querySelector('title')?.text.trim() || '';
  if (title !== p.title) err(f, `title differs from pages.json`);
  if (title.length > 60) err(f, `title too long (${title.length})`);
  const desc = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  if (!desc) err(f, 'no meta description');
  if (desc.length > 155) err(f, `description too long (${desc.length})`);
  if (titles.has(title)) err(f, `duplicate title with ${titles.get(title)}`); titles.set(title, f);
  if (descs.has(desc)) err(f, `duplicate description with ${descs.get(desc)}`); descs.set(desc, f);
  if (!/^<!DOCTYPE html>/i.test(html)) err(f, 'missing doctype');
  if (html.indexOf('<meta charset') > 1024 || html.indexOf('<meta charset') < 0) err(f, 'meta charset must be within first 1024 bytes');

  const robots = root.querySelectorAll('meta[name="robots"]');
  if (robots.length !== 1) err(f, `expected 1 meta robots, got ${robots.length}`);
  const rob = robots[0]?.getAttribute('content') || '';
  if (p.noindex ? !rob.includes('noindex') : rob.includes('noindex')) err(f, `robots "${rob}" mismatch`);

  const canon = root.querySelectorAll('link[rel="canonical"]');
  if (canon.length !== 1) err(f, `expected 1 canonical, got ${canon.length}`);
  else if (canon[0].getAttribute('href') !== SITE + p.path) err(f, `canonical ${canon[0].getAttribute('href')} != self`);

  // hreflang reciprocity
  const hl = Object.fromEntries(root.querySelectorAll('link[rel="alternate"][hreflang]').map(l => [l.getAttribute('hreflang'), l.getAttribute('href')]));
  const hlCount = root.querySelectorAll('link[rel="alternate"][hreflang]').length;
  if (p.alt) {
    const alt = byPath.get(p.alt);
    if (!alt) err(f, `alt ${p.alt} not registered`);
    else if (alt.alt !== p.path) err(f, `alt ${p.alt} does not point back`);
    if (hlCount !== 3 || !hl.uk || !hl.en || !hl['x-default']) err(f, 'hreflang must be exactly uk/en/x-default');
    if (hl[p.lang] !== SITE + p.path) err(f, 'hreflang self link wrong');
  } else if (hlCount) err(f, 'hreflang present on page without alternate');

  // OG / Twitter
  for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type'])
    if (!root.querySelector(`meta[property="${prop}"]`)) err(f, `missing ${prop}`);
  if (!root.querySelector('meta[name="twitter:card"]')) err(f, 'missing twitter:card');
  if (root.querySelector('meta[property="og:url"]')?.getAttribute('content') !== SITE + p.path) err(f, 'og:url != canonical');

  // JSON-LD
  const lds = root.querySelectorAll('script[type="application/ld+json"]');
  if (!lds.length) err(f, 'no JSON-LD');
  for (const s of lds) {
    let d;
    try { d = JSON.parse(s.text); } catch (e) { err(f, `JSON-LD parse error: ${e.message}`); continue; }
    const txt = JSON.stringify(d);
    if (/AggregateRating|"Review"/.test(txt)) err(f, 'JSON-LD contains Review/AggregateRating');
    if (/\.html["#]/.test(txt)) err(f, 'JSON-LD contains .html URL');
    const types = (d['@graph'] || [d]).flatMap(n => [].concat(n['@type']));
    if (p.type === 'home' && !types.includes('Organization')) err(f, 'home without Organization');
    if (p.type === 'service' && !types.includes('Service')) err(f, 'service page without Service');
    if (p.path !== '/' && p.path !== '/en/' && !types.includes('BreadcrumbList')) err(f, 'no BreadcrumbList');
  }
  // FAQ JSON-LD must mirror visible FAQ
  const faqVisible = root.querySelectorAll('.faq-item .faq-q').length;
  const faqLd = (html.match(/"@type": "Question"/g) || []).length;
  if (faqVisible !== faqLd) err(f, `FAQ JSON-LD (${faqLd}) != visible FAQ (${faqVisible}) — run npm run build:seo`);

  // analytics must not be blocked by the page CSP (GTM loads GA4 + Ads gtag.js and sends to *.google-analytics.com)
  const csp = root.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute('content');
  if (csp) {
    const dir = n => (csp.match(new RegExp(`${n}[^;]*`)) || [''])[0];
    if (!dir('script-src').includes('https://www.googletagmanager.com')) err(f, 'CSP script-src blocks GTM');
    if (!dir('connect-src').includes('*.google-analytics.com')) err(f, 'CSP connect-src blocks GA4 collect');
  }

  // body structure
  const h1 = root.querySelectorAll('h1');
  if (h1.length !== 1) err(f, `expected exactly 1 <h1>, got ${h1.length}`);
  if (!html.includes('<!-- iu:content -->') || !html.includes('<!-- /iu:content -->')) err(f, 'content markers missing');
  if (!root.querySelector('footer.iu-foot')) err(f, 'shared footer missing');
  if (!html.includes('<!-- iu:lang -->')) err(f, 'language switcher missing');
  if (/gtag\/js\?id=/.test(html)) err(f, 'direct gtag.js loader present (analytics must go through GTM)');
  if (/<body[\s>]/.test(html.slice(html.indexOf('<body') + 5))) err(f, 'duplicate <body>');

  // images
  for (const img of root.querySelectorAll('img')) {
    if (!img.hasAttribute('alt')) err(f, `img without alt: ${img.getAttribute('src')}`);
    if (!img.getAttribute('width') || !img.getAttribute('height')) warns.push(`${f}: img without width/height: ${img.getAttribute('src')}`);
  }

  // EN pages: no Ukrainian outside <head>
  if (p.lang === 'en') {
    const body = html.slice(html.indexOf('<body'));
    const bodyRoot = parse(body, { comment: false });
    for (const el of bodyRoot.querySelectorAll('script[type="application/ld+json"]')) el.remove();
    const text = bodyRoot.structuredText + ' ' + [...body.matchAll(/\s(?:alt|title|aria-label|placeholder|content)="([^"]*)"/g)].map(m => m[1]).join(' ');
    const bad = text.split(/\s+/).filter(w => CYR.test(w) && w !== 'Українською');
    // the "Українською" switch link and the UA privacy link are allowed
    const allowed = new Set(['Українська', 'версія', 'Українською']);
    const real = bad.filter(w => !allowed.has(w.replace(/[^\p{L}]/gu, '')));
    if (real.length) err(f, `Ukrainian text on EN page (${real.length} words): ${real.slice(0, 8).join(' ')}`);
  }

  // links
  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (/\.html(?:[#?]|$)/.test(href) && !/^https?:\/\/(?!infiniteunion)/.test(href)) err(f, `.html link: ${href}`);
    const r = resolveHref(href, p.path);
    if (!r) continue;
    if (r.bad) { err(f, `bad href ${r.bad}`); continue; }
    if (!linkTargets.has(r.path)) linkTargets.set(r.path, new Set());
    linkTargets.get(r.path).add(p.path);
  }
}

// ---------- link targets exist (static file or registered page) ----------
const existsPath = pth => {
  if (byPath.has(pth)) return true;
  const rel = pth.replace(/^\//, '');
  if (rel && fs.existsSync(rel) && fs.statSync(rel).isFile()) return true;
  return false;
};
for (const [target, srcs] of linkTargets) {
  if (!existsPath(target)) err([...srcs][0], `broken internal link ${target} (from ${srcs.size} page(s))`);
  else if (!byPath.has(target) && !path.extname(target)) err([...srcs][0], `link to non-page path ${target}`);
}

// ---------- orphans & click depth ----------
const graph = new Map();
for (const [target, srcs] of linkTargets) for (const s of srcs) {
  if (!graph.has(s)) graph.set(s, new Set());
  graph.get(s).add(target);
}
const depth = new Map([['/', 0]]);
const q = ['/'];
while (q.length) {
  const u = q.shift();
  for (const v of graph.get(u) || []) if (byPath.has(v) && !depth.has(v)) { depth.set(v, depth.get(u) + 1); q.push(v); }
}
for (const p of pages) {
  if (p.noindex) continue;
  const d = depth.get(p.path);
  if (d === undefined) err(fileOf(p), 'orphan: unreachable from /');
  else if (d > 3) err(fileOf(p), `click depth ${d} > 3`);
  const inbound = [...(linkTargets.get(p.path) || [])].filter(s => s !== p.path).length;
  if (p.path !== '/' && inbound < 1) err(fileOf(p), 'no inbound internal links');
}

// ---------- sitemap ----------
const sm = fs.readFileSync('sitemap.xml', 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const expected = pages.filter(p => !p.noindex).map(p => SITE + p.path);
for (const u of expected) if (!locs.includes(u)) err('sitemap.xml', `missing ${u}`);
for (const u of locs) if (!expected.includes(u)) err('sitemap.xml', `unexpected ${u}`);
if (new Set([...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1])).size < 2 && locs.length > 5) warns.push('sitemap.xml: all lastmod equal');
const { sitemapXml } = await import('./sitemap.mjs');
const fresh = sitemapXml().replace(/<lastmod>[^<]+<\/lastmod>/g, '');
if (fresh !== sm.replace(/<lastmod>[^<]+<\/lastmod>/g, '')) err('sitemap.xml', 'out of date — run npm run build:sitemap');

// ---------- robots ----------
const robots = fs.readFileSync('robots.txt', 'utf8');
if (/^\s*Disallow:\s*\/\s*$/m.test(robots.split(/User-agent:\s*\*/)[1]?.split(/User-agent:/)[0] || '')) err('robots.txt', 'blocks everything for *');
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) err('robots.txt', 'no Sitemap line');

// ---------- manifest icons ----------
const mf = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
for (const i of mf.icons) if (!fs.existsSync(i.src.replace(/^\//, ''))) err('manifest.json', `icon missing ${i.src}`);

// ---------- no legacy .html URLs anywhere in pages ----------
for (const f of [...registered, '404.html']) {
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, 'utf8');
  const m = html.match(/infiniteunion\.com\.ua\/[^"'\s<>]*\.html/);
  if (m) err(f, `legacy .html URL: ${m[0]}`);
}

// ---------- html-validate ----------
try {
  execFileSync('npx', ['html-validate', ...[...registered, '404.html'].filter(f => fs.existsSync(f))], { stdio: 'pipe', encoding: 'utf8' });
} catch (e) {
  err('html-validate', '\n' + (e.stdout || e.message).split('\n').slice(0, 60).join('\n'));
}

// ---------- Lighthouse (optional) ----------
if (process.argv.includes('--lighthouse')) {
  // LH_BASE=https://infiniteunion.com.ua runs against production (target: performance ≥ 90).
  // Locally (npx serve: no CDN/HTTP2) Lighthouse reads ~10–14 points lower than prod — measured on the
  // pre-night build: /services/websites/ 84 local vs 98 on prod — so the local gate is 85.
  const port = 4173;
  const base = process.env.LH_BASE || `http://localhost:${port}`;
  const minPerf = process.env.LH_BASE ? 90 : 85;
  const srv = process.env.LH_BASE ? null : spawn('npx', ['serve', '.', '-p', String(port), '-c', 'serve.json', '--no-request-logging'], { stdio: 'ignore' });
  if (srv) await new Promise(r => setTimeout(r, 2500));
  const key = ['/', '/services/websites/', '/services/bots/', '/pricing/', '/en/', '/en/services/websites/', '/blog/skilky-koshtuye-sayt-2026/'];
  try {
    for (const k of key) {
      const out = `/tmp/iu-lh-${k.replace(/\W/g, '_')}.json`;
      execFileSync('npx', ['lighthouse', `${base}${k}`, '--quiet', '--chrome-flags=--headless=new',
        '--only-categories=performance,seo,accessibility,best-practices', '--output=json', `--output-path=${out}`], { stdio: 'ignore' });
      const lr = JSON.parse(fs.readFileSync(out, 'utf8'));
      const sc = Object.fromEntries(Object.entries(lr.categories).map(([k2, v]) => [k2, Math.round(v.score * 100)]));
      const lcp = lr.audits['largest-contentful-paint'].numericValue / 1000;
      const cls = lr.audits['cumulative-layout-shift'].numericValue;
      console.log(`LH ${k}: ${JSON.stringify(sc)} LCP=${lcp.toFixed(2)}s CLS=${cls.toFixed(3)}`);
      if (sc.seo < 100) err(`lighthouse ${k}`, `SEO ${sc.seo} < 100`);
      if (sc.performance < minPerf) err(`lighthouse ${k}`, `performance ${sc.performance} < ${minPerf}`);
      if (lcp > 2.5 && process.env.LH_BASE) err(`lighthouse ${k}`, `LCP ${lcp.toFixed(2)}s > 2.5s`);
      if (cls > 0.1) err(`lighthouse ${k}`, `CLS ${cls}`);
    }
  } finally { if (srv) srv.kill(); }
}

for (const w of warns) console.warn('warn ', w);
if (errors.length) {
  for (const e of errors) console.error('ERROR', e);
  console.error(`\n${errors.length} error(s)`);
  process.exit(1);
}
console.log(`check: OK — ${pages.length} pages, ${linkTargets.size} link targets, ${warns.length} warning(s)`);
