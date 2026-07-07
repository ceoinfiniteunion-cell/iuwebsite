with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Фікс inline стилю canvas + css cell
old = '''      <div class="gs-globe-cell"><canvas id="gs-globe" style="width:100%;height:100%;display:block;opacity:0;transition:opacity 1.2s;cursor:grab;touch-action:none;z-index:1;"></canvas></div>'''
new = '''      <div class="gs-globe-cell"><canvas id="gs-globe"></canvas></div>'''
html = html.replace(old, new)

# Фікс CSS — globe-cell і canvas всередині
old_cell = '''.gs-globe-cell{
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
new_cell = '''.gs-globe-cell{
  grid-column:3;
  grid-row:1/3;
  position:relative;
  min-height:0;
  min-width:0;
  overflow:hidden;
}
#gs-globe{
  position:absolute !important;
  top:0 !important; left:0 !important;
  width:100% !important;
  height:100% !important;
  display:block !important;
  opacity:0;
  transition:opacity 1.2s;
  cursor:grab;
  touch-action:none;
}'''
html = html.replace(old_cell, new_cell)

# grid-template-rows — рівні рядки
old_sticky = '''  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;'''
new_sticky = '''  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: stretch;'''
html = html.replace(old_sticky, new_sticky)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Globe cell fix applied")
