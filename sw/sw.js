var cacheFiles = [
  "index.html",
  "sw.js",
  "big.jpg"
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open('ws-test-cache-v1').then( cache => {
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (evt) {
    evt.respondWith(
      caches.match(evt.request).then(function(response) {
        console.log('fetching', evt.request)
        if (response) {
          return response;
        }
        var request = evt.request.clone();
        return fetch(request).then(function (response) {
          console.log('fetch', response.headers.get('Content-type'));
          if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)) {
            return response;
          }
          var responseClone = response.clone();
          caches.open('ws-test-cache-v1').then(function (cache) {
            cache.put(evt.request, responseClone);
          });
          return response;
        });
      })
    )
});
