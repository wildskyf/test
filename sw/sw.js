var cacheFiles = [
  "index.html",
  "sw.js"
];
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open('ws-test-cache-v1').then( cache => {
            return cache.addAll(cacheFiles);
        })
    );
});
