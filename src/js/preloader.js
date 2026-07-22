function startHero() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ["havatar", "hm", "hl1", "hl2", "hl3", "hsub", "hbtns", "hscroll"].forEach((t, e) => {
        const n = document.getElementById(t);
        n && setTimeout(() => n.classList.add("v"), 120 * e)
    })
}! function() {
    const t = document.getElementById("lbar"),
        e = document.getElementById("lnum"),
        n = document.getElementById("loader"),
        o = document.getElementById("lstatus"),
        l = ["• Ініціалізація", "• Завантаження активів", "• Майже готово"];
    let a = 0,
        s = 0;
    setTimeout(() => document.getElementById("lavatar").classList.add("v"), 200);
    const d = setInterval(() => {
        a += 2.6 * Math.random() + .6, a > 30 && 0 === s && (s = 1, o.textContent = l[1]), a > 70 && 1 === s && (s = 2, o.textContent = l[2]), a >= 100 && (a = 100, clearInterval(d), setTimeout(() => {
            n.classList.add("done"), startHero()
        }, 600)), t.style.width = a + "%", e.textContent = Math.floor(a)
    }, 40)
}();
