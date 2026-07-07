with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ═══ 1. ГЛОБУС ПО ЦЕНТРУ + OVERLAY ПО ЦЕНТРУ ═══
old_globe_overlay = '''#gs-overlay{position:absolute !important;left:28% !important;top:0% !important;width:78% !important;height:78% !important;pointer-events:none;z-index:5;}
#gs-globe{
  position:absolute !important;
  left:28% !important;top:0% !important;
  width:78% !important;height:78% !important;
  display:block;opacity:0;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:1;transform:none !important;
}'''
new_globe_overlay = '''#gs-overlay{position:absolute !important;inset:0 !important;width:100% !important;height:100% !important;pointer-events:none;z-index:5;}
#gs-globe{
  position:absolute !important;
  left:50% !important;top:50% !important;
  width:44vh !important;height:44vh !important;
  transform:translate(-50%,-50%) !important;
  display:block;opacity:0;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:2;
}'''
html = html.replace(old_globe_overlay, new_globe_overlay)

# ═══ 2. ПОЗИЦІЇ 8 КАРТОК НАВКОЛО ГЛОБУСА ═══
old_positions = '''.gs-card{
  position:absolute;
  width:280px;
  background:linear-gradient(160deg, rgba(20,8,8,0.95) 0%, rgba(8,3,3,0.95) 100%);
  border:1px solid rgba(212,0,0,0.2);
  border-radius:2px;
  backdrop-filter:blur(16px);
  box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,0,0,0.08);
  padding:24px 22px;
  opacity:0;
  pointer-events:none;
  transition:opacity .6s var(--ease2), transform .6s var(--ease2);
}
/* Картка 1 — зліва вгорі */
#gs-card-0{
  left:1%;top:20%;
  transform:translateX(-30px);
  width:220px;
}
/* Картка 2 — знизу по центру */
#gs-card-1{
  left:50%;bottom:13%;
  transform:translateX(-50%) translateY(20px);
  width:160px;
}
/* Картка 3 — справа вгорі */
#gs-card-2{
  right:1%;top:20%;
  transform:translateX(30px);
  width:220px;
}
/* Картка 4 — зліва знизу */
#gs-card-3{
  left:1%;bottom:18%;
  transform:translateX(-30px);
  width:210px;
}
#gs-card-3.active{ transform:translateX(0); }
/* Картка 5 — справа знизу */
#gs-card-4{
  right:1%;bottom:18%;
  transform:translateX(30px);
  width:210px;
}
#gs-card-4.active{ transform:translateX(0); }
.gs-line-active{stroke-dashoffset:0 !important;}
.gs-dot-active{opacity:1 !important;}
.gs-card.active{ opacity:1; pointer-events:auto; }
#gs-card-0.active{ transform:translateX(0); }
#gs-card-1.active{ transform:translateX(-50%) translateY(0); }
#gs-card-2.active{ transform:translateX(0); }'''

new_positions = '''.gs-card{
  position:absolute;
  width:210px;
  background:linear-gradient(160deg, rgba(20,8,8,0.95) 0%, rgba(8,3,3,0.95) 100%);
  border:1px solid rgba(212,0,0,0.2);
  border-radius:2px;
  backdrop-filter:blur(16px);
  box-shadow:0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,0,0,0.08);
  padding:20px 18px;
  opacity:0;
  pointer-events:none;
  transition:opacity .6s var(--ease2), transform .6s var(--ease2);
}
.gs-card.active{ opacity:1; pointer-events:auto; }
/* Порядок появи: 1,2,3,4,5,6,7,8 = id 0..7 */
/* 1 — зліва зверху */
#gs-card-0{ left:2%;  top:16%;  transform:translateX(-40px); }
#gs-card-0.active{ transform:translateX(0); }
/* 2 — справа знизу */
#gs-card-1{ right:2%; bottom:8%; transform:translateX(40px); }
#gs-card-1.active{ transform:translateX(0); }
/* 3 — знизу по центру */
#gs-card-2{ left:50%; bottom:4%; transform:translateX(-50%) translateY(30px); width:190px; }
#gs-card-2.active{ transform:translateX(-50%) translateY(0); }
/* 4 — зліва знизу */
#gs-card-3{ left:2%;  bottom:8%; transform:translateX(-40px); }
#gs-card-3.active{ transform:translateX(0); }
/* 5 — справа зверху (ближче до центру) */
#gs-card-4{ right:24%; top:14%;  transform:translateY(-30px); width:190px; }
#gs-card-4.active{ transform:translateY(0); }
/* 6 — зліва зверху (ближче до центру) */
#gs-card-5{ left:24%;  top:14%;  transform:translateY(-30px); width:190px; }
#gs-card-5.active{ transform:translateY(0); }
/* 7 — справа знизу (ближче до центру) */
#gs-card-6{ right:24%; bottom:8%; transform:translateY(30px); width:190px; }
#gs-card-6.active{ transform:translateY(0); }
/* 8 — зліва знизу (ближче до центру) */
#gs-card-7{ left:24%;  bottom:8%; transform:translateY(30px); width:190px; }
#gs-card-7.active{ transform:translateY(0); }
/* 9 — справа зверху (край) */
#gs-card-8{ right:2%; top:16%; transform:translateX(40px); }
#gs-card-8.active{ transform:translateX(0); }
.gs-line-active{stroke-dashoffset:0 !important;}
.gs-dot-active{opacity:1 !important;}'''

html = html.replace(old_positions, new_positions)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Крок 1/2: глобус по центру + позиції 8 карток")
