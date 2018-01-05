var cacheFiles = [
  "/test/sw/index.html",
  "/test/sw/sw.js",
  "/test/sw/big.jpg"
];

const cache_name = 'ws-test-cache-v1';

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cache_name).then( cache => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', evt => {
  event.respondWith(caches.match(event.request).then(res => {
    console.log(res.text());
    if (res) {
      console.log('match');
      return res;
    }
    return fetch(event.request);
  }));
});

