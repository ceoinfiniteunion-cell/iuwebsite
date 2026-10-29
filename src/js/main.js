if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    })
}
document.documentElement.classList.add("js");

// Desktop-only 3D hero (three.js + GLB): loaded after the page is interactive so it never blocks LCP.
// On mobile the 3D intro is hidden by CSS, so nothing is downloaded there.
(function () {
    if (!document.getElementById('snake-intro')) return;
    const load3D = () => {
        if (window.innerWidth < 769) return;
        ['/assets/js/hero.js', '/assets/js/snake.js'].forEach(src => {
            const s = document.createElement('script');
            s.type = 'module';
            s.src = src;
            document.body.appendChild(s);
        });
    };
    window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) requestIdleCallback(load3D, { timeout: 1500 });
        else setTimeout(load3D, 200);
    });
})();

// Below-the-fold visuals (globe, orbit): real <script>s are created after load/idle, in document order.
// Markup: <script type="text/x-iu-lazy" data-src="/path.js"></script>
(function () {
    const run = () => document.querySelectorAll('script[type="text/x-iu-lazy"][data-src]').forEach(ph => {
        const s = document.createElement('script');
        s.src = ph.dataset.src;
        s.async = false;
        document.body.appendChild(s);
    });
    window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 1500 });
        else setTimeout(run, 200);
    });
})();
