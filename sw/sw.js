var cacheFiles = [
];
self.addEventListener('install', function (evt) {
    evt.waitUntil(
        caches.open('ws-test-cache-v1').then(function (cache) {
            console.log('open cache and all!');
            return cache.addAll(cacheFiles);
        })
    );
});
