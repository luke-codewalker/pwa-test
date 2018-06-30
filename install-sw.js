if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log(`[Service Worker]: Registration succeded. Scope is ${registration.scope}`);
        })
        .catch(err => {
            console.log(`[Service Worker]: Registration failed with ${err}`);
        })
}