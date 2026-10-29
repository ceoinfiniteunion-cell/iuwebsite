// Copies only public files into _site/ for GitHub Pages (Actions deploy).
// Keeps internal files (docs, scripts, tests, *.md, package.json, configs) off the public site.
// Usage: node scripts/build-site.mjs
import fs from 'node:fs';
import path from 'node:path';

const OUT = '_site';
const cfg = JSON.parse(fs.readFileSync('scripts/pages.json'));
const pageDirs = new Set(cfg.pages.map(p => p.path.split('/')[1]).filter(Boolean));
const DIRS = new Set(['assets', 'vendor', ...pageDirs]);
const ROOT_FILE = /\.(html|png|ico|jpe?g|svg|webp|avif|xml|txt|json|js|webmanifest)$|^CNAME$/;
const ROOT_DENY = new Set(['package.json', 'package-lock.json', 'eslint.config.js', 'playwright.config.js', 'serve.json']);
const SKIP = new Set(['.DS_Store']);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
let n = 0;
const copyDir = (src, dst) => {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP.has(e.name) || e.name.endsWith('.md')) continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else { fs.copyFileSync(s, d); n++; }
  }
};
for (const e of fs.readdirSync('.', { withFileTypes: true })) {
  if (e.isDirectory() && DIRS.has(e.name)) copyDir(e.name, path.join(OUT, e.name));
  else if (e.isFile() && ROOT_FILE.test(e.name) && !ROOT_DENY.has(e.name) && !e.name.startsWith('.')) {
    fs.copyFileSync(e.name, path.join(OUT, e.name)); n++;
  }
}
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
// Legacy URLs (site used /services/x.html before 2026-07-29): GitHub Pages can't send 301,
// so publish instant meta-refresh stubs — Google treats a 0-second refresh as a permanent redirect.
for (const [from, to] of Object.entries(cfg.redirects || {})) {
  const file = path.join(OUT, from);
  if (fs.existsSync(file)) continue;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const url = cfg.site + to;
  fs.writeFileSync(file, `<!DOCTYPE html>
<html lang="uk"><head><meta charset="UTF-8">
<title>Сторінку переміщено</title>
<link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${to}">
</head><body><p>Сторінку переміщено: <a href="${to}">${url}</a></p></body></html>
`);
  n++;
}
console.log(`build-site: ${n} files → ${OUT}/`);
