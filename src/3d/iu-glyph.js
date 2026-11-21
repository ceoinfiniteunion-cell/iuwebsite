// Production copy of design/iu-glyph.js (DPR caps, AA desktop-only, onFrame hook). Keep in sync.
import * as THREE from './vendor/three.module.min.js';

// Kinds: google | meta | instagram | tiktok | seo | pin | telegram | code | coins | cubes | rings | infinity
export function kindForPath(path) {
  const p = path || '';
  if (/google-ads/.test(p)) return 'google';
  if (/meta-ads-instagram/.test(p)) return 'instagram';
  if (/meta-ads/.test(p)) return 'meta';
  if (/tiktok/.test(p)) return 'tiktok';
  if (/seo-local/.test(p)) return 'pin';
  if (/seo/.test(p)) return 'seo';
  if (/bots/.test(p)) return 'telegram';
  if (/websites|constructor/.test(p)) return 'code';
  if (/pricing/.test(p)) return 'coins';
  if (/platforms/.test(p)) return 'cubes';
  if (/ecosystems/.test(p)) return 'rings';
  return 'infinity';
}

const ring = (R, r, a0 = 0, a1 = Math.PI * 2) => { const s = new THREE.Shape(); s.absarc(0, 0, R, a0, a1, false); s.absarc(0, 0, r, a1, a0, true); return s; };
const rect = (x0, y0, x1, y1) => { const s = new THREE.Shape(); s.moveTo(x0, y0); s.lineTo(x1, y0); s.lineTo(x1, y1); s.lineTo(x0, y1); s.closePath(); return s; };
const poly = pts => { const s = new THREE.Shape(); s.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(p => s.lineTo(p[0], p[1])); s.closePath(); return s; };
const roundRect = (w, h, r) => { const s = new THREE.Shape(), x = -w / 2, y = -h / 2; s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; };

function shapesFor(kind) {
  if (kind === 'google') {
    const R = 1, r = .64, a0 = .62, t = .34, s = new THREE.Shape();
    s.moveTo(R * Math.cos(a0), R * Math.sin(a0)); s.absarc(0, 0, R, a0, Math.PI * 2, false);
    s.lineTo(R, t); s.lineTo(.02, t); s.lineTo(.02, 0); s.lineTo(r, 0);
    s.absarc(0, 0, r, Math.PI * 2, a0, true); s.closePath();
    return [s];
  }
  if (kind === 'meta') {
    const stem = rect(-.19, -1.05, .19, .6), bar = rect(-.52, .02, .56, .34);
    const hook = new THREE.Shape(); const cx = .56, cy = .6, R = .75, r = .37;
    hook.moveTo(cx - R, cy); hook.absarc(cx, cy, R, Math.PI, Math.PI / 2, true); hook.lineTo(cx + .3, cy + R); hook.lineTo(cx + .3, cy + r); hook.lineTo(cx, cy + r); hook.absarc(cx, cy, r, Math.PI / 2, Math.PI, false); hook.closePath();
    return [stem, bar, hook];
  }
  if (kind === 'tiktok') {
    const stem = rect(.02, -.62, .34, 1.15);
    const flag = new THREE.Shape(); flag.moveTo(.3, 1.15); flag.quadraticCurveTo(.42, .72, .98, .66); flag.lineTo(.98, .32); flag.quadraticCurveTo(.55, .36, .3, .62); flag.closePath();
    const head = new THREE.Shape(); head.absarc(-.14, -.62, .48, 0, Math.PI * 2, false);
    const hole = new THREE.Path(); hole.absarc(-.14, -.62, .18, 0, Math.PI * 2, true); head.holes.push(hole);
    return [stem, flag, head];
  }
  if (kind === 'instagram') {
    const o = roundRect(2, 2, .55); const h = roundRect(1.52, 1.52, .36); o.holes.push(h);
    const lens = ring(.5, .3); const dot = new THREE.Shape(); dot.absarc(.48, .48, .12, 0, Math.PI * 2, false);
    return [o, lens, dot];
  }
  if (kind === 'seo') {
    const lens = ring(.78, .54); lens.getPoints(); const g = new THREE.Group();
    const handle = poly([[.5, -.38], [.68, -.56], [1.25, -1.13], [1.07, -1.31], [.5, -.74], [.32, -.56]]);
    return [lens, handle];
  }
  if (kind === 'pin') {
    const s = new THREE.Shape(); s.moveTo(0, -1.2); s.bezierCurveTo(-.35, -.55, -.85, -.1, -.85, .35); s.absarc(0, .35, .85, Math.PI, 0, true); s.bezierCurveTo(.85, -.1, .35, -.55, 0, -1.2);
    const hole = new THREE.Path(); hole.absarc(0, .35, .34, 0, Math.PI * 2, true); s.holes.push(hole);
    return [s];
  }
  if (kind === 'telegram') {
    return [poly([[-1.15, .05], [1.05, .85], [.55, -.9], [.08, -.38], [-.18, -.7], [-.2, -.25]])];
  }
  if (kind === 'code') {
    const lt = poly([[-.55, .75], [-1.3, 0], [-.55, -.75], [-.4, -.55], [-.95, 0], [-.4, .55]]);
    const gt = poly([[.55, .75], [1.3, 0], [.55, -.75], [.4, -.55], [.95, 0], [.4, .55]]);
    const sl = poly([[.1, .95], [.3, .95], [-.1, -.95], [-.3, -.95]]);
    return [lt, sl, gt];
  }
  return null;
}

