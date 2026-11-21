// Tiny static server for the design/ prototypes (Design Components runtime).
// Optionally rewrites the *.dc.html templates on the fly (see transformTemplate).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.ico': 'image/x-icon', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.wasm': 'application/wasm', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.glb': 'model/gltf-binary', '.woff2': 'font/woff2',
};

export function startServer(dir, { transform } = {}) {
  const srv = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x');
    let rel = decodeURIComponent(u.pathname);
    if (rel.endsWith('/')) rel += 'index.html';
    const file = path.join(dir, rel);
    if (!file.startsWith(dir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('404'); return; }
    let body = fs.readFileSync(file);
    if (transform && file.endsWith('.dc.html')) body = Buffer.from(transform(path.basename(file), body.toString('utf8'), u));
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r({ port: srv.address().port, close: () => srv.close() })));
}

// Guards that stop the prototype's own animation/setup code so the DOM is the pure render result.
// mode 'baseline' = only guards (layout exactly as the prototype renders at the current width);
// mode 'ssg'      = guards + width-independent markup (narrow-only / wide-only variants rendered side by side
//                   with data-wide / data-narrow markers; CSS media queries pick the right one).
export function transformTemplate(name, src, mode) {
  let s = src;
  const guard = 'if (window.__SSG) return;';
  s = s.replace(/\n  setup\(\) \{/, `\n  setup() { ${guard}`);
  s = s.replace(/\n  frame\(t(, force)?\) \{/, m => `${m} ${guard}`);
  if (/404/.test(name)) s = s.replace('componentDidMount() {', `componentDidMount() { ${guard}`);
  if (/Home/.test(name)) {
    s = s.replace('setTimeout(tick, 16);\n    setTimeout(() => this.setState({ glbReady: true }), 6500);', 'if (!window.__SSG) { setTimeout(tick, 16); setTimeout(() => this.setState({ glbReady: true }), 6500); }');
    s = s.replace("import('./iu-snake.js').then", "(window.__SSG ? new Promise(() => {}) : import('./iu-snake.js')).then");
  }
  if (/Page/.test(name)) {
    s = s.replace("if (gc && !this.glyph) import(", "if (gc && !this.glyph && !window.__SSG) import(");
    // prototype bug: norm() keeps only the first H2 of a block, so a 'portfolio-grid' with one H2 per project
    // lost half of the projects (EN portfolio: 4 of 8). Every H2 of that block is a project card.
    s = s.replace("if (it.k === 'h') { if (it.level <= 2) { if (!v.h) v.h = it.text; }", "if (it.k === 'h') { if (it.level <= 2 && b.type !== 'portfolio-grid') { if (!v.h) v.h = it.text; }");
    s = s.replace("label: '', h: b.heading || '',", "label: '', h: b.type === 'portfolio-grid' ? '' : (b.heading || ''),");
  }
  if (mode !== 'ssg') return s;

  // ---- width-independent markup ----
  // <sc-if value="{{ wide }}"><tag …>  →  always rendered, tag marked data-wide (hidden < 820px by CSS)
  s = s.replace(/<sc-if value="\{\{ (wide|narrow) \}\}" hint-placeholder-val="\{\{ (?:true|false) \}\}">(\s*)<(\w+)/g,
    (m, w, ws, tag) => `<sc-if value="{{ true }}" hint-placeholder-val="{{ true }}">${ws}<${tag} data-${w}`);
  // Page: back link is wide-only (hasBack = !!back && !narrow) → render when a back link exists
  s = s.replace('<sc-if value="{{ hasBack }}" hint-placeholder-val="{{ false }}"><a ', '<sc-if value="{{ hasBack }}" hint-placeholder-val="{{ false }}"><a data-wide ');
  // Page: nav CTA text on wide, arrow on narrow
  s = s.replace('{{ navCta }}</a>', '<span data-wide>{{ navCta }}</span><span data-narrow>→</span></a>');
  // Home portfolio grid + project bullet lists (pfCols/pfRows/pfUl depend on narrow)
  s = s.replace(/<(\w+)([^>]*?)grid-template-columns:\{\{ pfCols \}\};grid-template-rows:\{\{ pfRows \}\};/,
    '<$1 data-pf-grid$2grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);grid-template-rows:minmax(0,1fr);');
  s = s.replace(/<(\w+)([^>]*?)display:\{\{ pfUl \}\}/g, '<$1 data-pf-ul$2display:grid');
  // Home full-screen menu (closed by default, toggled by motion.js)
  s = s.replace(/<div style="([^"]*?)visibility:\{\{ menuVis \}\};transform:\{\{ menuT \}\};/, '<div id="iu-menu" data-menu style="$1visibility:hidden;transform:translateY(-101%);');
  s = s.replace(/<button ((?:data-narrow )?)onClick="\{\{ toggleMenu \}\}" aria-label="Меню"/, '<button $1data-menu-toggle aria-expanded="false" aria-controls="iu-menu" onClick="{{ toggleMenu }}" aria-label="Меню"');
  s = s.replace(/<button onClick="\{\{ toggleMenu \}\}" aria-label="Закрити меню"/, '<button data-menu-close onClick="{{ toggleMenu }}" aria-label="Закрити меню"');
  s = s.replace(/<a ([^>]*?)onClick="\{\{ closeMenu \}\}"/g, '<a data-menu-link $1onClick="{{ closeMenu }}"');
  // success message of lead forms: always in DOM, hidden until sent
  s = s.replace(/<sc-if value="\{\{ sent \}\}" hint-placeholder-val="\{\{ false \}\}"><div /g, '<sc-if value="{{ true }}" hint-placeholder-val="{{ true }}"><div data-sent role="status" ');
  s = s.replace(/<form ([^>]*?)onSubmit=/g, '<form data-lead $1onSubmit=');
  // Home preloader: hooks for motion.js
  s = s.replace(/<div style="([^"]*?)clip-path:\{\{ loaderClip \}\};/, '<div id="loader" data-loader style="$1clip-path:inset(0 0 0 0);');
  s = s.replace(/<span aria-hidden="true" style="([^"]*?)clip-path:inset\(0 \{\{ loaderInv \}\} 0 0\);/, '<span data-ld-fill aria-hidden="true" style="$1clip-path:inset(0 100% 0 0);');
  s = s.replace(/<div style="([^"]*?)width:\{\{ loaderW \}\};/, '<div data-ld-bar style="$1width:0%;');
  s = s.replace('<span>• {{ loaderStatus }}</span>', '<span>• <span data-ld-st>{{ loaderStatus }}</span></span>');
  s = s.replace('{{ loaderLat }}° N', '<span data-ld-lat>{{ loaderLat }}</span>° N').replace('{{ loaderLon }}° E', '<span data-ld-lon>{{ loaderLon }}</span>° E');
  s = s.replace('{{ loaderPct }}%', '<span data-ld-pct>{{ loaderPct }}</span>%');
  return s;
}
