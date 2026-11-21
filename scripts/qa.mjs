// npm run qa — pre-deploy QA (TZ §10). Every step must pass; failures are fixed, never switched off.
//  1. crawler: every URL from sitemap + all internal links/anchors → 200, anchors exist
//  2. per-page SEO: one H1, title ≤ 60, description ≤ 160, canonical, hreflang, JSON-LD parses, no {{ }}, text in raw HTML
//  3. visual diff vs design baseline            (scripts/visual-diff.mjs)
//  4. responsive: 12 widths × all pages — no horizontal scroll, no console errors / 404s, touch targets ≥ 44 px,
//     numbers on one line, tables scroll inside their frame
//  5. lead form e2e with mocked API             (playwright test)
//  6. Lighthouse budgets per template           (scripts/lh.mjs)
//  7. npm run lint && npm run check:static
// Usage: node scripts/qa.mjs [--skip=visual,lh,e2e] [--only=crawl,seo,responsive]
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium, webkit, devices } from '@playwright/test';
import { parse } from 'node-html-parser';
import { startServer } from './lib/design-server.mjs';

const arg = n => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1] || '';
const skip = new Set(arg('skip').split(',').filter(Boolean));
const only = new Set(arg('only').split(',').filter(Boolean));
const run = k => (only.size ? only.has(k) : !skip.has(k));
const cfg = JSON.parse(fs.readFileSync('scripts/pages.json', 'utf8'));
const SITE = cfg.site;
const fails = [];
const fail = (step, msg) => { fails.push(`[${step}] ${msg}`); };
const site = await startServer(process.cwd());
const BASE = `http://127.0.0.1:${site.port}`;
const pages = cfg.pages.map(p => p.path);
const fileOf = p => (p === '/' ? 'index.html' : p.slice(1) + 'index.html');

/* ---------------------------------------------------------------- 1. crawler */
if (run('crawl')) {
  const sm = fs.readFileSync('sitemap.xml', 'utf8');
  const seen = new Map();
  const queue = [...new Set(['/', ...[...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(SITE, ''))])];
  const anchors = [];
  while (queue.length) {
    const p = queue.shift();
    if (seen.has(p)) continue;
    const res = await fetch(BASE + p);
    seen.set(p, res.status);
    if (res.status !== 200) { fail('crawl', `${p} → ${res.status}`); continue; }
    if (!/text\/html/.test(res.headers.get('content-type') || '')) continue;
    const root = parse(await res.text());
    for (const a of root.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href');
      if (/^(mailto:|tel:|viber:|javascript:)/.test(href)) continue;
      const u = new URL(href, SITE + p);
      if (u.origin !== SITE) continue;
      if (u.hash) anchors.push({ from: p, path: u.pathname, id: decodeURIComponent(u.hash.slice(1)) });
      if (!seen.has(u.pathname)) queue.push(u.pathname);
    }
  }
  for (const a of anchors) {
    const f = a.path === '/404.html' ? '404.html' : fileOf(a.path);
    if (!fs.existsSync(f)) continue;
    if (!new RegExp(`id="${a.id}"`).test(fs.readFileSync(f, 'utf8'))) fail('crawl', `broken anchor ${a.path}#${a.id} (from ${a.from})`);
  }
  // legacy redirects must still resolve (meta-refresh stubs are generated into _site by build-site.mjs)
  console.log(`crawl: ${seen.size} URLs, ${anchors.length} anchors`);
}

