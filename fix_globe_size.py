with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Глобус cell має займати обидва рядки
old_cell = '''.gs-globe-cell{
  grid-column:3;
  grid-row:1/3;
  position:relative;
  min-height:0;
}'''
new_cell = '''.gs-globe-cell{
  grid-column:3;
  grid-row:1/3;
  position:relative;
  min-height:0;
  overflow:hidden;
}
#gs-globe{
  position:absolute !important;
  inset:0 !important;
  width:100% !important;
  height:100% !important;
  display:block;
  opacity:0;
  transition:opacity 1.2s;
  cursor:grab;
  touch-action:none;
}'''
html = html.replace(old_cell, new_cell)

# Прибрати старий #gs-globe css щоб не конфліктував
old_globe = '''#gs-globe{
  display:block;opacity:0;
  width:100%;height:100%;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:1;
}'''
html = html.replace(old_globe, '/* #gs-globe moved to .gs-globe-cell block */')

# Заголовок поверх сітки
old_secin = '#portfolio .sec-in{padding-bottom:0;position:absolute;top:0;left:0;right:0;z-index:10;pointer-events:none;grid-column:1/-1;}'
new_secin = '#portfolio .sec-in{padding-bottom:0;position:absolute;top:0;left:0;right:0;z-index:20;pointer-events:none;}'
html = html.replace(old_secin, new_secin)

# sticky має бути position:relative для overlay
old_sticky = '''.globe-scroll-sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
  background:#060303;
  display:grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}'''
new_sticky = '''.globe-scroll-sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
  background:#060303;
  display:grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  isolation:isolate;
}'''
html = html.replace(old_sticky, new_sticky)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Глобус розтягнутий на обидва рядки, заголовок поверх")
