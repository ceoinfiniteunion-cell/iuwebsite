with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''    ctx2d.save();
    ctx2d.scale(dpr, dpr);
    // cx/cy — центр overlay в CSS-пікселях
    const overlayRect = overlay.getBoundingClientRect();
    const cx = overlayRect.width * 0.5;
    const cy = overlayRect.height * 0.5;'''

new = '''    ctx2d.save();
    ctx2d.scale(dpr, dpr);
    // cx/cy — РЕАЛЬНИЙ центр глобуса в CSS-пікселях відносно overlay
    const overlayRect = overlay.getBoundingClientRect();
    const globeRect = canvas.getBoundingClientRect();
    const cx = globeRect.left + globeRect.width*0.5 - overlayRect.left;
    const cy = globeRect.top  + globeRect.height*0.5 - overlayRect.top;'''

html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ Лінії тепер від реального центру глобуса")
