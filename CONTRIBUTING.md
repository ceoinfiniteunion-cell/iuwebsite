# Contributing to IU Website

## Stack

- HTML/CSS/JS — no build step required
- Three.js r125 (self-hosted in `vendor/three/`)
- cobe.js (self-hosted as `cobe.umd.js`)

## Local development

```bash
git clone https://github.com/ceoinfiniteunion-cell/iuwebsite.git
cd iuwebsite
npx live-server
```

## Before submitting a PR

```bash
npm install
npm run lint:html
npm run lint:js
```

Both must pass with 0 errors.

## File structure

- `assets/css/main.css` — all styles (structured with ToC)
- `assets/js/main.js` — entry point + load order docs
- `assets/js/preloader.js` — loading screen
- `assets/js/hero.js` — Three.js wireframe background
- `assets/js/ui.js` — nav, cursor, scroll, form
- `assets/js/snake.js` — snake 3D scroll intro
- `assets/js/orbit.js` — SVG orbit sphere
- `assets/js/globe.js` — portfolio globe controller
- `vendor/three/` — self-hosted Three.js + DRACO
- `services/` — sub-pages

## Code standards

- No inline styles — use CSS classes
- No inline event handlers — use addEventListener
- Semantic HTML — use `<a>` for links, `<button>` for actions
- All images need alt text and `loading="lazy"`
