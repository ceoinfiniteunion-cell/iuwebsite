with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''    ctx2d.save();
    ctx2d.scale(dpr, dpr);
    // cobe малює кулю в квадраті min(w,h) від лівого краю canvas
    // центр кулі відносно overlay = (canvasLeft - overlayLeft + side/2, side/2)
    const overlayRect = overlay.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const side = Math.min(canvasRect.width, canvasRect.height);
    const cx = (canvasRect.left - overlayRect.left) + side * 0.5;
    const cy = (canvasRect.top  - overlayRect.top)  + side * 0.5;'''

new = '''    ctx2d.save();
    ctx2d.scale(dpr, dpr);
    // Всі координати в CSS пікселях (після scale dpr)
    // Центр кулі = центр canvas в CSS пікселях відносно overlay
    const overlayRect = overlay.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const cx = canvasRect.left + canvasRect.width  * 0.5 - overlayRect.left;
    const cy = canvasRect.top  + canvasRect.height * 0.5 - overlayRect.top;'''

html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ cx/cy = центр canvas в CSS пікселях відносно overlay")
