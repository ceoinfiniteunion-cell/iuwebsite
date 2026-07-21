const CACHE = 'iu-v1';
const STATIC = [
  '/',
  '/assets/css/main.css',
  '/assets/js/ui.js',
  '/assets/js/main.js',
  '/assets/js/preloader.js',
  '/assets/js/snake.js',
  '/assets/js/globe.js',
  '/assets/js/orbit.js',
  '/assets/js/hero.js',
  '/vendor/three/three.min.js',
  '/vendor/three/GLTFLoader.js',
  '/vendor/three/DRACOLoader.js',
  '/cobe.umd.js',
  '/avatar.jpeg',
  '/og-image.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('api.infiniteunion')) return;
  if (e.request.url.includes('cloudinary')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      });
    })
  );
});
