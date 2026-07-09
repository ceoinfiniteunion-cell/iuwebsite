/* PRELOADER */
(function(){
  const bar=document.getElementById('lbar'),num=document.getElementById('lnum'),loader=document.getElementById('loader'),status=document.getElementById('lstatus');
  const msgs=['• Ініціалізація','• Завантаження активів','• Майже готово'];
  let p=0,mi=0;
  setTimeout(()=>document.getElementById('lavatar').classList.add('v'),200);
  const iv=setInterval(()=>{
    p+=Math.random()*2.6+0.6;
    if(p>30&&mi===0){mi=1;status.textContent=msgs[1];}
    if(p>70&&mi===1){mi=2;status.textContent=msgs[2];}
    if(p>=100){p=100;clearInterval(iv);setTimeout(()=>{loader.classList.add('done');startHero();},600);}
    bar.style.width=p+'%';num.textContent=Math.floor(p);
  },40);
})();

function startHero(){
  const ids=['havatar','hm','hl1','hl2','hl3','hsub','hbtns','hscroll'];
  ids.forEach((id,i)=>{const el=document.getElementById(id);if(el)setTimeout(()=>el.classList.add('v'),i*120);});
}
