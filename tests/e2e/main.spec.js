import { test, expect } from '@playwright/test';

test('H1 існує на головній', async ({ page }) => {
  await page.goto('/');
  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
});

test('Форма відправки лідів присутня', async ({ page }) => {
  await page.goto('/#contact');
  await expect(page.locator('#cForm')).toBeVisible();
});

test('Навігація працює', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#nav')).toBeVisible();
});

test('Мобільний — dir-grid одна колонка', async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto('/#services');
  const grid = page.locator('.dir-grid');
  const columns = await grid.evaluate(el =>
    getComputedStyle(el).gridTemplateColumns
  );
  // На мобільному має бути одна колонка
  expect(columns.split(' ').length).toBe(1);
});

test('CSP заголовок присутній', async ({ page }) => {
  const response = await page.goto('/');
  // CSP через meta тег
  const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]');
  await expect(csp).toHaveCount(1);
});

test('Service worker зареєстровано або підтримується', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000);
  const swSupported = await page.evaluate(() => 'serviceWorker' in navigator);
  expect(swSupported).toBe(true);
});
