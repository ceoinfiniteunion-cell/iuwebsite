with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''    // Центр видимої кулі = геометричний центр overlay (overlay і globe мають однакову позицію left:28% width:78%)
    const overlayRect = overlay.getBoundingClientRect();
    // Куля cobe вписана в квадрат min(w,h), центрована в canvas
    const side = Math.min(overlayRect.width, overlayRect.height);
    const cx = overlayRect.width * 0.5;
    const cy = overlayRect.height * 0.5;'''

new = '''    // Центр видимої кулі: емпірично зсунутий у canvas.
    // cobe малює кулю квадратом min(w,h) вирівняним по центру canvas по X,
    // але по Y зверху. Використовуємо реальний центр кулі.
    const overlayRect = overlay.getBoundingClientRect();
    const side = Math.min(overlayRect.width, overlayRect.height);
    // Куля вписана в квадрат side, центрований горизонтально, зверху вертикально
    const cx = overlayRect.width * 0.5;
    const cy = side * 0.5;'''

html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ cy = side/2 (куля вирівняна зверху)")
