// Phase 1 of the SSG: render every design prototype in headless Chromium and capture the final DOM.
// Output: .cache/design/<key>.json = { html, styles[], hov{}, base, title }
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { startServer, transformTemplate } from './design-server.mjs';

export const DESIGN = path.resolve('design');
export const CACHE = path.resolve('.cache/design');

export const keyOf = p => (p === '/' ? 'home' : p === '/en/' ? 'en__home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '__'));
export const pathOfKey = k => (k === 'home' ? '/' : k === 'en__home' ? '/en/' : '/' + k.replace(/__/g, '/') + '/');
export function urlOf(key) {
  if (key === 'home') return '/IU%20Home%20v2.dc.html';
  if (key === '404') return '/IU%20404.dc.html';
  return '/IU%20Page.dc.html?p=' + encodeURIComponent(key);
}

// Runs inside the page. Clones the rendered component, strips DC runtime artefacts,
// turns inline styles into indexed placeholders and hover/focus classes into rule bodies.
function extract() {
  const host = document.querySelector('.sc-host') || document.querySelector('#dc-root');
  const hov = {};
  for (const sh of document.styleSheets) {
    let rules; try { rules = sh.cssRules; } catch { continue; }
    for (const r of rules) {
      const m = r.selectorText && r.selectorText.match(/^\.(scp\w+):(hover|focus)$/);
      if (m) hov[m[1]] = { pseudo: m[2], body: r.style.cssText };
    }
  }
  const base = [...document.querySelectorAll('head style')].map(s => s.textContent).find(t => /html,body\{margin:0/.test(t)) || '';
  const clone = host.cloneNode(true);
  clone.querySelectorAll('.sc-interp').forEach(s => s.replaceWith(...s.childNodes));
  const styles = [], idx = new Map();
  for (const el of clone.querySelectorAll('*')) {
    for (const a of ['data-dc-tpl', 'data-screen-label', 'data-sc-name', 'hint-placeholder-val', 'hint-placeholder-count']) el.removeAttribute(a);
    const cls = [];
    const st = el.getAttribute('style');
    if (st && st.trim()) {
      let i = idx.get(st);
      if (i === undefined) { i = styles.length; styles.push(st); idx.set(st, i); }
      cls.push('__S' + i);
    }
    el.removeAttribute('style');
    if (el.classList.length) el.classList.forEach(c => { if (hov[c]) cls.push('__H' + c); });
    el.removeAttribute('class');
    if (cls.length) el.setAttribute('class', cls.join(' '));
  }
  return { html: clone.innerHTML, styles, hov, base, title: document.title, lang: document.documentElement.lang };
}

export async function capture(keys, { concurrency = 4, log = console.log } = {}) {
  fs.mkdirSync(CACHE, { recursive: true });
  const srv = await startServer(DESIGN, { transform: (name, src) => transformTemplate(name, src, 'ssg') });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { window.__SSG = true; });
  // never hit third parties while capturing (fonts, mShots, Cloudinary)
  await ctx.route(/fonts\.(googleapis|gstatic)\.com|s0\.wp\.com|res\.cloudinary\.com|truebar\.com\.ua/, r => r.abort());
  const queue = [...keys];
  const worker = async () => {
    while (queue.length) {
      const key = queue.shift();
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', e => errs.push(String(e)));
      await page.goto(`http://127.0.0.1:${srv.port}${urlOf(key)}`);
      if (key === 'home') await page.waitForSelector('.sc-host #hero h1', { state: 'attached' });
      else if (key === '404') await page.waitForSelector('.sc-host main h1', { state: 'attached' });
      else {
        await page.waitForSelector('.sc-host footer', { state: 'attached', timeout: 30000 });
        if (/portfolio/.test(key) && !key.startsWith('en')) await page.waitForSelector('.sc-host #projects article', { state: 'attached', timeout: 30000 }).catch(() => {});
      }
      await page.waitForTimeout(300);
      const data = await page.evaluate(extract);
      data.errors = errs;
      fs.writeFileSync(path.join(CACHE, key + '.json'), JSON.stringify(data));
      log(`captured ${key}: ${data.styles.length} styles, ${Object.keys(data.hov).length} hover, ${(data.html.length / 1024).toFixed(0)} KB${errs.length ? ' ERR ' + errs.join(' | ') : ''}`);
      await page.close();
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));
  await browser.close();
  srv.close();
}
