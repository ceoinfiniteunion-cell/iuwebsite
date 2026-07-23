!function () {
  const section = document.getElementById('snake-intro');
  if (!section) return;
  const canvas = document.getElementById('hero-snake-c');
  if (!canvas) return;

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;
  const isMobile = () => W() < 768;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(isMobile() ? 65 : 45, W() / H(), 0.1, 100);
  camera.position.set(0, 0.3, isMobile() ? 9 : 4.5);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(2, 4, 3);
  scene.add(dirLight);
  const pointRed1 = new THREE.PointLight(0xd40000, 4, 8);
  pointRed1.position.set(-1, 1, 2);
  scene.add(pointRed1);
  const pointRed2 = new THREE.PointLight(0xd40000, 3, 6);
  pointRed2.position.set(1, -1, 1);
  scene.add(pointRed2);

  let model = null;
  let scrollProgress = 0;
  let mouseX = 0;
  let mouseY = 0;

  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('vendor/three/draco/');
  const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load(
    'https://res.cloudinary.com/etdq5y69/raw/upload/v1783282631/snake3d.glb',
    (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      // FIX: делим на реальный размер модели, не на Math.max(1)
      const targetScale = (isMobile() ? 2.4 : 2.6) / Math.max(size.x, size.y, size.z);
      model.userData.initialScale = targetScale;
      model.scale.setScalar(targetScale);
      model.position.sub(center.multiplyScalar(targetScale));
      model.position.y = isMobile() ? 0 : model.position.y - 0.2;
      model.rotation.y = 0;
      scene.add(model);
      window.__IU_GLB_DONE = true;
      window.dispatchEvent(new CustomEvent('iu:glb-loaded'));
    },
    (xhr) => {
      if (xhr && xhr.lengthComputable && xhr.total > 0) {
        const pct = Math.min(100, (xhr.loaded / xhr.total) * 100);
        window.__IU_GLB_PROGRESS = pct;
        window.dispatchEvent(new CustomEvent('iu:glb-progress', { detail: pct }));
      }
    },
    () => {
      const makeText = (opacity) => {
        const el = document.createElement('div');
        el.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;';
        el.innerHTML = `<div style="font-family:var(--fh);font-size:clamp(48px,10vw,140px);font-weight:700;letter-spacing:-.04em;color:rgba(237,232,229,${opacity});">INFINITE</div>`;
        return el;
      };
      window.__IU_GLB_DONE = true;
      window.dispatchEvent(new CustomEvent('iu:glb-loaded'));
      const sticky = document.querySelector('.si-sticky');
      if (sticky && !sticky.querySelector('.si-fallback')) {
        const fb = makeText(0.04);
        fb.className = 'si-fallback';
        sticky.appendChild(fb);
        sticky.appendChild(makeText(0.06));
      }
    }
  );

  const tags = document.querySelectorAll('.si-tag');
  const crosshair = document.querySelector('.si-crosshair');

  // FIX: passive: true — не блокирует тач-скролл
  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - H();
    if (scrollable <= 0) return;
    scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollable));

    const mob = isMobile();
    tags.forEach((tag, i) => {
      // на мобильном вылет начинается раньше и идёт поочерёдно снизу вверх
      const delay = mob ? 0.07 * i : 0.05 * i;
      const start = mob ? 0.18 : 0.42;
      const span = mob ? 0.14 : 0.12;
      const opacity = Math.max(0, Math.min(1, (scrollProgress - start - delay) / span));
      tag.style.opacity = opacity;
      if (mob) {
        // горизонтальный вылет слева — теги идут вертикальным стеком
        const dx = -48 * (1 - opacity);
        tag.style.transform = `translateX(${dx}px)`;
      } else {
        const offsets = [[-60, -30], [60, -30], [-60, 30], [60, 30]];
        tag.style.transform = `translate(${offsets[i][0] * (1 - opacity)}px, ${offsets[i][1] * (1 - opacity)}px)`;
      }
    });

    if (crosshair) {
      const e = Math.max(0, Math.min(1, (scrollProgress - 0.4) / 0.12));
      crosshair.style.borderColor = `rgba(212,0,0,${0.4 * e})`;
      crosshair.style.boxShadow = e > 0 ? `0 0 ${40 * e}px rgba(212,0,0,${0.15 * e})` : 'none';
      document.documentElement.style.setProperty('--ch-op', e);
    }
  }, { passive: true });

  // FIX: resize только по событию с debounce, не на каждом кадре
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderer.setSize(W(), H());
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
    }, 150);
  });

  const clock = new THREE.Clock();

  (function tick() {
    requestAnimationFrame(tick);
    const t = clock.getElapsedTime();

    mouseX += 0.05 * (0 - mouseX);
    mouseY += 0.05 * (0 - mouseY);

    if (model) {
      model.rotation.y += 0.04 * (2 * Math.PI * scrollProgress - model.rotation.y);
      model.rotation.x += 0.06 * (0 - model.rotation.x);
      const targetY = isMobile() ? 0 : 5 * Math.min(1, scrollProgress / 0.4) - 5;
      model.position.y += 0.05 * (targetY - model.position.y);
      // десктоп: scale растёт при скролле (как в оригинале), мобильный — статично
      if (model.userData.initialScale && !isMobile()) {
        const targetSc = model.userData.initialScale * (1 + 0.15 * scrollProgress);
        model.scale.setScalar(model.scale.x + 0.05 * (targetSc - model.scale.x));
      }
    }

    pointRed1.intensity = 3 + 1.5 * Math.sin(2.5 * t);
    camera.position.x += 0.04 * (0.3 * mouseX * (1 - 0.5 * scrollProgress) - camera.position.x);
    camera.position.y += 0.04 * (0.2 * -mouseY + 0.3 - camera.position.y);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  })();
}();
