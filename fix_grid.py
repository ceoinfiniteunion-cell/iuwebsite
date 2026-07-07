with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ── 1. НОВИЙ CSS для сітки 3x3 ──
old_cards_css = '''/* Картка 1 — зліва вгорі */
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
.gs-line-active{stroke-dashoffset:0 !important;}
.gs-dot-active{opacity:1 !important;}
.gs-card.active{ opacity:1; pointer-events:auto; }
#gs-card-0.active{ transform:translateX(0); }
#gs-card-1.active{ transform:translateX(-50%) translateY(0); }
#gs-card-2.active{ transform:translateX(0); }
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
#gs-card-4.active{ transform:translateX(0); }'''

new_cards_css = '''.gs-cards-grid{
  position:absolute;inset:0;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap:0;
  pointer-events:none;
  z-index:6;
}
.gs-card{
  position:relative;
  width:auto;
  background:linear-gradient(160deg,rgba(20,8,8,0.92) 0%,rgba(8,3,3,0.92) 100%);
  border:1px solid rgba(212,0,0,0.15);
  padding:20px 18px;
  opacity:0;
  pointer-events:none;
  transition:opacity .6s var(--ease2), transform .6s var(--ease2);
  transform:scale(0.95);
  overflow:hidden;
}
.gs-card.active{opacity:1;pointer-events:auto;transform:scale(1);}
.gs-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(212,0,0,0.06),transparent 70%);opacity:0;transition:opacity .5s;}
.gs-card:hover::before{opacity:1;}
/* Глобус займає центр сітки: col 3, rows 1-2 */
.gs-globe-cell{
  grid-column:3;
  grid-row:1/3;
  position:relative;
  pointer-events:none;
}
/* Порядок появи (grid-area: row / col) */
#gs-card-0{ grid-column:1; grid-row:1; } /* 1 — верх-ліво */
#gs-card-1{ grid-column:5; grid-row:2; } /* 2 — низ-право */
#gs-card-2{ grid-column:3; grid-row:2; } /* 3 — низ-центр (під глобусом) */
#gs-card-3{ grid-column:1; grid-row:2; } /* 4 — низ-ліво */
#gs-card-4{ grid-column:4; grid-row:1; } /* 5 — верх-правий-центр */
#gs-card-5{ grid-column:2; grid-row:1; } /* 6 — верх-лівий-центр */
#gs-card-6{ grid-column:4; grid-row:2; } /* 7 — низ-правий-центр */
#gs-card-7{ grid-column:2; grid-row:2; } /* 8 — низ-лівий-центр */
#gs-card-8{ grid-column:5; grid-row:1; } /* 9 — верх-право */
.gs-line-active{stroke-dashoffset:0 !important;}
.gs-dot-active{opacity:1 !important;}'''

html = html.replace(old_cards_css, new_cards_css)

