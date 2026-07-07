import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ── 1. FIX OVERLAY CANVAS SIZE ──
# Замінюємо drawLines щоб overlay отримував правильний розмір через offsetWidth
old_drawlines = '''  function drawLines(){
    if(!ctx2d || !overlay) return;
    if(overlay.width !== canvas.width){ overlay.width = canvas.width; overlay.height = canvas.height; }
    ctx2d.clearRect(0, 0, overlay.width, overlay.height);'''

new_drawlines = '''  function resizeOverlay(){
    const dpr = Math.min(window.devicePixelRatio||1,2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight || canvas.offsetWidth;
    if(!w) return;
    if(overlay.width !== Math.round(w*dpr)){
      overlay.width  = Math.round(w*dpr);
      overlay.height = Math.round(h*dpr);
    }
  }
  function drawLines(){
    if(!ctx2d || !overlay) return;
    resizeOverlay();
    ctx2d.save();
    const dpr = Math.min(window.devicePixelRatio||1,2);
    ctx2d.clearRect(0, 0, overlay.width, overlay.height);
    ctx2d.scale(dpr, dpr);'''

html = html.replace(old_drawlines, new_drawlines)

# Закрити ctx2d.save() — додати restore() перед закриваючою дужкою drawLines
old_drawlines_end = '''      ctx2d.fill();
    });
  }'''
new_drawlines_end = '''      ctx2d.fill();
    });
    ctx2d.restore();
  }'''
html = html.replace(old_drawlines_end, new_drawlines_end, 1)

# ── 2. FIX CARD-1 (Realty Monitor) — менша, вище ──
old_card1_css = '''/* Картка 2 — знизу по центру */
#gs-card-1{
  left:50%;bottom:4%;
  transform:translateX(-50%) translateY(20px);
  width:200px;
}'''
new_card1_css = '''/* Картка 2 — знизу по центру */
#gs-card-1{
  left:50%;bottom:9%;
  transform:translateX(-50%) translateY(20px);
  width:170px;
}'''
html = html.replace(old_card1_css, new_card1_css)

# ── 3. ДОДАТИ 2 НОВІ КАРТКИ (CSS) ──
old_card2_css = '''.gs-line-active{stroke-dashoffset:0 !important;}'''
new_card2_css = '''/* Картка 4 — зліва знизу */
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
.gs-line-active{stroke-dashoffset:0 !important;}'''
html = html.replace(old_card2_css, new_card2_css)

# ── 4. ДОДАТИ HTML ДЛЯ 2 НОВИХ КАРТОК ──
old_cards_html = '''        <div class="gs-card" id="gs-card-2">
          <div class="gs-card-inner">
            <div class="gs-num">03 / 03</div>
            <div class="gs-badge">Університет</div>
            <div class="gs-title">KNEU Bot</div>
            <div class="gs-desc">Офіційний бот університету з 3 000+ активних користувачів: автоматизація розкладу, комунікація деканату і студентів.</div>
            <div class="gs-stats">
              <span><b>3 000+</b> користувачів</span>
              <span><b>aiogram 3</b> стек</span>
            </div>
          </div>
        </div>
      </div>'''
new_cards_html = '''        <div class="gs-card" id="gs-card-2">
          <div class="gs-card-inner">
            <div class="gs-num">03 / 05</div>
            <div class="gs-badge">Університет</div>
            <div class="gs-title">KNEU Bot</div>
            <div class="gs-desc">Офіційний бот університету з 3 000+ активних користувачів: автоматизація розкладу, комунікація деканату і студентів.</div>
            <div class="gs-stats">
              <span><b>3 000+</b> користувачів</span>
              <span><b>aiogram 3</b> стек</span>
            </div>
          </div>
        </div>
        <div class="gs-card" id="gs-card-3">
          <div class="gs-card-inner">
            <div class="gs-num">04 / 05</div>
            <div class="gs-badge">Автоматизація</div>
            <div class="gs-title">Infinite Union Bot</div>
            <div class="gs-desc">Telegram lead-бот з квізом, кваліфікацією клієнтів, PostgreSQL та Railway деплоєм — генерує заявки 24/7.</div>
            <div class="gs-stats">
              <span><b>FastAPI</b> бекенд</span>
              <span><b>Redis</b> черга</span>
            </div>
          </div>
        </div>
        <div class="gs-card" id="gs-card-4">
          <div class="gs-card-inner">
            <div class="gs-num">05 / 05</div>
            <div class="gs-badge">SaaS</div>
            <div class="gs-title">Ще один проект</div>
            <div class="gs-desc">Опис вашого п\'ятого проекту — замініть цей текст на реальний кейс з метриками та результатами.</div>
            <div class="gs-stats">
              <span><b>—</b> метрика</span>
              <span><b>—</b> стек</span>
            </div>
          </div>
        </div>
      </div>'''