function envTexture(renderer) {
  const pm = new THREE.PMREMGenerator(renderer), s = new THREE.Scene();
  s.add(new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), new THREE.MeshBasicMaterial({ color: 0x050303, side: THREE.BackSide })));
  const add = (w, h, c, pos, rot) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })); m.position.set(...pos); m.rotation.set(...rot); s.add(m); };
  add(7, 1.4, new THREE.Color(4, 4, 4), [0, 5.5, 0], [Math.PI / 2, 0, 0]);
  add(1.6, 5, new THREE.Color(5, .4, .3), [-5.8, 0, 1], [0, Math.PI / 2, 0]);
  add(1.2, 4, new THREE.Color(2.5, 2.3, 2.2), [5.8, .6, 0], [0, -Math.PI / 2, 0]);
  add(5, .8, new THREE.Color(3, .25, .2), [0, -2, -5.8], [0, 0, 0]);
  const tex = pm.fromScene(s, .035).texture; pm.dispose(); return tex;
}

class Lemniscate extends THREE.Curve { getPoint(t, o = new THREE.Vector3()) { const u = t * Math.PI * 2, d = 1 + Math.sin(u) ** 2; return o.set(1.35 * Math.cos(u) / d, 1.35 * Math.sin(u) * Math.cos(u) / d, .25 * Math.sin(u)); } }

