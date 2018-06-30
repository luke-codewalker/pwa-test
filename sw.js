const VERSION = 'v1';

// install service worker
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(VERSION).then(cache => {
            return cache.addAll([
                '/index.html',
                '/install-sw.js'
            ])
        })
    );
});

// intercept requests
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => res || fetch(e.request)
                .then(res => caches.open(VERSION)
                    .then(cache => {
                        cache.put(e.request, res.clone());
                        return res;
                    }))
            )
    );
});

// clean up if new version is installed
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keyList => Promise.all(keyList.map(key => {
            if ([VERSION].indexOf(key) === -1) {
                return caches.delete(key);
            }
        })))
    )
})