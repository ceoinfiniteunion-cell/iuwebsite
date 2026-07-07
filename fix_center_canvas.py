with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''    // Центр видимої кулі: емпірично зсунутий у canvas.
    // cobe малює кулю квадратом min(w,h) вирівняним по центру canvas по X,
    // але по Y зверху. Використовуємо реальний центр кулі.
    const overlayRect = overlay.getBoundingClientRect();
    const side = Math.min(overlayRect.width, overlayRect.height);
    // Куля вписана в квадрат side, центрований горизонтально, зверху вертикально
    const cx = overlayRect.width * 0.5;
    const cy = side * 0.5;'''

new = '''    // Центр видимої кулі = центр canvas відносно overlay
    const overlayRect = overlay.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const cx = canvasRect.left + canvasRect.width * 0.5 - overlayRect.left;
    const cy = canvasRect.top  + canvasRect.height * 0.5 - overlayRect.top;'''

html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ cx/cy від реального canvas rect")
