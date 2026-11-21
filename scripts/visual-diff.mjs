// "Pixel-perfect" check (TZ §4): design prototype vs built page, full-page screenshots per width.
// Baseline = prototype rendered by the DC runtime with its animation code switched off (final static state),
// candidate = built page with ?static=1. CSS animations frozen, 3D canvases and photos masked.
// Usage: node scripts/visual-diff.mjs [--keys=a,b] [--widths=390,1440] [--threshold=2]
// Writes design/baseline/<key>/<w>.png, .cache/visual/<key>-<w>-{site,diff}.png and .cache/visual/summary.json
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { startServer, transformTemplate } from './lib/design-server.mjs';
import { keyOf, pathOfKey, urlOf } from './lib/capture.mjs';

const arg = n => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1];
const cfg = JSON.parse(fs.readFileSync('scripts/pages.json'));
const KEYS = arg('keys') ? arg('keys').split(',') : [...cfg.pages.map(p => keyOf(p.path)), '404'];
const WIDTHS = (arg('widths') || '360,390,430,768,1024,1440,1920').split(',').map(Number);
const LIMIT = +(arg('threshold') || 2);
const OUT = '.cache/visual';
fs.mkdirSync(OUT, { recursive: true });

const MASK = 'img,picture,canvas,video{visibility:hidden!important}#spot,#grain,#g404,#veil,#loader{display:none!important}*{caret-color:transparent!important}';
const design = await startServer(path.resolve('design'), { transform: (n, s) => transformTemplate(n, s, 'baseline') });
const site = await startServer(path.resolve('.'));
const browser = await chromium.launch();

async function shot(url, width, isDesign) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  if (isDesign) await ctx.addInitScript(() => { window.__SSG = true; });
  await ctx.route(/s0\.wp\.com|res\.cloudinary\.com|truebar\.com\.ua|googletagmanager|google-analytics/, r => r.abort());
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  if (isDesign) {
    await page.waitForFunction(() => { const h = document.querySelector('.sc-host'); return h && (h.querySelector('footer') || h.querySelector('main h1')); }, null, { timeout: 30000 });
    await page.waitForTimeout(400);
    // the prototype's preloader / loading veil are runtime overlays — drop them like ?static=1 does
    await page.evaluate(() => { document.querySelectorAll('.sc-host div').forEach(el => { const s = el.getAttribute('style') || ''; if (/position: fixed/.test(s) && /z-index: 9[05]/.test(s)) el.remove(); }); });
  }
  await page.addStyleTag({ content: MASK });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  const buf = await page.screenshot({ fullPage: true, animations: 'disabled' });
  await ctx.close();
  return PNG.sync.read(buf);
}

function compare(a, b) {
  const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height);
  const crop = (img) => { const o = new PNG({ width: w, height: h }); PNG.bitblt(img, o, 0, 0, w, h, 0, 0); return o; };
  const A = crop(a), B = crop(b), diff = new PNG({ width: w, height: h });
  const n = pixelmatch(A.data, B.data, diff.data, w, h, { threshold: 0.12, includeAA: false });
  const extra = Math.abs(a.height - b.height) * w;
  const total = Math.max(a.height, b.height) * w;
  return { pct: +(((n + extra) / total) * 100).toFixed(2), diff, hA: a.height, hB: b.height };
}

const results = [];
const jobs = KEYS.flatMap(k => WIDTHS.map(w => ({ k, w })));
const worker = async () => {
  while (jobs.length) {
    const { k, w } = jobs.shift();
    const sitePath = k === '404' ? '/404.html' : pathOfKey(k);
    try {
      const base = await shot(`http://127.0.0.1:${design.port}${urlOf(k)}`, w, true);
      const cand = await shot(`http://127.0.0.1:${site.port}${sitePath}?static=1`, w, false);
      fs.mkdirSync(`design/baseline/${k}`, { recursive: true });
      fs.writeFileSync(`design/baseline/${k}/${w}.png`, PNG.sync.write(base));
      const r = compare(base, cand);
      if (r.pct > LIMIT) {
        fs.writeFileSync(`${OUT}/${k}-${w}-site.png`, PNG.sync.write(cand));
        fs.writeFileSync(`${OUT}/${k}-${w}-diff.png`, PNG.sync.write(r.diff));
      }
      results.push({ key: k, width: w, pct: r.pct, hDesign: r.hA, hSite: r.hB });
      console.log(`${r.pct > LIMIT ? 'FAIL' : 'ok  '} ${k} @${w}: ${r.pct}%${r.hA !== r.hB ? ` (height ${r.hA} vs ${r.hB})` : ''}`);
    } catch (e) {
      results.push({ key: k, width: w, pct: 100, error: String(e).slice(0, 200) });
      console.log(`ERR  ${k} @${w}: ${String(e).slice(0, 160)}`);
    }
  }
};
await Promise.all(Array.from({ length: 4 }, worker));
await browser.close(); design.close(); site.close();
results.sort((a, b) => a.key.localeCompare(b.key) || a.width - b.width);
fs.writeFileSync(`${OUT}/summary.json`, JSON.stringify(results, null, 1));
const bad = results.filter(r => r.pct > LIMIT);
console.log(`\nvisual: ${results.length - bad.length}/${results.length} within ${LIMIT}%`);
process.exitCode = bad.length ? 1 : 0;
