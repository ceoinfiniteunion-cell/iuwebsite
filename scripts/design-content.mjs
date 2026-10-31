// Extracts the current production copy of every page into design-content/*.json
// and DESIGN_BRIEF.md (handoff for the redesign). Text is taken verbatim from the HTML.
// Usage: node scripts/design-content.mjs
import fs from 'node:fs';
import { parse } from 'node-html-parser';

const cfg = JSON.parse(fs.readFileSync(new URL('./pages.json', import.meta.url)));
const SITE = cfg.site;
const fileOf = p => (p.path === '/' ? 'index.html' : p.path.slice(1) + 'index.html');
const OUT = 'design-content';

const SKIP = new Set(['script', 'style', 'svg', 'noscript', 'canvas', 'iframe', 'template', 'link', 'meta', 'video', 'audio']);
const INLINE = new Set(['span', 'em', 'strong', 'b', 'i', 'u', 'small', 'br', 'sup', 'sub', 'mark', 'code', 'abbr', 'time', 's', 'del', 'ins', 'q', 'cite', 'wbr']);
const BLOCKISH = new Set(['div', 'p', 'section', 'article', 'header', 'footer', 'main', 'aside', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'form', 'fieldset', 'figure', 'figcaption', 'blockquote', 'dl', 'dt', 'dd', 'nav', 'details', 'summary', 'label', 'button', 'select', 'option', 'textarea']);

