/* CURSOR */
const cur=document.getElementById('cur'),curO=document.getElementById('curO');
let cx=0,cy=0,ox=0,oy=0;
if(cur&&curO){
document.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY;cur.style.transform=`translate(${cx-2.5}px,${cy-2.5}px)`;});
function fc(){ox+=(cx-ox)*.13;oy+=(cy-oy)*.13;curO.style.transform=`translate(${ox-16}px,${oy-16}px)`;requestAnimationFrame(fc);}
fc();
}
document.querySelectorAll('a,button,.srv,.pf-item,input,textarea').forEach(el=>{
  el.addEventListener('mouseenter',()=>{curO.style.width='50px';curO.style.height='50px';curO.style.borderColor='rgba(212,0,0,0.4)';curO.style.background='rgba(212,0,0,0.05)';});
  el.addEventListener('mouseleave',()=>{curO.style.width='32px';curO.style.height='32px';curO.style.borderColor='rgba(237,232,229,0.18)';curO.style.background='transparent';});
});

/* NAV + AVATAR PARALLAX — один scroll listener */
window.addEventListener('scroll',()=>{
  const sy=window.scrollY;
  document.getElementById('nav').classList.toggle('scrolled',sy>60);
  const av=document.getElementById('havatar');
  if(av) av.style.transform=`translateX(-50%) translateY(${sy*0.04}px)`;
},{passive:true});

/* MOBILE */
document.getElementById('burger').addEventListener('click', () => document.getElementById('mob').classList.add('open'));
document.getElementById('mobX').addEventListener('click', closeMob);
function closeMob() { document.getElementById('mob').classList.remove('open'); }

/* Close mobile nav on link click — replaces inline onclick="closeMob()" */
document.querySelectorAll('.mob a').forEach(link => {
  link.addEventListener('click', closeMob);
});

/* REVEAL */
const ro=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');ro.unobserve(e.target);}});},{threshold:0.08});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

/* COUNTER */
const co=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const t=parseInt(e.target.dataset.target);if(isNaN(t))return;const d=1600,st=performance.now();const a=n=>{const p=Math.min((n-st)/d,1);e.target.textContent=`${Math.floor(p*t)}+`;if(p<1)requestAnimationFrame(a);else e.target.textContent=`${t}+`;};requestAnimationFrame(a);co.unobserve(e.target);}});},{threshold:0.5});
document.querySelectorAll('[data-target]').forEach(el=>co.observe(el));

/* AVATAR PARALLAX — moved into NAV scroll listener above */

/* FORM */
(function(){
  const _ikey=(typeof crypto!=='undefined'&&crypto.randomUUID)?crypto.randomUUID():Math.random().toString(36).slice(2)+Date.now();
  function showToast(msg,type){
    let t=document.getElementById('_iu_toast');
    if(!t){t=document.createElement('div');t.id='_iu_toast';t.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);padding:14px 24px;border-radius:12px;font-size:14px;font-weight:500;z-index:9999;pointer-events:none;transition:opacity .4s;opacity:0;max-width:340px;text-align:center;';document.body.appendChild(t);}
    t.textContent=msg;
    t.style.background=type==='ok'?'rgba(74,222,128,.15)':'rgba(255,90,90,.15)';
    t.style.border=type==='ok'?'1px solid rgba(74,222,128,.4)':'1px solid rgba(255,90,90,.4)';
    t.style.color=type==='ok'?'#4ade80':'#ff5a5a';
    t.style.opacity='1';
    setTimeout(()=>{t.style.opacity='0';},4000);
  }
  document.getElementById('cForm').addEventListener('submit',function(e){
    e.preventDefault();
    if(document.getElementById('website').value){return;}
    const _btn=this.querySelector('button[type=submit]');
    _btn.disabled=true;_btn.textContent='Надсилаємо...';
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),10000);
    fetch('https://api.infiniteunion.com.ua/lead',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({name:document.getElementById('cn').value,contact:document.getElementById('cc').value,phone:document.getElementById('cphone').value,project_type:document.getElementById('ctype').value,budget:document.getElementById('cbudget').value,deadline:document.getElementById('cdeadline').value,project:document.getElementById('cp').value,idempotency_key:_ikey})})
    .then(r=>{clearTimeout(timer);if(!r.ok)throw new Error('server');_btn.style.display='none';document.getElementById('cOk').style.display='block';})
    .catch(err=>{clearTimeout(timer);_btn.disabled=false;_btn.textContent='Надіслати →';showToast(err.name==='AbortError'?'Час очікування вийшов. Напишіть нам у Telegram.':'Помилка відправки. Перевірте зʼєднання або напишіть нам у Telegram.','err');});
  });
})();

/* ── DIRECTIONS SECTION REVEAL ── */
(function(){
  const section = document.getElementById('directions');
  if(!section) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('v');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  io.observe(section);
})();

