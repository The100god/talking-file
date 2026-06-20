self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("external-libs").then((cache) =>
      cache.addAll([
        "https://unpkg.com/tesseract.js@v5.0.4/dist/tesseract.min.js",
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Serve cached external libraries if available, otherwise fetch from network
  const request = event.request;
  // Only handle GET requests for external resources
  if (request.method !== "GET") return;
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request);
    })
  );
});
