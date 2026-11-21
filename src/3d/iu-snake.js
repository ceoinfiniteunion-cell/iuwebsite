// Production copy of design/iu-snake.js (local GLB, DPR caps, AA desktop-only, onFrame hook). Keep in sync.
import * as THREE from './vendor/three.module.min.js';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { DRACOLoader } from './vendor/DRACOLoader.js';

const GLB = 'https://res.cloudinary.com/etdq5y69/raw/upload/v1783282631/snake3d.glb';

class Lemniscate extends THREE.Curve {
  getPoint(t, o = new THREE.Vector3()) {
    const a = 1.25, u = t * Math.PI * 2, d = 1 + Math.sin(u) ** 2;
    return o.set((a * Math.sin(u) * Math.cos(u)) / d, (a * Math.cos(u)) / d, 0.22 * Math.sin(u));
  }
}

function proceduralSnake() {
  const g = new THREE.Group();
  const tub = 220, rad = 28;
  const geo = new THREE.TubeGeometry(new Lemniscate(), tub, 0.17, rad, true);
  const n = geo.attributes.position.count, col = new Float32Array(n * 3);
  const dark = new THREE.Color(0x1c1a1a), red = new THREE.Color(0x7a0008), silver = new THREE.Color(0x8c8a88);
  for (let i = 0; i < n; i++) {
    const seg = Math.floor(i / (rad + 1)), ring = i % (rad + 1), t = seg / tub;
    const inRed = t > 0.56 && t < 0.9, band = ring % 7 === 0;
    const c = band ? silver : inRed ? red : dark;
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.MeshPhysicalMaterial({ vertexColors: true, metalness: 0.85, roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.2 });
  g.add(new THREE.Mesh(geo, mat));
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), new THREE.MeshPhysicalMaterial({ color: 0xd40000, emissive: 0x6a0000, roughness: 0.1, metalness: 0.2 }));
  const p = new Lemniscate().getPoint(0.015); eye.position.set(p.x + 0.12, p.y + 0.08, p.z + 0.14); g.add(eye);
  return g;
}

export function createScene(canvas, opts = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !matchMedia("(pointer: coarse)").matches, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 820 ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.9;
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  cam.position.set(0, 0.1, 5);
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xfff1e6, 2.6); key.position.set(2.5, 4, 3); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.4); rim.position.set(-3, -1, -2); scene.add(rim);
  const r1 = new THREE.PointLight(0xd40000, 7, 9); r1.position.set(-1.6, 1.2, 2); scene.add(r1);
  const r2 = new THREE.PointLight(0xd40000, 5, 7); r2.position.set(1.4, -1.4, 1.2); scene.add(r2);

  const root = new THREE.Group(); scene.add(root);
  let model = null, mats = [];
  const pose = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, s: 1, o: 1 };
  const cur = { ...pose };
  const mouse = { x: 0, y: 0 }, mcur = { x: 0, y: 0 };
  let ready = false, alive = true, paused = false, lastT = performance.now(), idle = 0;

  function adopt(obj) {
    const box = new THREE.Box3().setFromObject(obj);
    const c = box.getCenter(new THREE.Vector3()), sz = box.getSize(new THREE.Vector3());
    const k = 2.7 / Math.max(sz.x, sz.y, sz.z);
    obj.scale.setScalar(k); obj.position.sub(c.multiplyScalar(k));
    mats = [];
    obj.traverse(m => { if (m.isMesh && m.material) { m.material.transparent = true; m.material.needsUpdate = true; mats.push(m.material); } });
    model = obj; root.add(obj); ready = true;
    opts.onReady && opts.onReady();
  }

  if (opts.mode !== 'procedural') {
    const draco = new DRACOLoader(); draco.setDecoderPath(new URL('./vendor/draco/', import.meta.url).href);
    const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
    let done = false;
    const timer = setTimeout(() => { if (!done) { done = true; adopt(proceduralSnake()); } }, 9000);
    loader.load(opts.glb || GLB, g => { if (done) return; done = true; clearTimeout(timer); adopt(g.scene); },
      e => { if (e && e.total) opts.onProgress && opts.onProgress(Math.min(100, e.loaded / e.total * 100)); },
      () => { if (done) return; done = true; clearTimeout(timer); adopt(proceduralSnake()); });
  } else adopt(proceduralSnake());

  function resize() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
  }
  resize(); addEventListener('resize', resize);
  const onMove = e => { mouse.x = (e.clientX / innerWidth - 0.5) * 2; mouse.y = (e.clientY / innerHeight - 0.5) * 2; };
  addEventListener('pointermove', onMove, { passive: true });

  const lerp = (a, b, t) => a + (b - a) * t;
  function frame(now) {
    if (!alive) return;
    requestAnimationFrame(frame);
    if (paused || document.hidden) { lastT = now; return; }
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now; idle += dt;
    const k = 1 - Math.pow(0.001, dt);
    for (const p in pose) cur[p] = lerp(cur[p], pose[p], k);
    mcur.x = lerp(mcur.x, mouse.x, k * 0.6); mcur.y = lerp(mcur.y, mouse.y, k * 0.6);
    root.position.set(cur.x, cur.y + Math.sin(idle * 0.9) * 0.03, cur.z);
    root.rotation.set(cur.rx + mcur.y * 0.12, cur.ry + mcur.x * 0.22 + Math.sin(idle * 0.5) * 0.04, cur.rz);
    root.scale.setScalar(Math.max(0.0001, cur.s));
    r1.intensity = 6 + Math.sin(idle * 1.7) * 1.5;
    for (const m of mats) m.opacity = cur.o;
    root.visible = cur.o > 0.01;
    renderer.render(scene, cam);
    opts.onFrame && opts.onFrame(now);
  }
  requestAnimationFrame(frame);

  return {
    setPose(p) { Object.assign(pose, p); },
    snap() { Object.assign(cur, pose); },
    setPaused(v) { paused = !!v; },
    get ready() { return ready; },
    dispose() { alive = false; removeEventListener('resize', resize); removeEventListener('pointermove', onMove); renderer.dispose(); }
  };
}
