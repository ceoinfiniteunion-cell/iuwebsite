! function() {
    const t = document.getElementById("globe-scroll-outer"),
        e = document.getElementById("gs-globe");
    document.getElementById("gs-line"), document.getElementById("gs-dot-marker"), document.getElementById("gs-connector");
    if (!t || !e) return;
    const i = [{
        phi: -4.974,
        lat: 49.99,
        lng: 36.23
    }, {
        phi: 2.426,
        lat: 40.71,
        lng: -74.01
    }, {
        phi: -.75,
        lat: -33.86,
        lng: 151.2
    }, {
        phi: 1.2,
        lat: 50.45,
        lng: 30.52
    }, {
        phi: -2.5,
        lat: 48.85,
        lng: 2.35
    }, {
        phi: .5,
        lat: 51.5,
        lng: -.12
    }, {
        phi: 3.2,
        lat: 35.68,
        lng: 139.69
    }, {
        phi: -1.8,
        lat: 52.52,
        lng: 13.4
    }, {
        phi: 1.8,
        lat: 52.37,
        lng: 4.9
    }];
    let n, o = i[0].phi,
        s = i[0].phi,
        l = !1,
        r = 0,
        d = 0,
        c = -1;
    const a = document.getElementById("gs-overlay"),
        h = a ? a.getContext("2d") : null;

    function g() {
        n && (n.destroy(), n = null);
        const t = e.offsetWidth || .9 * Math.min(window.innerWidth, window.innerHeight);
        t && (n = createGlobe(e, {
            devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
            width: t,
            height: t,
            phi: o,
            theta: .3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 2e4,
            mapBrightness: 6,
            baseColor: [.08, .04, .04],
            markerColor: [.9, 0, 0],
            glowColor: [.5, .05, .05],
            markers: [{
                location: [49.99, 36.23],
                size: .07
            }, {
                location: [40.71, -74.01],
                size: .07
            }, {
                location: [-33.86, 151.2],
                size: .07
            }, {
                location: [50.45, 30.52],
                size: .07
            }, {
                location: [48.85, 2.35],
                size: .07
            }],
            onRender(i) {
                const n = s - o;
                Math.abs(n) > .001 ? o += .05 * n : o = s, i.phi = o + (l ? d : 0), i.theta = .3, i.width = e.offsetWidth || t, i.height = e.offsetWidth || t,
                    function() {
                        if (!h || !a || !e) return;
                        const t = window.devicePixelRatio || 1,
                            i = window.innerWidth,
                            n = window.innerHeight;
                        if (a.width !== i * t && (a.width = i * t, a.height = n * t), h.clearRect(0, 0, a.width, a.height), 0 === document.querySelectorAll(".gs-card.active").length) return;
                        const o = e.getBoundingClientRect(),
                            s = o.left + .24 * o.width,
                            l = o.top + .55 * o.height,
                            r = s * t,
                            d = l * t;
                        document.querySelectorAll(".gs-card").forEach(e => {
                            if (!e.classList.contains("active")) return;
                            const i = e.getBoundingClientRect(),
                                n = (i.left + .5 * i.width) * t,
                                o = (i.top + .5 * i.height) * t,
                                s = h.createLinearGradient(r, d, n, o);
                            s.addColorStop(0, "rgba(212,0,0,0.9)"), s.addColorStop(1, "rgba(212,0,0,0.2)"), h.beginPath(), h.moveTo(r, d), h.lineTo(n, o), h.strokeStyle = s, h.lineWidth = 1.5 * t, h.shadowBlur = 8 * t, h.shadowColor = "#d40000", h.stroke(), h.beginPath(), h.arc(n, o, 4 * t, 0, 2 * Math.PI), h.fillStyle = "#d40000", h.shadowBlur = 12 * t, h.fill()
                        })
                    }()
            }
        }), e.style.opacity = "1")
    }
    e.addEventListener("pointerdown", t => {
            l = !0, r = t.clientX, d = 0, e.style.cursor = "grabbing"
        }), window.addEventListener("pointerup", () => {
            l && (s += d, o = s, d = 0), l = !1, e.style.cursor = "grab"
        }, {
            passive: !0
        }), window.addEventListener("pointermove", t => {
            l && (d = (t.clientX - r) / 150)
        }, {
            passive: !0
        }),
        function t() {
            e.offsetWidth > 0 ? g() : setTimeout(t, 100)
        }(), window.addEventListener("resize", g), window.addEventListener("scroll", function() {
            const n = -t.getBoundingClientRect().top,
                o = t.offsetHeight - window.innerHeight,
                l = Math.max(0, Math.min(1, n / o)),
                r = document.querySelectorAll(".gs-card"),
                d = Array.from({
                    length: 9
                }, (t, e) => .08 + .1 * e);
            r.forEach((t, i) => {
                const n = t.classList.contains("active"),
                    o = l >= d[i];
                t.classList.toggle("active", o);
                const s = document.getElementById("gl-" + i),
                    r = document.getElementById("gd-" + i);
                if (s && r) {
                    if (o && !n) {
                        const i = document.getElementById("gs-lines"),
                            n = i ? i.getBoundingClientRect() : null;
                        if (n) {
                            const i = e.getBoundingClientRect(),
                                o = (i.left + .5 * i.width - n.left) / n.width * 1e3,
                                l = (i.top + .5 * i.height - n.top) / n.height * 1e3;
                            document.querySelectorAll("#gs-lines line").forEach(t => {
                                t.setAttribute("x1", o.toFixed(0)), t.setAttribute("y1", l.toFixed(0))
                            });
                            const d = t.getBoundingClientRect(),
                                c = (d.left + .5 * d.width - n.left) / n.width * 1e3,
                                a = (d.top + .5 * d.height - n.top) / n.height * 1e3;
                            s.setAttribute("x2", c.toFixed(0)), s.setAttribute("y2", a.toFixed(0)), r.setAttribute("cx", c.toFixed(0)), r.setAttribute("cy", a.toFixed(0));
                            const h = Math.hypot(c - o, a - l) + 20;
                            s.setAttribute("stroke-dasharray", h.toFixed(0)), s.setAttribute("stroke-dashoffset", h.toFixed(0)), setTimeout(() => {
                                s.classList.add("gs-line-active"), r.classList.add("gs-dot-active")
                            }, 50)
                        }
                    }
                    o || (s.classList.remove("gs-line-active"), r.classList.remove("gs-dot-active"))
                }
            });
            let a = -1;
            for (let t = 0; t < d.length; t++) l >= d[t] && (a = t);
            a >= 0 && a < i.length && a !== c && (s = i[a].phi, c = a)
        }, {
            passive: !0
        })
}(),
function() {
    const t = document.getElementById("process"),
        e = document.getElementById("proc-waves");
    if (!t || !e) return;
    const i = e.getContext("2d"),
        n = Array.from(t.querySelectorAll(".proc-step")),
        o = (n.length, window.matchMedia("(prefers-reduced-motion:reduce)").matches);
    let s = 0,
        l = 0;

    function r() {
        const i = t.querySelector(".sec-in");
        s = e.width = i ? i.offsetWidth : t.offsetWidth, l = e.height = i ? i.offsetHeight : t.offsetHeight
    }

    function d(e) {
        i.clearRect(0, 0, s, l);
        const o = function() {
            const e = t.querySelector(".sec-in"),
                i = e ? e.getBoundingClientRect() : t.getBoundingClientRect();
            return n.map(t => {
                const e = t.querySelector(".proc-dot");
                if (!e) return {
                    x: 0,
                    y: .55 * l
                };
                const n = e.getBoundingClientRect();
                return {
                    x: n.left - i.left + n.width / 2,
                    y: n.top - i.top + n.height / 2
                }
            })
        }();
        if (!o.length) return;
        const r = o[0].x,
            d = o[o.length - 1].x,
            c = d - r,
            a = r + c * e,
            h = o[0].y,
            g = 2 * Math.PI / c * 2.5;
        if ([-2, -1, 0, 1, 2].forEach(t => {
                i.beginPath();
                for (let e = r; e <= Math.min(a, d); e += 1) {
                    const n = (e - r) * g,
                        o = h + 22 * Math.sin(n + .4 * t) + 6 * t;
                    e === r ? i.moveTo(e, o) : i.lineTo(e, o)
                }
                const e = 0 === t ? .9 : .35 - .08 * Math.abs(t);
                i.strokeStyle = `rgba(212,0,0,${e})`, i.lineWidth = 0 === t ? 2 : .8, i.shadowColor = "#D40000", i.shadowBlur = 0 === t ? 14 : 0, i.stroke(), i.shadowBlur = 0
            }), o.forEach((t, e) => {
                const o = t.x <= a + 2;
                i.beginPath(), i.arc(t.x, h, o ? 6 : 4, 0, 2 * Math.PI), i.fillStyle = o ? "#D40000" : "rgba(212,0,0,0.3)", i.shadowColor = "#D40000", i.shadowBlur = o ? 18 : 0, i.fill(), i.shadowBlur = 0, o && n[e].classList.add("lit")
            }), e < 1 && e > 0) {
            const t = (a - r) * g,
                e = h + 22 * Math.sin(t);
            i.beginPath(), i.arc(a, e, 4, 0, 2 * Math.PI), i.fillStyle = "#ffffff", i.shadowColor = "#D40000", i.shadowBlur = 20, i.fill(), i.shadowBlur = 0
        }
    }

    function c() {
        const e = function() {
            const e = t.getBoundingClientRect(),
                i = .6 * window.innerHeight,
                n = .3 * -t.offsetHeight,
                o = (i - e.top) / (i - n);
            return Math.max(0, Math.min(1, o))
        }();
        d(e), e >= 1 && n.forEach(t => t.classList.add("lit"))
    }
    window.addEventListener("resize", () => {
        r(), c()
    }, {
        passive: !0
    });
    const a = new IntersectionObserver(t => {
        t[0].isIntersecting && (! function() {
            if (r(), o) return d(1), void n.forEach(t => t.classList.add("lit"));
            window.addEventListener("scroll", c, {
                passive: !0
            }), c()
        }(), a.disconnect())
    }, {
        threshold: .05
    });
    a.observe(t)
}();
