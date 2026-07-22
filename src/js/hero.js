! function() {
    const e = document.getElementById("hero-3d");
    if (!e) return;
    const t = () => e.width = window.innerWidth,
        n = () => e.height = window.innerHeight;
    t(), n();
    const i = new THREE.Scene,
        o = new THREE.PerspectiveCamera(55, e.width / e.height, .1, 100);
    o.position.z = 7;
    const r = new THREE.WebGLRenderer({
        canvas: e,
        alpha: !0,
        antialias: !0
    });
    r.setSize(e.width, e.height), r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const a = [];
    [
        [new THREE.IcosahedronGeometry(2.8, 1), 13893632, .28, 0, 0, -2],
        [new THREE.TorusGeometry(1.8, .3, 10, 32), 13893632, .07, 3, 2, -3],
        [new THREE.OctahedronGeometry(1.4, 0), 15591653, .06, -3.5, -1, -2],
        [new THREE.IcosahedronGeometry(.5, 0), 13893632, .12, 2.5, -2.5, 0],
        [new THREE.OctahedronGeometry(.4, 0), 15591653, .08, -2, 2.5, 0]
    ].forEach(([e, t, n, o, r, s]) => {
        const d = new THREE.Mesh(e, new THREE.MeshBasicMaterial({
            color: t,
            wireframe: !0,
            transparent: !0,
            opacity: n
        }));
        d.position.set(o, r, s), a.push(d), i.add(d)
    });
    const s = new THREE.BufferGeometry,
        d = new Float32Array(450);
    for (let e = 0; e < 450; e++) d[e] = 14 * (Math.random() - .5);
    s.setAttribute("position", new THREE.BufferAttribute(d, 3)), i.add(new THREE.Points(s, new THREE.PointsMaterial({
        color: 13893632,
        size: .022,
        transparent: !0,
        opacity: .35,
        blending: THREE.AdditiveBlending
    })));
    let w = 0,
        E = 0;
    window.addEventListener("mousemove", e => {
        w = .4 * (e.clientX / window.innerWidth - .5), E = .3 * (e.clientY / window.innerHeight - .5)
    });
    const h = [
        [.003, .005],
        [.004, .003, .005],
        [.007, .005],
        [.01, .008],
        [.009, .011]
    ];
    ! function e() {
        requestAnimationFrame(e), a.forEach((e, t) => {
            e.rotation.x += h[t][0], e.rotation.y += h[t][1], h[t][2] && (e.rotation.z += h[t][2])
        }), o.position.x += .035 * (w - o.position.x), o.position.y += .035 * (-E - o.position.y), o.lookAt(i.position), r.render(i, o)
    }(), window.addEventListener("resize", () => {
        t(), n(), o.aspect = e.width / e.height, o.updateProjectionMatrix(), r.setSize(e.width, e.height)
    })
}();