const clean = s => s.replace(/ /g, ' ').replace(/[ \t\r\n]+/g, ' ').trim();
const tag = el => (el.tagName || '').toLowerCase();
const cls = el => (el.getAttribute?.('class') || '');
const words = s => (s.match(/[\p{L}\p{N}][\p{L}\p{N}'’\-.$%/+]*/gu) || []).length;

const NAMED = { times: '×', mdash: '—', ndash: '–', rarr: '→', larr: '←', hellip: '…', laquo: '«', raquo: '»', copy: '©', middot: '·', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', bull: '•', deg: '°', prime: '′', check: '✓', minus: '−', plus: '+' };
function decode(s) {
  return s.replace(/&(times|mdash|ndash|rarr|larr|hellip|laquo|raquo|copy|middot|rsquo|lsquo|ldquo|rdquo|bull|deg|prime|check|minus);/g, (_, n) => NAMED[n]).replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

// Visible text of a node, with spaces between block-level children.
function textOf(node) {
  if (node.nodeType === 3) return decode(node.rawText);
  if (node.nodeType !== 1) return '';
  const t = tag(node);
  if (SKIP.has(t)) return '';
  if (t === 'br') return ' ';
  const inner = node.childNodes.map(textOf).join('');
  return BLOCKISH.has(t) ? ` ${inner} ` : inner;
}
const txt = node => clean(textOf(node));

function onlyInline(el) {
  return el.childNodes.every(n => n.nodeType !== 1 || INLINE.has(tag(n)) || SKIP.has(tag(n)) ||
    (tag(n) === 'a' && onlyInline(n)));
}

function resolve(href, pagePath) {
  if (!href) return null;
  if (/^(tel|mailto|viber|javascript):/i.test(href)) return href;
  try {
    const u = new URL(href, SITE + pagePath);
    if (u.origin === SITE) return u.pathname + u.search + u.hash;
    return u.href;
  } catch { return href; }
}
const isInternal = h => h && (h.startsWith('/') || h.startsWith('#'));

// ---------- walker: element -> ordered list of content items ----------
function walk(el, ctx, items) {
  if (el.nodeType === 3) {
    const t = clean(decode(el.rawText));
    if (t) items.push({ k: 'text', text: t });
    return;
  }
  if (el.nodeType !== 1) return;
  const t = tag(el);
  if (SKIP.has(t)) return;
  const hidden = el.getAttribute('aria-hidden') === 'true';
  if (hidden) {
    const s = txt(el);
    if (s) items.push({ k: 'decor', text: s });
    return;
  }
  if (/\bfaq-item\b/.test(cls(el))) {
    const q = el.querySelector('.faq-q'), a = el.querySelector('.faq-a');
    if (q && a) {
      collectLinks(a, ctx);
      items.push({ k: 'faq', q: txt(q).replace(/\s*[+×−-]\s*$/, ''), a: txt(a) });
      return;
    }
  }
  if (/^h[1-6]$/.test(t)) {
    collectLinks(el, ctx);
    const s = txt(el);
    if (s) items.push({ k: 'h', level: +t[1], text: s });
    return;
  }
  if (t === 'ul' || t === 'ol') {
    const lis = el.childNodes.filter(n => tag(n) === 'li');
    const complex = lis.some(li => li.querySelector('h1,h2,h3,h4,h5,h6,p,ul,ol') || li.querySelectorAll('div').length > 1);
    if (!complex) {
      collectLinks(el, ctx);
      const list = lis.map(li => {
        const a = li.childNodes.find(n => tag(n) === 'a');
        const s = txt(li);
        return a && txt(a) === s ? { text: s, href: resolve(a.getAttribute('href'), ctx.path) } : s;
      }).filter(Boolean);
      if (list.length) items.push({ k: 'list', ordered: t === 'ol', items: list });
      return;
    }
  }
  if (t === 'table') {
    const rows = el.querySelectorAll('tr').map(tr => tr.querySelectorAll('th,td').map(txt));
    collectLinks(el, ctx);
    if (rows.length) items.push({ k: 'table', rows });
    return;
  }
  if (t === 'img') {
    items.push({ k: 'img', src: resolve(el.getAttribute('src'), ctx.path), alt: el.getAttribute('alt') || '' });
    return;
  }
  if (t === 'input' || t === 'textarea' || t === 'select') {
    const type = t === 'input' ? (el.getAttribute('type') || 'text') : t;
    if (type === 'hidden') return;
    const id = el.getAttribute('id');
    const label = id ? ctx.root.querySelector(`label[for="${id}"]`) : null;
    items.push({
      k: 'field', type, name: el.getAttribute('name') || id || '',
      label: label ? txt(label) : '', placeholder: el.getAttribute('placeholder') || '',
      required: el.hasAttribute('required'),
      ...(t === 'select' ? { options: el.querySelectorAll('option').map(o => ({ label: txt(o), value: o.getAttribute('value') ?? txt(o) })) } : {}),
    });
    return;
  }
  if (t === 'label' && el.getAttribute('for')) return; // read together with its field
  if (t === 'button') {
    const s = txt(el) || el.getAttribute('aria-label') || '';
    if (s) items.push({ k: 'button', text: s, ...(el.getAttribute('type') ? { type: el.getAttribute('type') } : {}) });
    return;
  }
  if (t === 'a') {
    const href = resolve(el.getAttribute('href'), ctx.path);
    const s = txt(el) || el.getAttribute('aria-label') || '';
    const block = el.querySelector('h1,h2,h3,h4,h5,h6,p,div,ul,img');
    if (block) {
      const sub = [];
      el.childNodes.forEach(n => walk(n, ctx, sub));
      items.push({ k: 'card-link', href, items: sub });
    } else if (s) {
      items.push({ k: 'link', text: s, href });
    }
    addLink(ctx, s, href, !!block);
    return;
  }
  const kids = el.childNodes.filter(n => n.nodeType === 1 && !SKIP.has(tag(n)));
  if (kids.length >= 2 && onlyInline(el) && el.childNodes.every(n => n.nodeType !== 3 || !clean(n.rawText)) &&
      kids.every(n => tag(n) === 'span')) {
    collectLinks(el, ctx);
    const joined = kids.map(txt).filter(Boolean).join(' · ');
    if (joined) items.push({ k: 'text', text: joined, role: (cls(el).split(/\s+/)[0] || 'chips') });
    return;
  }
  const linkRow = t !== 'p' && kids.filter(n => tag(n) === 'a').length >= 2 && el.childNodes.every(n => n.nodeType !== 3 || !clean(n.rawText));
  if (t === 'p' || t === 'blockquote' || t === 'figcaption' || t === 'dt' || t === 'dd' || (!linkRow && onlyInline(el) && txt(el))) {
    collectLinks(el, ctx);
    const s = txt(el);
    if (s) items.push({ k: 'text', text: s, ...(t !== 'p' && cls(el) ? { role: cls(el).split(/\s+/)[0] } : {}) });
    return;
  }
  el.childNodes.forEach(n => walk(n, ctx, items));
}

function addLink(ctx, text, href, card = false) {
  if (!href || href.startsWith('javascript:')) return;
  ctx.links.push({ text: clean(text || ''), href, block: ctx.block, ...(card ? { card: true } : {}) });
}
function collectLinks(el, ctx) {
  for (const a of el.querySelectorAll('a')) addLink(ctx, txt(a) || a.getAttribute('aria-label'), resolve(a.getAttribute('href'), ctx.path));
}

// Collapse a marquee/ticker repeated for the loop animation.
function dedupe(items) {
  const out = [];
  const seen = new Set();
  for (const it of items) {
    const key = JSON.stringify(it);
    if ((it.k === 'decor' || it.k === 'text') && seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

// ---------- pricing tiers ----------
const PRICE_RE = /(\$\s?\d|\d\s?\$|від\s*\$|from\s*\$|безкоштовно|free)/i;
const TERM_RE = /(\d+\s*[–-]?\s*\d*\s*(дн|тиж|міс|day|week|month)|до \d+ (дн|тиж)|up to \d+|~\s?\d+\s*(тиж|week|дн|day))/i;
function tiers(el) {
  const priceEls = el.querySelectorAll('[class*="price"]')
    .filter(p => !/note|old|desc|label/.test(cls(p)) && PRICE_RE.test(txt(p)))
    .filter(p => !p.querySelector('[class*="price"]'))
    .filter(p => { for (let a = p.parentNode; a && a !== el; a = a.parentNode) if (tag(a) === 'table') return false; return true; });
  if (priceEls.length < 2) return [];
  const cards = [];
  for (const p of priceEls) {
    let card = p;
    while (card.parentNode && card.parentNode !== el &&
      card.parentNode.querySelectorAll('[class*="price"]').filter(x => priceEls.includes(x)).length < 2) card = card.parentNode;
    if (cards.includes(card)) continue;
    cards.push(card);
  }
  if (cards.length < 2) return [];
  return cards.map(card => {
    const p = priceEls.find(x => card === x || card.querySelectorAll('*').includes(x));
    const nameEl = card.querySelector('h2,h3,h4,h5,[class*="name"],[class*="title"],[class*="tier"],[class*="plan"]');
    const leaves = card.querySelectorAll('*').filter(e => !e.querySelector('*') || onlyInline(e)).map(txt).filter(Boolean);
    const priceText = p ? txt(p) : '';
    const term = leaves.find(s => s !== priceText && TERM_RE.test(s) && s.length < 80 && !/підтрим|support/i.test(s)) || '';
    const note = card.querySelector('[class*="note"]');
    const label = card.querySelector('[class*="badge"],[class*="tag"],[class*="label"]');
    return {
      name: nameEl ? txt(nameEl) : '',
      ...(label && txt(label) !== (nameEl && txt(nameEl)) ? { badge: txt(label) } : {}),
      price: priceText,
      ...(note ? { priceNote: txt(note) } : {}),
      term,
      includes: card.querySelectorAll('li').map(txt).filter(Boolean),
      ...(card.querySelector('p') ? { text: card.querySelectorAll('p').map(txt).filter(Boolean) } : {}),
      cta: card.querySelectorAll('a,button').map(a => ({ text: txt(a), href: tag(a) === 'a' ? a.getAttribute('href') : null })).filter(x => x.text),
    };
  });
}

// ---------- block typing ----------
const PROJECTS = ['Transfer Kharkiv', 'Respect Car', 'Parrot School', 'KNEU', 'BizBot', 'InfinityCreo', 'Ad Tracker', 'IU Bot'];
function blockType(el, items, tierList, pageType, idx) {
  const c = (cls(el) + ' ' + (el.getAttribute('id') || '')).toLowerCase();
  const t = tag(el);
  const flat = JSON.stringify(items);
  if (items.some(i => i.k === 'faq')) return 'faq';
  if (/hero/.test(c) || (idx === 0 && t === 'header')) return 'hero';
  if (/(^|[\s_-])mob(ile)?([\s_-]|$)/.test(` ${c} `) && /cta/.test(c)) return 'mobile-cta';
  const eyebrow = ((items.find(i => /label/.test(i.role || '')) || {}).text || '').toLowerCase();
  if (eyebrow && !/(^|\s)(hero|faq)/.test(c)) {
    if (/задача|проблем|problem|втрачаються|leak|не так|з чим до нас|коли потрібен|навіщо|when you need/.test(eyebrow)) return 'problem';
    if (/не входить|not included/.test(eyebrow)) return 'not-included';
    if (/що входить|included|що ми робимо|що робимо|що ми будуємо|what we (do|build)|що перевіряємо|what we check/.test(eyebrow)) return 'included-cards';
    if (/етапи|процес|how we work|як ми працюємо|process/.test(eyebrow)) return 'process';
    if (/портфол|portfolio|кейс/.test(eyebrow)) return 'portfolio';
    if (/related|суміжні|напрями|інші канали|other channels/.test(eyebrow)) return 'related-services';
    if (/стек|technolog|технолог|інтеграції|integrations/.test(eyebrow)) return 'tech-stack';
    if (/типи|формати|types|formats|який сайт/.test(eyebrow)) return 'types';
    if (/умови|how we estimate|чому студія|why/.test(eyebrow)) return 'why-us';
  }
  if (el.getAttribute('id') === 'mob' || /(^| )mob( |$)/.test(cls(el))) return 'mobile-menu';
  if (el.querySelector('form') || el.querySelector('input,textarea')) return /contact|cta/.test(c) ? 'cta-form' : 'form';
  if (/contact|cta/.test(c)) return 'cta';
  if (/marquee|ticker/.test(c)) return 'marquee';
  if (tierList.length >= 2) return 'pricing-tiers';
  const label = items.slice(0, 4).filter(i => (i.k === 'h' && i.level <= 2 && i.text.length < 60) || /label/.test(i.role || '')).map(i => i.text).join(' ');
  if (/(^|[^\p{L}])(ціна|ціни|ціну|вартість|тариф\p{L}*|прайс|prices?|pricing|cost)([^\p{L}]|$)/iu.test(label)) return items.some(i => i.k === 'table') ? 'pricing-table' : 'pricing-cards';
  if (el.querySelector('.process-item,.process-step,.pstep,[class*="process"],[class*="step"]') || /process|steps|flow|pipeline|how/.test(c)) return 'process';
  if (/stats|results|benefits|numbers/.test(c)) return 'stats';
  if (/related/.test(c)) return 'related-posts';
  if (/filter/.test(c)) return 'filters';
  if (pageType === 'portfolio' && /grid/.test(c)) return 'portfolio-grid';
  if (pageType === 'blog' && /posts/.test(c)) return 'posts-list';
  if (PROJECTS.filter(n => flat.includes(n)).length >= 2) return 'portfolio';
  if (items.some(i => i.k === 'table')) return 'table';
  if (/\bvs\b|compare|comparison/.test(c)) return 'comparison';
  const cards = items.filter(i => i.k === 'h' && i.level >= 3).length + items.filter(i => i.k === 'card-link').length;
  if (cards >= 3) return 'cards';
  return 'content';
}

const firstHeading = items => {
  for (const it of items) {
    if (it.k === 'h' && it.level <= 3) return it;
    if (it.k === 'card-link') continue;
  }
  return null;
};

// Top-level blocks of the content region. Wrappers (<main>, the home mobile shell) are expanded.
function topBlocks(root) {
  const out = [];
  const add = (el, viewport) => {
    const t = tag(el);
    if (SKIP.has(t) || /\btoast\b/.test(cls(el))) return;
    const kids = el.childNodes.filter(n => n.nodeType === 1 && !SKIP.has(tag(n)));
    const mob = /(^|[\s_-])mob(ile)?([\s_-]|$)/.test(` ${cls(el)} ${el.getAttribute('id') || ''} `);
    if (t === 'main' && kids.length >= 2) kids.forEach(k => add(k, viewport));
    else out.push({ el, viewport: mob ? 'mobile' : viewport });
  };
  root.childNodes.filter(n => n.nodeType === 1).forEach(n => add(n, 'all'));
  return out;
}

// ---------- page ----------
function region(html, a, b) {
  const s = html.indexOf(a), e = html.indexOf(b);
  return s >= 0 && e > s ? html.slice(s + a.length, e) : null;
}

function rootVars(html) {
  const out = {};
  const css = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="\/?(assets\/css\/[^"]+\.css)"/g)]
    .map(m => m[1]).filter(f => !f.includes('site-shared') && fs.existsSync(f)).map(f => fs.readFileSync(f, 'utf8'));
  for (const m of [...css, html].join('\n').matchAll(/:root\s*\{([^}]*)\}/g)) {
    for (const d of m[1].split(';')) {
      const i = d.indexOf(':');
      if (i > 0) out[d.slice(0, i).trim()] = d.slice(i + 1).trim();
    }
  }
  return out;
}

function template(p) {
  if (p.type === 'service') return p.parent ? 'cluster' : 'service';
  return { home: 'home', pricing: 'pricing', portfolio: 'portfolio', blog: 'blog-list', post: 'blog-post', legal: 'privacy', tool: 'constructor', notfound: '404' }[p.type] || p.type;
}

function extract(p, html, kw) {
  const path = p.path;
  const content = region(html, '<!-- iu:content -->', '<!-- /iu:content -->')
    ?? html.slice(html.indexOf('<body'), html.lastIndexOf('</body>'));
  const root = parse(content);
  const ctx = { path, root, links: [], block: 0 };

  const blocks = [];
  topBlocks(root).forEach(({ el, viewport }, i) => {
    ctx.block = blocks.length + 1;
    let items = [];
    walk(el, ctx, items);
    items = dedupe(items);
    if (!items.length) return;
    const tierList = tiers(el);
    const type = blockType(el, items, tierList, p.type, i);
    const head = firstHeading(items);
    const b = {
      n: blocks.length + 1, type, viewport, tag: tag(el),
      ...(el.getAttribute('id') ? { id: el.getAttribute('id') } : {}),
      ...(cls(el) ? { class: cls(el) } : {}),
      heading: head ? head.text : '',
      items,
      ...(tierList.length >= 2 ? { tiers: tierList } : {}),
    };
    // Blog article: split into sections by H2 so the designer sees the structure.
    if (type !== 'faq' && tag(el) === 'article') {
      let cur = { ...b, type: 'article-intro', heading: '', items: [] };
      const parts = [cur];
      for (const it of items) {
        if (it.k === 'h' && it.level === 2) { cur = { ...b, type: 'article-section', heading: it.text, items: [] }; parts.push(cur); }
        cur.items.push(it);
      }
      parts.filter(x => x.items.length).forEach(x => blocks.push({ ...x, n: blocks.length + 1, tiers: undefined }));
      return;
    }
    blocks.push(b);
  });

  // Chrome: nav + mobile menu + preloader (everything in <body> before the content marker).
  const bodyStart = html.search(/<body[\s>]/);
  const cStart = html.indexOf('<!-- iu:content -->');
  const chromeItems = [];
  if (cStart > bodyStart) {
    const chromeRoot = parse(html.slice(html.indexOf('>', bodyStart) + 1, cStart));
    const cctx = { path, root: chromeRoot, links: [], block: 0 };
    chromeRoot.childNodes.forEach(n => walk(n, cctx, chromeItems));
  }

  const footer = region(html, '<!-- iu:footer -->', '<!-- /iu:footer -->');
  const crumbs = footer ? parse(footer).querySelectorAll('.iu-crumbs li').map(li => {
    const a = li.querySelector('a');
    return { name: txt(li), url: a ? a.getAttribute('href') : path };
  }) : [];

  const faq = blocks.flatMap(b => b.items.filter(i => i.k === 'faq').map(({ q, a }) => ({ q, a })));
  const allTiers = blocks.flatMap(b => (b.tiers || []).map(t => ({ block: b.n, section: b.heading, ...t })));
  const h1 = blocks.flatMap(b => b.items).find(i => i.k === 'h' && i.level === 1)?.text
    || parse(html).querySelector('h1')?.text && clean(parse(html).querySelector('h1').text) || '';

  const internal = ctx.links.filter(l => isInternal(l.href));
  const external = ctx.links.filter(l => !isInternal(l.href));

  let wc = 0;
  const count = it => {
    if (it.k === 'list') it.items.forEach(x => (wc += words(typeof x === 'string' ? x : x.text)));
    else if (it.k === 'table') it.rows.flat().forEach(x => (wc += words(x)));
    else if (it.k === 'faq') wc += words(it.q) + words(it.a);
    else if (it.k === 'card-link') it.items.forEach(count);
    else if (it.k === 'field') wc += words([it.label, it.placeholder, ...(it.options || []).map(o => o.label)].join(' '));
    else if (it.text) wc += words(it.text);
  };
  blocks.forEach(b => b.items.forEach(count));

  return {
    url: SITE + path, path, file: fileOf(p), lang: p.lang,
    alt: p.alt ? { lang: p.lang === 'uk' ? 'en' : 'uk', path: p.alt, url: SITE + p.alt } : null,
    template: template(p), registryType: p.type, ...(p.parent ? { parent: p.parent } : {}),
    name: p.name, title: p.title, description: p.description,
    keyword: kw.main.get(path) || p.keyword || '',
    ...(kw.secondary.get(path) ? { secondaryKeywords: kw.secondary.get(path) } : {}),
    ...(p.price ? { priceFrom: p.price } : {}),
    robots: p.noindex ? 'noindex, follow' : 'index, follow',
    h1, breadcrumbs: crumbs,
    theme: rootVars(html),
    words: wc,
    chrome: chromeItems,
    blocks, tiers: allTiers, faq,
    internalLinks: internal, externalLinks: external,
  };
}

// ---------- keywords ----------
function keywords() {
  const md = fs.readFileSync('SEO_KEYWORDS.md', 'utf8');
  const main = new Map(), secondary = new Map();
  for (const m of md.matchAll(/^\| `([^`]+)` \| \w+ \| \*\*([^*]+)\*\* \|/gm)) main.set(m[1], m[2].trim());
  for (const m of md.matchAll(/^\*\*[^*]+\*\* → `([^`]+)`: (.+)$/gm)) secondary.set(m[1], m[2].replace(/\.$/, '').trim());
  return { main, secondary };
}

// ---------- markdown ----------
const esc = s => String(s ?? '').replace(/\|/g, '\\|');
const linkMd = (text, href) => `«${text}» → \`${href}\``;
function itemMd(it, depth = 0) {
  const pad = '  '.repeat(depth);
  switch (it.k) {
    case 'h': return `${pad}- **H${it.level}:** ${it.text}`;
    case 'text': return `${pad}- ${it.role ? `_[${it.role}]_ ` : ''}${it.text}`;
    case 'decor': return `${pad}- _[декор, aria-hidden]_ ${it.text}`;
    case 'list': return `${pad}- Список${it.ordered ? ' (нумерований)' : ''}:\n` + it.items.map(x => `${pad}  - ${typeof x === 'string' ? x : linkMd(x.text, x.href)}`).join('\n');
    case 'link': return `${pad}- Посилання/кнопка: ${linkMd(it.text, it.href)}`;
    case 'button': return `${pad}- Кнопка: «${it.text}»`;
    case 'img': return `${pad}- Зображення: \`${it.src}\` (alt: «${it.alt}»)`;
    case 'field': return `${pad}- Поле форми: ${it.type}${it.name ? ` \`${it.name}\`` : ''}${it.label ? ` · label «${it.label}»` : ''}${it.placeholder ? ` · placeholder «${it.placeholder}»` : ''}${it.required ? ' · обов\'язкове' : ''}` +
      (it.options ? '\n' + it.options.map(o => `${pad}  - «${o.label}»${o.value !== o.label ? ` (value: ${o.value})` : ''}`).join('\n') : '');
    case 'faq': return `${pad}- **Q:** ${it.q}\n${pad}  **A:** ${it.a}`;
    case 'table': return `${pad}- Таблиця:\n\n` + tableMd(it.rows, pad + '  ') + '\n';
    case 'card-link': return `${pad}- Картка-посилання → \`${it.href}\`:\n` + it.items.map(x => itemMd(x, depth + 1)).join('\n');
    default: return '';
  }
}
function tableMd(rows, pad = '') {
  const w = Math.max(...rows.map(r => r.length));
  const norm = rows.map(r => [...r, ...Array(w - r.length).fill('')]);
  return [norm[0], Array(w).fill('---'), ...norm.slice(1)].map(r => `${pad}| ${r.map(esc).join(' | ')} |`).join('\n');
}

function pageMd(d) {
  const L = [];
  L.push(`### ${d.path} — ${d.name}`, '');
  L.push(`| Поле | Значення |`, `|---|---|`);
  L.push(`| URL | ${d.url} |`, `| Мова | ${d.lang} |`, `| Пара | ${d.alt ? `${d.alt.lang}: \`${d.alt.path}\`` : '— (немає)'} |`);
  L.push(`| Шаблон | **${d.template}**${d.parent ? ` (батьківська: \`${d.parent}\`)` : ''} |`, `| Robots | ${d.robots} |`);
  L.push(`| Title (${d.title.length}) | ${esc(d.title)} |`, `| Description (${d.description.length}) | ${esc(d.description)} |`);
  L.push(`| Головний ключ | ${esc(d.keyword)} |`);
  if (d.secondaryKeywords) L.push(`| Вторинні ключі | ${esc(d.secondaryKeywords)} |`);
  L.push(`| H1 | ${esc(d.h1)} |`, `| Слів | ${d.words} |`, `| JSON | \`${OUT}/${slug(d.path)}.json\` |`, '');
  L.push(`**Хлібні крихти:** ${d.breadcrumbs.length ? d.breadcrumbs.map(c => c.url === d.path ? c.name : `${c.name} (\`${c.url}\`)`).join(' › ') : '— (не показуються)'}`, '');
  L.push(`#### Блоки (${d.blocks.length})`, '');
  for (const b of d.blocks) {
    L.push(`**${b.n}. ${b.type}**${b.heading ? ` — ${b.heading}` : ''}${b.viewport === 'mobile' ? ' · _тільки мобільна версія_' : ''} · \`<${b.tag}${b.id ? `#${b.id}` : ''}${b.class ? ` .${b.class.split(/\s+/).join('.')}` : ''}>\``, '');
    L.push(b.items.map(x => itemMd(x)).join('\n'), '');
    if (b.tiers) {
      L.push(`Тарифи блоку:`, '', '| Тариф | Ціна | Строк | Що входить |', '|---|---|---|---|');
      for (const t of b.tiers) L.push(`| ${esc(t.name)}${t.badge ? ` _(${esc(t.badge)})_` : ''} | ${esc(t.price)}${t.priceNote ? ` · ${esc(t.priceNote)}` : ''} | ${esc(t.term) || '—'} | ${t.includes.map(esc).join('; ') || (t.text || []).map(esc).join(' ') || '—'} |`);
      L.push('');
    }
  }
  if (d.faq.length) {
    L.push(`#### FAQ (${d.faq.length}, дослівно)`, '');
    d.faq.forEach((f, i) => L.push(`${i + 1}. **${f.q}**`, '', `   ${f.a}`, ''));
    L.push('');
  }
  const inText = d.internalLinks.filter(l => !l.card);
  L.push(`#### Внутрішні посилання з контенту (${inText.length})`, '');
  L.push(inText.length ? inText.map(l => `- ${linkMd(l.text || '(без тексту)', l.href)} · блок ${l.block}`).join('\n') : '—', '');
  if (d.externalLinks.length) {
    L.push(`Зовнішні / контактні: ${[...new Map(d.externalLinks.map(l => [l.href, l])).values()].map(l => linkMd(l.text || '(без тексту)', l.href)).join(', ')}`, '');
  }
  return L.join('\n');
}

const slug = path => path === '/' ? 'uk__home' : path === '/en/' ? 'en__home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '__');

// ---------- global sections ----------
function navOf(d) {
  const links = [];
  const walkItems = arr => arr.forEach(i => {
    if (i.k === 'link') links.push(`${i.text} → ${i.href}`);
    if (i.k === 'list') i.items.forEach(x => typeof x !== 'string' && links.push(`${x.text} → ${x.href}`));
    if (i.k === 'card-link') walkItems(i.items);
  });
  walkItems(d.chrome);
  return links;
}

function footerOf(html) {
  const f = region(html, '<!-- iu:footer -->', '<!-- /iu:footer -->');
  if (!f) return null;
  const root = parse(f).querySelector('footer');
  const groups = [];
  for (const col of root.querySelectorAll('.iu-foot-grid > div')) {
    let cur = null;
    for (const n of col.childNodes.filter(x => x.nodeType === 1)) {
      if (tag(n) === 'h2') { cur = { title: txt(n), links: [] }; groups.push(cur); }
      else if (tag(n) === 'ul' && cur) cur.links.push(...n.querySelectorAll('a').map(a => ({ text: txt(a), href: a.getAttribute('href') })));
      else if (!cur) {
        let brand = groups.find(g => g.title === '(бренд)');
        if (!brand) { brand = { title: '(бренд)', links: [] }; groups.push(brand); }
        if (tag(n) === 'a') brand.links.push({ text: txt(n), href: n.getAttribute('href') });
        if (tag(n) === 'p') brand.text = txt(n);
      }
    }
  }
  const bottom = root.querySelector('.iu-foot-bottom');
  return { groups: groups.filter(g => g.links.length || g.text), bottom: bottom ? { text: txt(bottom), links: bottom.querySelectorAll('a').map(a => ({ text: txt(a), href: a.getAttribute('href') })) } : null };
}

function factsSection(md, heading) {
  const s = md.indexOf(heading);
  if (s < 0) return '';
  const e = md.indexOf('\n## ', s + heading.length);
  return md.slice(s + heading.length, e < 0 ? undefined : e).trim();
}

function dims(f) {
  const b = fs.readFileSync(f);
  if (b.slice(1, 4).toString() === 'PNG') return `${b.readUInt32BE(16)}×${b.readUInt32BE(20)}`;
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i < b.length - 9;) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1], len = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xc3) return `${b.readUInt16BE(i + 7)}×${b.readUInt16BE(i + 5)}`;
      i += 2 + len;
    }
  }
  const svg = b.toString('utf8', 0, 600).match(/width="(\d+)"[^>]*height="(\d+)"/);
  return svg ? `${svg[1]}×${svg[2]}` : '';
}
function usage(name) {
  const files = [];
  const scan = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const f = d === '.' ? e.name : `${d}/${e.name}`;
    if (e.isDirectory()) { if (!/^(node_modules|\.git|_site|audit-screens|test-results|playwright-report|vendor|design-content|docs|tests|src|\.github|\.claude)$/.test(e.name)) scan(f); }
    else if (/\.(html|css|js|json|webmanifest)$/.test(f) && !/package(-lock)?\.json$|^scripts\/pages\.json$/.test(f) && fs.readFileSync(f, 'utf8').includes(name)) files.push(f);
  });
  scan('.');
  return files;
}
function assets() {
  const list = [];
  const add = f => {
    if (!fs.existsSync(f)) return;
    const used = usage(f.split('/').pop());
    list.push({ path: '/' + f, bytes: fs.statSync(f).size, size: dims(f), usedIn: used.length, where: used.slice(0, 4) });
  };
  ['favicon-32.png', 'favicon.png', 'favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'og-image.png', 'og-image.svg', 'avatar.jpeg', 'avatar.png', 'assets/pattern-bg.jpg'].forEach(add);
  return list;
}

// ---------- main ----------
const kw = keywords();
const pages = [...cfg.pages];
if (fs.existsSync('404.html') && !pages.some(p => p.path === '/404.html')) {
  pages.push({ path: '/404.html', lang: 'uk', type: 'notfound', name: '404', title: '', description: '', keyword: '', noindex: true, _file: '404.html' });
}
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);

