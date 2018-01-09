var cacheFiles = [
  "/test/sw/",
  "/test/sw/index.html",
  "/test/sw/sw.js",
  "/test/sw/big.jpg"
];

const cache_name = 'ws-test-cache-v1';

self.addEventListener('install', event => {
  console.log('installing');
  event.waitUntil(
    caches.open(cache_name).then( cache => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('activing', event);
  caches.delete(cacne_name);
});

self.addEventListener('fetch', event => {
  console.log('fetching url', event.request.url);

  event.respondWith(
    caches.match(event.request)
    .then( res => {
      if (!res) throw({
        msg: `No cache match url ${event.request.url}`,
        request: event.request
      });

      return res.clone();
    })
    .catch( err => {
      console.error(err.msg);

      return fetch(err.request).then( res => {
        caches.open(cache_name).then( cache => {
          cache.put(event.request, res);
        });
      });
    })
  )
});
