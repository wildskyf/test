var cacheFiles = [
];
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open('ws-test-cache-v1').then( cache => {
            console.log('open cache and all!');
            setInterval( () => {
              fetch('https://api.womany.net/daily_quotes/').then( res => res.json() ).then( data => {
                console.log(data);
              })
            }, 2000);
            return cache.addAll(cacheFiles);
        })
    );
});