const data = [];
for (const p of pages) {
  const file = p._file || fileOf(p);
  const html = fs.readFileSync(file, 'utf8');
  if (!p.title) {
    p.title = clean(parse(html).querySelector('title')?.text || '');
    p.description = parse(html).querySelector('meta[name="description"]')?.getAttribute('content') || '';
  }
  const d = extract(p, html, kw);
  if (p._file) d.file = p._file;
  d._footer = footerOf(html);
  data.push(d);
  const { _footer, ...json } = d;
  fs.writeFileSync(`${OUT}/${slug(p.path)}.json`, JSON.stringify(json, null, 2) + '\n');
}

// Shared JSON: nav, footer, contacts, prices, templates, design tokens, assets.
const facts = fs.readFileSync('docs/FACTS.md', 'utf8');
const byTpl = Object.create(null);
data.forEach(d => (byTpl[d.template] = byTpl[d.template] || []).push(d.path));
const navVariants = new Map();
data.forEach(d => {
  const key = JSON.stringify(navOf(d));
  if (!navVariants.has(key)) navVariants.set(key, { links: navOf(d), pages: [] });
  navVariants.get(key).pages.push(d.path);
});
const footers = { uk: data.find(d => d.lang === 'uk' && d._footer)._footer, en: data.find(d => d.lang === 'en' && d._footer)._footer };
const themes = new Map();
data.forEach(d => {
  const key = JSON.stringify(d.theme);
  if (!themes.has(key)) themes.set(key, { vars: d.theme, pages: [] });
  themes.get(key).pages.push(d.path);
});
const fontLinks = new Map();
data.forEach(d => {
  const m = fs.readFileSync(d.file, 'utf8').match(/fonts\.googleapis\.com\/css2\?[^"']+/);
  const k = m ? decode(m[0]) : '(немає)';
  fontLinks.set(k, [...(fontLinks.get(k) || []), d.path]);
});
const shared = {
  generated: new Date().toISOString(), source: 'main @ ' + (process.env.GIT_SHA || ''),
  site: SITE, templates: byTpl,
  nav: [...navVariants.values()], footer: footers,
  contacts: factsSection(facts, '## Компанія'),
  prices: factsSection(facts, '## Єдиний прайс (USD, «від») — використовувати ТІЛЬКИ ці цифри'),
  doNotUse: factsSection(facts, '## НЕ використовувати (неперевірено / вигадано)'),
  themes: [...themes.values()], fonts: [...fontLinks].map(([href, pages]) => ({ href, pages })),
  assets: assets(),
  model3d: { url: 'https://res.cloudinary.com/etdq5y69/raw/upload/v1783282631/snake3d.glb', usedBy: '/assets/js/snake.js (головна, тільки десктоп, Draco: /vendor/three/draco-r185/)' },
  scripts: { globe: '/cobe.umd.js + /assets/js/globe.js (глобус, головні)', orbit: '/assets/js/orbit.js (орбіта стеку, головні)', hero: '/assets/js/hero.js (3D hero, десктоп)', preloader: '/assets/js/preloader.js', mobileAnimations: '/assets/js/mobile-animations.js (GSAP, мобільна головна)' },
};
fs.writeFileSync(`${OUT}/_site.json`, JSON.stringify(shared, null, 2) + '\n');

// ---------- DESIGN_BRIEF.md ----------
const M = [];
const totalWords = data.reduce((s, d) => s + d.words, 0);
M.push('# DESIGN_BRIEF — Infinite Union (infiniteunion.com.ua)', '');
M.push(`Поточний прод-контент із гілки \`main\`${process.env.GIT_SHA ? ` (коміт \`${process.env.GIT_SHA}\`)` : ''}, зібраний автоматично скриптом \`node scripts/design-content.mjs\`. Текст узято з HTML дослівно: нічого не дописано й не переписано. Структуровані дані для зворотної верстки лежать у \`${OUT}/*.json\` (по файлу на сторінку + \`_site.json\` зі спільними даними).`, '');
M.push(`**Сторінок:** ${data.length} (${cfg.pages.length} з \`scripts/pages.json\` + 404) · **UA:** ${data.filter(d => d.lang === 'uk').length} · **EN:** ${data.filter(d => d.lang === 'en').length} · **Слів видимого контенту:** ${totalWords.toLocaleString('uk-UA')} (без меню й футера).`, '');
M.push('Як читати блоки: `тип` (hero, problem/cards, process, pricing-tiers, portfolio, faq, cta-form…) визначено автоматично за класами й вмістом, поруч — оригінальний тег і класи. `_[декор, aria-hidden]_` — текст, який видно, але він декоративний (бігучий рядок, великі цифри). `_[клас]_` перед текстом — роль дрібного елемента (лейбл, бейдж, підпис).', '');

M.push('## Зміст', '', '1. [Навігація і перемикач мови](#1-навігація-і-перемикач-мови)', '2. [Футер](#2-футер)', '3. [Контакти](#3-контакти)', '4. [Єдиний прайс](#4-єдиний-прайс)', '5. [Шаблони сторінок](#5-шаблони-сторінок)', '6. [Кольори, шрифти, ассети](#6-кольори-шрифти-ассети)', '7. [Сторінки](#7-сторінки)', '8. [Перевірка повноти](#8-перевірка-повноти)', '');

M.push('## 1. Навігація і перемикач мови', '');
M.push('Шапку кожна сторінка верстає сама, тому меню між шаблонами різне. Нижче — як воно виглядає зараз.', '');
const navParts = d => {
  const r = { logo: '', back: '', lang: '', cta: '', menu: [] };
  const links = navOf(d).map(l => { const i = l.lastIndexOf(' → '); return { text: l.slice(0, i), href: l.slice(i + 3) }; });
  links.forEach((l, i) => {
    if (l.text === 'INFINITE UNION') r.logo = l.href;
    else if (/^(←|Назад|Back)/.test(l.text)) r.back = `${l.text} → ${l.href}`;
    else if (/^(EN|UA)$/.test(l.text)) r.lang = `${l.text} → ${l.href}`;
    else if (i === links.length - 1 || (i > links.findIndex(x => /^(EN|UA)$/.test(x.text)) && links.findIndex(x => /^(EN|UA)$/.test(x.text)) >= 0 && !r.cta)) r.cta = `${l.text} → ${l.href}`;
    else r.menu.push(`${l.text} → ${l.href}`);
  });
  return r;
};
for (const d of data.filter(x => x.template === 'home')) {
  M.push(`**Головна ${d.lang.toUpperCase()} (\`${d.path}\`)** — десктопне меню \`.n-links\`, CTA \`.n-cta\`, бургер \`#burger\` → мобільне меню \`#mob\`:`, '');
  M.push(navOf(d).map(l => `- ${l}`).join('\n'), '');
}
M.push('**Решта сторінок** — шапка `nav-back` + логотип + перемикач мови + CTA `.nav-cta`:', '');
M.push('| Сторінка | ← Назад | Логотип | Мова | CTA | Інші пункти |', '|---|---|---|---|---|---|');
for (const d of data.filter(x => x.template !== 'home')) {
  const r = navParts(d);
  M.push(`| \`${d.path}\` | ${esc(r.back) || '—'} | ${r.logo || '—'} | ${esc(r.lang) || '—'} | ${esc(r.cta) || '—'} | ${r.menu.map(esc).join('; ') || '—'} |`);
}
M.push('', '_404 не має шапки: логотип і посилання розташовані всередині сторінки (див. сторінку 404)._', '');
M.push('**Перемикач мови** — посилання `EN` / `UA` у шапці перед CTA (клас `.iu-lang`, генерує `scripts/build-seo.mjs`). Веде на сторінку-пару; якщо пари немає — на головну іншою мовою. Також у футері, у групі «Компанія», є пункт «English» / «Українською».', '');
M.push('**Мобільне меню головної** (`#mob`, бургер `#burger`) — пункти вище у варіанті для `/` та `/en/`. Прелоадер (`#loader`) показує логотип, відсоток, статус («• Ініціалізація» / «• Loading») і координати «49° 59′ N / 36° 14′ E · Kharkiv, Ukraine».', '');

M.push('## 2. Футер', '');
M.push('Однаковий на всіх сторінках мови (генерується з `scripts/pages.json`). Над футером — хлібні крихти (для всіх, крім головних).', '');
for (const [lang, f] of Object.entries(footers)) {
  M.push(`### Футер ${lang.toUpperCase()}`, '');
  for (const g of f.groups) {
    M.push(`**${g.title}**${g.text ? ` — ${g.text}` : ''}`, '');
    if (g.links.length) M.push(g.links.map(l => `- ${linkMd(l.text, l.href)}`).join('\n'), '');
  }
  if (f.bottom) M.push(`**Нижній рядок:** ${f.bottom.text}`, '', f.bottom.links.map(l => `- ${linkMd(l.text, l.href)}`).join('\n'), '');
}

M.push('## 3. Контакти', '', '_Дослівно з `docs/FACTS.md`, розділ «Компанія»._', '', shared.contacts, '');
M.push('## 4. Єдиний прайс', '', '_Дослівно з `docs/FACTS.md`. Лише ці цифри використовуються на сайті._', '', shared.prices, '');
M.push('**Не використовувати в макетах** (з `docs/FACTS.md`):', '', shared.doNotUse, '');

M.push('## 5. Шаблони сторінок', '');
const tplDesc = {
  home: 'Головна: прелоадер, 3D-змія/глобус/орбіта стеку, окремі мобільні секції (`#mobile-hero`, `#mobile-works`) і мобільне меню `#mob`, форма заявки `#contact` (форми є лише на `/` і `/en/`; конструктор має власні поля генерації).',
  service: 'Основна сторінка послуги: hero → проблема → що входить → етапи → тарифи → приклади з портфоліо → FAQ → CTA (Telegram / WhatsApp / Viber / телефон + «Заповнити форму» → форма на головній `/#contact`).',
  cluster: 'Підпослуга (вужчий ключ), та сама структура, що й service, має батьківську сторінку.',
  pricing: 'Зведений прайс: таблиці/картки всіх послуг, що входить, етапи оплати, FAQ.',
  portfolio: 'Портфоліо: фільтри + сітка проєктів + CTA.',
  'blog-list': 'Список статей блогу з фільтрами.',
  'blog-post': 'Стаття: H1, вступ, розділи H2, таблиці, пов\'язані статті.',
  privacy: 'Юридична сторінка (noindex).',
  constructor: 'AI-конструктор: інтерфейс генерації прев\'ю + FAQ.',
  404: 'Сторінка помилки 404 (noindex).',
};
M.push('| Шаблон | Опис | Сторінки |', '|---|---|---|');
for (const [t, ps] of Object.entries(byTpl).sort((a, b) => ['home', 'service', 'cluster', 'pricing', 'portfolio', 'constructor', 'blog-list', 'blog-post', 'privacy', '404'].indexOf(a[0]) - ['home', 'service', 'cluster', 'pricing', 'portfolio', 'constructor', 'blog-list', 'blog-post', 'privacy', '404'].indexOf(b[0]))) M.push(`| **${t}** | ${tplDesc[t] || ''} | ${ps.map(x => `\`${x}\``).join(', ')} |`);
M.push('');

M.push('## 6. Кольори, шрифти, ассети', '');
M.push('### CSS-змінні (`:root`) — як зараз', '');
const lum = hex => { const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex || ''); if (!m) return null; let h = m[1]; if (h.length === 3) h = [...h].map(x => x + x).join(''); const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const light = data.filter(d => lum(d.theme['--bg']) > 0.5).map(d => d.path);
const dark = data.filter(d => lum(d.theme['--bg']) !== null && lum(d.theme['--bg']) <= 0.5).map(d => d.path);
M.push(`Фон за змінною \`--bg\`: **темний** на ${dark.length} сторінках, **світлий** на ${light.length}: ${light.map(x => `\`${x}\``).join(', ')}. Групи сторінок з однаковими змінними (inline \`<style>\` + підключені \`assets/css/*.css\`):`, '');
for (const t of themes.values()) {
  M.push(`**${t.pages.length} стор.:** ${t.pages.map(x => `\`${x}\``).join(', ')}`, '');
  const v = Object.entries(t.vars);
  M.push(v.length ? '```css\n:root {\n' + v.map(([k, x]) => `  ${k}: ${x};`).join('\n') + '\n}\n```' : '_(змінних немає — кольори задані напряму)_', '');
}
M.push('Фірмовий червоний — `#D40000` (на всіх сторінках). Контраст `#D40000` на чорному = 3.6:1: для дрібного тексту нижче WCAG AA (4.5:1) — варто врахувати в редизайні.', '');
M.push('### Шрифти', '', 'Google Fonts: **Space Grotesk** (заголовки, `--font`/`--fh`) + **Inter** (текст, `--body`/`--fb`). Набори ваг різняться між сторінками:', '');
for (const f of shared.fonts) M.push(`- \`${f.href}\` — ${f.pages.length} стор.`);
M.push('', '### Логотип', '', 'Текстовий: `INFINITE <span>UNION</span>`, «UNION» червоним; на сторінках послуг `.nav-logo` — Space Grotesk 700, 15px, letter-spacing .12em. Окремого файлу-логотипу (SVG) немає; іконки нижче.', '');
M.push('### Ассети', '', '| Шлях | Px | Вага | Де використовується |', '|---|---|---|---|');
for (const a of shared.assets) M.push(`| \`${a.path}\` | ${a.size || '—'} | ${(a.bytes / 1024).toFixed(1)} KB | ${a.usedIn ? `${a.usedIn} файл(ів): ${a.where.map(w => `\`${w}\``).join(', ')}${a.usedIn > a.where.length ? ' …' : ''}` : '**ніде** (файл лежить, але в коді не підключений)'} |`);
M.push('', `**3D-модель:** \`${shared.model3d.url}\` — ${shared.model3d.usedBy}.`, '');
M.push('**Скрипти з візуалом:**', '', Object.values(shared.scripts).map(s => `- ${s}`).join('\n'), '');
M.push('Інших растрових зображень у контенті немає: портфоліо, картки й ілюстрації зроблені CSS/SVG/canvas. CSS: `assets/css/main.css` (головна), `assets/css/mobile.css` (мобільна головна), `assets/css/site-shared.css` (футер, крихти, перемикач мови — усі сторінки), решта стилів — inline у `<head>` кожної сторінки.', '');