# ── 2. НОВИЙ HTML — 8 карток + глобус в сітці ──
old_section = '''      <canvas id="gs-globe"></canvas>
      <canvas id="gs-overlay" style="pointer-events:none;z-index:5;"></canvas>
      <svg id="gs-connector" viewBox="0 0 1000 1000" preserveAspectRatio="none" style="display:none;position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:5;">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <line id="gs-line" x1="500" y1="500" x2="800" y2="500" stroke="rgba(212,0,0,0.5)" stroke-width="1" stroke-dasharray="3 5" opacity="0" filter="url(#glow)"/>
        <circle id="gs-dot-marker" cx="500" cy="500" r="4" fill="#d40000" opacity="0" filter="url(#glow)"/>
        <circle id="gs-dot-pulse" cx="500" cy="500" r="4" fill="none" stroke="#d40000" stroke-width="1" opacity="0"/>
      </svg>
      <div class="gs-cards-row">
        <div class="gs-card" id="gs-card-0">
          <div class="gs-card-inner">
            <div class="gs-num">01 / 05</div>
            <div class="gs-badge">⭐ Флагманський кейс</div>
            <div class="gs-title">Transfer Kharkiv</div>
            <div class="gs-desc">Комерційний сервіс міжміського таксі — лендінг з конверсією 8.4%, два боти для клієнтів і водіїв, бекенд, SEO та рекламні кампанії під ключ.</div>
            <div class="gs-stats">
              <span><b>119</b> SEO-сторінок</span>
              <span><b>35/35</b> CI тестів</span>
              <span><b>24/7</b> Uptime</span>
            </div>
            <a href="https://transferkharkiv.com.ua" target="_blank" class="gs-link">Переглянути ↗</a>
          </div>
        </div>
        <div class="gs-card" id="gs-card-1">
          <div class="gs-card-inner">
            <div class="gs-num">02 / 05</div>
            <div class="gs-badge">Telegram-бот</div>
            <div class="gs-title">Realty Monitor</div>
            <div class="gs-desc">SaaS моніторинг нерухомості з платними підписками, реферальною системою та адмін-панеллю — пасивний дохід без участі команди.</div>
            <div class="gs-stats">
              <span><b>LiqPay</b> оплата</span>
              <span><b>FSM</b> архітектура</span>
            </div>
          </div>
        </div>
        <div class="gs-card" id="gs-card-2">
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

new_section = '''      <canvas id="gs-overlay" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:7;"></canvas>
      <div class="gs-cards-grid">
        <div class="gs-card" id="gs-card-0"><div class="gs-num">01</div><div class="gs-badge">Флагман</div><div class="gs-title">Transfer Kharkiv</div><div class="gs-desc">Комерційний сервіс міжміського таксі — лендінг, боти, SEO.</div><div class="gs-stats"><span><b>119</b> SEO</span><span><b>24/7</b></span></div><a href="https://transferkharkiv.com.ua" target="_blank" class="gs-link">↗</a></div>
        <div class="gs-card" id="gs-card-5"><div class="gs-num">06</div><div class="gs-badge">—</div><div class="gs-title">Проект 6</div><div class="gs-desc">—</div></div>
        <div class="gs-globe-cell">
          <canvas id="gs-globe" style="width:100%;height:100%;display:block;opacity:0;transition:opacity 1.2s;cursor:grab;touch-action:none;"></canvas>
        </div>
        <div class="gs-card" id="gs-card-4"><div class="gs-num">05</div><div class="gs-badge">—</div><div class="gs-title">Проект 5</div><div class="gs-desc">—</div></div>
        <div class="gs-card" id="gs-card-8"><div class="gs-num">09</div><div class="gs-badge">—</div><div class="gs-title">Проект 9</div><div class="gs-desc">—</div></div>
        <div class="gs-card" id="gs-card-3"><div class="gs-num">04</div><div class="gs-badge">Автоматизація</div><div class="gs-title">IU Bot</div><div class="gs-desc">Telegram lead-бот з квізом та Railway деплоєм.</div><div class="gs-stats"><span><b>FastAPI</b></span><span><b>Redis</b></span></div></div>
        <div class="gs-card" id="gs-card-7"><div class="gs-num">08</div><div class="gs-badge">—</div><div class="gs-title">Проект 8</div><div class="gs-desc">—</div></div>
        <div class="gs-card" id="gs-card-2"><div class="gs-num">03</div><div class="gs-badge">Університет</div><div class="gs-title">KNEU Bot</div><div class="gs-desc">Офіційний бот з 3 000+ користувачів.</div><div class="gs-stats"><span><b>3 000+</b></span></div></div>
        <div class="gs-card" id="gs-card-6"><div class="gs-num">07</div><div class="gs-badge">—</div><div class="gs-title">Проект 7</div><div class="gs-desc">—</div></div>
        <div class="gs-card" id="gs-card-1"><div class="gs-num">02</div><div class="gs-badge">SaaS</div><div class="gs-title">Realty Monitor</div><div class="gs-desc">SaaS моніторинг нерухомості з LiqPay та FSM.</div><div class="gs-stats"><span><b>LiqPay</b></span><span><b>FSM</b></span></div></div>
      </div>'''

html = html.replace(old_section, new_section)

# ── 3. ОНОВИТИ JS — canvas тепер всередині .gs-globe-cell ──
old_canvas_ref = "  const canvas = document.getElementById('gs-globe');"
new_canvas_ref = "  const canvas = document.getElementById('gs-globe');"
# canvas id той самий, нічого не міняємо

# ── 4. ОНОВИТИ ПОРОГИ ДО 8 КАРТОК ──
old_thresh = "    const thresholds = [0.12, 0.28, 0.44, 0.60, 0.76];"
new_thresh = "    const thresholds = [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80];"
html = html.replace(old_thresh, new_thresh)

# ── 5. ОНОВИТИ PROJECTS ДО 8 ──
old_proj = '''  const PROJECTS = [
    { phi:-4.974, lat:49.99,  lng:36.23  }, // Transfer Kharkiv
    { phi:2.426,  lat:40.71,  lng:-74.01 }, // Realty Monitor (NY)
    { phi:-0.750, lat:-33.86, lng:151.20 }, // KNEU Bot (Sydney)
    { phi:1.200,  lat:50.45,  lng:30.52  }, // IU Bot (Kyiv)
    { phi:-2.500, lat:48.85,  lng:2.35   }, // Project 5 (Paris)
  ];'''
new_proj = '''  const PROJECTS = [
    { phi:-4.974, lat:49.99,  lng:36.23  }, // 1 Transfer Kharkiv
    { phi:-0.750, lat:-33.86, lng:151.20 }, // 2 Realty Monitor
    { phi:-0.750, lat:-33.86, lng:151.20 }, // 3 KNEU Bot
    { phi:1.200,  lat:50.45,  lng:30.52  }, // 4 IU Bot
    { phi:-2.500, lat:48.85,  lng:2.35   }, // 5
    { phi:2.426,  lat:40.71,  lng:-74.01 }, // 6
    { phi:0.500,  lat:35.68,  lng:139.69 }, // 7
    { phi:3.000,  lat:51.50,  lng:-0.12  }, // 8
  ];'''
html = html.replace(old_proj, new_proj)

# ── 6. OVERLAY — позиція тепер absolute inset:0 ──
old_overlay_css = "#gs-overlay{position:absolute !important;left:28% !important;top:0% !important;width:78% !important;height:78% !important;pointer-events:none;z-index:5;}"
new_overlay_css = "#gs-overlay{position:absolute !important;inset:0 !important;width:100% !important;height:100% !important;pointer-events:none;z-index:7;}"
html = html.replace(old_overlay_css, new_overlay_css)

# ── 7. gs-globe тепер без абсолютного позиціонування ──
old_globe_css = '''#gs-globe{
  position:absolute !important;
  left:28% !important;top:0% !important;
  width:78% !important;height:78% !important;
  display:block;opacity:0;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:1;transform:none !important;
}'''
new_globe_css = '''#gs-globe{
  position:absolute !important;
  inset:0 !important;
  width:100% !important;height:100% !important;
  display:block;opacity:0;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:1;transform:none !important;
}'''
html = html.replace(old_globe_css, new_globe_css)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Сітка 3x3 з 8 картками навколо глобуса готова")