/* ── STACK REVEAL ONLY (proc-step handled by snake.js waves) ── */
(function(){
  const items = document.querySelectorAll('.stack-sub, .stack-flow, .stack-highlight, .stack-tags');
  if(!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('v');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => io.observe(el));
})();

/* ── STACK NODE RADIAL POPUP ── */
(function(){
  const nodes = document.querySelectorAll('.stack-node[data-node]');
  if(!nodes.length) return;

  const COLORS = {
    form:  { color: '#FFFFFF', glow: 'rgba(255,255,255,0.25)', name: 'Форма',      items: ['Honeypot захист', 'Rate-limit по IP', 'HTTPS шифрування', 'Валідація полів', 'Захист від спаму', 'Логування подій'] },
    valid: { color: '#22C55E', glow: 'rgba(34,197,94,0.25)',   name: 'Валідація',  items: ['Pydantic типи', 'Ліміт довжини', 'XSS санітизація', 'Обовʼязкові поля', 'Формат email', 'Тип проєкту'] },
    db:    { color: '#EAB308', glow: 'rgba(234,179,8,0.25)',   name: 'База даних', items: ['PostgreSQL', 'Параметризовані запити', 'Пул ×10 зʼєднань', 'Audit log дій', 'SQL injection захист', 'Автоміграції'] },
    queue: { color: '#D40000', glow: 'rgba(212,0,0,0.25)',     name: 'Черга',      items: ['Redis DLQ', 'Авто-ретрай', 'Zero data loss', 'Моніторинг черги', 'Пріоритети задач', 'Fallback логіка'] },
    tg:    { color: '#29B6F6', glow: 'rgba(41,182,246,0.25)',  name: 'Telegram',   items: ['Exponential backoff', '3 спроби доставки', 'Реакція 15 хв', 'Форматований HTML', 'Мультиадмін', 'Статус доставки'] },
  };

  /* Overlay */
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none;opacity:0;transition:opacity .3s;';
  document.body.appendChild(overlay);

  /* Popup container */
  const popup = document.createElement('div');
  popup.style.cssText = 'position:fixed;z-index:9999;pointer-events:none;opacity:0;transition:opacity .25s,transform .35s cubic-bezier(0.34,1.56,0.64,1);transform:scale(0.6);';

  function positionPopup(){
    const stackSection = document.getElementById('stack');
    if(!stackSection) return;
    const sr = stackSection.getBoundingClientRect();
    /* Фіксована точка — завжди права зона секції по центру */
    popup.style.left = (sr.left + sr.width * 0.76) + 'px';
    popup.style.top  = (sr.top  + sr.height * 0.5) + 'px';
    popup.style.translate = '-50% -50%';
  }
  /* Оновлюємо позицію при скролі */
  window.addEventListener('scroll', () => { if(currentKey) positionPopup(); }, {passive:true});
  document.body.appendChild(popup);

  let hideTimer = null;
  let currentKey = null;

  function show(node){
    const key = node.getAttribute('data-node');
    if(key === currentKey) return;
    currentKey = key;
    clearTimeout(hideTimer);
    const d = COLORS[key];
    if(!d) return;

    /* Get node icon HTML */
    const iconEl = node.querySelector('.stack-node__icon');
    const iconHTML = iconEl ? iconEl.cloneNode(true) : null;

    /* Кути променів по годинниковій стрілці — всі 6 з підписами */
    const angles = [-90, -30, 30, 90, 150, 210];
    const labels = angles.map((_, i) => d.items[i] || '');

    const rayLen = 130;
    const rays = angles.map((a, i) => {
      const rad = a * Math.PI / 180;
      const x2 = Math.cos(rad) * rayLen;
      const y2 = Math.sin(rad) * rayLen;
      const lx = Math.cos(rad) * (rayLen + 16);
      const ly = Math.sin(rad) * (rayLen + 16);
      const anchor = Math.abs(a) > 120 ? 'end' : Math.abs(a) < 60 ? 'start' : 'middle';
      const label = labels[i] || '';
      return `
        <line class="ray" x1="0" y1="0" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"
          stroke="${d.color}" stroke-width="1" stroke-dasharray="130" stroke-dashoffset="130"
          style="transition:stroke-dashoffset .5s cubic-bezier(.4,0,.2,1) ${i*0.06}s;filter:drop-shadow(0 0 4px ${d.color})"/>
        <circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="3" fill="${d.color}"
          style="opacity:0;transition:opacity .3s .4s;filter:drop-shadow(0 0 6px ${d.color})"/>
        ${label ? `<text x="${lx.toFixed(1)}" y="${(ly+4).toFixed(1)}"
          text-anchor="${anchor}"
          style="font-family:var(--fh,Arial);font-size:10px;letter-spacing:.08em;fill:${d.color};opacity:0;transition:opacity .4s ${0.3+i*0.06}s;filter:drop-shadow(0 0 8px ${d.color})"
        >${label}</text>` : ''}
      `;
    }).join('');

    popup.textContent = '';
    const pw = document.createElement('div'); pw.className = 'popup-wrap';
    if(iconHTML){ const pi = document.createElement('div'); pi.className = 'popup-icon'; pi.appendChild(iconHTML); pw.appendChild(pi); }
    const pn = document.createElement('div'); pn.className = 'popup-name'; pn.textContent = name; pw.appendChild(pn);
    const pd = document.createElement('div'); pd.className = 'popup-desc'; pd.textContent = desc; pw.appendChild(pd);
    const pl = document.createElement('ul'); pl.className = 'popup-list';
    items.forEach(item => { const li = document.createElement('li'); li.textContent = item; pl.appendChild(li); });
    pw.appendChild(pl); popup.appendChild(pw);

    positionPopup();
    overlay.style.opacity = '1';
    popup.style.opacity = '1';
    popup.style.transform = 'scale(1)';

    /* Анімуємо промені */
    setTimeout(() => {
      popup.querySelectorAll('.ray').forEach(r => r.setAttribute('stroke-dashoffset','0'));
      popup.querySelectorAll('circle[r="3"]').forEach(c => c.style.opacity = '1');
      popup.querySelectorAll('text').forEach(t => t.style.opacity = '1');
    }, 50);
  }

  function hide(){
    hideTimer = setTimeout(() => {
      overlay.style.opacity = '0';
      popup.style.opacity = '0';
      popup.style.transform = 'scale(0.6)';
      currentKey = null;
    }, 150);
  }

  /* CSS анімація пульсу */
  const style = document.createElement('style');
  style.textContent = '@keyframes popupPulse{0%,100%{r:60;opacity:.2}50%{r:75;opacity:.05}}';
  document.head.appendChild(style);

  nodes.forEach(n => {
    n.addEventListener('mouseenter', () => show(n));
    n.addEventListener('mouseleave', hide);
  });
  overlay.addEventListener('click', hide);
})();

