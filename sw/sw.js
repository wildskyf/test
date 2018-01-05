var cacheFiles = [
];
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open('ws-test-cache-v1').then( cache => {
            console.log('open cache and all!');
            setInterval( () => {
              console.log('yo');
            }, 2000);
            return cache.addAll(cacheFiles);
        })
    );
});
