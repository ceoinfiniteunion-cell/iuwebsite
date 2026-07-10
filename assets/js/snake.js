/* ── SNAKE INTRO SCROLL ── */
(function(){
  const cont = document.getElementById('snake-intro');
  if(!cont) return;

  const c = document.getElementById('hero-snake-c');
  if(!c) return;

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;

  const renderer = new THREE.WebGLRenderer({canvas:c, alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, W()/H(), .1, 100);
  cam.position.set(0, .3, 4.5);

  scene.add(new THREE.AmbientLight(0xffffff, .5));
  const dl = new THREE.DirectionalLight(0xffffff, 1.2);
  dl.position.set(2,4,3); scene.add(dl);
  const rl = new THREE.PointLight(0xD40000, 4, 8);
  rl.position.set(-1,1,2); scene.add(rl);
  const rl2 = new THREE.PointLight(0xD40000, 3, 6);
  rl2.position.set(1,-1,1); scene.add(rl2);

  let snake = null;
  let scrollProgress = 0;
  let mx = 0, my = 0, smx = 0, smy = 0;

  const draco = new THREE.DRACOLoader();
  draco.setDecoderPath("vendor/three/draco/");
  const loader = new THREE.GLTFLoader();
  loader.setDRACOLoader(draco);

  loader.load('https://res.cloudinary.com/etdq5y69/raw/upload/v1783282631/snake3d.glb',
    g => {
      snake = g.scene;
      const box = new THREE.Box3().setFromObject(snake);
      const ctr = box.getCenter(new THREE.Vector3());
      const sz = box.getSize(new THREE.Vector3());
      const sc = 2.6 / Math.max(sz.x, sz.y, sz.z);
      snake.scale.setScalar(sc);
      snake.position.sub(ctr.multiplyScalar(sc));
      snake.position.y -= .2;
      snake.rotation.y = 0;
      scene.add(snake);
    },
    undefined,
    e => {
      /* GLB failed to load — fallback already handled by DOM insertion */
      const _fb = document.createElement('div');
      _fb.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;';
      _fb.innerHTML = '<div style="font-family:var(--fh);font-size:clamp(48px,10vw,140px);font-weight:700;letter-spacing:-.04em;color:rgba(237,232,229,0.04);">INFINITE</div>';
      const _sticky = document.querySelector('.si-sticky');
      if (_sticky && !_sticky.querySelector('.si-fallback')) {
        _fb.className = 'si-fallback';
        _sticky.appendChild(_fb);
      }
      const fb = document.createElement('div');
      fb.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;';
      fb.innerHTML = '<div style="font-family:var(--fh);font-size:clamp(48px,10vw,140px);font-weight:700;letter-spacing:-.04em;color:rgba(237,232,229,0.06);">INFINITE</div>';
      const sticky = document.querySelector('.si-sticky');
      if(sticky) sticky.appendChild(fb);
    }
  );

  /* mousemove вимкнено — керуємо тільки скролом */

  const tags = document.querySelectorAll('.si-tag');
  const crosshair = document.querySelector('.si-crosshair');

  window.addEventListener('scroll', () => {
    const rect = cont.getBoundingClientRect();
    const total = cont.offsetHeight - H();
    const scrolled = -rect.top;
    scrollProgress = Math.max(0, Math.min(1, scrolled / total));



    // Теги вилітають при progress > 0.45
    tags.forEach((tag, i) => {
      const delay = i * 0.05;
      const p = Math.max(0, Math.min(1, (scrollProgress - 0.42 - delay) / 0.12));
      tag.style.opacity = p;
      const dirs = [
        [-60, -30], [60, -30], [-60, 30], [60, 30]
      ];
      const tx = dirs[i][0] * (1 - p);
      const ty = dirs[i][1] * (1 - p);
      tag.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    // Crosshair з'являється при progress > 0.4
    if(crosshair) {
      const cp = Math.max(0, Math.min(1, (scrollProgress - 0.40) / 0.12));
      crosshair.style.borderColor = `rgba(212,0,0,${cp * 0.4})`;
      crosshair.style.boxShadow = cp > 0 ? `0 0 ${cp*40}px rgba(212,0,0,${cp*0.15})` : 'none';
      if(crosshair.style['--before-color'] !== undefined) {}
      document.documentElement.style.setProperty('--ch-op', cp);
    }
  });

  const clk = new THREE.Clock();
  (function frame(){
    requestAnimationFrame(frame);
    const t = clk.getElapsedTime();

    smx += (mx - smx) * .05;
    smy += (my - smy) * .05;

    if(snake){
      // При скролі 0→1: повертається від π до 0
      const targetY = Math.PI * 2 * scrollProgress;
      snake.rotation.y += (targetY - snake.rotation.y) * .04;
      snake.rotation.x += (0 - snake.rotation.x) * .06;
      const riseProgress = Math.min(1, scrollProgress / 0.4);
      const targetPosY = -5 + riseProgress * 5.0;
      snake.position.y += (targetPosY - snake.position.y) * .05;

      // Масштаб трохи збільшується при скролі
      const sc = 1 + scrollProgress * 0.15;
      snake.scale.setScalar(snake.scale.x > 0 ? snake.scale.x + (sc * 2.6/Math.max(1) - snake.scale.x) * 0.05 : snake.scale.x);
    }

    rl.intensity = 3 + Math.sin(t * 2.5) * 1.5;
    cam.position.x += (smx * .3 * (1-scrollProgress*0.5) - cam.position.x) * .04;
    cam.position.y += (-smy * .2 + .3 - cam.position.y) * .04;
    cam.lookAt(0, 0, 0);

    renderer.setSize(W(), H());
    cam.aspect = W() / H();
    cam.updateProjectionMatrix();
    renderer.render(scene, cam);
  })();
})();

/* ── PROCESS WAVES + SEQUENTIAL REVEAL ── */
(function(){
  const section = document.getElementById('process');
  const canvas  = document.getElementById('proc-waves');
  if(!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, raf, progress = 0, started = false;

  function resize(){
    W = canvas.width  = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  /* Сімейство хвиль: sin(x+offset) та cos(x+offset) */
  const WAVES = [];
  const RED = [212, 0, 0];
  const BLUE = [60, 80, 180];

  for(let i = -4; i <= 4; i++){
    WAVES.push({ fn: 'sin', offset: i, color: RED,  alpha: 0.18 - Math.abs(i)*0.015 });
    WAVES.push({ fn: 'cos', offset: i, color: BLUE, alpha: 0.12 - Math.abs(i)*0.01  });
  }

  function drawWaves(prog){
    ctx.clearRect(0, 0, W, H);
    const cy = H * 0.52;
    const amp = H * 0.18;
    const freq = (2 * Math.PI) / W * 3.5;

    WAVES.forEach(w => {
      const visibleX = W * Math.min(prog, 1);
      ctx.beginPath();
      for(let x = 0; x <= visibleX; x += 2){
        const t = x * freq + w.offset * 0.7;
        const y = cy + amp * (w.fn === 'sin' ? Math.sin(t) : Math.cos(t))
                     + w.offset * (H * 0.025);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      /* Glow effect */
      ctx.shadowColor = `rgb(${w.color.join(',')})`;
      ctx.shadowBlur  = 8;
      ctx.strokeStyle = `rgba(${w.color.join(',')},${w.alpha})`;
      ctx.lineWidth   = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    /* Провідна точка — вогник на кінці */
    if(prog < 1){
      const cx2 = W * prog;
      const mainT = cx2 * freq;
      const cy2 = cy + amp * Math.sin(mainT);
      ctx.beginPath();
      ctx.arc(cx2, cy2, 4, 0, Math.PI*2);
      ctx.fillStyle = `rgba(212,0,0,0.9)`;
      ctx.shadowColor = '#D40000';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /* Послідовна поява карток синхронно з хвилею */
  const steps = section.querySelectorAll('.proc-step');
  const total  = steps.length;
  let lastLit  = -1;

  function animate(){
    if(!started) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    if(prefersReduced){
      steps.forEach(s => s.classList.add('lit'));
      drawWaves(1);
      return;
    }

    progress = Math.min(progress + 0.006, 1);
    drawWaves(progress);

    /* Підсвічуємо картку коли хвиля доходить до її позиції */
    const lit = Math.floor(progress * total);
    if(lit > lastLit){
      for(let i = lastLit + 1; i <= Math.min(lit, total - 1); i++){
        steps[i].classList.add('lit');
      }
      lastLit = lit;
    }

    if(progress < 1) raf = requestAnimationFrame(animate);
    else steps.forEach(s => s.classList.add('lit'));
  }

  /* Запускаємо коли секція видима */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting && !started){
        started = true;
        animate();
        io.unobserve(section);
      }
    });
  }, { threshold: 0.2 });

  io.observe(section);
})();
