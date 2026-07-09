/* ── SVG ORBIT SPHERE ── */
(function(){
  const cont = document.querySelector('.av-right');
  if(!cont) return;

  const services = [
    {n:'Конверсія +40%', d:'Сайти, що продають: лендінги, SPA, SEO-трафік', orbit:0, speed:.0075, startA:0,    red:true},
    {n:'Автопродажі 24/7', d:'Боти, що замінюють менеджера: CRM, оплати, квізи',          orbit:0, speed:.0075, startA:2.09, red:true},
    {n:'ROI x3+',        d:'Повна цифрова інфраструктура під ключ',              orbit:0, speed:.0075, startA:4.19, red:true},
    {n:'Швидкий бекенд', d:'API що витримує будь-яке навантаження',       orbit:1, speed:.005,  startA:.5,   red:false},
    {n:'Надійна БД',     d:'Дані завжди доступні, захищені, оптимізовані',     orbit:1, speed:.005,  startA:2.6,  red:false},
    {n:'CI/CD',          d:'Автодеплой через GitHub Actions + Railway',       orbit:1, speed:.005,  startA:4.8,  red:false},
    {n:'WOW-ефект',      d:'3D та WebGL — сайт, який запам\'ятовують',      orbit:2, speed:.003,  startA:0.3,  red:false},
    {n:'Органік трафік', d:'SEO що генерує ліди без рекламного бюджету',               orbit:2, speed:.003,  startA:1.9,  red:false},
    {n:'Uptime 99.9%',   d:'Хмарний деплой — продукт завжди онлайн',   orbit:2, speed:.003,  startA:3.8,  red:false},
    {n:'Реальний час',   d:'Миттєві сповіщення, черги, кешування',  orbit:2, speed:.003,  startA:5.4,  red:false},
  ];

  // orbit params [rx, ry, rotationDeg]
  const orbits = [
    {rx:225, ry:70, rot:-15},
    {rx:325, ry:105, rot:20},
    {rx:420, ry:145, rot:-8},
  ];

  function buildSVG(){
    const w=cont.clientWidth, h=cont.clientHeight;
    const cx=w*.52, cy=h*.48;

    let svg = `<svg id="orbit-svg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<defs><radialGradient id="coreGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#D40000" stop-opacity=".35"/><stop offset="100%" stop-color="#D40000" stop-opacity=".0"/></radialGradient></defs>`;

    // Glow
    svg += `<circle cx="${cx}" cy="${cy}" r="275" fill="url(#coreGrad)"/>`;
    // Core sphere
    svg += `<circle class="o-core" cx="${cx}" cy="${cy}" r="155"/>`;
    svg += `<text x="${cx}" y="${cy+28}" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="72" letter-spacing="-4" fill="#D40000" opacity="0.85" class="o-iu-text">IU</text>`;
    // Core wireframe lines
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI;
      svg+=`<ellipse class="o-core-wire" cx="${cx}" cy="${cy}" rx="62" ry="${62*Math.abs(Math.cos(a))}" transform="rotate(${i*22.5} ${cx} ${cy})"/>`;
    }

    // Orbit rings
    orbits.forEach((o,i)=>{
      svg+=`<ellipse class="o-ring" cx="${cx}" cy="${cy}" rx="${o.rx}" ry="${o.ry}" transform="rotate(${o.rot} ${cx} ${cy})"/>`;
    });

    // Dots (will be animated via JS)
    services.forEach((sv,i)=>{
      const o=orbits[sv.orbit];
      svg+=`<circle class="o-dot" id="dot${i}" r="${sv.red?8:6}" fill="${sv.red?'#D40000':'#EDE8E5'}" opacity="${sv.red?'1':'.7'}" cx="${cx}" cy="${cy}" data-i="${i}"/>`;
      svg+=`<text class="o-label${sv.red?' red':''}" id="lbl${i}" x="${cx}" y="${cy}" dominant-baseline="middle">${sv.n}</text>`;
    });

    svg += `</svg>`;
    return {svg, cx, cy};
  }

  let svgEl, angles=[];
  const tip=document.createElement('div');
  tip.className='o-tip';
  cont.appendChild(tip);

  function init(){
    const old=document.getElementById('orbit-svg');
    if(old) old.remove();
    const {svg,cx,cy}=buildSVG();
    cont.insertAdjacentHTML('beforeend',svg);
    svgEl=document.getElementById('orbit-svg');
    angles=services.map(sv=>sv.startA);
    animate(cx,cy);
  }

  let tiltX=0, tiltY=0, curTiltX=0, curTiltY=0;
  cont.addEventListener('mousemove',e=>{
    const r=cont.getBoundingClientRect();
    tiltX=(e.clientX-r.left)/r.width-.5;
    tiltY=(e.clientY-r.top)/r.height-.5;
  });
  cont.addEventListener('mouseleave',()=>{tiltX=0;tiltY=0;});

  let hovIdx=-1;
  cont.addEventListener('mouseover',e=>{
    const dot=e.target.closest('.o-dot');
    if(dot){
      const i=parseInt(dot.dataset.i);
      hovIdx=i;
      const sv=services[i];
      tip.innerHTML=`<div class="o-tip-name">${sv.n}</div><div class="o-tip-desc">${sv.d}</div>`;
      tip.classList.add('show');
    }
  });
  cont.addEventListener('mouseout',e=>{
    if(!e.target.closest('.o-dot')){hovIdx=-1;tip.classList.remove('show');}
  });
  cont.addEventListener('mousemove',e=>{
    if(hovIdx>=0){
      const r=cont.getBoundingClientRect();
      tip.style.left=(e.clientX-r.left+16)+'px';
      tip.style.top=(e.clientY-r.top-10)+'px';
    }
  });

  function animate(cx,cy){
    curTiltX+=(tiltX-curTiltX)*.05;
    curTiltY+=(tiltY-curTiltY)*.05;

    services.forEach((sv,i)=>{
      if(i!==hovIdx) angles[i]+=sv.speed;
      const a=angles[i];
      const o=orbits[sv.orbit];
      // Perspective tilt
      const px=Math.cos(a)*o.rx + curTiltX*30;
      const py=Math.sin(a)*o.ry + curTiltY*20;
      const rotRad=o.rot*Math.PI/180;
      const rx2=px*Math.cos(rotRad)-py*Math.sin(rotRad);
      const ry2=px*Math.sin(rotRad)+py*Math.cos(rotRad);
      const x=cx+rx2, y=cy+ry2;
      const dot=document.getElementById('dot'+i);
      const lbl=document.getElementById('lbl'+i);
      if(dot){dot.setAttribute('cx',x);dot.setAttribute('cy',y);}
      if(lbl){
        lbl.setAttribute('x',x+12);
        lbl.setAttribute('y',y);
        // Depth: hide labels behind sphere
        const depth=Math.sin(a);
        lbl.style.opacity=depth>-.15?'0.85':'0';
        // Depth scale для 3D ефекту
        const scale = 0.65 + 0.35*((Math.sin(a)+1)/2);
        const baseR = sv.red ? 8 : 6;
        if(dot){ dot.setAttribute('r', baseR * scale); }
      }
    });
    requestAnimationFrame(()=>animate(cx,cy));
  }

  init();
  window.addEventListener('resize',init);
})();
