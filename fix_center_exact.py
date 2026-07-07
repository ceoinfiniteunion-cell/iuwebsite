with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''    // cobe малює кулю в квадраті min(w,h) від лівого-верхнього кута canvas
    // тому центр кулі = min(w,h)/2 по обох осях
    const overlayRect = overlay.getBoundingClientRect();
    const side = Math.min(overlayRect.width, overlayRect.height);
    const cx = side * 0.5;
    const cy = side * 0.5;'''

new = '''    // cobe малює кулю в квадраті min(w,h) від лівого краю canvas
    // центр кулі відносно overlay = (canvasLeft - overlayLeft + side/2, side/2)
    const overlayRect = overlay.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const side = Math.min(canvasRect.width, canvasRect.height);
    const cx = (canvasRect.left - overlayRect.left) + side * 0.5;
    const cy = (canvasRect.top  - overlayRect.top)  + side * 0.5;'''

html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ Точний центр кулі: canvasLeft + min(w,h)/2")