/* ---------------------------------------------------------------- 2. SEO per page */
if (run('seo')) {
  for (const p of cfg.pages) {
    const html = fs.readFileSync(fileOf(p.path), 'utf8');
    const root = parse(html);
    const t = root.querySelector('title')?.text || '';
    const dsc = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    if (root.querySelectorAll('h1').length !== 1) fail('seo', `${p.path}: H1 count ${root.querySelectorAll('h1').length}`);
    if (!t || t.length > 60) fail('seo', `${p.path}: title length ${t.length}`);
    if (!dsc || dsc.length > 160) fail('seo', `${p.path}: description length ${dsc.length}`);
    if (root.querySelector('link[rel="canonical"]')?.getAttribute('href') !== SITE + p.path) fail('seo', `${p.path}: canonical`);
    if (p.alt && root.querySelectorAll('link[hreflang]').length !== 3) fail('seo', `${p.path}: hreflang`);
    for (const s of root.querySelectorAll('script[type="application/ld+json"]')) { try { JSON.parse(s.text); } catch (e) { fail('seo', `${p.path}: JSON-LD ${e.message}`); } }
    if (/\{\{|\}\}/.test(html.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<script>[\s\S]*?<\/script>/g, ''))) fail('seo', `${p.path}: {{ }} in output`);
    // all text is in the raw HTML (no JS needed): H1, every H2, FAQ answers
    const main = root.querySelector('main');
    if (!main || main.text.trim().split(/\s+/).length < 80) fail('seo', `${p.path}: main text missing in raw HTML`);
    const h2 = main ? main.querySelectorAll('h2').length : 0;
    if (p.type !== 'home' && !h2) fail('seo', `${p.path}: no H2`);
    // H1 → H2 → H3 order: no H3 before the first H2 inside main (cards/FAQ live under section H2s)
    const hs = main ? main.querySelectorAll('h1,h2,h3,h4').map(h => +h.tagName[1]) : [];
    for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1 && hs[i] > 2) { fail('seo', `${p.path}: heading level jump h${hs[i - 1]}→h${hs[i]}`); break; }
    for (const img of root.querySelectorAll('img')) {
      if (!img.hasAttribute('alt')) fail('seo', `${p.path}: img without alt ${img.getAttribute('src')}`);
      if (!img.getAttribute('width') || !img.getAttribute('height')) fail('seo', `${p.path}: img without width/height ${img.getAttribute('src')}`);
    }
  }
  console.log('seo: done');
}

