// self.addEventListener("install", event => {
//     event.waitUntil(
//         caches.open("my-cache").then(cache => {
//             return cache.addAll([
//                 "/",
//                 "/index.html",
//                 "/path/to/stylesheet.css",
//                 "/path/to/script.js",
//                 "/path/to/icon.png"
//             ]);
//         })
//     );
// });

self.addEventListener("fetch", event => {
    // event.respondWith(
    //     caches.match(event.request).then(response => {
    //         return response || fetch(event.request);
    //     })
    // );
});