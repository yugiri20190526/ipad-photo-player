const CACHE = 'photo-player-20260708-235134';
const ASSETS = [
  '/ipad-photo-player/',
  '/ipad-photo-player/index.html',
  '/ipad-photo-player/manifest.json',
  '/ipad-photo-player/icon-192.png',
  '/ipad-photo-player/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
