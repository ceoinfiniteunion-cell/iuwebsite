/* ============================================================
   "НАШІ РОБОТИ" — mobile homepage carousel (#mobile-works)
   Native scroll-snap does the touch/swipe work; this just wires
   the two arrow buttons and the "01 / 08" counter to that native
   scroll position. No-op harmlessly if the section isn't present
   or is display:none (desktop).
   ============================================================ */
(function () {
  var track = document.getElementById('mwTrack');
  if (!track) return;
  var cards = track.querySelectorAll('.mw-card');
  if (!cards.length) return;

  var prevBtn = document.getElementById('mwPrev');
  var nextBtn = document.getElementById('mwNext');
  var curEl = document.getElementById('mwCur');
  var total = cards.length;

  function pad(n) { return String(n).padStart(2, '0'); }

  function stepWidth() {
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
    return cards[0].getBoundingClientRect().width + gap;
  }

  function go(dir) {
    track.scrollBy({ left: dir * stepWidth(), behavior: 'smooth' });
  }

  function nearestIndex() {
    var trackRect = track.getBoundingClientRect();
    if (!trackRect.width) return 0; // hidden (desktop) — nothing to compute
    var center = trackRect.left + trackRect.width / 2;
    var best = 0, bestDist = Infinity;
    cards.forEach(function (card, i) {
      var r = card.getBoundingClientRect();
      var d = Math.abs((r.left + r.width / 2) - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }

  function update() {
    var idx = nearestIndex();
    if (curEl) curEl.textContent = pad(idx + 1);
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === total - 1;
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

  var scrollTimer;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(update, 80);
  }, { passive: true });

  window.addEventListener('resize', update);
  update();
})();
