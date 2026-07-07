with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''    const cx = canvasRect.left + canvasRect.width  * 0.5 - overlayRect.left;
    const cy = canvasRect.top  + canvasRect.height * 0.5 - overlayRect.top;'''

new = '''    // cobe рендерить кулю в квадраті min(w,h) від лівого краю
    const globeSide = Math.min(canvasRect.width, canvasRect.height);
    const cx = canvasRect.left + globeSide * 0.5 - overlayRect.left;
    const cy = canvasRect.top  + globeSide * 0.5 - overlayRect.top;'''

html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ cx = canvasLeft + min(w,h)/2")