M.push('## 7. Сторінки', '');
const order = ['home', 'service', 'cluster', 'pricing', 'portfolio', 'constructor', 'blog-list', 'blog-post', 'privacy', '404'];
for (const t of order) {
  const ps = data.filter(d => d.template === t);
  if (!ps.length) continue;
  M.push(`## 7.${order.indexOf(t) + 1} Шаблон: ${t}`, '');
  for (const d of ps) M.push(pageMd(d), '---', '');
}

// ---------- completeness ----------
const registered = cfg.pages.map(p => p.path);
const done = new Set(data.map(d => d.path));
const missing = registered.filter(p => !done.has(p));
const htmlFiles = execList();
const unregistered = htmlFiles.filter(f => !data.some(d => d.file === f));
const noH1 = data.filter(d => !d.h1).map(d => d.path);
const empty = data.filter(d => d.blocks.length < 2).map(d => d.path);
M.push('## 8. Перевірка повноти', '');
M.push(`- Сторінок у \`scripts/pages.json\`: **${registered.length}**; зібрано: **${data.length}** (+ 404.html).`);
M.push(`- Пропущених сторінок із реєстру: **${missing.length}**${missing.length ? ' — ' + missing.join(', ') : ''}.`);
M.push(`- HTML-файлів у репо поза брифом: **${unregistered.length}**${unregistered.length ? ' — ' + unregistered.join(', ') : ''}.`);
M.push(`- JSON-файлів у \`${OUT}/\`: **${fs.readdirSync(OUT).filter(f => f.endsWith('.json') && f !== '_site.json').length}** + \`_site.json\`.`);
M.push(`- Сторінок без H1: ${noH1.length ? noH1.join(', ') : '0'}. Сторінок із <2 блоками: ${empty.length ? empty.join(', ') : '0'}.`);
M.push(`- Пари UA↔EN: ${data.filter(d => d.alt && d.lang === 'uk').length}. UA без EN-пари: ${data.filter(d => d.lang === 'uk' && !d.alt).length}.`);
M.push(`- FAQ: ${data.reduce((s, d) => s + d.faq.length, 0)} питань на ${data.filter(d => d.faq.length).length} сторінках. Тарифних карток: ${data.reduce((s, d) => s + d.tiers.length, 0)}.`);
M.push(`- Слів усього: **${totalWords.toLocaleString('uk-UA')}** (UA ${data.filter(d => d.lang === 'uk').reduce((s, d) => s + d.words, 0).toLocaleString('uk-UA')}, EN ${data.filter(d => d.lang === 'en').reduce((s, d) => s + d.words, 0).toLocaleString('uk-UA')}).`, '');
M.push('| Сторінка | Шаблон | Мова | Блоків | FAQ | Тарифів | Слів |', '|---|---|---|---|---|---|---|');
data.forEach(d => M.push(`| \`${d.path}\` | ${d.template} | ${d.lang} | ${d.blocks.length} | ${d.faq.length} | ${d.tiers.length} | ${d.words} |`));
M.push('');
fs.writeFileSync('DESIGN_BRIEF.md', M.join('\n'));

function execList() {
  const out = [];
  const walkDir = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const f = d === '.' ? e.name : `${d}/${e.name}`;
    if (e.isDirectory()) { if (!/^(node_modules|\.git|_site|audit-screens|test-results|playwright-report|vendor|design-content|docs|scripts|tests|src)$/.test(e.name)) walkDir(f); }
    else if (f.endsWith('.html')) out.push(f);
  });
  walkDir('.');
  return out;
}

console.log(`DESIGN_BRIEF.md + ${OUT}/ — ${data.length} pages, ${totalWords} words, missing: ${missing.length}, unregistered html: ${unregistered.length}`);