html = html.replace(old_cards_html, new_cards_html)

# ── 5. ОНОВИТИ НУМЕРАЦІЮ ПЕРШИХ КАРТОК ──
html = html.replace('<div class="gs-num">01 / 03</div>', '<div class="gs-num">01 / 05</div>')
html = html.replace('<div class="gs-num">02 / 03</div>', '<div class="gs-num">02 / 05</div>')

# ── 6. ОНОВИТИ PROJECTS + ПОРОГИ + SETCARD ДЛЯ 5 КАРТОК ──
old_projects = '''  const PROJECTS = [
    { phi:-4.974, lat:49.99,  lng:36.23  }, // Transfer Kharkiv
    { phi:2.426,  lat:40.71,  lng:-74.01 }, // Realty Monitor (NY)
    { phi:-0.750, lat:-33.86, lng:151.20 }, // KNEU Bot (Sydney)
  ];'''
new_projects = '''  const PROJECTS = [
    { phi:-4.974, lat:49.99,  lng:36.23  }, // Transfer Kharkiv
    { phi:2.426,  lat:40.71,  lng:-74.01 }, // Realty Monitor (NY)
    { phi:-0.750, lat:-33.86, lng:151.20 }, // KNEU Bot (Sydney)
    { phi:1.200,  lat:50.45,  lng:30.52  }, // IU Bot (Kyiv)
    { phi:-2.500, lat:48.85,  lng:2.35   }, // Project 5 (Paris)
  ];'''
html = html.replace(old_projects, new_projects)

old_thresholds = '''    const thresholds = [0.15, 0.42, 0.68];'''
new_thresholds = '''    const thresholds = [0.12, 0.28, 0.44, 0.60, 0.76];'''
html = html.replace(old_thresholds, new_thresholds)

# Оновити markers в initGlobe
old_markers = '''      markers: [
        { location:[49.99,  36.23 ], size:0.07 },
        { location:[40.71, -74.01 ], size:0.07 },
        { location:[-33.86, 151.20], size:0.07 },
      ],'''
new_markers = '''      markers: [
        { location:[49.99,  36.23 ], size:0.07 },
        { location:[40.71, -74.01 ], size:0.07 },
        { location:[-33.86, 151.20], size:0.07 },
        { location:[50.45,  30.52 ], size:0.07 },
        { location:[48.85,  2.35  ], size:0.07 },
      ],'''
html = html.replace(old_markers, new_markers)

# ── 7. FIX PROGRESS DOTS — додати 2 нових dots в HTML ──
old_hint = '''      <div class="gs-scroll-hint" id="gs-scroll-hint">'''
# Шукаємо прогрес-dots
old_progress = '''<div class="gs-progress">
        <div class="gs-dot active"></div>
        <div class="gs-dot"></div>
        <div class="gs-dot"></div>
      </div>'''
new_progress = '''<div class="gs-progress">
        <div class="gs-dot active"></div>
        <div class="gs-dot"></div>
        <div class="gs-dot"></div>
        <div class="gs-dot"></div>
        <div class="gs-dot"></div>
      </div>'''
html = html.replace(old_progress, new_progress)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Всі правки застосовані:")
print("  1. overlay canvas size fix (resizeOverlay + dpr scaling)")
print("  2. Realty Monitor card — менша та вище")
print("  3. Додано gs-card-3 та gs-card-4 (HTML + CSS)")
print("  4. PROJECTS масив розширено до 5")
print("  5. Пороги скролу: [0.12, 0.28, 0.44, 0.60, 0.76]")
print("  6. Markers на глобусі: 5 точок")
print("  7. Progress dots: 5 крапок")
