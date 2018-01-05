var cacheFiles = [
  "/test/sw/index.html",
  "/test/sw/sw.js",
  "/test/sw/big.jpg"
];

const cache_name = 'ws-test-cache-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cache_name).then( cache => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then( res => {
    console.log(res.text());
    if (res) {
      console.log('match');
      return res;
    }
    return fetch(e.request);
  }));
});

