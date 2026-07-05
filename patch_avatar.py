html = open('index.html').read()

# Add advanced avatar CSS + JS
avatar_css = """
    /* ── AVATAR ADVANCED ── */
    .av-r{perspective:1000px;}
    .av-img-wrap{
      position:absolute;inset:0;
      display:flex;align-items:flex-end;justify-content:center;
      transform-style:preserve-3d;
      transition:transform .1s ease-out;
    }
    .av-img{
      position:relative;z-index:2;
      height:96%;object-fit:contain;object-position:center bottom;
      filter:drop-shadow(0 0 60px rgba(212,0,0,0.4));
      animation:avFloat 7s ease-in-out infinite;
      transform-origin:center bottom;
    }
    @keyframes avFloat{
      0%,100%{transform:translateY(0) rotate(0deg);filter:drop-shadow(0 0 60px rgba(212,0,0,0.4));}
      25%{transform:translateY(-14px) rotate(.4deg);filter:drop-shadow(0 0 90px rgba(212,0,0,0.65));}
      75%{transform:translateY(-8px) rotate(-.3deg);filter:drop-shadow(0 0 75px rgba(212,0,0,0.55));}
    }
    /* Particle canvas behind avatar */
    #av-particles{
      position:absolute;inset:0;width:100%;height:100%;
      z-index:1;pointer-events:none;
    }
    /* Glow rings */
    .av-ring{
      position:absolute;bottom:10%;left:50%;transform:translateX(-50%);
      border-radius:50%;border:1px solid rgba(212,0,0,0.15);
      animation:ringPulse 3s ease-in-out infinite;
      pointer-events:none;z-index:0;
    }
    .av-ring:nth-child(1){width:200px;height:80px;animation-delay:0s;}
    .av-ring:nth-child(2){width:340px;height:120px;animation-delay:.6s;border-color:rgba(212,0,0,0.1);}
    .av-ring:nth-child(3){width:480px;height:160px;animation-delay:1.2s;border-color:rgba(212,0,0,0.06);}
    @keyframes ringPulse{
      0%,100%{opacity:.4;transform:translateX(-50%) scaleY(1);}
      50%{opacity:1;transform:translateX(-50%) scaleY(1.15);}
    }
    /* Hero avatar same treatment */
    .h-avatar-wrap{
      position:absolute;inset:0;
      display:flex;align-items:flex-end;justify-content:center;
    }
    #h-av-particles{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
    .h-avatar{
      position:relative;z-index:2;
      height:92%;object-fit:contain;object-position:center bottom;
      filter:drop-shadow(0 0 50px rgba(212,0,0,0.35));
      animation:avFloat 8s ease-in-out infinite;
      opacity:0;transition:opacity 1.2s ease;
    }
    .h-avatar.v{opacity:1;}
    .h-ring{
      position:absolute;bottom:5%;left:50%;transform:translateX(-50%);
      border-radius:50%;border:1px solid rgba(212,0,0,0.12);
      animation:ringPulse 3.5s ease-in-out infinite;
      pointer-events:none;
    }
    .h-ring:nth-child(1){width:160px;height:60px;animation-delay:0s;}
    .h-ring:nth-child(2){width:280px;height:100px;animation-delay:.7s;border-color:rgba(212,0,0,0.07);}
"""

avatar_js = """
/* ── AVATAR PARTICLES ── */
function initParticles(canvasId, color){
  const c = document.getElementById(canvasId);
  if(!c) return;
  const ctx = c.getContext('2d');
  const W = ()=>{c.width=c.parentElement.clientWidth;c.height=c.parentElement.clientHeight;};
  W(); window.addEventListener('resize', W);
  const particles = [];
  for(let i=0;i<60;i++){
    particles.push({
      x: Math.random()*c.width,
      y: Math.random()*c.height,
      r: Math.random()*1.8+.4,
      vx: (Math.random()-.5)*.4,
      vy: -Math.random()*.6-.2,
      a: Math.random(),
      va: (Math.random()-.5)*.012,
      life: Math.random()
    });
  }
  function draw(){
    requestAnimationFrame(draw);
    ctx.clearRect(0,0,c.width,c.height);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.a+=p.va; p.life+=.004;
      if(p.life>1||p.y<0){
        p.y=c.height*.9+Math.random()*c.height*.1;
        p.x=c.width*.2+Math.random()*c.width*.6;
        p.life=0; p.a=0;
      }
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${color},${Math.sin(p.life*Math.PI)*(.5+Math.abs(Math.sin(p.a))*.5)})`;
      ctx.fill();
    });
  }
  draw();
}
initParticles('av-particles','212,0,0');
initParticles('h-av-particles','212,0,0');

/* ── AVATAR 3D TILT ON MOUSE ── */
const avWrap = document.querySelector('.av-img-wrap');
const avSec = document.getElementById('av-sec');
if(avWrap && avSec){
  avSec.addEventListener('mousemove', e=>{
    const r = avSec.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    avWrap.style.transform = `rotateY(${x*12}deg) rotateX(${-y*6}deg)`;
  });
  avSec.addEventListener('mouseleave', ()=>{
    avWrap.style.transform = 'rotateY(0) rotateX(0)';
  });
}

/* ── HERO AVATAR TILT ── */
const heroSec = document.getElementById('hero');
const heroAvCol = document.querySelector('.h-avatar-col');
if(heroSec && heroAvCol){
  heroSec.addEventListener('mousemove', e=>{
    const r = heroAvCol.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    const img = heroAvCol.querySelector('.h-avatar');
    if(img) img.style.transform = `translateY(0) rotate(${x*3}deg) perspective(800px) rotateY(${x*8}deg) rotateX(${-y*4}deg)`;
  });
  heroSec.addEventListener('mouseleave', ()=>{
    const img = heroAvCol.querySelector('.h-avatar');
    if(img) img.style.transform = '';
  });
}
"""

# Insert CSS before </style>
html = html.replace('    @media(max-width:900px)', avatar_css + '\n    @media(max-width:900px)')

# Wrap av-img in av-img-wrap + add particles canvas + rings
old_av_r = '<div class="av-r">\n    <img class="av-img" src="avatar.jpeg" alt="Infinite Union Eagle"/>\n  </div>'
new_av_r = '''<div class="av-r">
    <canvas id="av-particles"></canvas>
    <div class="av-ring"></div>
    <div class="av-ring"></div>
    <div class="av-ring"></div>
    <div class="av-img-wrap" id="av-img-wrap">
      <img class="av-img" src="avatar.jpeg" alt="Infinite Union Eagle"/>
    </div>
  </div>'''
html = html.replace(old_av_r, new_av_r)

# Wrap hero avatar + add particles + rings
old_h_av = '''    <canvas id="hero-3d"></canvas>
    <img class="h-avatar" id="havatar" src="avatar.jpeg" alt="Infinite Union — Eagle mascot"/>
    <div class="h-avatar-glow"></div>'''
new_h_av = '''    <canvas id="hero-3d"></canvas>
    <div class="h-avatar-wrap">
      <canvas id="h-av-particles"></canvas>
      <div class="h-ring"></div>
      <div class="h-ring"></div>
      <img class="h-avatar" id="havatar" src="avatar.jpeg" alt="Infinite Union — Eagle mascot"/>
    </div>
    <div class="h-avatar-glow"></div>'''
html = html.replace(old_h_av, new_h_av)

# Add JS before </script> closing (last one)
html = html.replace('</script>\n</body>', avatar_js + '\n</script>\n</body>')

open('index.html','w').write(html)
print('done', html.count('av-particles'))
