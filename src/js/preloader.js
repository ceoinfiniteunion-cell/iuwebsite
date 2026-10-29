function startHero() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ["havatar", "hm", "hl1", "hl2", "hl3", "hsub", "hbtns", "hscroll"].forEach((t, e) => {
        const n = document.getElementById(t);
        n && setTimeout(() => n.classList.add("v"), 120 * e)
    })
}

!function () {
    const bar = document.getElementById("lbar"),
        num = document.getElementById("lnum"),
        loader = document.getElementById("loader"),
        status = document.getElementById("lstatus"),
        labels = [(document.documentElement.lang==="en"?"• Initializing":"• Ініціалізація"), (document.documentElement.lang==="en"?"• Loading":"• Завантаження 3D"), (document.documentElement.lang==="en"?"• Almost ready":"• Майже готово")];

    let shown = 0;      // что видит пользователь
    let stage = 0;
    let finished = false;

    const avatar = document.getElementById("lavatar");
    if (avatar) setTimeout(() => avatar.classList.add("v"), 200);

    // Реальный прогресс GLB (0..100), приходит из snake.js
    let glbPct = 0;
    window.addEventListener('iu:glb-progress', (e) => {
        glbPct = e.detail || 0;
    });

    function finish() {
        if (finished) return;
        finished = true;
        shown = 100;
        bar.style.width = "100%";
        num.textContent = "100";
        clearInterval(timer);
        setTimeout(() => {
            loader.classList.add("done");
            startHero();
        }, 400);
    }

    // Прелоадер не чекає 3D-модель: контент показуємо не пізніше ніж через 1 с від старту навігації.
    // 3D (three.js + GLB) підвантажується окремо після load/idle — див. main.js.
    const failsafe = setTimeout(finish, Math.max(200, 1000 - 400 - performance.now()));

    const timer = setInterval(() => {
        if (finished) return;

        // Базовый прогресс до 90% — чтобы полоса не стояла мёртвой
        // Реальный GLB подтягивает её быстрее, если сеть хорошая
        const target = Math.max(
            Math.min(90, shown + 6 * Math.random() + 3),
            glbPct * 0.9
        );
        shown = Math.min(90, target);

        if (shown > 30 && stage === 0) { stage = 1; status.textContent = labels[1]; }
        if (shown > 70 && stage === 1) { stage = 2; status.textContent = labels[2]; }

        bar.style.width = shown + "%";
        num.textContent = Math.floor(shown);

    }, 40);
}();
