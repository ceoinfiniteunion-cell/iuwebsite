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
document.getElementById('cForm').addEventListener('submit',function(e){
  e.preventDefault();
  if(document.getElementById('website').value){return;}
  const _btn=this.querySelector('button[type=submit]');
  _btn.disabled=true;_btn.textContent='Надсилаємо...';
  fetch('https://iu-lead-bot-production.up.railway.app/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:document.getElementById('cn').value,contact:document.getElementById('cc').value,phone:document.getElementById('cphone').value,project_type:document.getElementById('ctype').value,budget:document.getElementById('cbudget').value,deadline:document.getElementById('cdeadline').value,project:document.getElementById('cp').value})})
  .then(r=>{if(!r.ok)throw new Error('server');_btn.style.display='none';document.getElementById('cOk').style.display='block';})
  .catch(()=>{_btn.disabled=false;_btn.textContent='Надіслати →';alert('Помилка відправки. Перевірте зʼєднання або напишіть нам напряму в Telegram.');});
});

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

/* ── STACK NODE DETAIL PANEL ── */
(function(){
  const nodes = document.querySelectorAll('.stack-node[data-node]');
  const detail = document.getElementById('stackDetail');
  const labelEl = document.getElementById('stackLabel');
  const itemsEl = document.getElementById('stackItems');
  if(!nodes.length || !detail) return;

  const DATA = {
    form:  { label: 'Форма', items: ['Honeypot захист від ботів', 'Rate-limit 10 req/IP/добу', 'HTTPS шифрування'] },
    valid: { label: 'Валідація', items: ['Pydantic типи даних', 'Ліміт довжини полів', 'XSS санітизація html.escape()'] },
    db:    { label: 'База даних', items: ['PostgreSQL параметризовані запити', 'Пул з'єднань ×10', 'Audit log кожної дії'] },
    queue: { label: 'Черга', items: ['Redis Dead Letter Queue', 'Авто-ретрай при збої', 'Zero data loss гарантія'] },
    tg:    { label: 'Telegram', items: ['Exponential backoff 1→2→4с', '3 спроби доставки', 'Реакція 15 хвилин'] },
  };

  let current = null;

  function show(node){
    const key = node.getAttribute('data-node');
    const d = DATA[key];
    if(!d) return;

    labelEl.textContent = d.label;
    itemsEl.innerHTML = d.items.map(i =>
      `<div class="stack-detail__item">${i}</div>`
    ).join('');

    detail.classList.remove('visible');
    void detail.offsetWidth; // reflow
    detail.classList.add('visible');
    current = node;
  }

  function hide(){
    detail.classList.remove('visible');
    current = null;
  }

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => show(node));
    node.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if(current === node) hide();
      }, 100);
    });
  });

  detail.addEventListener('mouseenter', () => {
    detail.classList.add('visible');
  });
  detail.addEventListener('mouseleave', hide);
})();
