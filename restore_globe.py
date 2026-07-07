with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Повернути глобус до оригінального позиціонування
html = html.replace(
    '''#gs-globe{
  position:absolute !important;
  left:50% !important;top:50% !important;
  width:62vh !important;height:62vh !important;
  transform:translate(-50%,-50%) !important;
  display:block;opacity:0;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:2;
}''',
    '''#gs-globe{
  position:absolute !important;
  left:28% !important;top:0% !important;
  width:78% !important;height:78% !important;
  display:block;opacity:0;
  transition:opacity 1.2s;
  cursor:grab;touch-action:none;
  z-index:1;transform:none !important;
}'''
)

# overlay теж повернути
html = html.replace(
    '#gs-overlay{position:absolute !important;inset:0 !important;width:100% !important;height:100% !important;pointer-events:none;z-index:5;}',
    '#gs-overlay{position:absolute !important;left:28% !important;top:0% !important;width:78% !important;height:78% !important;pointer-events:none;z-index:5;}'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ Глобус повернуто на left:28% top:0% width:78%")
