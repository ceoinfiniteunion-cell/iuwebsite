document.documentElement.classList.add('js');
/**
 * Infinite Union — Main Entry Point
 *
 * Module load order (defined in index.html via <script> tags):
 *  1. vendor/three/three.min.js   — Three.js 3D engine
 *  2. vendor/three/GLTFLoader.js  — GLTF model loader
 *  3. vendor/three/DRACOLoader.js — Draco compression decoder
 *  4. cobe.umd.js                 — Globe renderer
 *  5. assets/js/preloader.js      — Loading screen + startHero()
 *  6. assets/js/hero.js           — Three.js wireframe background
 *  7. assets/js/ui.js             — Nav, cursor, scroll, form
 *  8. assets/js/snake.js          — Snake 3D scroll intro
 *  9. assets/js/orbit.js          — SVG orbit sphere (avatar section)
 * 10. assets/js/globe.js          — Portfolio globe scroll controller
 *
 * This file documents the architecture.
 * All modules are self-executing IIFEs or direct statements.
 * No global namespace pollution — each module manages its own scope.
 */
