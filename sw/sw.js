var cacheFiles = [
  "index.html",
  "sw.js",
  "big.jpg"
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
  console.log('fetching', evt.request);

  evt.respondWith( caches.match(evt.request).then( response => {
      if (response) {
        console.log('match!!');
        return response;
      }

      var request = evt.request.clone();
      return fetch(request).then( response => {
        console.log('fetch', response.headers.get('Content-type'));
        if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)) {
          return response;
        }
        var responseClone = response.clone();
        caches.open(cache_name).then( cache => {
          cache.put(evt.request, responseClone);
        });
        return response;
      });
    })
  )
});

