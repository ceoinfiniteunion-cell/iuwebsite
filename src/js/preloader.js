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
        labels = ["• Ініціалізація", "• Завантаження 3D", "• Майже готово"];

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

    window.addEventListener('iu:glb-loaded', finish);

    // Страховка: не держим человека дольше 8 секунд ни при каких условиях
    const failsafe = setTimeout(finish, 8000);

    const timer = setInterval(() => {
        if (finished) return;

        // Базовый прогресс до 90% — чтобы полоса не стояла мёртвой
        // Реальный GLB подтягивает её быстрее, если сеть хорошая
        const target = Math.max(
            Math.min(90, shown + 2.2 * Math.random() + 0.5),
            glbPct * 0.9
        );
        shown = Math.min(90, target);

        if (shown > 30 && stage === 0) { stage = 1; status.textContent = labels[1]; }
        if (shown > 70 && stage === 1) { stage = 2; status.textContent = labels[2]; }

        bar.style.width = shown + "%";
        num.textContent = Math.floor(shown);

        // Если GLB уже загрузился до того как повесился слушатель
        if (window.__IU_GLB_DONE) { clearTimeout(failsafe); finish(); }
    }, 40);
}();
