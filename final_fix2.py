with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ═══ ЗАМІНА HTML КАРТОК на 8 (компактні) ═══
# Знаходимо весь блок gs-cards-row і замінюємо
import re
start = html.find('<div class="gs-cards-row">')
end = html.find('</div>\n    </div>\n  </div>\n</section>', start)
# краще знайти закриття cards-row точніше
# Візьмемо від gs-cards-row до </div> що закриває row перед </div sticky
before = html[:start]
# знайти кінець: останній gs-card + закриваючий div row
# шукаємо "\n      </div>\n    </div>" після старту (row close + sticky div)
row_close = html.find('\n      </div>\n    </div>\n  </div>\n</section>', start)
after = html[row_close:]

new_cards = '''<div class="gs-cards-row">
        <div class="gs-card" id="gs-card-0"><div class="gs-num">01</div><div class="gs-badge">⭐ Флагман</div><div class="gs-title">Transfer Kharkiv</div><div class="gs-desc">Лендінг з конверсією 8.4%, боти, SEO під ключ.</div><div class="gs-stats"><span><b>119</b> SEO</span><span><b>24/7</b></span></div><a href="https://transferkharkiv.com.ua" target="_blank" class="gs-link">Переглянути ↗</a></div>
        <div class="gs-card" id="gs-card-1"><div class="gs-num">02</div><div class="gs-badge">SaaS</div><div class="gs-title">Realty Monitor</div><div class="gs-desc">Моніторинг нерухомості з LiqPay та FSM.</div><div class="gs-stats"><span><b>LiqPay</b></span><span><b>FSM</b></span></div></div>
        <div class="gs-card" id="gs-card-2"><div class="gs-num">03</div><div class="gs-badge">Університет</div><div class="gs-title">KNEU Bot</div><div class="gs-desc">Офіційний бот з 3 000+ користувачів.</div><div class="gs-stats"><span><b>3 000+</b></span><span><b>aiogram</b></span></div></div>
        <div class="gs-card" id="gs-card-3"><div class="gs-num">04</div><div class="gs-badge">Автоматизація</div><div class="gs-title">IU Bot</div><div class="gs-desc">Lead-бот з квізом, PostgreSQL, Railway.</div><div class="gs-stats"><span><b>FastAPI</b></span><span><b>Redis</b></span></div></div>
        <div class="gs-card" id="gs-card-4"><div class="gs-num">05</div><div class="gs-badge">—</div><div class="gs-title">Проект 5</div><div class="gs-desc">—</div></div>
        <div class="gs-card" id="gs-card-5"><div class="gs-num">06</div><div class="gs-badge">—</div><div class="gs-title">Проект 6</div><div class="gs-desc">—</div></div>
        <div class="gs-card" id="gs-card-6"><div class="gs-num">07</div><div class="gs-badge">—</div><div class="gs-title">Проект 7</div><div class="gs-desc">—</div></div>
        <div class="gs-card" id="gs-card-7"><div class="gs-num">08</div><div class="gs-badge">—</div><div class="gs-title">Проект 8</div><div class="gs-desc">—</div></div>
        <div class="gs-card" id="gs-card-8"><div class="gs-num">09</div><div class="gs-badge">—</div><div class="gs-title">Проект 9</div><div class="gs-desc">—</div></div>
      '''

html = before + new_cards + after

# ═══ ПОРОГИ для 9 карток ═══
html = html.replace(
    "const thresholds = [0.12, 0.28, 0.44, 0.60, 0.76];",
    "const thresholds = [0.08, 0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88];"
)

# ═══ PROJECTS до 9 ═══
old_proj = '''  const PROJECTS = [
    { phi:-4.974, lat:49.99,  lng:36.23  }, // Transfer Kharkiv
    { phi:2.426,  lat:40.71,  lng:-74.01 }, // Realty Monitor (NY)
    { phi:-0.750, lat:-33.86, lng:151.20 }, // KNEU Bot (Sydney)
  ];'''
new_proj = '''  const PROJECTS = [
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
html = html.replace(old_proj, new_proj)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Крок 2/2: 9 карток HTML + пороги + PROJECTS")
