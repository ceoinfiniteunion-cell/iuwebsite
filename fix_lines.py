with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old = '''  function drawLines(){
    if(!ctx2d || !overlay) return;
    resizeOverlay();
    ctx2d.save();
    const dpr = Math.min(window.devicePixelRatio||1,2);
    ctx2d.clearRect(0, 0, overlay.width, overlay.height);
    ctx2d.scale(dpr, dpr);
    const cards = document.querySelectorAll('.gs-card.active');
    if(cards.length === 0) return;
    const cx = overlay.width * 0.5;
    const cy = overlay.height * 0.5;
    const globeRect = canvas.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();
    document.querySelectorAll('.gs-card').forEach((card, i) => {
      if(!card.classList.contains('active')) return;
      const cr = card.getBoundingClientRect();
      // Координати в overlay canvas
      const scaleX = overlay.width / overlayRect.width;
      const scaleY = overlay.height / overlayRect.height;
      const ex = (cr.left + cr.width*0.5 - overlayRect.left) * scaleX;
      const ey = (cr.top + cr.height*0.5 - overlayRect.top) * scaleY;'''

new = '''  function drawLines(){
    if(!ctx2d || !overlay) return;
    resizeOverlay();
    const dpr = Math.min(window.devicePixelRatio||1,2);
    ctx2d.clearRect(0, 0, overlay.width, overlay.height);
    const cards = document.querySelectorAll('.gs-card.active');
    if(cards.length === 0) return;
    ctx2d.save();
    ctx2d.scale(dpr, dpr);
    // cx/cy — центр overlay в CSS-пікселях
    const overlayRect = overlay.getBoundingClientRect();
    const cx = overlayRect.width * 0.5;
    const cy = overlayRect.height * 0.5;
    document.querySelectorAll('.gs-card').forEach((card, i) => {
      if(!card.classList.contains('active')) return;
      const cr = card.getBoundingClientRect();
      // Координати в CSS-пікселях відносно overlay
      const ex = cr.left + cr.width*0.5 - overlayRect.left;
      const ey = cr.top  + cr.height*0.5 - overlayRect.top;'''

html = html.replace(old, new)

# Також фікс Realty Monitor — ще вище
old_card1 = '''#gs-card-1{
  left:50%;bottom:9%;
  transform:translateX(-50%) translateY(20px);
  width:170px;
}'''
new_card1 = '''#gs-card-1{
  left:50%;bottom:13%;
  transform:translateX(-50%) translateY(20px);
  width:160px;
}'''
html = html.replace(old_card1, new_card1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Фікс застосовано:")
print("  1. drawLines: cx/cy тепер в CSS-пікселях — лінії мають з'явитись")
print("  2. clearRect перед scale")
print("  3. Realty Monitor: bottom:13%, width:160px")
