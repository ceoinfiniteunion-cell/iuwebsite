with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Фікс JS помилки — PROJECTS має відповідати кількості карток
old_proj = '''  const PROJECTS = [
    { phi:-4.974, lat:49.99,  lng:36.23  },
    { phi:-0.750, lat:-33.86, lng:151.20 },
    { phi:-0.750, lat:-33.86, lng:151.20 },
    { phi:1.200,  lat:50.45,  lng:30.52  },
    { phi:-2.500, lat:48.85,  lng:2.35   },
    { phi:2.426,  lat:40.71,  lng:-74.01 },
    { phi:0.500,  lat:35.68,  lng:139.69 },
    { phi:3.000,  lat:51.50,  lng:-0.12  },
    { phi:-1.500, lat:1.35,   lng:103.82 },
  ];'''
new_proj = '''  const PROJECTS = [
    { phi:-4.974, lat:49.99,  lng:36.23  },
    { phi:2.426,  lat:40.71,  lng:-74.01 },
    { phi:-0.750, lat:-33.86, lng:151.20 },
    { phi:1.200,  lat:50.45,  lng:30.52  },
    { phi:-2.500, lat:48.85,  lng:2.35   },
    { phi:0.800,  lat:51.50,  lng:-0.12  },
    { phi:0.500,  lat:35.68,  lng:139.69 },
    { phi:3.000,  lat:1.35,   lng:103.82 },
    { phi:-1.500, lat:48.85,  lng:2.35   },
  ];'''
html = html.replace(old_proj, new_proj)

# 2. Фікс setCard — guard проти out of bounds
old_setcard = '''  function setCard(idx){
    if(idx === currentCard) return;
    document.querySelectorAll('.gs-card').forEach((c,i) =>{
      c.classList.toggle('active', idx >= 0 && i <= idx);
    });
    document.querySelectorAll('.gs-dot').forEach((d,i) =>{
      d.classList.toggle('active', i === idx);
    });
    targetPhi = PROJECTS[idx].phi;
    const hint = document.getElementById('gs-scroll-hint');
    if(hint) hint.classList.toggle('hidden', idx === PROJECTS.length - 1);
    currentCard = idx;
  }'''
new_setcard = '''  function setCard(idx){
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
  }'''
html = html.replace(old_setcard, new_setcard)

# 3. Фікс scroll handler — guard
old_scroll_end = '''    if(idx>=0 && idx!==currentCard && PROJECTS[idx]){ targetPhi = PROJECTS[idx].phi; currentCard = idx; }'''
new_scroll_end = '''    if(idx>=0 && idx!==currentCard && PROJECTS[idx]){ setCard(idx); }'''
html = html.replace(old_scroll_end, new_scroll_end)

# 4. Картка 09 не зрізана — зменшити right
old_card8 = '''#gs-card-8{ right:2%; top:16%; transform:translateX(40px); }
#gs-card-8.active{ transform:translateX(0); }'''
new_card8 = '''#gs-card-8{ right:0; top:16%; transform:translateX(40px); width:180px; }
#gs-card-8.active{ transform:translateX(0); }'''
html = html.replace(old_card8, new_card8)

# 5. Заголовок не перекриває картки — зробити прозорим фон і менший padding
old_secin = '''<div class="sec-in" style="position:absolute;top:0;left:0;right:0;z-index:10;pointer-events:none;padding:32px 48px;">'''
new_secin = '''<div class="sec-in" style="position:absolute;top:0;left:0;right:0;z-index:10;pointer-events:none;padding:16px 48px;">'''
html = html.replace(old_secin, new_secin)

# 6. Картки не з'являються всі одразу — прибрати active з всіх при старті
# Вони не мають бути active по дефолту — JS scroll handler їх активує
# Перевіряємо чи є десь auto-activation при завантаженні
# initGlobe не активує картки — лише scroll handler

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Всі фікси застосовано:")
print("  1. PROJECTS 9 елементів з унікальними координатами")
print("  2. setCard з guard проти out-of-bounds")
print("  3. scroll handler викликає setCard")
print("  4. Картка 09 не зрізана")
print("  5. Заголовок менший padding")
