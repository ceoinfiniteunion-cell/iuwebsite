/* ── GLOBE SCROLL CONTROLLER ── */
(function(){
  const outer  = document.getElementById('globe-scroll-outer');
  const canvas = document.getElementById('gs-globe');
  const svgLine = document.getElementById('gs-line');
  const svgDot  = document.getElementById('gs-dot-marker');
  const svgEl   = document.getElementById('gs-connector');
  if(!outer || !canvas) return;

  const PROJECTS = [
    { phi:-4.974, lat:49.99,  lng:36.23  }, // Transfer Kharkiv
    { phi:2.426,  lat:40.71,  lng:-74.01 }, // Realty Monitor (NY)
    { phi:-0.750, lat:-33.86, lng:151.20 }, // KNEU Bot (Sydney)
    { phi:1.200,  lat:50.45,  lng:30.52  }, // IU Bot (Kyiv)
    { phi:-2.500, lat:48.85,  lng:2.35   }, // Project 5 (Paris)
    { phi:0.500,  lat:51.50,  lng:-0.12  }, // Project 6 (London)
    { phi:3.200,  lat:35.68,  lng:139.69 }, // Project 7 (Tokyo)
    { phi:-1.800, lat:52.52,  lng:13.40  }, // Project 8 (Berlin)
    { phi:1.800,  lat:52.37,  lng:4.90   }, // Project 9 (Amsterdam)
  ];

  let globePhi   = PROJECTS[0].phi;
  let targetPhi  = PROJECTS[0].phi;
  let isDragging = false;
  let lastX      = 0;
  let dragDelta  = 0;
  let globe;
  let currentCard = -1;

  // updateConnector removed (disabled)

  const overlay = document.getElementById('gs-overlay');
  const ctx2d = overlay ? overlay.getContext('2d') : null;

  function drawLines(){
    if(!ctx2d || !overlay || !canvas) return;
    // Розмір overlay canvas = розмір екрана в фізичних пікселях
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    if(overlay.width !== W * dpr){ overlay.width = W * dpr; overlay.height = H * dpr; }
    ctx2d.clearRect(0, 0, overlay.width, overlay.height);
    const cards = document.querySelectorAll('.gs-card.active');
    if(cards.length === 0) return;
    // Центр глобуса в screen coords
    const gr = canvas.getBoundingClientRect();
    const globeX = gr.left + gr.width  * 0.24;
    const globeY = gr.top  + gr.height * 0.55;
    // Малюємо в фізичних пікселях
    const sx = globeX * dpr;
    const sy = globeY * dpr;
    document.querySelectorAll('.gs-card').forEach((card) => {
      if(!card.classList.contains('active')) return;
      const cr = card.getBoundingClientRect();
      const ex = (cr.left + cr.width  * 0.5) * dpr;
      const ey = (cr.top  + cr.height * 0.5) * dpr;
      const grad = ctx2d.createLinearGradient(sx, sy, ex, ey);
      grad.addColorStop(0, 'rgba(212,0,0,0.9)');
      grad.addColorStop(1, 'rgba(212,0,0,0.2)');
      ctx2d.beginPath();
      ctx2d.moveTo(sx, sy);
      ctx2d.lineTo(ex, ey);
      ctx2d.strokeStyle = grad;
      ctx2d.lineWidth = 1.5 * dpr;
      ctx2d.shadowBlur = 8 * dpr;
      ctx2d.shadowColor = '#d40000';
      ctx2d.stroke();
      ctx2d.beginPath();
      ctx2d.arc(ex, ey, 4 * dpr, 0, Math.PI*2);
      ctx2d.fillStyle = '#d40000';
      ctx2d.shadowBlur = 12 * dpr;
      ctx2d.fill();
    });
  }

    function initGlobe(){
    if(globe){ globe.destroy(); globe = null; }
    const size = canvas.offsetWidth || Math.min(window.innerWidth, window.innerHeight) * 0.9;
    if(!size) return;
    globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio||1, 2),
      width: size, height: size,
      phi: globePhi, theta: 0.3,
      dark: 1, diffuse: 1.2,
      mapSamples: 20000, mapBrightness: 6,
      baseColor: [0.08, 0.04, 0.04],
      markerColor: [0.9, 0.0, 0.0],
      glowColor: [0.5, 0.05, 0.05],
      markers: [
        { location:[49.99,  36.23 ], size:0.07 },
        { location:[40.71, -74.01 ], size:0.07 },
        { location:[-33.86, 151.20], size:0.07 },
        { location:[50.45,  30.52 ], size:0.07 },
        { location:[48.85,  2.35  ], size:0.07 },
      ],
      onRender(state){
        const diff = targetPhi - globePhi;
        if(Math.abs(diff) > 0.001){
          globePhi += diff * 0.05;
        } else {
          globePhi = targetPhi;
        }
        state.phi    = globePhi + (isDragging ? dragDelta : 0);
        state.theta  = 0.3;
        state.width  = canvas.offsetWidth  || size;
        state.height = canvas.offsetWidth  || size;
        drawLines();
      }
    });
    canvas.style.opacity = '1';
  }

  canvas.addEventListener('pointerdown', e=>{
    isDragging=true; lastX=e.clientX; dragDelta=0;
    canvas.style.cursor='grabbing';
  });
  window.addEventListener('pointerup', ()=>{
    if(isDragging){ targetPhi += dragDelta; globePhi = targetPhi; dragDelta=0; }
    isDragging=false; canvas.style.cursor='grab';
  },{passive:true});
  window.addEventListener('pointermove', e=>{
    if(isDragging) dragDelta = (e.clientX - lastX) / 150;
  },{passive:true});

  function setCard(idx){
    if(idx === currentCard) return;
    if(idx < 0 || !PROJECTS[idx]) return;
    document.querySelectorAll('.gs-card').forEach((c,i) =>{
      c.classList.toggle('active', i <= idx);
    });
    document.querySelectorAll('.gs-dot').forEach((d,i) =>{
      d.classList.toggle('active', i === idx);
    });
    targetPhi = PROJECTS[idx].phi;
    const hint = document.getElementById('gs-scroll-hint');
    if(hint) hint.classList.toggle('hidden', idx === PROJECTS.length - 1);
    currentCard = idx;
  }

  // Чекаємо поки sticky layout відрендериться і canvas отримає розмір
  function tryInit(){
    if(canvas.offsetWidth > 0){ initGlobe(); }
    else { setTimeout(tryInit, 100); }
  }
  tryInit();
  window.addEventListener('resize', initGlobe);

  window.addEventListener('scroll', function(){
    const rect = outer.getBoundingClientRect();
    const scrolled = -rect.top;
    const total = outer.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrolled / total));
    // Кожна картка має свій поріг появи — незалежно один від одного
    const cards = document.querySelectorAll('.gs-card');
    /* Scroll progress thresholds for each portfolio card (0–1 range).
     * Each value = the point at which card N becomes active.
     * Evenly spaced across 9 cards: card 0 at 8%, card 8 at 88%. */
    const CARD_COUNT = 9;
    const thresholds = Array.from({ length: CARD_COUNT }, (_, i) => 0.08 + i * 0.10);
    cards.forEach((c,i)=>{
      const wasActive = c.classList.contains('active');
      const isActive = progress >= thresholds[i];
      c.classList.toggle('active', isActive);
      // Лінії
      const line = document.getElementById('gl-' + i);
      const dot = document.getElementById('gd-' + i);
      if(line && dot){
        if(isActive && !wasActive){
          // Обчислити координати кінця лінії (центр верху картки)
          const svgEl = document.getElementById('gs-lines');
          const svgRect = svgEl ? svgEl.getBoundingClientRect() : null;
          if(svgRect){
            // Реальний центр глобуса
            const gr = canvas.getBoundingClientRect();
            const gx = (gr.left + gr.width*0.5 - svgRect.left) / svgRect.width * 1000;
            const gy = (gr.top + gr.height*0.5 - svgRect.top) / svgRect.height * 1000;
            // Оновити x1,y1 всіх ліній
            document.querySelectorAll('#gs-lines line').forEach(l=>{ l.setAttribute('x1', gx.toFixed(0)); l.setAttribute('y1', gy.toFixed(0)); });
            const cr = c.getBoundingClientRect();
            const ex = (cr.left + cr.width*0.5 - svgRect.left) / svgRect.width * 1000;
            const ey = (cr.top + cr.height*0.5 - svgRect.top) / svgRect.height * 1000;
            line.setAttribute('x2', ex.toFixed(0));
            line.setAttribute('y2', ey.toFixed(0));
            dot.setAttribute('cx', ex.toFixed(0));
            dot.setAttribute('cy', ey.toFixed(0));
            const len = Math.hypot(ex-gx, ey-gy) + 20;
            line.setAttribute('stroke-dasharray', len.toFixed(0));
            line.setAttribute('stroke-dashoffset', len.toFixed(0));
            setTimeout(()=>{ line.classList.add('gs-line-active'); dot.classList.add('gs-dot-active'); }, 50);
          }
        }
        if(!isActive){ line.classList.remove('gs-line-active'); dot.classList.remove('gs-dot-active'); }
      }
    });
    // Глобус повертається до відповідного проекту
    let idx = -1;
    for(let i=0;i<thresholds.length;i++){ if(progress>=thresholds[i]) idx=i; }
    if(idx>=0 && idx<PROJECTS.length && idx!==currentCard){ targetPhi = PROJECTS[idx].phi; currentCard = idx; }
  },{passive:true});
})();

