// Markdown tables for REDESIGN_REPORT.md: pages × (title, H1, Lighthouse, design diff) and SEO before/after.
// Inputs: scripts/data/seo-before.json, .cache/lh/summary.json, .cache/visual/summary.json, built pages.
import fs from 'node:fs';
import { parse } from 'node-html-parser';

const cfg = JSON.parse(fs.readFileSync('scripts/pages.json', 'utf8'));
const before = JSON.parse(fs.readFileSync('scripts/data/seo-before.json', 'utf8'));
const lh = fs.existsSync('.cache/lh/summary.json') ? JSON.parse(fs.readFileSync('.cache/lh/summary.json', 'utf8')) : [];
const vis = fs.existsSync('.cache/visual/summary.json') ? JSON.parse(fs.readFileSync('.cache/visual/summary.json', 'utf8')) : [];
const keyOf = p => (p === '/' ? 'home' : p === '/en/' ? 'en__home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '__'));
const fileOf = p => (p === '/' ? 'index.html' : p.slice(1) + 'index.html');
const cell = s => String(s ?? '—').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
const TEMPLATE = p => (p === '/' ? '/' : p === '/en/' || p.startsWith('/en/') && p.split('/').length <= 3 ? '/en/' : p === '/pricing/' || p === '/en/pricing/' ? '/pricing/'
  : /portfolio/.test(p) ? '/portfolio/' : /^\/blog\/.+/.test(p) ? '/blog/skilky-koshtuye-sayt-2026/' : '/services/websites/');

function now(p) {
  const r = parse(fs.readFileSync(fileOf(p), 'utf8'));
  r.querySelectorAll('script,style,noscript').forEach(e => e.remove());
  const main = r.querySelector('main');
  return {
    title: r.querySelector('title')?.text.trim(), description: r.querySelector('meta[name=description]')?.getAttribute('content'),
    h1: r.querySelectorAll('h1').map(h => h.text.replace(/\s+/g, ' ').trim()).join(' | '), h2: main ? main.querySelectorAll('h2').length : 0,
    words: (r.querySelector('body')?.text || '').split(/\s+/).filter(w => /[\p{L}\d]/u.test(w)).length,
  };
}
const norm = s => (s || '').toLowerCase().replace(/[-–—:,.]/g, ' ').replace(/telegram/g, 'телеграм').replace(/\s+/g, ' ');
const has = (s, k) => norm(s).includes(norm(k));

let out = '### Страницы: title, H1, Lighthouse (шаблон), отличие от дизайна\n\n';
out += '| URL | title | H1 | LH mobile / desktop (шаблон) | LCP m | CLS m | макс. % отличия от дизайна (7 ширин) |\n|---|---|---|---|---|---|---|\n';
for (const p of [...cfg.pages.map(x => x.path), '/404.html']) {
  const n = p === '/404.html' ? (() => { const r = parse(fs.readFileSync('404.html', 'utf8')); return { title: r.querySelector('title')?.text, h1: r.querySelector('h1')?.text.replace(/\s+/g, ' ').trim() }; })() : now(p);
  const tpl = p === '/404.html' ? '/404.html' : TEMPLATE(p);
  const m = lh.find(r => r.form === 'mobile' && r.path === tpl), d = lh.find(r => r.form === 'desktop' && r.path === tpl);
  const v = vis.filter(r => r.key === (p === '/404.html' ? '404' : keyOf(p)));
  const vmax = v.length ? Math.max(...v.map(r => r.pct)) : null;
  out += `| ${p} | ${cell(n.title)} | ${cell(n.h1)} | ${m ? `${m.perf} / ${d ? d.perf : '—'}${tpl === p ? '' : ` (${tpl})`}` : '—'} | ${m ? m.lcp + ' s' : '—'} | ${m ? m.cls : '—'} | ${vmax === null ? '—' : vmax + ' %'} |\n`;
}
out += '\n### SEO до / после\n\n| URL | ключ (SEO_KEYWORDS) | title до → после | H1 до → после | слов до → после | ключ в title / H1 после |\n|---|---|---|---|---|---|\n';
for (const p of cfg.pages) {
  const b = before[p.path] || {}, n = now(p.path);
  const key = p.keyword || '';
  const stem = key.split(' ').slice(0, 2).join(' ');
  out += `| ${p.path} | ${cell(key)} | ${b.title === n.title ? 'без изменений' : `${cell(b.title)} → ${cell(n.title)}`} | ${cell(b.h1)} → ${cell(n.h1)} | ${b.words} → ${n.words} | ${has(n.title, stem) ? '✓' : '✗'} / ${has(n.h1, stem) ? '✓' : '✗'} |\n`;
}
fs.writeFileSync('.cache/report-tables.md', out);
console.log(out.length, 'chars → .cache/report-tables.md');
