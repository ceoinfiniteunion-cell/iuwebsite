with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''    // cx/cy — центр видимої кулі. Куля вписана в canvas, але канвас зсунутий.
    // Беремо центр canvas відносно ЕКРАНА, не overlay, і рахуємо в координатах overlay
    const overlayRect = overlay.getBoundingClientRect();
    const globeRect = canvas.getBoundingClientRect();
    const globeCenterX = globeRect.left + globeRect.width*0.5;
    const globeCenterY = globeRect.top  + globeRect.height*0.5;
    const cx = globeCenterX - overlayRect.left;
    const cy = globeCenterY - overlayRect.top;'''

# Спробуємо взяти ВСЮ ширину/висоту overlay і знайти центр видимої кулі
# cobe малює кулю розміром = min(w,h) вписану, з центром в геометричному центрі canvas
# АЛЕ overlay і canvas мають однаковий left:28% width:78%, тому центр overlay = центр canvas
new = '''    // Центр видимої кулі = геометричний центр overlay (overlay і globe мають однакову позицію left:28% width:78%)
    const overlayRect = overlay.getBoundingClientRect();
    // Куля cobe вписана в квадрат min(w,h), центрована в canvas
    const side = Math.min(overlayRect.width, overlayRect.height);
    const cx = overlayRect.width * 0.5;
    const cy = overlayRect.height * 0.5;'''

html = html.replace(old, new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ Центр = геометричний центр overlay")
