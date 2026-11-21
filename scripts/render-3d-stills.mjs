// Pre-renders static frames of the 3D scenes for weak devices / reduced motion (TZ §8.4):
// /assets/img/3d/{snake,snake-m,snake-404,glyph-<kind>}.webp (transparent).
// Needs a built site (node scripts/render-design.mjs) — uses the hashed 3D bundle from assets/3d/.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { startServer } from './lib/design-server.mjs';

const dir = fs.readdirSync('assets/3d').find(d => /^[0-9a-f]{10}$/.test(d));
if (!dir) throw new Error('build the site first');
const OUT = 'assets/img/3d', TMP = '.cache/stills';
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(TMP, { recursive: true });
const site = await startServer(process.cwd());
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const base = `/assets/3d/${dir}/`;

async function render(name, w, h, code) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page.on('console', m => { if (m.type() === 'error') console.log('  console:', m.text().slice(0, 200)); });
  page.on('pageerror', e => console.log('  pageerror:', String(e).slice(0, 200)));
  await page.goto(`http://127.0.0.1:${site.port}/404.html?static=1`);
  await page.evaluate(([w, h]) => { document.documentElement.innerHTML = `<body style="margin:0;background:transparent"><canvas id="c" style="display:block;width:${w}px;height:${h}px"></canvas></body>`; }, [w, h]);
  await page.evaluate(`(${code})(${JSON.stringify(base)})`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
  await page.waitForTimeout(1500);
  const png = `${TMP}/${name}.png`;
  await page.locator('#c').screenshot({ path: png, omitBackground: true });
  const big = name.startsWith('snake') ? [...(w > 1000 ? ['-resize', '1100', '0'] : []), '-q', '62', '-alpha_q', '70'] : ['-q', '80', '-alpha_q', '90'];
  execFileSync('cwebp', ['-quiet', ...big, '-m', '6', png, '-o', `${OUT}/${name}.webp`]);
  // snake frames are LCP candidates: AVIF (preloaded) + WebP fallback, small enough to land before 2 s on 4G
  if (name.startsWith('snake') || name.startsWith('glyph')) execFileSync('magick', [png, ...(w > 1000 ? ['-resize', name === 'snake-404' ? '1000x' : '1100x'] : []), '-strip', '-quality', '50', `${OUT}/${name}.avif`]);
  console.log(name, fs.statSync(`${OUT}/${name}.webp`).size);
  await page.close();
}

const snake = pose => `async b => { const { createScene } = await import(b + 'iu-snake.js'); const sc = createScene(document.getElementById('c'), { mode: 'glb', glb: 'https://res.cloudinary.com/etdq5y69/raw/upload/v1783282631/snake3d.glb', onReady: () => setTimeout(() => { window.__ready = true; }, 800) }); sc.setPose(${JSON.stringify(pose)}); sc.snap(); }`;
const yaw = -80 * Math.PI / 180;
await render('snake', 1440, 900, snake({ x: 1.05, y: .05, z: 0, rx: 0, ry: yaw, rz: 0, s: .98, o: 1 }));
await render('snake-m', 390, 844, snake({ x: 0, y: .62, z: 0, rx: 0, ry: yaw, rz: 0, s: .66, o: 1 }));
await render('snake-404', 1440, 900, snake({ x: .9, y: .1, z: 0, rx: .15, ry: -1.4, rz: .5, s: .9, o: 1 }));
for (const kind of ['google', 'meta', 'instagram', 'tiktok', 'seo', 'pin', 'telegram', 'code', 'coins', 'cubes', 'rings', 'infinity']) {
  await render(`glyph-${kind}`, 720, 680, `async b => { const { createGlyph } = await import(b + 'iu-glyph.js'); createGlyph(document.getElementById('c'), '${kind}'); setTimeout(() => { window.__ready = true; }, 1800); }`);
}
await browser.close(); site.close();
