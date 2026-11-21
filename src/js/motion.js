// Infinite Union — motion layer (DESIGN_SYSTEM §4, catalogue A1–A15) + forms + 3D loader.
// Port of the prototypes' setup()/frame() (IU Home v2 / IU Page / IU 404) to one module.
// One rAF per page; each frame does all layout reads first, then writes; styles are written only when changed.
const BASE_3D = '__3D_BASE__';
const GLB = '__GLB__';

const d = document, de = d.documentElement, $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)], byId = id => d.getElementById(id);
const STATIC = de.classList.contains('static');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOUCH = matchMedia('(hover: none), (pointer: coarse)').matches;
const LANG = de.lang === 'en' ? 'en' : 'uk';
const KIND = byId('iu2') ? 'home' : byId('iup') ? 'page' : byId('c404') ? '404' : 'other';
const narrow = () => innerWidth < 820;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const ss = x => x * x * (3 - 2 * x);
const set = (el, prop, v) => { if (el && el['_' + prop] !== v) { el['_' + prop] = v; el.style[prop] = v; } };
const nbsp = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const WEAK = (() => {
  const n = navigator, c = n.connection;
  return (n.deviceMemory && n.deviceMemory <= 4) || (n.hardwareConcurrency && n.hardwareConcurrency <= 4) || (c && c.saveData);
})();
const idle = (fn, timeout = 2500) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout }) : setTimeout(fn, 200));

/* ------------------------------------------------------------------ interaction stylesheet (hover/focus), non-blocking */
{ const pre = $('link[data-iu-css]'); if (pre) { const l = d.createElement('link'); l.rel = 'stylesheet'; l.href = pre.href; d.head.appendChild(l); } }

/* ------------------------------------------------------------------ always-on UI (also in ?static=1) */
initMenu();
initForms();
initFaq();
initVeilLinks();
if (!STATIC) {
  initLoader();
  initPointerFx();
  start();
}
addEventListener('load', () => {
  de.classList.add('grain-on'); // decorative film grain: after load, off the critical path
  if ('serviceWorker' in navigator && !STATIC && isSecureContext) navigator.serviceWorker.register('/sw.js').catch(() => {});
  setTimeout(() => idle(loadSentry, 4000), 3000);
}, { once: true });

/* ------------------------------------------------------------------ mobile menu (home) */
function initMenu() {
  const menu = $('[data-menu]'), btn = $('[data-menu-toggle]'), close = $('[data-menu-close]');
  if (!menu || !btn) return;
  let open = false;
  const setOpen = v => {
    open = v;
    menu.style.transform = v ? 'translateY(0)' : 'translateY(-101%)';
    menu.style.visibility = v ? 'visible' : 'hidden';
    btn.setAttribute('aria-expanded', String(v));
    de.classList.toggle('iu-lock', v);
    if (v) setTimeout(() => close && close.focus(), 50); else btn.focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => setOpen(!open));
  close && close.addEventListener('click', () => setOpen(false));
  $$('[data-menu] a').forEach(a => a.addEventListener('click', () => { if (open) { open = false; menu.style.transform = 'translateY(-101%)'; menu.style.visibility = 'hidden'; btn.setAttribute('aria-expanded', 'false'); de.classList.remove('iu-lock'); } }));
  addEventListener('keydown', e => { if (e.key === 'Escape' && open) setOpen(false); });
  addEventListener('resize', () => { if (open && !narrow()) setOpen(false); });
}

/* ------------------------------------------------------------------ FAQ "+" icon */
function initFaq() {
  $$('details').forEach(dt => dt.addEventListener('toggle', () => { const i = dt.querySelector('[data-faq-ico]'); if (i) i.style.transform = dt.open ? 'rotate(45deg)' : 'none'; }));
}

/* ------------------------------------------------------------------ page-transition veil (inner pages) */
function initVeilLinks() {
  const veil = byId('veil');
  addEventListener('pageshow', e => { if (e.persisted && veil) { veil.style.transition = 'none'; veil.style.transform = 'translateY(-101%)'; } });
  if (!veil || RM || STATIC) return;
  d.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash) || /\.(xml|txt|pdf|png|jpe?g|webp|avif)$/i.test(u.pathname)) return;
    e.preventDefault();
    const vn = byId('veil-name');
    if (vn) vn.textContent = (a.textContent || '').replace(/[→↗←]/g, '').trim().slice(0, 40) || '∞';
    veil.style.animation = 'none'; veil.style.transition = 'none'; veil.style.transform = 'translateY(-101%)';
    void veil.offsetHeight;
    veil.style.transition = 'transform .7s cubic-bezier(.76,0,.24,1)'; veil.style.transform = 'translateY(0)';
    try { sessionStorage.setItem('iu_veil', '1'); } catch (_) { /* private mode */ }
    setTimeout(() => { location.href = u.href; }, 720);
  });
}

