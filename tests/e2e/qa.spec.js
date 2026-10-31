// Visual/behaviour QA for every registered page at 375 / 768 / 1440 px.
// Checks: JS errors, console errors (own origin), horizontal scroll, broken images, FAQ toggle.
// Screenshots go to audit-screens/<SHOT_LABEL>/ when SHOT_LABEL is set.
// Run: npx playwright test tests/e2e/qa.spec.js --project=chromium
//      BASE_URL=https://infiniteunion.com.ua SHOT_LABEL=before npx playwright test tests/e2e/qa.spec.js --project=chromium
import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync('scripts/pages.json', 'utf8'));
const ONLY_EXISTING = !process.env.BASE_URL || process.env.BASE_URL.includes('localhost');
const fileOf = p => (p.path === '/' ? 'index.html' : p.path.slice(1) + 'index.html');
const pages = cfg.pages.filter(p => !ONLY_EXISTING || fs.existsSync(fileOf(p))).filter(p => !(process.env.SKIP_NEW && p.new));
const WIDTHS = [375, 768, 1440];
const LABEL = process.env.SHOT_LABEL;
// Third-party noise that is not a site bug (ad blockers in CI, GTM / Cloudflare beacons)
const IGNORE = /googletagmanager|google-analytics|doubleclick|googleads|cloudflareinsights|sentry|Content Security Policy.*report-only|net::ERR_|Failed to load resource/i;

test.describe.configure({ mode: 'parallel' });

for (const p of pages) {
  for (const w of WIDTHS) {
    test(`${p.path} @${w}`, async ({ page }) => {
      // Home pages run three.js + WebGL globe on desktop; CI runners render WebGL in software.
      if (p.type === 'home' && w >= 1000) test.slow();
      const problems = [];
      page.on('pageerror', e => problems.push(`pageerror: ${e.message}`));
      page.on('console', m => { if (m.type() === 'error' && !IGNORE.test(m.text())) problems.push(`console: ${m.text()}`); });
      page.on('response', r => {
        const u = r.url();
        if (r.status() >= 400 && u.startsWith(page.url().split('/').slice(0, 3).join('/'))) problems.push(`HTTP ${r.status()} ${u}`);
      });
      await page.setViewportSize({ width: w, height: w < 800 ? 812 : 900 });
      await page.route(/api\.infiniteunion\.com\.ua/, route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
      await page.goto(p.path, { waitUntil: 'load' });
      await page.waitForTimeout(1200);
      // scroll through the page so lazy/reveal content renders
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.8) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);

      const overflow = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        // 1) the page itself can be scrolled sideways
        window.scrollTo(400, window.scrollY);
        const sx = window.scrollX;
        window.scrollTo(0, window.scrollY);
        if (sx > 0) return `page scrolls horizontally by ${sx}px`;
        // 2) real content (text, tables, controls, images) cut off at the right edge and not inside its own scroller
        const insideScroller = el => {
          for (let a = el.parentElement; a && a !== document.body && a !== document.documentElement; a = a.parentElement) {
            const o = getComputedStyle(a).overflowX;
            if (o === 'auto' || o === 'scroll') return true;
          }
          return false;
        };
        const cut = [...document.querySelectorAll('table, p, h1, h2, h3, li, a, button, img, input, textarea, select')].filter(el => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          if (!r.width || cs.visibility === 'hidden' || cs.display === 'none' || cs.position === 'fixed') return false;
          if (el.closest('[aria-hidden="true"], .marquee-wrap, .mob, .marquee, .rev:not(.v), .rev-l:not(.v), .rev-r:not(.v)')) return false;
          return r.right > vw + 2 && r.left < vw && !insideScroller(el);
        }).slice(0, 5).map(el => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} "${(el.textContent || '').trim().slice(0, 30)}" right=${Math.round(el.getBoundingClientRect().right)}`);
        return cut.length ? `content cut off at ${vw}px: ${cut.join(' | ')}` : null;
      });
      if (overflow) problems.push(`horizontal scroll: ${overflow}`);

      const broken = await page.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.src && !i.src.startsWith('data:')).map(i => i.src));
      for (const b of broken) problems.push(`broken image ${b}`);

      // FAQ: first question opens
      const q = page.locator('.faq-item .faq-q').first();
      if (await q.count()) {
        await q.scrollIntoViewIfNeeded();
        await q.click();
        await page.waitForTimeout(300);
        const open = await page.locator('.faq-item').first().evaluate(el => el.classList.contains('open'));
        if (!open) problems.push('FAQ does not open on click');
      }

      if (LABEL) {
        fs.mkdirSync(`audit-screens/${LABEL}`, { recursive: true });
        const name = (p.path === '/' ? 'home' : p.path.replace(/^\/|\/$/g, '').replace(/\//g, '_')) + `@${w}.jpg`;
        await page.screenshot({ path: `audit-screens/${LABEL}/${name}`, fullPage: true, type: 'jpeg', quality: 45 });
      }
      expect(problems, problems.join('\n')).toEqual([]);
    });
  }
}

test('mobile menu opens and closes (home @375)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.waitForTimeout(800);
  await page.locator('#burger').click();
  await expect(page.locator('#mob')).toHaveClass(/open/);
  await page.locator('#mobX').click();
  await expect(page.locator('#mob')).not.toHaveClass(/open/);
});

test('lead form posts to the API with all fields', async ({ page }) => {
  test.slow(); // desktop home (WebGL) — see above
  let body = null;
  await page.route(/api\.infiniteunion\.com\.ua\/lead/, async route => {
    body = JSON.parse(route.request().postData() || '{}');
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#contact');
  await page.waitForTimeout(1500);
  await page.fill('#cn', 'QA Test');
  await page.fill('#cc', '@qa_test');
  if (await page.locator('#cphone').count()) await page.fill('#cphone', '+380000000000');
  await page.fill('#cp', 'Playwright QA — mocked request, not sent to the real API');
  await page.locator('#cForm button[type=submit]').click();
  await expect(page.locator('#cOk')).toBeVisible({ timeout: 15000 });
  expect(body).toBeTruthy();
  expect(body.name).toBe('QA Test');
  expect(body.contact).toBe('@qa_test');
  expect(body.project).toContain('Playwright QA');
});
