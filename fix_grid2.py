with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# CSS для сітки
old_sticky = '''.globe-scroll-sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
  background:#060303;
}'''
new_sticky = '''.globe-scroll-sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
  background:#060303;
  display:grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}'''
html = html.replace(old_sticky, new_sticky)

# Стилі карток
old_gscard = '''.gs-card{
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
}'''
new_gscard = '''.gs-card{
  background:linear-gradient(160deg, rgba(20,8,8,0.95) 0%, rgba(8,3,3,0.95) 100%);
  border:1px solid rgba(212,0,0,0.15);
  padding:20px 18px;
  opacity:0;
  pointer-events:none;
  transition:opacity .6s var(--ease2), transform .6s var(--ease2);
  transform:scale(0.96);
  overflow:hidden;
  position:relative;
}
.gs-card.active{opacity:1;pointer-events:auto;transform:scale(1);}
.gs-globe-cell{
  grid-column:3;
  grid-row:1/3;
  position:relative;
}'''
html = html.replace(old_gscard, new_gscard)

# Прибрати старі позиції карток
import re
html = re.sub(r'/\* Картка 1[^}]*\}\n?', '', html)
html = re.sub(r'/\* Картка 2[^}]*\}\n?', '', html)
html = re.sub(r'/\* Картка 3[^}]*\}\n?', '', html)
html = re.sub(r'#gs-card-0\{[^}]*\}\n?', '', html)
html = re.sub(r'#gs-card-1\{[^}]*\}\n?', '', html)
html = re.sub(r'#gs-card-2\{[^}]*\}\n?', '', html)
html = re.sub(r'#gs-card-3\{[^}]*\}\n?', '', html)
html = re.sub(r'#gs-card-4\{[^}]*\}\n?', '', html)
html = re.sub(r'#gs-card-[0-4]\.active\{[^}]*\}\n?', '', html)

# Новий CSS grid позиції
old_linecss = '''.gs-line-active{stroke-dashoffset:0 !important;}'''
new_linecss = '''/* grid positions: порядок появи 1-9 */
#gs-card-0{ grid-column:1; grid-row:1; } /* 1 */
#gs-card-7{ grid-column:5; grid-row:2; } /* 2 */
#gs-card-2{ grid-column:3; grid-row:2; } /* 3 — під глобусом, але глобус col3 row1/2, тому окремо */
#gs-card-3{ grid-column:1; grid-row:2; } /* 4 */
#gs-card-4{ grid-column:4; grid-row:1; } /* 5 */
#gs-card-5{ grid-column:2; grid-row:1; } /* 6 */
#gs-card-6{ grid-column:4; grid-row:2; } /* 7 */
#gs-card-1{ grid-column:2; grid-row:2; } /* 8 */
#gs-card-8{ grid-column:5; grid-row:1; } /* 9 */
.gs-line-active{stroke-dashoffset:0 !important;}'''
html = html.replace(old_linecss, new_linecss)

# Новий HTML секції
old_html = '''      <canvas id="gs-globe"></canvas>
      <canvas id="gs-overlay" style="pointer-events:none;z-index:5;"></canvas>
      <svg id="gs-connector"'''
new_html = '''      <canvas id="gs-overlay" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:7;"></canvas>
      <svg id="gs-connector"'''
html = html.replace(old_html, new_html)

# Замінити gs-cards-row div на нову сітку
old_row = '''      <div class="gs-cards-row">'''
new_row = '''      <div class="gs-globe-cell"><canvas id="gs-globe" style="width:100%;height:100%;display:block;opacity:0;transition:opacity 1.2s;cursor:grab;touch-action:none;z-index:1;"></canvas></div>
      <div class="gs-card" id="gs-card-0"><div class="gs-num">01</div><div class="gs-badge">⭐ Флагман</div><div class="gs-title">Transfer Kharkiv</div><div class="gs-desc">Лендінг з конверсією 8.4%, боти, SEO.</div><div class="gs-stats"><span><b>119</b> SEO</span><span><b>24/7</b></span></div><a href="https://transferkharkiv.com.ua" target="_blank" class="gs-link">↗</a></div>
      <div class="gs-card" id="gs-card-7"><div class="gs-num">02</div><div class="gs-badge">SaaS</div><div class="gs-title">Realty Monitor</div><div class="gs-desc">Моніторинг нерухомості з LiqPay.</div><div class="gs-stats"><span><b>LiqPay</b></span><span><b>FSM</b></span></div></div>
      <div class="gs-card" id="gs-card-2"><div class="gs-num">03</div><div class="gs-badge">Університет</div><div class="gs-title">KNEU Bot</div><div class="gs-desc">3 000+ активних користувачів.</div><div class="gs-stats"><span><b>3 000+</b></span></div></div>
      <div class="gs-card" id="gs-card-3"><div class="gs-num">04</div><div class="gs-badge">Автоматизація</div><div class="gs-title">IU Bot</div><div class="gs-desc">Lead-бот з квізом, FastAPI, Redis.</div></div>
      <div class="gs-card" id="gs-card-4"><div class="gs-num">05</div><div class="gs-badge">—</div><div class="gs-title">Проект 5</div><div class="gs-desc">—</div></div>
      <div class="gs-card" id="gs-card-5"><div class="gs-num">06</div><div class="gs-badge">—</div><div class="gs-title">Проект 6</div><div class="gs-desc">—</div></div>
      <div class="gs-card" id="gs-card-6"><div class="gs-num">07</div><div class="gs-badge">—</div><div class="gs-title">Проект 7</div><div class="gs-desc">—</div></div>
      <div class="gs-card" id="gs-card-1"><div class="gs-num">08</div><div class="gs-badge">—</div><div class="gs-title">Проект 8</div><div class="gs-desc">—</div></div>
      <div class="gs-card" id="gs-card-8"><div class="gs-num">09</div><div class="gs-badge">—</div><div class="gs-title">Проект 9</div><div class="gs-desc">—</div></div>
      <div style="display:none">'''
html = html.replace(old_row, new_row)

# Закрити старі картки
old_close = '''      </div>
    </div>
  </div>
</section>

<!-- AVATAR SECTION -->'''
new_close = '''      </div>
    </div>
  </div>
</section>

<!-- AVATAR SECTION -->'''
# вже є

# Пороги для 8 карток
html = html.replace(
    "const thresholds = [0.12, 0.28, 0.44, 0.60, 0.76];",
    "const thresholds = [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80];"
)

# Overlay css
html = html.replace(
    "#gs-overlay{position:absolute !important;left:28% !important;top:0% !important;width:78% !important;height:78% !important;pointer-events:none;z-index:5;}",
    "#gs-overlay{position:absolute !important;inset:0 !important;width:100% !important;height:100% !important;pointer-events:none;z-index:7;}"
)

# Globe css
html = html.replace(
    """#gs-globe{
  position:absolute !important;
  left:28% !important;top:0% !important;
  width:78% !important;height:78% !important;
  display:block;opacity:0;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:1;transform:none !important;
}""",
    """#gs-globe{
  display:block;opacity:0;
  width:100%;height:100%;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:1;
}"""
)

# sec-in заголовок
html = html.replace(
    '#portfolio .sec-in{padding-bottom:0;position:absolute;top:0;left:0;right:0;z-index:10;pointer-events:none;}',
    '#portfolio .sec-in{padding-bottom:0;position:absolute;top:0;left:0;right:0;z-index:10;pointer-events:none;grid-column:1/-1;}'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Готово: сітка 5 колонок x 2 рядки, глобус по центру col3")