/* ------------------------------------------------------------------ home preloader (≤ 2 s, first visit per session) */
function initLoader() {
  const el = byId('loader');
  if (!el) return;
  if (de.classList.contains('no-loader')) { el.remove(); return; }
  try { sessionStorage.setItem('iu_seen', '1'); } catch (_) { /* ignore */ }
  el.style.animation = 'none';
  const fill = el.querySelector('[data-ld-fill]'), bar = el.querySelector('[data-ld-bar]'), st = el.querySelector('[data-ld-st]'),
    lat = el.querySelector('[data-ld-lat]'), lon = el.querySelector('[data-ld-lon]'), pc = el.querySelector('[data-ld-pct]');
  const t0 = performance.now(), DUR = 1900;
  const done = () => { el.style.clipPath = 'inset(0 0 100% 0)'; setTimeout(() => { el.remove(); d.dispatchEvent(new Event('iu:loader-done')); }, 1150); };
  const tick = () => {
    if (d.hidden) { el.remove(); d.dispatchEvent(new Event('iu:loader-done')); return; }
    const p = Math.round(clamp((performance.now() - t0) / DUR) * 100);
    set(fill, 'clipPath', `inset(0 ${100 - p}% 0 0)`); set(bar, 'width', p + '%');
    if (lat) lat.textContent = (49.98 * p / 100).toFixed(2);
    if (lon) lon.textContent = (36.23 * p / 100).toFixed(2);
    if (pc) pc.textContent = String(p);
    if (st) st.textContent = p < 40 ? 'Ініціалізація' : p < 85 ? 'Завантаження 3D' : 'Готово';
    if (p >= 100) setTimeout(done, 150); else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------ cursor glow, tilt, card glow, magnetic buttons, tiers */
const mouse = { x: innerWidth / 2, y: innerHeight / 2, sx: innerWidth / 2, sy: innerHeight / 2, on: false };
function initPointerFx() {
  if (TOUCH) return;
  addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; }, { passive: true });
  $$('[data-card]').forEach(c => {
    const g = c.querySelector('[data-card-glow]'); if (!g) return;
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); g.style.background = `radial-gradient(320px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(212,0,0,.22), rgba(212,0,0,0) 70%)`; g.style.opacity = '1'; });
    c.addEventListener('pointerleave', () => { g.style.opacity = '0'; });
  });
  if (RM) return;
  $$('[data-tilt]').forEach(el => {
    const p = el.parentElement;
    p.addEventListener('pointermove', e => { const r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transition = 'transform .2s'; el.style.transform = `perspective(1200px) rotateY(${x * 14}deg) rotateX(${-y * 12}deg)`; });
    p.addEventListener('pointerleave', () => { el.style.transition = 'transform .9s cubic-bezier(.23,1,.32,1)'; el.style.transform = 'none'; });
  });
  $$('[data-mag]').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transition = 'transform .15s'; b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transition = 'transform .7s cubic-bezier(.23,1,.32,1)'; b.style.transform = 'none'; });
  });
  $$('[data-tier]').forEach(el => {
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transition = 'transform .15s'; el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`; });
    el.addEventListener('pointerleave', () => { el.style.transition = 'transform .8s cubic-bezier(.23,1,.32,1)'; el.style.transform = 'none'; });
  });
}

/* ------------------------------------------------------------------ scroll-driven scene */
function start() {
  const H0 = innerHeight;
  const home = KIND === 'home';
  const words = el => {
    const w = el.textContent.trim().split(/\s+/);
    el.innerHTML = w.map(x => `<span style="opacity:.16;transition:opacity .35s,color .35s,text-shadow .35s">${x.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`).join(' ');
    return [...el.children];
  };
  // A1 reveal masks (below the first screen only)
  let pending = RM ? [] : $$('[data-reveal]').filter(el => el.getBoundingClientRect().top > H0 * .9);
  pending.forEach(el => {
    const cs = getComputedStyle(el), own = cs.transitionDuration !== '0s' ? cs.transition + ', ' : '';
    el.style.clipPath = 'inset(0 0 100% 0)'; el.style.transform = `translateY(${home ? 34 : 30}px)`;
    el.style.transition = own + 'clip-path 1.1s cubic-bezier(.76,0,.24,1), transform 1.1s cubic-bezier(.76,0,.24,1)';
  });
  // A7 counters (markup holds the final number for SEO)
  let counts = RM ? [] : (home ? $$('[data-count]') : $$('[data-stat-v]')).filter(el => el.getBoundingClientRect().top > H0 * (home ? .9 : .85)).map(el => {
    const raw = el.textContent.trim();
    if (home) { const fin = el.dataset.count || raw.replace(/\s/g, ''); return { el, raw, pre: '', num: parseFloat(fin), dec: fin.includes('.') ? 1 : 0, suf: '', home: true }; }
    const m = raw.match(/^([^\d]*)(\d[\d\s ]*(?:[.,]\d+)?)(.*)$/);
    if (!m || /[–-]/.test(m[3].slice(0, 1))) return null;
    return { el, raw, pre: m[1], num: parseFloat(m[2].replace(/[\s ]/g, '').replace(',', '.')), dec: (m[2].split(/[.,]/)[1] || '').length, suf: m[3] };
  }).filter(Boolean);
  counts.forEach(c => { c.el.textContent = c.pre + '0' + c.suf; });
  const running = [];
  // A2 curtains
  const curt = RM ? [] : $$('[data-curtain]').map((w, i) => ({ w, s: w.querySelector('section'), line: w.querySelector('[data-cline]'), dir: home ? w.dataset.curtain : (i % 2 ? 'r' : 'l') })).filter(c => c.s);
  // A3 section lines
  const lines = $$('[data-line]').map(el => ({ el, on: false }));
  // A4 outline → fill rows
  const rows = (home ? $$('[data-srv]') : $$('[data-row]')).map(el => ({ el, name: el.querySelector(home ? '[data-srv-name]' : '[data-row-name]'), line: el.querySelector(home ? '[data-srv-line]' : '[data-row-line]'), on: null }));
  // A5 process fuse
  const procs = (home ? [byId('proc')].filter(Boolean) : $$('[data-proc]')).map(el => ({
    el, fill: home ? byId('proc-fill') : el.querySelector('[data-proc-fill]'), spark: home ? byId('proc-spark') : el.querySelector('[data-proc-spark]'),
    steps: (home ? $$('[data-step]') : [...el.querySelectorAll('[data-step]')]).map(s => ({ s, n: s.querySelector('[data-step-n]'), on: null })),
  }));
  // A8 words
  const wordsEls = RM ? [] : (home ? [byId('philo-text')].filter(Boolean) : $$('[data-words]')).map(el => ({ el, sec: home ? byId('philo') : el, w: words(el) }));
  // A10 bars, nodes
  const bars = $$('[data-bar]').map((el, i) => ({ el, h: parseFloat(el.dataset.bar), i }));
  const nodes = $$('[data-node]');
  // portfolio stack (home)
  const pf = home && byId('portfolio'), stage = byId('pf-stage');
  const pfCards = $$('[data-pf-card]'), pfTexts = $$('[data-pf-text]'), pfDots = $$('[data-pf-dot]');
  const rnd = s => { const x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); };
  const pfS = pfCards.map((c, i) => ({ x: 0, y: 0, r: 0, s: .7, o: 1, vx: 0, vy: 0, vr: 0, vs: 0, tx: 0, ty: 0, vtx: 0, vty: 0, pr: (rnd(i + 1) - .5) * 26, px: (rnd(i + 7) - .5) * 60, py: (rnd(i + 13) - .5) * 40, ar: (rnd(i + 3) - .5) * 5, inner: c.querySelector('[data-pf-inner]'), shadowOn: null, iy: 0 }));
  let pfAct = -2, pfM = null, lastY = scrollY, vel = 0;
  if (stage && !TOUCH) { stage.addEventListener('pointermove', e => { const r = stage.getBoundingClientRect(); pfM = { x: (e.clientX - r.left) / r.width - .5, y: (e.clientY - r.top) / r.height - .5 }; }); stage.addEventListener('pointerleave', () => { pfM = null; }); }
  // static DOM refs
  const nav = byId('nav'), prog = byId('progress'), spot = byId('spot');
  const hero = byId('hero'), hTitle = byId('h-title'), hWord = byId('h-word'), hHalo = byId('h-halo'), hR1 = byId('h-ring1'), hR2 = byId('h-ring2'), hStreak = byId('h-streak');
  const heroWord = byId('hero-word'), ringA = byId('ring-a'), ringB = byId('ring-b'), gR1 = byId('glyph-ring1'), gR2 = byId('glyph-ring2'), gHalo = byId('glyph-halo');
  const pk = byId('pk'), ai = byId('ai-type'), aiBar = byId('ai-bar'), aiPct = byId('ai-pct'), aiL = ['ai-l1', 'ai-l2', 'ai-l3'].map(byId);
  const aiFull = ai ? ai.textContent : '';
  const innerHero = $('main header');
  const scene3d = { snake: null, glyph: null };
  const stillImg = $('[data-still]');
  const SPRING_D = WEAK ? .35 : .2;
  if (RM) { procs.forEach(p => { if (p.spark) p.spark.style.display = 'none'; }); }

  // Geometry is re-read only when it can have changed (scroll, resize, fonts, images, every 500 ms as a safety net);
  // other frames reuse it, so the time-driven writes (rings, pulses) never force a synchronous layout.
  let dirty = true, lastRead = 0, G = null;
  const markDirty = () => { dirty = true; };
  addEventListener('scroll', markDirty, { passive: true });
  addEventListener('resize', markDirty);
  addEventListener('load', markDirty);
  d.fonts && d.fonts.addEventListener && d.fonts.addEventListener('loadingdone', markDirty);
  function frame(t) {
    const H = innerHeight, y = scrollY, n = narrow();
    // the home hero is fully covered by the preloader — nothing to animate behind it
    if (home && byId('loader')) return;
    if (dirty || !G || t - lastRead > 500) { G = read(); dirty = false; lastRead = t; }
    write(t, H, y, n, G);
  }
  function read() {
    // ---------------- READ phase
    const H = innerHeight;
    const docH = prog ? de.scrollHeight : 0;
    const hh = hero ? hero.offsetHeight : H;
    const ihH = innerHero ? innerHero.offsetHeight : 0;
    const pendTops = pending.map(el => el.getBoundingClientRect().top);
    const countTops = counts.map(c => c.el.getBoundingClientRect().top);
    const curtR = curt.map(c => { const r = c.w.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, ww: c.w.clientWidth }; });
    const lineTops = lines.map(l => (l.on ? 0 : l.el.getBoundingClientRect().top));
    const rowR = rows.map(r => r.el.getBoundingClientRect());
    const procR = procs.map(p => ({ r: p.el.getBoundingClientRect(), steps: p.steps.map(s => s.s.getBoundingClientRect().top) }));
    const wordR = wordsEls.map(o => o.sec.getBoundingClientRect());
    const pfR = pf ? pf.getBoundingClientRect() : null, pfH = pf ? pf.offsetHeight : 0;
    const sw = stage ? stage.clientWidth : 0, sh = stage ? stage.clientHeight : 0;
    const innerOv = pfS.map(s => (s.inner ? Math.max(0, s.inner.scrollHeight - s.inner.parentElement.clientHeight) : 0));
    void H;
    return { docH, hh, ihH, pendTops, countTops, curtR, lineTops, rowR, procR, wordR, pfR, pfH, sw, sh, innerOv };
  }
  function write(t, H, y, n, g) {
    const { docH, hh, ihH, countTops, curtR, lineTops, rowR, procR, wordR, pfR, pfH, sw, sh, innerOv } = g;
    const pendTops = g.pendTops;
    // ---------------- WRITE phase
    vel = lerp(vel, y - lastY, .15); lastY = y;
    if (nav) { const sc = y > (home ? 40 : 30); if (sc !== nav._sc) { nav._sc = sc; nav.style.background = sc ? (home ? 'rgba(10,7,6,.72)' : 'rgba(10,7,6,.74)') : 'transparent'; nav.style.backdropFilter = nav.style.webkitBackdropFilter = sc ? 'blur(14px)' : 'none'; nav.style.borderBottomColor = sc ? 'rgba(237,232,229,.08)' : 'transparent'; } }
    if (prog) { const max = docH - H; set(prog, 'width', (max > 0 ? y / max * 100 : 0).toFixed(2) + '%'); }
    if (spot && !TOUCH) { mouse.sx = lerp(mouse.sx, mouse.x, .1); mouse.sy = lerp(mouse.sy, mouse.y, .1); spot.style.transform = `translate3d(${(mouse.sx - 400).toFixed(1)}px,${(mouse.sy - 400).toFixed(1)}px,0)`; set(spot, 'opacity', mouse.on ? '1' : '0'); }

    // home hero
    if (home) {
      const hp = clamp(y / Math.max(1, hh - H)), e = ss(hp);
      if (scene3d.snake) {
        const yaw = -80 * Math.PI / 180;
        scene3d.snake.setPose(n
          ? { x: 0, y: lerp(.62, 1.1, e), z: 0, rx: lerp(0, .3, e), ry: yaw + lerp(0, Math.PI * 1.3, e), rz: 0, s: lerp(.66, .5, e), o: clamp(1 - hp * 1.2) }
          : { x: lerp(1.05, .55, e), y: lerp(.05, .3, e), z: 0, rx: lerp(0, .35, e), ry: yaw + lerp(0, Math.PI * 1.4, e), rz: lerp(0, -.15, e), s: lerp(.98, .7, e), o: clamp(1 - hp * 1.15) });
        if (!scene3d.snapped) { scene3d.snapped = true; scene3d.snake.snap(); }
        scene3d.snake.setPaused(y > hh);
      }
      if (y < hh + 50) {
        if (hTitle) { set(hTitle, 'transform', `translateY(${(-hp * 16).toFixed(3)}vh)`); set(hTitle, 'opacity', String(clamp(1 - hp * 1.3))); }
        if (hWord) { set(hWord, 'transform', `translateY(-50%) scale(${(1 + hp * .4).toFixed(4)})`); set(hWord, 'opacity', String(clamp(1 - hp * 1.5))); }
        const cx = n ? '50%' : '66%', cy = n ? '34%' : '47%';
        if (!RM) {
          if (hHalo) { set(hHalo, 'left', cx); set(hHalo, 'top', cy); hHalo.style.transform = `scale(${((1 + hp * .9) * (1 + Math.sin(t / 1100) * .05)).toFixed(4)})`; hHalo.style.opacity = (clamp(1 - hp) * (.82 + Math.sin(t / 900) * .18)).toFixed(3); }
          if (hR1) { set(hR1, 'left', cx); set(hR1, 'top', cy); hR1.style.transform = `rotate(${(t / 90).toFixed(2)}deg) scale(${1 + hp * .6})`; set(hR1, 'opacity', String(clamp(1 - hp * 1.4))); }
          if (hR2) { set(hR2, 'left', cx); set(hR2, 'top', cy); hR2.style.transform = `rotate(${(-t / 60).toFixed(2)}deg) scale(${1 + hp * .4})`; set(hR2, 'opacity', String(clamp(1 - hp * 1.4))); }
          if (hStreak) { const c = (t % 5200) / 5200; set(hStreak, 'top', cy); hStreak.style.transform = `translateX(${lerp(-40, 110, c).toFixed(2)}vw)`; hStreak.style.opacity = (Math.sin(c * Math.PI) * clamp(1 - hp * 2)).toFixed(3); }
        } else {
          [hHalo, hR1, hR2].forEach(el => { if (el) { set(el, 'left', cx); set(el, 'top', cy); } });
          if (hStreak) set(hStreak, 'opacity', '0');
        }
      }
    } else if (!RM) {
      // inner-page hero
      if (heroWord) set(heroWord, 'transform', `translateX(${(-y * .15).toFixed(1)}px)`);
      if (ringA) ringA.style.transform = `rotate(${(t / 90).toFixed(2)}deg)`;
      if (ringB) ringB.style.transform = `rotate(${(-t / 60).toFixed(2)}deg)`;
      if (gR1) gR1.style.transform = `rotate(${(t / 80).toFixed(2)}deg)`;
      if (gR2) gR2.style.transform = `rotate(${(-t / 55).toFixed(2)}deg)`;
      if (gHalo) gHalo.style.opacity = (.8 + Math.sin(t / 900) * .2).toFixed(3);
    }
    if (scene3d.glyph && ihH) scene3d.glyph.setScroll(clamp(y / (ihH * .9)));
    if (stillImg && !scene3d.snake && !scene3d.glyph) {
      const k = home ? clamp(y / Math.max(1, hh - H)) : (ihH ? clamp(y / (ihH * .9)) : 0);
      set(stillImg, 'opacity', String(clamp(1 - k * (home ? 1.15 : 1.3))));
      set(stillImg, 'transform', home ? `translateX(-50%) scale(${(1 - k * .28).toFixed(3)})` : `translateY(${(-k * 60).toFixed(1)}px)`);
    }

    // A2 curtains
    curt.forEach((c, i) => {
      const r = curtR[i];
      if (home) {
        if (r.top > H * 1.2 || r.top < -H) { if (r.top < -H && c.done !== 1) { c.done = 1; set(c.s, 'clipPath', 'none'); if (c.line) set(c.line, 'opacity', '0'); } return; }
        c.done = 0;
      } else if (r.top > H * 1.2 || r.bottom < 0) return;
      const k = home ? ss(clamp((H - r.top) / (H * .8))) : ss(clamp((H - r.top) / (H * .8)));
      const amp = home ? .7 : .6, off = (1 - k) * H * amp, offs = (1 - clamp(k * 1.3)) * H * amp;
      const L = c.dir === 'l' ? off : offs, R = c.dir === 'l' ? offs : off;
      set(c.s, 'clipPath', k >= 1 ? 'none' : `polygon(0 ${L.toFixed(1)}px, 100% ${R.toFixed(1)}px, 100% 100%, 0 100%)`);
      if (c.line) { const ww = r.ww; set(c.line, 'width', Math.hypot(ww, R - L).toFixed(1) + 'px'); set(c.line, 'transform', `translateY(${L.toFixed(1)}px) rotate(${Math.atan2(R - L, ww).toFixed(4)}rad)`); set(c.line, 'opacity', k > .02 && k < .98 ? Math.sin(k * Math.PI).toFixed(3) : '0'); }
    });
    // A7 counters
    if (counts.length) { const before = counts.length; counts = counts.filter((c, i) => { if (countTops[i] > H * .85) return true; c.t0 = t; running.push(c); return false; }); if (counts.length !== before) dirty = true; }
    for (let i = running.length - 1; i >= 0; i--) {
      const c = running[i], k = Math.min(1, (t - c.t0) / (c.home ? 1700 : 1500)), e = 1 - Math.pow(1 - k, 3);
      if (c.home) c.el.textContent = k >= 1 ? nbsp(c.raw.replace(/\s/g, '')) : nbsp((c.num * e).toFixed(c.dec));
      else c.el.textContent = k >= 1 ? c.raw : c.pre + (c.num * e).toFixed(c.dec) + c.suf;
      if (k >= 1) running.splice(i, 1);
    }
    // A1 reveals
    if (pending.length) { const before = pending.length; pending = pending.filter((el, i) => { if (pendTops[i] > H * .9) return true; el.style.clipPath = 'inset(-6% -6% -6% -6%)'; el.style.transform = 'none'; return false; }); if (pending.length !== before) dirty = true; }
    // A3 lines
    lines.forEach((l, i) => { if (!l.on && lineTops[i] < H * .8) { l.on = true; l.el.style.width = '100%'; } });
    // A4 rows
    rows.forEach((r, i) => {
      const b = rowR[i], on = Math.abs(b.top + b.height / 2 - H * .5) < Math.max(b.height * .5, home ? 70 : 60);
      if (on !== r.on) { r.on = on; if (r.name) { r.name.style.color = on ? '#EDE8E5' : 'transparent'; r.name.style.textShadow = on ? `0 0 ${home ? 34 : 30}px rgba(212,0,0,.55)` : 'none'; } if (r.line) r.line.style.width = on ? '100%' : '0'; }
    });
    // A5 process
    procs.forEach((p, i) => {
      const r = procR[i].r, h = RM ? r.height : clamp((H * .6 - r.top) / r.height) * r.height;
      if (p.fill) set(p.fill, 'height', h.toFixed(1) + 'px');
      if (p.spark && !RM) { p.spark.style.transform = home ? `translateY(${h.toFixed(1)}px) scale(${(1 + Math.sin(t / 120) * .15).toFixed(3)})` : `translateY(${h.toFixed(1)}px)`; set(p.spark, 'opacity', h > 2 && h < r.height - 2 ? '1' : '0'); }
      p.steps.forEach((s, j) => {
        const on = procR[i].steps[j] - r.top < h + 10;
        if (on !== s.on) { s.on = on; if (s.n) { s.n.style.background = on ? '#D40000' : '#0e0909'; s.n.style.borderColor = on ? '#ff3b2f' : 'rgba(237,232,229,.16)'; s.n.style.boxShadow = on ? '0 0 26px rgba(212,0,0,.7)' : 'none'; s.n.style.color = on ? '#fff' : '#A89E9E'; } s.s.style.opacity = on ? '1' : '.45'; }
      });
    });
    // A8 words
    wordsEls.forEach((o, i) => {
      const r = wordR[i], k = home ? clamp((H * .85 - r.top) / (r.height * .8)) : clamp((H * .85 - r.top) / (r.height + H * .35)), idx = k * o.w.length;
      o.w.forEach((w, j) => { const st = j < idx - 1 ? 2 : j < idx ? 1 : 0; if (w._st !== st) { w._st = st; w.style.opacity = st ? '1' : '.16'; w.style.color = st === 1 ? '#ff3b2f' : '#EDE8E5'; w.style.textShadow = st === 1 ? '0 0 24px rgba(212,0,0,.8)' : 'none'; } });
    });
    if (!RM) {
      // A10 bars
      bars.forEach(b => { b.el.style.height = (b.h * (home ? (.82 + .18 * Math.sin(t / 700 + b.i * .7)) : (.8 + .2 * Math.sin(t / 650 + b.i * .8)))).toFixed(2) + '%'; });
      // A6 pipeline pulse (home) / node grid (inner)
      if (home && pk) {
        const x = ((t % 4200) / 4200) * 100; pk.style.left = x.toFixed(2) + '%';
        nodes.forEach((nd, i) => { const on = Math.abs(x - i * 25) < 5; if (nd._on !== on) { nd._on = on; nd.style.background = on ? '#ff3b2f' : '#120d0d'; nd.style.boxShadow = on ? '0 0 22px 4px rgba(212,0,0,.8)' : 'none'; } });
      } else if (!home && nodes.length) {
        const k = Math.floor(t / 180) % nodes.length;
        if (k !== frame._nk) { frame._nk = k; nodes.forEach((nd, i) => { const on = (i * 7 + k) % 9 === 0; nd.style.background = on ? '#ff3b2f' : 'rgba(237,232,229,.2)'; nd.style.boxShadow = on ? '0 0 14px 3px rgba(212,0,0,.8)' : 'none'; nd.style.transform = on ? 'scale(1.6)' : 'none'; }); }
      }
      // A9 AI constructor typing
      if (ai) {
        const c = (t % 9000) / 9000, k = Math.floor(clamp(c / .35) * aiFull.length);
        if (ai._k !== k) { ai._k = k; ai.textContent = aiFull.slice(0, k); }
        const pg = clamp((c - .38) / .5);
        if (aiBar) set(aiBar, 'width', (pg * 100).toFixed(1) + '%');
        if (aiPct) { const s2 = (LANG === 'en' ? 'GENERATING CODE... ' : 'ГЕНЕРУЄМО КОД... ') + Math.round(pg * 100) + '%'; if (aiPct.textContent !== s2) aiPct.textContent = s2; }
        aiL.forEach((l, i) => { if (l) set(l, 'opacity', pg > .12 + i * .3 ? '1' : '.15'); });
      }
    }
    // portfolio stack with spring physics (DESIGN_SYSTEM §5)
    if (pf && stage && pfCards.length && pfR && !(pfR.bottom < -50 || pfR.top > H + 50)) {
      const N = pfCards.length, prog2 = clamp(-pfR.top / Math.max(1, pfH - H)), p = prog2 * (N + .2) - .25;
      const act = Math.min(N - 1, Math.floor(p)), f = clamp(p - act), K = .075, D = SPRING_D, m = pfM;
      const ss01 = x => { const k = clamp((x - .15) / .7); return k * k * (3 - 2 * k); };
      pfCards.forEach((c, i) => {
        const s = pfS[i]; let T;
        if (i > act) { const dd = i - Math.max(act, -1); T = { x: (n ? 0 : sw * .1) + s.px * (n ? .4 : 1) + dd * 5, y: sh * (n ? .1 : .12) + s.py * (n ? .4 : 1) - dd * 6, r: s.pr, s: n ? .74 : .7, o: dd > 5 ? 0 : 1 }; }
        else if (i === act) { T = { x: -sw * (n ? 0 : .04) + (RM ? 0 : Math.sin(f * Math.PI * 2) * 16), y: -sh * .04 + (RM ? 0 : Math.cos(f * Math.PI) * 10), r: s.ar + (RM ? 0 : (f - .5) * 5 + clamp(vel * .25, -9, 9)), s: 1, o: 1 }; }
        else { const k = act - i; T = { x: -sw * (n ? .9 : 1.05) - k * 30, y: -sh * (n ? .9 : .75) - k * 20, r: -24 - s.pr * .6, s: .86, o: 0 }; }
        if (RM) { s.x = T.x; s.y = T.y; s.r = T.r; s.s = T.s; s.o = T.o; } else {
          s.vx = (s.vx + (T.x - s.x) * K) * (1 - D); s.x += s.vx;
          s.vy = (s.vy + (T.y - s.y) * K) * (1 - D); s.y += s.vy;
          s.vr = (s.vr + (T.r - s.r) * K) * (1 - D); s.r += s.vr;
          s.vs = (s.vs + (T.s - s.s) * K) * (1 - D); s.s += s.vs;
          s.o = lerp(s.o, T.o, .1);
        }
        const ttx = i === act && m ? -m.y * 14 : 0, tty = i === act && m ? m.x * 18 : 0;
        s.vtx = (s.vtx + (ttx - s.tx) * .06) * .82; s.tx += s.vtx; s.vty = (s.vty + (tty - s.ty) * .06) * .82; s.ty += s.vty;
        set(c, 'transform', `translate(-50%,-50%) translate3d(${s.x.toFixed(1)}px,${s.y.toFixed(1)}px,0) rotate(${s.r.toFixed(2)}deg) rotateX(${s.tx.toFixed(2)}deg) rotateY(${s.ty.toFixed(2)}deg) scale(${s.s.toFixed(3)})`);
        set(c, 'opacity', s.o.toFixed(3));
        set(c, 'zIndex', String(i === act ? 50 : i > act ? 40 - i : 60 + i));
        const sh2 = i === act; if (s.shadowOn !== sh2) { s.shadowOn = sh2; c.style.boxShadow = sh2 ? '0 60px 120px rgba(0,0,0,.75), 0 0 0 1px rgba(255,59,47,.5), 0 0 70px rgba(212,0,0,.35)' : '0 24px 60px rgba(0,0,0,.7), 0 0 0 1px rgba(237,232,229,.06)'; }
        if (s.inner) { const ov = innerOv[i], want = i === act ? -ov * ss01(f) : i < act ? -ov : 0; s.iy = lerp(s.iy, want, .08); set(s.inner, 'transform', `translateY(${s.iy.toFixed(1)}px)`); }
      });
      const show = Math.max(0, act);
      if (show !== pfAct) {
        pfAct = show;
        pfTexts.forEach((el, j) => { const on = j === show; el.style.opacity = on ? '1' : '0'; el.style.transform = on ? 'translateY(-50%)' : `translateY(calc(-50% + ${j < show ? -40 : 40}px))`; el.style.filter = on ? 'none' : 'blur(8px)'; el.style.pointerEvents = on ? 'auto' : 'none'; el.toggleAttribute('inert', !on); });
        pfDots.forEach((dd, j) => { dd.style.background = j === show ? '#ff3b2f' : j < show ? 'rgba(237,232,229,.5)' : 'rgba(237,232,229,.14)'; dd.style.boxShadow = j === show ? '0 0 12px 2px rgba(212,0,0,.8)' : 'none'; dd.style.width = j === show ? '34px' : '14px'; });
        const ct = byId('pf-count'); if (ct) ct.textContent = String(show + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
      }
    }
  }

  // one rAF loop; when the tab is hidden rAF stops — keep state in sync for screenshotters/background tabs
  const loop = t => { requestAnimationFrame(loop); try { frame(t); } catch (err) { if (!loop.e) { loop.e = 1; console.error(err); } } };
  requestAnimationFrame(loop);
  setInterval(() => { if (d.hidden) try { frame(performance.now()); } catch (_) { /* ignore */ } }, 150);

  // 3D — lazy, after first render (home: after the preloader), never on weak devices
  const go3d = () => setTimeout(() => idle(() => load3d(scene3d), 4000), home ? 0 : 3500);
  if (home && byId('loader')) d.addEventListener('iu:loader-done', go3d, { once: true });
  else if (d.readyState === 'complete') go3d(); else addEventListener('load', go3d, { once: true });
}

/* ------------------------------------------------------------------ 3D scenes */
function still(canvas) {
  canvas.style.display = 'none';
  canvas.parentElement.classList.remove('iu-live-on');
}
function watchFps(canvas, name, dispose) {
  let n = 0, t0 = 0;
  return now => {
    if (!t0) { t0 = now; return; }
    n++;
    if (now - t0 > 2000 && n >= 0) { const fps = n / ((now - t0) / 1000); if (fps < 40 && !watchFps.done) { watchFps.done = true; dispose(); still(canvas, name); } t0 = Infinity; }
  };
}
async function load3d(scene3d) {
  if (KIND === 'home') {
    const c = byId('snake-canvas'); if (!c) return;
    const name = narrow() ? 'snake-m' : 'snake';
    if (WEAK || RM) { still(c, name); return; }
    try {
      const { createScene } = await import(BASE_3D + 'iu-snake.js');
      let sc = null;
      const fps = watchFps(c, name, () => { sc && sc.dispose(); scene3d.snake = null; });
      let shown = false;
      sc = createScene(c, { mode: 'glb', glb: GLB, onFrame: now => { if (!shown && sc && sc.ready) { shown = true; c.parentElement.classList.add('iu-live-on'); } fps(now); } });
      scene3d.snake = sc;
    } catch (e) { console.error(e); still(c, name); }
  } else if (KIND === '404') {
    const c = byId('c404'); if (!c) return;
    if (WEAK || RM) { still(c, 'snake-404'); return; }
    try {
      const { createScene } = await import(BASE_3D + 'iu-snake.js');
      const nw = narrow();
      let shown = false, sc = null;
      sc = createScene(c, { mode: 'glb', glb: GLB, onFrame: () => { if (!shown && sc && sc.ready) { shown = true; c.parentElement.classList.add('iu-live-on'); } } });
      sc.setPose({ x: nw ? 0 : .9, y: nw ? .55 : .1, z: 0, rx: .15, ry: -1.4, rz: .5, s: nw ? .6 : .9, o: 1 }); sc.snap();
      const t0 = performance.now();
      const spin = () => { const t = (performance.now() - t0) / 1000; sc.setPose({ ry: -1.4 + Math.sin(t * .4) * .6, rz: .5 + Math.sin(t * .7) * .12 }); requestAnimationFrame(spin); };
      spin();
    } catch (e) { console.error(e); }
  } else {
    const c = byId('glyph-canvas'); if (!c) return;
    const path = location.pathname;
    try {
      const { createGlyph, kindForPath } = await import(BASE_3D + 'iu-glyph.js');
      const kind = kindForPath(path);
      if (WEAK || RM) { still(c, 'glyph-' + kind); return; }
      let g = null;
      const fps = watchFps(c, 'glyph-' + kind, () => { g && g.dispose(); scene3d.glyph = null; });
      let shown = false;
      g = createGlyph(c, kind, { onFrame: now => { if (!shown) { shown = true; c.parentElement.classList.add('iu-live-on'); } fps(now); } });
      if (g) scene3d.glyph = g;
    } catch (e) { console.error(e); }
  }
}

/* ------------------------------------------------------------------ lead forms → api.infiniteunion.com.ua/lead */
function initForms() {
  const API = 'https://api.infiniteunion.com.ua/lead';
  const TX = {
    uk: { req: 'Заповніть це поле', contact: 'Вкажіть @username у Telegram або номер телефону', phone: 'Перевірте номер телефону', sending: 'Надсилаємо…', wait: 'Зачекайте 30 секунд перед повторною відправкою.', err: 'Не вдалося надіслати заявку', errTxt: 'Перевірте з’єднання або напишіть нам у', timeout: 'Сервер не відповів вчасно', tg: 'Telegram' },
    en: { req: 'Please fill in this field', contact: 'Enter your Telegram @username or phone number', phone: 'Please check the phone number', sending: 'Sending…', wait: 'Please wait 30 seconds before sending again.', err: 'Could not send the request', errTxt: 'Check your connection or message us on', timeout: 'The server did not respond in time', tg: 'Telegram' },
  }[LANG];
  const toast = (title, html) => {
    let el = byId('iu-toast');
    if (!el) { el = d.createElement('div'); el.id = 'iu-toast'; el.className = 'iu-toast'; el.setAttribute('role', 'alert'); d.body.appendChild(el); }
    el.innerHTML = `<b>${title}</b>${html}`;
    requestAnimationFrame(() => el.classList.add('on'));
    clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 7000);
  };
  const tgLink = '<a href="https://t.me/infiniteunion_manager" target="_blank" rel="noopener">' + TX.tg + '</a>.';
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
  $$('form[data-lead]').forEach(form => {
    const f = n => form.querySelector(`[name="${n}"]`);
    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn && ([...btn.querySelectorAll('span')].pop() || btn);
    const btnLabel = btnText ? btnText.textContent : '';
    const sent = form.querySelector('[data-sent]');
    let key = uuid(), busy = false;
    const setErr = (input, msg) => {
      if (!input) return;
      const lab = input.closest('label') || input.parentElement;
      let e = lab.querySelector('.iu-err');
      if (!msg) { input.removeAttribute('aria-invalid'); if (e) e.remove(); return; }
      input.setAttribute('aria-invalid', 'true');
      if (!e) { e = d.createElement('span'); e.className = 'iu-err'; e.id = 'err-' + input.name + '-' + Math.random().toString(36).slice(2, 7); lab.appendChild(e); input.setAttribute('aria-describedby', e.id); }
      e.textContent = msg;
    };
    form.addEventListener('input', e => { if (e.target.getAttribute('aria-invalid')) setErr(e.target, ''); key = key || uuid(); });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (busy) return;
      if (f('website') && f('website').value) return; // honeypot: silently ignore
      const name = f('cn'), contact = f('cc'), phone = f('cphone');
      let bad = null;
      const v = x => (x ? x.value.trim() : '');
      if (!v(name)) { setErr(name, TX.req); bad = bad || name; } else setErr(name, '');
      const cv = v(contact), digits = cv.replace(/\D/g, '');
      if (!cv) { setErr(contact, TX.req); bad = bad || contact; }
      else if (!(/^@?[a-zA-Z][a-zA-Z0-9_]{3,31}$/.test(cv) || /t\.me\/[a-zA-Z0-9_]{4,}/.test(cv) || (digits.length >= 9 && digits.length <= 15 && /^[+\d\s()-]+$/.test(cv)))) { setErr(contact, TX.contact); bad = bad || contact; }
      else setErr(contact, '');
      const pd = v(phone).replace(/\D/g, '');
      if (v(phone) && (pd.length < 9 || pd.length > 15 || !/^[+\d\s()-]+$/.test(v(phone)))) { setErr(phone, TX.phone); bad = bad || phone; } else setErr(phone, '');
      if (bad) { bad.focus(); return; }
      let last = 0; try { last = +sessionStorage.getItem('_iu_ls') || 0; } catch (_) { /* ignore */ }
      if (Date.now() - last < 30000) { toast(TX.wait, ''); return; }
      busy = true;
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
      if (btnText) btnText.textContent = TX.sending;
      const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), 10000);
      try {
        const res = await fetch(API, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
          body: JSON.stringify({
            name: v(name), contact: cv, phone: v(phone), project_type: v(f('ctype')), budget: v(f('cbudget')),
            deadline: v(f('cdeadline')), project: v(f('cp')), idempotency_key: key,
          }),
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        try { sessionStorage.setItem('_iu_ls', String(Date.now())); } catch (_) { /* ignore */ }
        key = uuid();
        form.reset();
        if (sent) { sent.hidden = false; }
        (window.dataLayer = window.dataLayer || []).push({ event: 'form_success' });
        if (typeof window.gtag === 'function') window.gtag('event', 'conversion', { send_to: 'AW-18360841103/YwDACNqs1tocEI_nkLNE', value: 1.0, currency: 'UAH' });
      } catch (err) {
        clearTimeout(timer);
        toast(err.name === 'AbortError' ? TX.timeout : TX.err, `${TX.errTxt} ${tgLink}`);
      } finally {
        busy = false;
        if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); }
        if (btnText) btnText.textContent = btnLabel;
      }
    });
  });
}

/* ------------------------------------------------------------------ Sentry (deferred: not on the critical path) */
function loadSentry() {
  if (location.hostname !== 'infiniteunion.com.ua' && location.hostname !== 'www.infiniteunion.com.ua') return;
  const s = d.createElement('script');
  s.src = 'https://js-de.sentry-cdn.com/bb98cf6e98bd2742343eeff2758f291b.min.js'; s.crossOrigin = 'anonymous';
  s.onload = () => window.Sentry && window.Sentry.onLoad(() => window.Sentry.init({
    dsn: 'https://bb98cf6e98bd2742343eeff2758f291b@o4511772270002176.ingest.de.sentry.io/4511772279177296',
    tracesSampleRate: 0.1, environment: 'production', allowUrls: [/https:\/\/(www\.)?infiniteunion\.com\.ua/],
  }));
  d.head.appendChild(s);
}
