// E2E for the redesigned site (TZ §6.3, §8.8, §9). Runs against a local static server (playwright.config.js).
import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync('scripts/pages.json', 'utf8'));
const API = 'https://api.infiniteunion.com.ua/lead';
const THIRD = /googletagmanager|google-analytics|doubleclick|googleads|sentry|cloudinary|cloudflareinsights/;

test.beforeEach(async ({ context }) => {
  await context.route(THIRD, r => r.abort()); // never hit analytics / CDNs from tests
});

/* ---------------------------------------------------------------- every page renders */
const SMOKE = process.env.FULL ? cfg.pages.map(p => p.path) : ['/', '/services/websites/', '/services/bots/', '/pricing/', '/portfolio/', '/blog/skilky-koshtuye-sayt-2026/', '/services/privacy/', '/en/', '/en/services/websites/'];
for (const path of SMOKE) {
  test(`renders ${path}`, async ({ page }) => {
    const problems = [];
    page.on('pageerror', e => problems.push('pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_FAILED|net::/.test(m.text())) problems.push('console: ' + m.text()); });
    page.on('response', r => { if (r.status() >= 400 && new URL(r.url()).hostname === 'localhost') problems.push(`${r.status()} ${r.url()}`); });
    const res = await page.goto(path);
    expect(res.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await page.waitForTimeout(800);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow, 'horizontal scroll').toBeLessThanOrEqual(0);
    expect(problems).toEqual([]);
  });
}

test('404 page is served with the design', async ({ page }) => {
  const res = await page.goto('/404.html');
  expect(res.status()).toBeLessThan(500);
  await expect(page.locator('h1')).toContainText('кудись пішла');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

/* ---------------------------------------------------------------- mobile menu */
test('mobile menu opens, closes on Esc and on link click', async ({ page }) => {
  test.skip(page.viewportSize().width >= 820, 'burger is < 820px only (design breakpoint)');
  await page.goto('/?static=1');
  const btn = page.locator('[data-menu-toggle]');
  const menu = page.locator('[data-menu]');
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(menu).toBeVisible();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  expect(await page.evaluate(() => document.documentElement.classList.contains('iu-lock'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await btn.click();
  await menu.locator('a[href="#services"]').click();
  await expect(menu).toBeHidden();
});

/* ---------------------------------------------------------------- lead form */
const FORM_PAGES = ['/', '/services/websites/'];
async function fill(form) {
  await form.locator('[name="cn"]').fill('ТЕСТ — Claude Code, ігнорувати');
  await form.locator('[name="cc"]').fill('@test_user');
  await form.locator('[name="cphone"]').fill('+380 68 000 00 00');
  await form.locator('[name="cp"]').fill('e2e');
}
for (const path of FORM_PAGES) {
  test.describe(`lead form ${path}`, () => {
    test.beforeEach(async ({ page }) => { await page.addInitScript(() => sessionStorage.clear()); });

    test('success: posts JSON once, shows sent state, fires dataLayer + Ads conversion', async ({ page }) => {
      const bodies = [];
      await page.route(API, async r => { bodies.push(r.request().postDataJSON()); await new Promise(x => setTimeout(x, 400)); await r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"lead_id":1}' }); });
      await page.goto(path + '?static=1');
      await page.evaluate(() => { window.__conv = []; window.gtag = (...a) => window.__conv.push(a); });
      const form = page.locator('form[data-lead]').first();
      await form.scrollIntoViewIfNeeded();
      await fill(form);
      const btn = form.locator('button[type="submit"]');
      await btn.dblclick();
      await expect(btn).toBeDisabled();
      await expect(form.locator('[data-sent]')).toBeVisible();
      expect(bodies).toHaveLength(1);
      const b = bodies[0];
      expect(b).toMatchObject({ name: 'ТЕСТ — Claude Code, ігнорувати', contact: '@test_user', phone: '+380 68 000 00 00', project: 'e2e' });
      for (const k of ['project_type', 'budget', 'deadline', 'idempotency_key']) expect(b).toHaveProperty(k);
      expect(b.idempotency_key.length).toBeGreaterThan(10);
      expect(await page.evaluate(() => window.dataLayer.some(e => e.event === 'form_success'))).toBe(true);
      expect(await page.evaluate(() => window.__conv.some(a => a[0] === 'event' && a[1] === 'conversion' && a[2].send_to === 'AW-18360841103/YwDACNqs1tocEI_nkLNE'))).toBe(true);
    });

    test('server error: toast with Telegram link, button re-enabled', async ({ page }) => {
      await page.route(API, r => r.fulfill({ status: 500, body: '{}' }));
      await page.goto(path + '?static=1');
      const form = page.locator('form[data-lead]').first();
      await fill(form);
      await form.locator('button[type="submit"]').click();
      const toast = page.locator('#iu-toast');
      await expect(toast).toBeVisible();
      await expect(toast.locator('a[href*="t.me"]')).toHaveCount(1);
      await expect(form.locator('button[type="submit"]')).toBeEnabled();
      await expect(form.locator('[data-sent]')).toBeHidden();
    });

    test('timeout after 10 s: toast', async ({ page }) => {
      test.setTimeout(40000);
      await page.route(API, () => { /* never answers */ });
      await page.goto(path + '?static=1');
      const form = page.locator('form[data-lead]').first();
      await fill(form);
      await form.locator('button[type="submit"]').click();
      await expect(page.locator('#iu-toast')).toBeVisible({ timeout: 15000 });
      await expect(page.locator('#iu-toast')).toContainText(/вчасно|in time/);
    });

    test('validation + honeypot: no request', async ({ page }) => {
      let calls = 0;
      await page.route(API, r => { calls++; r.fulfill({ status: 200, body: '{}' }); });
      await page.goto(path + '?static=1');
      const form = page.locator('form[data-lead]').first();
      await form.locator('button[type="submit"]').click();
      await expect(form.locator('[name="cn"]')).toHaveAttribute('aria-invalid', 'true');
      await expect(form.locator('.iu-err').first()).toBeVisible();
      await fill(form);
      await form.locator('[name="cc"]').fill('???');
      await form.locator('button[type="submit"]').click();
      await expect(form.locator('[name="cc"]')).toHaveAttribute('aria-invalid', 'true');
      await form.locator('[name="cc"]').fill('@test_user');
      await form.locator('[name="website"]').evaluate(el => { el.value = 'spam'; });
      await form.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);
      expect(calls).toBe(0);
    });
  });
}

/* ---------------------------------------------------------------- accessibility & motion preferences */
test('reduced motion: no veil, content visible, no reveal masks', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  await ctx.route(THIRD, r => r.abort());
  const page = await ctx.newPage();
  await page.goto('/services/websites/');
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter(e => e.style.clipPath.includes('100%')).length)).toBe(0);
  await expect(page.locator('#veil')).toBeHidden();
  await ctx.close();
});

test('skip link moves focus to main', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard');
  await page.goto('/services/websites/?static=1');
  await page.keyboard.press('Tab');
  await expect(page.locator('.iu-skip')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

/* ---------------------------------------------------------------- service worker: old design → new */
test('new service worker drops the old caches', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'SW lifecycle checked in Chromium');
  await page.goto('/404.html?static=1');
  await page.evaluate(async () => { const c = await caches.open('iu-1793311479325'); await c.put('/assets/css/main.css', new Response('old')); });
  await page.goto('/');
  await page.waitForFunction(async () => (await navigator.serviceWorker.getRegistration())?.active?.state === 'activated', null, { timeout: 20000 });
  await page.waitForFunction(async () => !(await caches.keys()).includes('iu-1793311479325'), null, { timeout: 10000 });
  const keys = await page.evaluate(() => caches.keys());
  expect(keys.every(k => k.startsWith('iu-r2026-'))).toBe(true);
});
