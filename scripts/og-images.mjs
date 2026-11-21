// Open Graph images 1200×630 per page type, in the redesign's visual language (dark + glowing red, Space Grotesk).
// Output: /assets/img/og/<type>.jpg (≤ 300 KB). Usage: node scripts/og-images.mjs
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { startServer } from './lib/design-server.mjs';

const TYPES = {
  home: { label: 'Веб-студія · Харків', title: 'Розробка сайтів <b>під ключ</b>', sub: 'Сайти від $600 · Telegram-боти від $300 · Google Ads · SEO' },
  service: { label: 'Послуги Infinite Union', title: 'Сайти, боти, <b>реклама</b>', sub: 'Під ключ · код і доступи — ваші · Україна та ЄС' },
  pricing: { label: 'Ціни 2026', title: 'Скільки коштує <b>сайт</b>', sub: 'Лендінг від $600 · Магазин від $1 200 · Бот від $300' },
  portfolio: { label: 'Портфоліо', title: 'Сайти та боти, які <b>працюють</b>', sub: 'Transfer Kharkiv · Parrot School · Studentik · Gym4Fit' },
  blog: { label: 'Блог', title: 'Сайти, боти, SEO <b>і реклама</b>', sub: 'Ціни, чек-листи, розбори — без води' },
  en: { label: 'Web agency · Ukraine', title: 'Websites & bots <b>that sell</b>', sub: 'Websites from $600 · Telegram bots from $300 · Ads · SEO' },
};
const html = t => `<!doctype html><html><head><style>
@font-face{font-family:SG;src:url(/assets/fonts/sg-latin.woff2) format('woff2');font-weight:400 700}
@font-face{font-family:JBM;src:url(/assets/fonts/jbm-cyrillic.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491}
@font-face{font-family:JBM;src:url(/assets/fonts/jbm-latin.woff2) format('woff2')}
html,body{margin:0;width:1200px;height:630px;background:#0a0706;color:#EDE8E5;font-family:SG,'Helvetica Neue',Arial,sans-serif;overflow:hidden}
.w{position:relative;width:1200px;height:630px;padding:64px 72px;box-sizing:border-box;background:radial-gradient(70% 90% at 82% 40%,#2a0707 0%,#0a0706 62%)}
.halo{position:absolute;right:-80px;top:40px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(212,0,0,.45),rgba(212,0,0,0) 65%)}
.r1{position:absolute;right:20px;top:95px;width:440px;height:440px;border-radius:50%;border:1px solid rgba(255,59,47,.35)}
.r2{position:absolute;right:80px;top:155px;width:320px;height:320px;border-radius:50%;border:1px dashed rgba(237,232,229,.18)}
.inf{position:absolute;right:150px;top:150px;font-size:300px;line-height:1;color:#ff2a1f;text-shadow:0 0 80px rgba(212,0,0,.8)}
.line{position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,rgba(212,0,0,0),#ff3b2f 30%,#fff 50%,#ff3b2f 70%,rgba(212,0,0,0));box-shadow:0 0 30px 6px rgba(212,0,0,.6)}
.top{display:flex;align-items:center;gap:16px;font:500 16px JBM,monospace;letter-spacing:.22em;text-transform:uppercase}
.top img{width:44px;height:44px;filter:drop-shadow(0 0 14px rgba(212,0,0,.6))}
.lab{position:absolute;left:72px;top:190px;display:flex;align-items:center;gap:14px;font:500 18px JBM,monospace;letter-spacing:.22em;text-transform:uppercase;color:#ff3b2f}
.lab i{width:34px;height:2px;background:#ff3b2f;box-shadow:0 0 10px #D40000}
h1{position:absolute;left:72px;top:230px;margin:0;max-width:760px;font-size:84px;line-height:.92;letter-spacing:-.05em;font-weight:700}
h1 b{color:#ff2a1f;text-shadow:0 0 40px rgba(212,0,0,.6)}
p{position:absolute;left:72px;bottom:64px;margin:0;font:400 20px JBM,monospace;letter-spacing:.04em;color:#C9C0BC}
</style></head><body><div class="w"><div class="halo"></div><div class="r1"></div><div class="r2"></div><div class="inf">∞</div>
<div class="top"><img src="/assets/img/iu-logo.png" alt="">INFINITE UNION</div>
<div class="lab"><i></i>${t.label}</div><h1>${t.title}</h1><p>${t.sub}</p><div class="line"></div></div></body></html>`;

fs.mkdirSync('assets/img/og', { recursive: true });
fs.mkdirSync('.cache/og', { recursive: true });
const srv = await startServer(process.cwd());
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const [k, t] of Object.entries(TYPES)) {
  fs.writeFileSync(`.cache/og/${k}.html`, html(t));
  await page.goto(`http://127.0.0.1:${srv.port}/.cache/og/${k}.html`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: `.cache/og/${k}.png` });
  execFileSync('magick', [`.cache/og/${k}.png`, '-strip', '-quality', '84', '-sampling-factor', '4:2:0', `assets/img/og/${k}.jpg`]);
  console.log(k, fs.statSync(`assets/img/og/${k}.jpg`).size);
}
await b.close(); srv.close();
