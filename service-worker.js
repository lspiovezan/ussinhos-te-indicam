const CACHE_NAME = "ursinhos-cache-v1";
const urlsToCache = [
  "index.html",
  "header.html",
  "footer.html",
  "css/style.css",
  "css/header.css",
  "css/animations.css",
  "js/header.js",
  "js/footer.js",
  "img/logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
