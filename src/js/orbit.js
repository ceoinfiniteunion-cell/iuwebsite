! function() {
    const t = document.querySelector(".av-right");
    if (!t) return;
    const e = [{
            n: "Конверсія +40%",
            d: "Сайти, що продають: лендінги, SPA, SEO-трафік",
            orbit: 0,
            speed: .0075,
            startA: 0,
            red: !0
        }, {
            n: "Автопродажі 24/7",
            d: "Боти, що замінюють менеджера: CRM, оплати, квізи",
            orbit: 0,
            speed: .0075,
            startA: 2.09,
            red: !0
        }, {
            n: "ROI x3+",
            d: "Повна цифрова інфраструктура під ключ",
            orbit: 0,
            speed: .0075,
            startA: 4.19,
            red: !0
        }, {
            n: "Швидкий бекенд",
            d: "API що витримує будь-яке навантаження",
            orbit: 1,
            speed: .005,
            startA: .5,
            red: !1
        }, {
            n: "Надійна БД",
            d: "Дані завжди доступні, захищені, оптимізовані",
            orbit: 1,
            speed: .005,
            startA: 2.6,
            red: !1
        }, {
            n: "CI/CD",
            d: "Автодеплой через GitHub Actions + Railway",
            orbit: 1,
            speed: .005,
            startA: 4.8,
            red: !1
        }, {
            n: "WOW-ефект",
            d: "3D та WebGL — сайт, який запам'ятовують",
            orbit: 2,
            speed: .003,
            startA: .3,
            red: !1
        }, {
            n: "Органік трафік",
            d: "SEO що генерує ліди без рекламного бюджету",
            orbit: 2,
            speed: .003,
            startA: 1.9,
            red: !1
        }, {
            n: "Uptime 99.9%",
            d: "Хмарний деплой — продукт завжди онлайн",
            orbit: 2,
            speed: .003,
            startA: 3.8,
            red: !1
        }, {
            n: "Реальний час",
            d: "Миттєві сповіщення, черги, кешування",
            orbit: 2,
            speed: .003,
            startA: 5.4,
            red: !1
        }],
        s = [{
            rx: 225,
            ry: 70,
            rot: -15
        }, {
            rx: 325,
            ry: 105,
            rot: 20
        }, {
            rx: 420,
            ry: 145,
            rot: -8
        }];
    let r, o = [];
    const i = document.createElement("div");

    function n() {
        const i = document.getElementById("orbit-svg");
        i && i.remove();
        const {
            svg: n,
            cx: d,
            cy: c
        } = function() {
            const r = t.clientWidth,
                o = t.clientHeight,
                i = .52 * r,
                n = .48 * o;
            let d = `<svg id="orbit-svg" viewBox="0 0 ${r} ${o}" xmlns="http://www.w3.org/2000/svg">`;
            d += '<defs><radialGradient id="coreGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#D40000" stop-opacity=".35"/><stop offset="100%" stop-color="#D40000" stop-opacity=".0"/></radialGradient></defs>', d += `<circle cx="${i}" cy="${n}" r="275" fill="url(#coreGrad)"/>`, d += `<circle class="o-core" cx="${i}" cy="${n}" r="155"/>`, d += `<text x="${i}" y="${n+28}" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="72" letter-spacing="-4" fill="#D40000" opacity="0.85" class="o-iu-text">IU</text>`;
            for (let t = 0; t < 8; t++) {
                const e = t / 8 * Math.PI;
                d += `<ellipse class="o-core-wire" cx="${i}" cy="${n}" rx="62" ry="${62*Math.abs(Math.cos(e))}" transform="rotate(${22.5*t} ${i} ${n})"/>`
            }
            return s.forEach((t, e) => {
                d += `<ellipse class="o-ring" cx="${i}" cy="${n}" rx="${t.rx}" ry="${t.ry}" transform="rotate(${t.rot} ${i} ${n})"/>`
            }), e.forEach((t, e) => {
                s[t.orbit], d += `<circle class="o-dot" id="dot${e}" r="${t.red?8:6}" fill="${t.red?"#D40000":"#EDE8E5"}" opacity="${t.red?"1":".7"}" cx="${i}" cy="${n}" data-i="${e}"/>`, d += `<text class="o-label${t.red?" red":""}" id="lbl${e}" x="${i}" y="${n}" dominant-baseline="middle">${t.n}</text>`
            }), d += "</svg>", {
                svg: d,
                cx: i,
                cy: n
            }
        }();
        t.insertAdjacentHTML("beforeend", n), r = document.getElementById("orbit-svg"), o = e.map(t => t.startA), $(d, c)
    }
    i.className = "o-tip", t.appendChild(i);
    let d = 0,
        c = 0,
        a = 0,
        l = 0;
    t.addEventListener("mousemove", e => {
        const s = t.getBoundingClientRect();
        d = (e.clientX - s.left) / s.width - .5, c = (e.clientY - s.top) / s.height - .5
    }), t.addEventListener("mouseleave", () => {
        d = 0, c = 0
    });
    let p = -1;

    function $(t, r) {
        a += .05 * (d - a), l += .05 * (c - l), e.forEach((e, i) => {
            i !== p && (o[i] += e.speed);
            const n = o[i],
                d = s[e.orbit],
                c = Math.cos(n) * d.rx + 30 * a,
                $ = Math.sin(n) * d.ry + 20 * l,
                y = d.rot * Math.PI / 180,
                m = c * Math.cos(y) - $ * Math.sin(y),
                f = c * Math.sin(y) + $ * Math.cos(y),
                u = t + m,
                x = r + f,
                b = document.getElementById("dot" + i),
                h = document.getElementById("lbl" + i);
            if (b && (b.setAttribute("cx", u), b.setAttribute("cy", x)), h) {
                h.setAttribute("x", u + 12), h.setAttribute("y", x);
                const t = Math.sin(n);
                h.style.opacity = t > -.15 ? "0.85" : "0";
                const s = .65 + (Math.sin(n) + 1) / 2 * .35,
                    r = e.red ? 8 : 6;
                b && b.setAttribute("r", r * s)
            }
        }), requestAnimationFrame(() => $(t, r))
    }
    t.addEventListener("mouseover", t => {
        const s = t.target.closest(".o-dot");
        if (s) {
            const t = parseInt(s.dataset.i);
            p = t;
            const r = e[t];
            i.innerHTML = `<div class="o-tip-name">${r.n}</div><div class="o-tip-desc">${r.d}</div>`, i.classList.add("show")
        }
    }), t.addEventListener("mouseout", t => {
        t.target.closest(".o-dot") || (p = -1, i.classList.remove("show"))
    }), t.addEventListener("mousemove", e => {
        if (p >= 0) {
            const s = t.getBoundingClientRect();
            i.style.left = e.clientX - s.left + 16 + "px", i.style.top = e.clientY - s.top - 10 + "px"
        }
    }), n(), window.addEventListener("resize", n)
}();