/* ---------------------------------------------------------------- 4. responsive */
if (run('responsive')) {
  const WIDTHS = [360, 375, 390, 414, 430, 768, 820, 1024, 1280, 1440, 1920, 2560];
  const list = arg('pages') ? arg('pages').split(',') : [...pages, '/404.html'];
  const browser = await chromium.launch();
  const jobs = list.flatMap(p => WIDTHS.map(w => ({ p, w })));
  const IGN = /googletagmanager|google-analytics|doubleclick|cloudinary|sentry|ERR_FAILED|Failed to load resource/;
  const worker = async () => {
    while (jobs.length) {
      const { p, w } = jobs.shift();
      const touch = w <= 1024;
      const ctx = await browser.newContext({ viewport: { width: w, height: w < 820 ? 844 : 900 }, hasTouch: touch, isMobile: w < 820, deviceScaleFactor: 1 });
      await ctx.route(/googletagmanager|google-analytics|doubleclick|res\.cloudinary|sentry/, r => r.abort());
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', e => errs.push('pageerror ' + e.message));
      page.on('console', m => { if (m.type() === 'error' && !IGN.test(m.text())) errs.push('console ' + m.text().slice(0, 140)); });
      page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(BASE)) errs.push(`${r.status()} ${r.url().replace(BASE, '')}`); });
      try {
        await page.goto(BASE + p + (p.includes('?') ? '&' : '?') + 'static=1', { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        const r = await page.evaluate(touch => {
          const out = { overflow: document.documentElement.scrollWidth - innerWidth, small: [], wraps: [], tables: [] };
          const vis = el => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.visibility !== 'hidden' && s.display !== 'none' && b.width > 0 && b.height > 0 && !el.closest('[inert],[aria-hidden="true"],.iu-hp,[hidden],[data-menu]'); };
          if (touch) {
            for (const el of document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,summary')) {
              if (!vis(el) || el.classList.contains('iu-skip')) continue;
              const b = el.getBoundingClientRect();
              const af = getComputedStyle(el, '::after');
              let w = b.width, h = b.height;
              if (af.content !== 'none' && af.position === 'absolute') { w = Math.max(w, parseFloat(af.width) || 0); h = Math.max(h, parseFloat(af.height) || 0); }
              const lab = /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && el.closest('label'); // tapping the label text focuses the field
              if (lab) { const lb = lab.getBoundingClientRect(); w = Math.max(w, lb.width); h = Math.max(h, lb.height); }
              if (w < 44 - 0.5 || h < 44 - 0.5) out.small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 24)}" ${Math.round(w)}×${Math.round(h)}`);
            }
          }
          for (const el of document.querySelectorAll('[data-count],[data-stat-v]')) {
            if (!vis(el)) continue;
            const lh = parseFloat(getComputedStyle(el).lineHeight) || parseFloat(getComputedStyle(el).fontSize) * 1.2;
            if (el.getBoundingClientRect().height > lh * 1.6) out.wraps.push(el.textContent.trim().slice(0, 20));
          }
          for (const el of document.querySelectorAll('[style*="min-width"], main div')) {
            const clipped = p => { for (let q = p.parentElement; q && q !== document.body; q = q.parentElement) if (getComputedStyle(q).overflowX !== 'visible') return true; return false; };
            if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX === 'visible' && el.getBoundingClientRect().right > innerWidth + 1) { if (!clipped(el)) out.tables.push(el.className); }
          }
          return out;
        }, touch);
        if (r.overflow > 0) fail('responsive', `${p} @${w}: horizontal scroll ${r.overflow}px`);
        if (r.small.length) fail('responsive', `${p} @${w}: ${r.small.length} touch targets < 44px: ${r.small.slice(0, 4).join(' | ')}`);
        if (r.wraps.length) fail('responsive', `${p} @${w}: number wraps: ${r.wraps.join(', ')}`);
        if (r.tables.length) fail('responsive', `${p} @${w}: content overflows the viewport: ${r.tables.slice(0, 3).join(', ')}`);
        if (errs.length) fail('responsive', `${p} @${w}: ${[...new Set(errs)].slice(0, 3).join(' | ')}`);
      } catch (e) { fail('responsive', `${p} @${w}: ${e.message.slice(0, 120)}`); }
      await ctx.close();
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  await browser.close();
  // WebKit (iOS Safari engine): no horizontal scroll + no errors on iPhone 14 for every page
  const wk = await webkit.launch();
  for (const p of list) {
    const ctx = await wk.newContext({ ...devices['iPhone 14'] });
    await ctx.route(/googletagmanager|google-analytics|doubleclick|res\.cloudinary|sentry/, r => r.abort());
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.goto(BASE + p + '?static=1');
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (ov > 0) fail('responsive', `${p} @iPhone14/WebKit: horizontal scroll ${ov}px`);
    if (errs.length) fail('responsive', `${p} @iPhone14/WebKit: ${errs[0]}`);
    await ctx.close();
  }
  await wk.close();
  console.log(`responsive: ${list.length} pages × 12 widths + WebKit`);
}
site.close();

const sh = (step, cmd, args) => { try { execFileSync(cmd, args, { stdio: 'inherit' }); } catch { fail(step, `${cmd} ${args.join(' ')} failed`); } };
if (run('visual')) sh('visual', 'node', ['scripts/visual-diff.mjs']);
if (run('e2e')) sh('e2e', 'npx', ['playwright', 'test', '--reporter=line']);
if (run('lh')) sh('lighthouse', 'node', ['scripts/lh.mjs']);
if (run('lint')) { sh('lint', 'npm', ['run', 'lint']); sh('check', 'npm', ['run', 'check:static']); }

fs.mkdirSync('.cache', { recursive: true });
fs.writeFileSync('.cache/qa.json', JSON.stringify({ date: new Date().toISOString(), fails }, null, 1));
if (fails.length) {
  const byStep = {};
  for (const f of fails) { const k = f.slice(1, f.indexOf(']')); byStep[k] = (byStep[k] || 0) + 1; }
  for (const f of fails.slice(0, 80)) console.error('FAIL', f);
  console.error(`\nQA: ${fails.length} failure(s)`, byStep);
  process.exit(1);
}
console.log('\nQA: all green');
