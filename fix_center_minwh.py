with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''    // Центр видимої кулі = центр canvas відносно overlay
    const overlayRect = overlay.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const cx = canvasRect.left + canvasRect.width * 0.5 - overlayRect.left;
    const cy = canvasRect.top  + canvasRect.height * 0.5 - overlayRect.top;'''

new = '''    // cobe малює кулю в квадраті min(w,h) від лівого-верхнього кута canvas
    // тому центр кулі = min(w,h)/2 по обох осях
    const overlayRect = overlay.getBoundingClientRect();
    const side = Math.min(overlayRect.width, overlayRect.height);
    const cx = side * 0.5;
    const cy = side * 0.5;'''

html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ cx=cy=side/2 (cobe рендерить в min квадраті з лівого кута)")
