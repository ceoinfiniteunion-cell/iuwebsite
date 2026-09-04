/* ============================================================
   INFINITE UNION — MOBILE GSAP LAYER
   Runs only on <=768px viewports — same one-time innerWidth gate
   hero.js / snake.js / globe.js already use before doing anything
   mobile- or desktop-only, so this fetches GSAP itself: desktop
   visitors never download it at all. If reduced-motion is set, or
   any vendored file is missing/blocked, this does nothing further
   and the pure-CSS fallback already baked into assets/css/mobile.css
   (the `html:not(.ga)` rules) takes over — nothing is ever left
   permanently hidden.

   Once GSAP is up it adds `ga` to <html>; mobile.css uses that flag
   to switch every entrance/reveal rule off so GSAP owns those
   elements' opacity/transform outright (see the big comment at the
   top of mobile.css for why that split exists).
   ============================================================ */
(function () {
  'use strict';

  if (window.innerWidth > 768) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  loadScript('vendor/gsap/gsap.min.js')
    .then(function () { return loadScript('vendor/gsap/ScrollTrigger.min.js'); })
    .then(function () { return loadScript('vendor/gsap/TextPlugin.min.js'); })
    .then(boot)
    .catch(function () { /* vendor file missing/blocked — CSS fallback handles it */ });

  function boot() {
  if (typeof window.gsap === 'undefined' ||
      typeof window.ScrollTrigger === 'undefined' ||
      typeof window.TextPlugin === 'undefined') {
    return; // vendored file missing/blocked — CSS fallback handles it
  }

  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  var root = document.documentElement;

  // ---------------------------------------------------------------
  // helpers
  // ---------------------------------------------------------------

  /** Wrap each character of el's text in <span class="cls">, return the spans. */
  function splitChars(el, cls) {
    cls = cls || 'mh-ch';
    var text = el.textContent;
    el.textContent = '';
    var frag = document.createDocumentFragment();
    Array.from(text).forEach(function (ch) {
      var span = document.createElement('span');
      span.className = cls;
      span.textContent = ch === ' ' ? ' ' : ch;
      frag.appendChild(span);
    });
    el.appendChild(frag);
    return el.querySelectorAll('.' + cls);
  }

  /** Toggle will-change only while a tween is actually running. */
  function withWillChange(targets, vars) {
    var prevStart = vars.onStart, prevComplete = vars.onComplete;
    vars.onStart = function () {
      gsap.set(targets, { willChange: 'transform,opacity' });
      if (prevStart) prevStart();
    };
    vars.onComplete = function () {
      gsap.set(targets, { clearProps: 'willChange' });
      if (prevComplete) prevComplete();
    };
    return vars;
  }

  // ---------------------------------------------------------------
  // hero
  // ---------------------------------------------------------------
  function initHero(cleanupFns) {
    var hero = document.getElementById('mobile-hero');
    if (!hero) return;

    var label = hero.querySelector('.mh-label');
    var twChar = hero.querySelector('.mh-tw-i');
    var titleEl = hero.querySelector('.mh-title');
    var unionEl = hero.querySelector('.mh-title-2');
    var sub = hero.querySelector('.mh-sub');
    var cta = hero.querySelector('.mh-cta');
    var services = hero.querySelectorAll('.mh-srv');
    var coords = hero.querySelector('.mh-coords');

    var infChars = twChar ? splitChars(twChar, 'mh-ch') : [];
    var unionChars = unionEl ? splitChars(unionEl, 'mh-ch') : [];
    // .mh-title-2's own CSS base is opacity:0 (fallback engine's resting
    // state) — only its letter spans are tweened below, so the wrapper
    // itself must be told to stop hiding them.
    if (unionEl) gsap.set(unionEl, { opacity: 1 });

    // red rule drawn under the headline
    var rule = null;
    if (titleEl) {
      rule = document.createElement('div');
      rule.className = 'mh-rule';
      rule.setAttribute('aria-hidden', 'true');
      titleEl.insertAdjacentElement('afterend', rule);
    }

    // CTA glow (real element — main.css forces box-shadow:none!important on mobile)
    var glow = null;
    if (cta) {
      glow = document.createElement('span');
      glow.className = 'mh-cta-glow';
      glow.setAttribute('aria-hidden', 'true');
      cta.appendChild(glow);
    }

    var coordsText = coords ? coords.textContent.trim() : '';
    if (coords) coords.textContent = '';

    var tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    tl.delay(0.3); // "black screen" beat before the reveal starts

    if (label) {
      tl.fromTo(label,
        { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: .6, ease: 'power2.inOut' },
        0);
    }
    if (infChars.length) {
      tl.fromTo(infChars,
        { opacity: 0, y: 60, rotateX: -90, transformPerspective: 600 },
        withWillChange(infChars, { opacity: 1, y: 0, rotateX: 0, duration: .7, stagger: .06, ease: 'back.out(1.6)' }),
        .45);
    }
    if (unionChars.length) {
      tl.fromTo(unionChars,
        { opacity: 0, y: 60, rotateX: -90, scale: 1.15, transformPerspective: 600 },
        withWillChange(unionChars, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: .7, stagger: .06, ease: 'back.out(1.6)' }),
        .95);
    }
    if (rule) {
      tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: .4, ease: 'power2.out' }, 1.55);
    }
    if (sub) {
      tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .5 }, 1.2);
    }
    if (cta) {
      tl.fromTo(cta, { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.7)' }, 1.4);
      // infinite subtle glow pulse — starts once the CTA has landed
      tl.to(glow, { opacity: .55, scale: 1.12, duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' }, 1.9);
    }
    if (services.length) {
      tl.fromTo(services, { x: -40, opacity: 0 },
        withWillChange(services, { x: 0, opacity: 1, duration: .5, stagger: .08, ease: 'power3.out' }),
        1.6);
    }
    if (coords) {
      tl.to(coords, { opacity: 1, duration: .9, text: coordsText, ease: 'none' }, 2.0);
    }

    var loader = document.getElementById('loader');
    var killed = false;
    function play() { if (!killed) { try { tl.play(); } catch (e) {} } }
    if (!loader || loader.classList.contains('done')) {
      play();
    } else {
      var mo = new MutationObserver(function () {
        if (loader.classList.contains('done')) { mo.disconnect(); play(); }
      });
      mo.observe(loader, { attributes: true, attributeFilter: ['class'] });
      var safety = setTimeout(function () { mo.disconnect(); play(); }, 2500);
      cleanupFns.push(function () { killed = true; mo.disconnect(); clearTimeout(safety); });
    }
  }

  // ---------------------------------------------------------------
  // touch feedback (CTA buttons)
  // ---------------------------------------------------------------
  function initTouchFeedback(cleanupFns) {
    var targets = [
      document.querySelector('.mh-cta'),
      document.querySelector('.mob-cta-btn')
    ].filter(Boolean);

    targets.forEach(function (el) {
      var onStart = function () { gsap.to(el, { scale: .96, duration: .1, overwrite: true }); };
      var onEnd = function () { gsap.to(el, { scale: 1, duration: .3, ease: 'elastic.out(1,0.5)', overwrite: true }); };
      el.addEventListener('touchstart', onStart, { passive: true });
      el.addEventListener('touchend', onEnd, { passive: true });
      el.addEventListener('touchcancel', onEnd, { passive: true });
      cleanupFns.push(function () {
        el.removeEventListener('touchstart', onStart);
        el.removeEventListener('touchend', onEnd);
        el.removeEventListener('touchcancel', onEnd);
        gsap.set(el, { clearProps: 'scale' });
      });
    });
  }

  // ---------------------------------------------------------------
  // burger menu
  // ---------------------------------------------------------------
  function initBurger(cleanupFns) {
    var mob = document.getElementById('mob');
    if (!mob) return;
    var backdrop = mob.querySelector('.mob-backdrop');
    var inner = mob.querySelector('.mob-inner');
    var header = mob.querySelector('.mob-header');
    var logo = mob.querySelector('.mob-logo');
    var links = mob.querySelectorAll('.mob-link');
    var ctaSection = mob.querySelector('.mob-cta-section');
    var ctaBtn = mob.querySelector('.mob-cta-btn');
    var contacts = mob.querySelectorAll('.mob-contact-btn');

    // .mob-cta-section (wraps both the CTA button and the contacts grid)
    // is opacity:0 in its own CSS base — only its children are tweened
    // below, so it must be told to stop hiding them, same as .mob-header.
    if (ctaSection) gsap.set(ctaSection, { opacity: 1 });

    // .mob-inner has a plain CSS `transform:translateX(100%)` default (so it
    // can never flash open pre-JS). GSAP's xPercent is tracked as a component
    // *separate* from a plain x/translate — without explicitly pinning x:0
    // here, GSAP preserves that CSS translateX(100%) as a permanent leftover
    // offset that xPercent:0 alone never clears, leaving the panel stuck
    // off-screen. Always set xPercent and x together on this element.
    gsap.set(inner, { xPercent: 110, x: 0 });
    gsap.set(backdrop, { autoAlpha: 0 });

    var tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
    if (backdrop) tl.to(backdrop, { autoAlpha: 1, duration: .3, ease: 'power1.out' }, 0);
    tl.to(inner, { xPercent: 0, x: 0, duration: .5, ease: 'power4.out' }, 0);
    if (header) tl.fromTo(header, { opacity: 0 }, { opacity: 1, duration: .3 }, 0);
    if (logo) tl.fromTo(logo, { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: .4, ease: 'power2.out' }, .2);
    if (links.length) tl.fromTo(links, { x: 50, opacity: 0 },
      withWillChange(links, { x: 0, opacity: 1, duration: .4, stagger: .06, ease: 'power3.out' }), .25);
    if (ctaBtn) tl.fromTo(ctaBtn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }, .5);
    if (contacts.length) tl.fromTo(contacts, { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: .35, stagger: .05 }, .55);

    var totalDur = tl.duration();
    var isOpen = mob.classList.contains('open');

    var obs = new MutationObserver(function () {
      var open = mob.classList.contains('open');
      if (open === isOpen) return;
      isOpen = open;
      if (open) {
        tl.timeScale(1).play();
      } else {
        tl.timeScale(totalDur / 0.35).reverse();
      }
    });
    obs.observe(mob, { attributes: true, attributeFilter: ['class'] });
    cleanupFns.push(function () { obs.disconnect(); });
  }

  // ---------------------------------------------------------------
  // scroll-triggered sections
  // ---------------------------------------------------------------
  function initScrollReveals(cleanupFns) {

    // services (#directions)
    var dirItems = gsap.utils.toArray('.dir-item');
    if (dirItems.length) {
      gsap.fromTo(dirItems, { x: -50, opacity: 0 },
        withWillChange(dirItems, {
          x: 0, opacity: 1, duration: .6, stagger: .1, ease: 'power3.out',
          scrollTrigger: { trigger: '#directions', start: 'top 85%' }
        }));
    }

    // section headings — split-chars if flagged, else slide up as a block
    gsap.utils.toArray('.stitle').forEach(function (h) {
      if (h.classList.contains('split-chars')) {
        var chars = splitChars(h, 'ga-ch');
        gsap.fromTo(chars, { opacity: 0, y: 26 },
          withWillChange(chars, {
            opacity: 1, y: 0, duration: .45, stagger: .018, ease: 'power2.out',
            scrollTrigger: { trigger: h, start: 'top 85%' }
          }));
      } else {
        gsap.fromTo(h, { opacity: 0, y: 30 },
          withWillChange(h, {
            opacity: 1, y: 0, duration: .6, ease: 'power3.out',
            scrollTrigger: { trigger: h, start: 'top 85%' }
          }));
      }
    });

    // portfolio cards
    var cards = gsap.utils.toArray('#portfolio .gs-cards-row .gs-card');
    if (cards.length) {
      gsap.fromTo(cards, { '--ga-o': 0, '--ga-ty': '60px', '--ga-s': .95 },
        withWillChange(cards, {
          '--ga-o': 1, '--ga-ty': '0px', '--ga-s': 1, duration: .6, stagger: .12, ease: 'power3.out',
          scrollTrigger: { trigger: '.gs-cards-row', start: 'top 80%' }
        }));
    }

    // stats — entrance + count-up read from the element's own text
    gsap.utils.toArray('#stats .si').forEach(function (si) {
      var numEl = si.querySelector('.sn');
      ScrollTrigger.create({
        trigger: si, start: 'top 85%', once: true,
        onEnter: function () {
          gsap.fromTo(si, { '--ga-o': 0, '--ga-ty': '30px' },
            { '--ga-o': 1, '--ga-ty': '0px', duration: .6, ease: 'power2.out' });
          if (numEl && !numEl.hasAttribute('data-target')) {
            var m = numEl.textContent.trim().match(/^(\d+)(.*)$/);
            if (m) {
              var target = parseInt(m[1], 10), suffix = m[2] || '';
              var counter = { v: 0 };
              gsap.to(counter, {
                v: target, duration: 1.5, ease: 'power2.out',
                onUpdate: function () { numEl.textContent = Math.round(counter.v) + suffix; }
              });
            }
          }
        }
      });
    });

    // review cards
    var revCards = gsap.utils.toArray('.rv-grid .rv-card');
    if (revCards.length) {
      gsap.fromTo(revCards, { '--ga-o': 0, '--ga-ty': '40px', '--ga-s': .97 },
        withWillChange(revCards, {
          '--ga-o': 1, '--ga-ty': '0px', '--ga-s': 1, duration: .6, stagger: .1, ease: 'power3.out',
          scrollTrigger: { trigger: '.rv-grid', start: 'top 85%' }
        }));
    }

    // contact title — split into lines, each slides up out of clip
    var ctTitle = document.querySelector('#contact .ct-new-title');
    if (ctTitle) {
      var lineParts = ctTitle.innerHTML.split(/<br\s*\/?>/i);
      ctTitle.innerHTML = '';
      lineParts.forEach(function (part) {
        var line = document.createElement('span');
        line.className = 'ga-line';
        var inner = document.createElement('span');
        inner.className = 'ga-line-i';
        inner.innerHTML = part.trim();
        line.appendChild(inner);
        ctTitle.appendChild(line);
      });
      var lineInners = ctTitle.querySelectorAll('.ga-line-i');
      gsap.fromTo(lineInners, { yPercent: 110, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: .7, stagger: .12, ease: 'power3.out',
        scrollTrigger: { trigger: '#contact .ct-new-l', start: 'top 75%' }
      });
    }

    // keep ScrollTrigger positions correct on viewport / toolbar changes
    var resizeTimer;
    function onResize() { clearTimeout(resizeTimer); resizeTimer = setTimeout(function () { ScrollTrigger.refresh(); }, 200); }
    window.addEventListener('resize', onResize);
    cleanupFns.push(function () { window.removeEventListener('resize', onResize); clearTimeout(resizeTimer); });
  }

  // ---------------------------------------------------------------
  // wire it all together, scoped to <=768px, auto-reverted outside it
  // ---------------------------------------------------------------
  var mm = gsap.matchMedia();
  mm.add('(max-width: 768px)', function () {
    root.classList.add('ga');
    var cleanupFns = [];
    var ctx = gsap.context(function () {
      initHero(cleanupFns);
      initTouchFeedback(cleanupFns);
      initBurger(cleanupFns);
      initScrollReveals(cleanupFns);
    });

    return function () {
      root.classList.remove('ga');
      cleanupFns.forEach(function (fn) { fn(); });
      ctx.revert();
    };
  });
  } // end boot()
})();

// Fix scroll jumps
ScrollTrigger.config({ ignoreMobileResize: true });
document.addEventListener('scroll', () => {}, { passive: true });
