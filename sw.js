// Infinite Union service worker (redesign 2026). Version is stamped at build time.
// HTML: network-first (cache = offline fallback). Hashed assets / fonts / images / 3D: cache-first.
// Third parties (Google, Sentry, Cloudflare) and the lead API are never intercepted.
const CACHE = 'iu-r2026-a373707076';
const IMMUTABLE = /^\/assets\/(css\/[^/]+\.[0-9a-f]{10}\.css|js\/[^/]+\.[0-9a-f]{10}\.js|3d\/|fonts\/|img\/)/;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    const stale = keys.filter(k => k !== CACHE);
    await Promise.all(stale.map(k => caches.delete(k)));
    await self.clients.claim();
    // a visitor who still has a page of the previous design open gets it reloaded once
    if (stale.some(k => !k.startsWith('iu-r2026'))) {
      const wins = await self.clients.matchAll({ type: 'window' });
      wins.forEach(w => { try { w.navigate(w.url); } catch (_) { /* cross-origin / unsupported */ } });
    }
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(async () => (await caches.match(req)) || (await caches.match('/404.html')) || Response.error()));
    return;
  }
  if (IMMUTABLE.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