export function createGlyph(canvas, kind, opts = {}) {
  let gl;
  try { gl = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !matchMedia("(pointer: coarse)").matches, powerPreference: 'high-performance', preserveDrawingBuffer: !!opts.preserve }); } catch (e) { return null; }
  gl.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 820 ? 1.5 : 1.75)); gl.outputColorSpace = THREE.SRGBColorSpace; gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.15;
  const scene = new THREE.Scene(); scene.environment = envTexture(gl);
  const cam = new THREE.PerspectiveCamera(34, 1, .1, 100); cam.position.set(0, .15, 6.2);
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(2, 4, 4); scene.add(key);
  const redL = new THREE.PointLight(0xff2a1f, 18, 7); scene.add(redL);
  const redL2 = new THREE.PointLight(0xd40000, 10, 8); redL2.position.set(-2.4, -1.2, 1.6); scene.add(redL2);

  const black = new THREE.MeshPhysicalMaterial({ color: 0x141111, metalness: 1, roughness: .24, clearcoat: 1, clearcoatRoughness: .12, envMapIntensity: 1.3 });
  const red = new THREE.MeshPhysicalMaterial({ color: 0xd40000, metalness: .35, roughness: .22, clearcoat: 1, clearcoatRoughness: .08, emissive: 0x4a0000, envMapIntensity: 1.1 });
  const glow = new THREE.MeshBasicMaterial({ color: new THREE.Color(3, .25, .15) });

  const root = new THREE.Group(), body = new THREE.Group(); root.add(body); scene.add(root);
  const shapes = shapesFor(kind);
  let bouncy = ['google', 'meta', 'tiktok', 'instagram', 'pin'].includes(kind);
  if (shapes) {
    const geo = new THREE.ExtrudeGeometry(shapes, { depth: .42, bevelEnabled: true, bevelThickness: .09, bevelSize: .055, bevelSegments: 6, curveSegments: 64 });
    geo.center();
    body.add(new THREE.Mesh(geo, [black, red]));
    if (kind === 'tiktok') {
      const ghost = (c, dx, dy) => { const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: .55 })); m.position.set(dx, dy, -.22); m.scale.setScalar(1.0); body.add(m); };
      ghost(new THREE.Color(2.4, .15, .1), .09, -.07); ghost(new THREE.Color(1.6, 1.6, 1.6), -.07, .06);
    }
  } else if (kind === 'coins') {
    const cg = new THREE.CylinderGeometry(.95, .95, .2, 72, 1);
    for (let i = 0; i < 5; i++) { const m = new THREE.Mesh(cg, [red, black, black]); m.position.set(Math.sin(i * 1.7) * .09, -.8 + i * .24, Math.cos(i * 2.3) * .09); m.rotation.y = i * .4; m.userData.i = i; body.add(m); }
    const top = new THREE.Mesh(cg, [red, black, black]); top.position.set(.35, .75, .2); top.rotation.set(1.15, 0, .35); top.userData.flip = true; body.add(top);
  } else if (kind === 'cubes') {
    const bg = new THREE.BoxGeometry(.34, .34, .34);
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) { const hot = (x + y * 2 + z * 3 + 9) % 4 === 0; const m = new THREE.Mesh(bg, hot ? red : black); m.userData.base = new THREE.Vector3(x * .72, y * .72, z * .72); m.position.copy(m.userData.base); body.add(m); }
    bouncy = false;
  } else if (kind === 'rings') {
    const tg = new THREE.TorusGeometry(.62, .14, 32, 120);
    [[-.55, .3, 0, 0], [.55, .3, 0, Math.PI / 2], [0, -.55, Math.PI / 2, 0]].forEach(([x, y, rx, ry], i) => { const m = new THREE.Mesh(tg, i === 1 ? red : black); m.position.set(x, y, 0); m.rotation.set(rx + .3, ry, 0); body.add(m); });
  } else {
    const geo = new THREE.TubeGeometry(new Lemniscate(), 320, .2, 40, true);
    body.add(new THREE.Mesh(geo, black));
    const geo2 = new THREE.TubeGeometry(new Lemniscate(), 320, .206, 40, true);
    const stripe = new THREE.Mesh(geo2, new THREE.MeshPhysicalMaterial({ color: 0xd40000, metalness: .3, roughness: .2, clearcoat: 1, transparent: true, opacity: .9, alphaTest: .5 }));
    const c = document.createElement('canvas'); c.width = 512; c.height = 8; const x = c.getContext('2d'); for (let i = 0; i < 512; i += 32) { x.fillStyle = '#fff'; x.fillRect(i, 0, 12, 8); }
    stripe.material.alphaMap = new THREE.CanvasTexture(c); stripe.material.alphaMap.wrapS = THREE.RepeatWrapping; stripe.material.alphaMap.repeat.set(6, 1); body.add(stripe);
  }
  const box = new THREE.Box3().setFromObject(body), sz = box.getSize(new THREE.Vector3()), k = 2.5 / Math.max(sz.x, sz.y, sz.z);
  body.scale.setScalar(k);

  const orbit = [];
  for (let i = 0; i < 3; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(.045 + i * .012, 16, 16), glow); orbit.push(m); scene.add(m); }

  const sc = document.createElement('canvas'); sc.width = sc.height = 128; const sx = sc.getContext('2d'); const gr = sx.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, 'rgba(212,0,0,.75)'); gr.addColorStop(.5, 'rgba(120,0,0,.25)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); sx.fillStyle = gr; sx.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -1.75; scene.add(shadow);

  const resize = () => { const w = canvas.clientWidth || 400, h = canvas.clientHeight || 400; gl.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  resize(); const ro = new ResizeObserver(resize); ro.observe(canvas);
  const m = { x: 0, y: 0, sx: 0, sy: 0 };
  const onMove = e => { const r = canvas.getBoundingClientRect(); m.x = ((e.clientX - r.left) / r.width - .5) * 2; m.y = ((e.clientY - r.top) / r.height - .5) * 2; };
  addEventListener('pointermove', onMove, { passive: true });
  let alive = true, scroll = 0, t0 = performance.now(), last = t0, spinV = 0, spin = 0;
  canvas.addEventListener('pointerdown', () => { spinV += 9; });
  const lerp = (a, b, k) => a + (b - a) * k;
  const tick = now => {
    if (!alive) return; requestAnimationFrame(tick);
    const r = canvas.getBoundingClientRect(); if (document.hidden || r.bottom < 0 || r.top > innerHeight) { last = now; return; }
    const dt = Math.min(.05, (now - last) / 1000); last = now; const t = (now - t0) / 1000;
    m.sx = lerp(m.sx, m.x, .06); m.sy = lerp(m.sy, m.y, .06);
    spinV *= Math.pow(.04, dt); spin += spinV * dt;
    let y = Math.sin(t * 1.3) * .08, sq = 1;
    if (bouncy) { const ph = Math.abs(Math.sin(t * 2.1)); y = ph * .5 - .2; sq = ph < .18 ? 1 - (.18 - ph) * 1.1 : 1; }
    root.position.y = y - scroll * .6;
    body.scale.set(k * (2 - sq), k * sq, k * (2 - sq));
    root.rotation.y = Math.sin(t * .55) * .55 + m.sx * .5 + scroll * Math.PI * 1.2 + spin;
    root.rotation.x = m.sy * .28 + Math.sin(t * .8) * .06;
    root.rotation.z = Math.sin(t * .7) * .05;
    if (kind === 'cubes') body.children.forEach((c, i) => { const b = c.userData.base, e = 1 + Math.max(0, Math.sin(t * 1.6 + i * .5)) * .22; c.position.set(b.x * e, b.y * e, b.z * e); c.rotation.set(0, 0, 0); });
    if (kind === 'coins') body.children.forEach(c => { if (c.userData.flip) c.rotation.x = 1.15 + Math.sin(t * 2.4) * .5; });
    if (kind === 'rings') body.children.forEach((c, i) => { c.rotation.z = t * (.4 + i * .15); });
    orbit.forEach((o, i) => { const a = t * (1.1 + i * .35) + i * 2.1, R = 1.75 + i * .18; o.position.set(Math.cos(a) * R, Math.sin(a * .7 + i) * .55 + root.position.y * .5, Math.sin(a) * R * .55); });
    redL.position.copy(orbit[0].position);
    shadow.material.opacity = .9 - (y + .2) * .9; shadow.scale.setScalar(1 - (y + .2) * .35);
    canvas.style.opacity = String(Math.max(0, 1 - scroll * 1.3));
    gl.render(scene, cam);
    opts.onFrame && opts.onFrame(now);
  };
  requestAnimationFrame(tick);
  return {
    setScroll(p) { scroll = Math.max(0, Math.min(1, p)); },
    kick() { spinV += 9; },
    dispose() { alive = false; ro.disconnect(); removeEventListener('pointermove', onMove); gl.dispose(); }
  };
}
