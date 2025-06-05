const CACHE_NAME = 'ferox-cache-v1';
const ASSETS = [
  '/',
  'index.html',
  'css/style.css',
  'css/tailwind.css',
  'js/app.js',
  'js/main.js',
  'data/config.json'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