/* ── STACK TAGS TYPEWRITER HOVER ── */
(function(){
  const TAGS_DATA = {
    'FastAPI':     { arrow: '↓', text: 'Асинхронний Python фреймворк. Обробляє тисячі запитів одночасно без блокування.' },
    'PostgreSQL':  { arrow: '↓', text: 'Реляційна БД з ACID гарантіями. Параметризовані запити — SQL injection неможливий.' },
    'Redis':       { arrow: '↓', text: 'In-memory сховище. Rate-limit, черги DLQ та FSM стани бота за мілісекунди.' },
    'aiogram':     { arrow: '↓', text: 'Асинхронний Telegram фреймворк. Квізи, FSM, інлайн-кнопки та webhook підтримка.' },
    'Railway':     { arrow: '↓', text: 'Хмарний PaaS деплой. Автоматичний restart, env vars та моніторинг 24/7.' },
  };

  const tags = document.querySelectorAll('.stack-tag');
  if(!tags.length) return;

  tags.forEach(tag => {
    const nameEl = tag.querySelector('.stack-tag__name');
    if(!nameEl) return;
    const name = nameEl.textContent.trim();
    const data = TAGS_DATA[name];
    if(!data) return;

    /* Створюємо dropdown */
    const drop = document.createElement('div');
    drop.style.cssText = 'position:absolute;left:0;top:100%;width:240px;padding:14px 16px;background:var(--bg2);border:1px solid var(--border);border-top:1px solid var(--red);z-index:50;opacity:0;pointer-events:none;transition:opacity .2s;';

    const arrow = document.createElement('div');
    arrow.style.cssText = 'font-size:10px;color:var(--red);margin-bottom:8px;letter-spacing:.1em;';
    arrow.textContent = data.arrow;

    const txt = document.createElement('div');
    txt.style.cssText = 'font-size:11px;color:var(--muted2);line-height:1.7;font-family:var(--fh);letter-spacing:.04em;min-height:2.4em;';

    drop.appendChild(arrow);
    drop.appendChild(txt);
    tag.style.position = 'relative';
    tag.appendChild(drop);

    let typeTimer = null;
    let hideTimer = null;

    function typewrite(text, el, speed=28){
      el.textContent = '';
      let i = 0;
      clearInterval(typeTimer);
      typeTimer = setInterval(() => {
        el.textContent += text[i];
        i++;
        if(i >= text.length) clearInterval(typeTimer);
      }, speed);
    }

    tag.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
      drop.style.opacity = '1';
      drop.style.pointerEvents = 'auto';
      typewrite(data.text, txt);
    });

    tag.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => {
        drop.style.opacity = '0';
        drop.style.pointerEvents = 'none';
        clearInterval(typeTimer);
        txt.textContent = '';
      }, 200);
    });
  });
})();