/* ── PROCESS WAVES + SEQUENTIAL REVEAL ── */
(function(){
  const section = document.getElementById('process');
  const canvas  = document.getElementById('proc-waves');
  if(!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, progress = 0, started = false, raf = null;

  function resize(){
    const r = section.getBoundingClientRect();
    W = canvas.width  = r.width  || section.scrollWidth;
    H = canvas.height = r.height || section.scrollHeight;
  }

  const steps   = Array.from(section.querySelectorAll('.proc-step'));
  const total   = steps.length;
  let lastLit   = -1;
  const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  function drawWaves(prog){
    ctx.clearRect(0, 0, W, H);
    const cy   = H * 0.5;
    const amp  = H * 0.22;
    const freq = (2 * Math.PI) / W * 3;

    /* Сімейство синусів */
    for(let i = -5; i <= 5; i++){
      const visX = W * Math.min(prog, 1);
      ctx.beginPath();
      for(let x = 0; x <= visX; x += 2){
        const y = cy + amp * Math.sin(x * freq + i * 0.6) + i * (H * 0.022);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const a = 0.55 - Math.abs(i) * 0.04;
      ctx.strokeStyle = `rgba(212,0,0,${Math.max(a,0.08)})`;
      ctx.lineWidth   = i === 0 ? 2.5 : 1.2;
      ctx.shadowColor = '#D40000';
      ctx.shadowBlur  = i === 0 ? 20 : 4;
      ctx.stroke();
      ctx.shadowBlur  = 0;
    }

    /* Сімейство косинусів */
    for(let i = -4; i <= 4; i++){
      const visX = W * Math.min(prog, 1);
      ctx.beginPath();
      for(let x = 0; x <= visX; x += 2){
        const y = cy + amp * Math.cos(x * freq + i * 0.6) + i * (H * 0.022);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const a = 0.3 - Math.abs(i) * 0.025;
      ctx.strokeStyle = `rgba(100,120,255,${Math.max(a,0.05)})`;
      ctx.lineWidth   = i === 0 ? 1.8 : 0.9;
      ctx.shadowColor = 'rgba(100,120,255,0.6)';
      ctx.shadowBlur  = i === 0 ? 12 : 2;
      ctx.stroke();
      ctx.shadowBlur  = 0;
    }

    /* Вогник на кінці хвилі */
    if(prog < 1){
      const cx2 = W * prog;
      const cy2 = cy + amp * Math.sin(cx2 * freq);
      ctx.beginPath();
      ctx.arc(cx2, cy2, 5, 0, Math.PI * 2);
      ctx.fillStyle   = '#D40000';
      ctx.shadowColor = '#D40000';
      ctx.shadowBlur  = 20;
      ctx.fill();
      ctx.shadowBlur  = 0;
    }
  }

  function animate(){
    progress = Math.min(progress + 0.005, 1);
    drawWaves(progress);

    const lit = Math.floor(progress * total);
    for(let i = lastLit + 1; i <= Math.min(lit, total - 1); i++){
      steps[i].classList.add('lit');
    }
    lastLit = Math.max(lastLit, Math.min(lit, total - 1));

    if(progress < 1){
      raf = requestAnimationFrame(animate);
    } else {
      steps.forEach(s => s.classList.add('lit'));
    }
  }

  function start(){
    if(started) return;
    started = true;
    resize();
    if(reduced){
      drawWaves(1);
      steps.forEach(s => s.classList.add('lit'));
      return;
    }
    animate();
  }

  window.addEventListener('resize', () => { if(started) resize(); }, {passive:true});

  /* Запуск тільки коли секція реально видима на 30% */
  const io = new IntersectionObserver(entries => {
    const e = entries[0];
    if(e.isIntersecting && !started) {
      resize();
      start();
      io.disconnect();
    }
  }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
  io.observe(section);
})();
