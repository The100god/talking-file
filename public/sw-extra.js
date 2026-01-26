self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("external-libs").then((cache) =>
      cache.addAll([
        "https://unpkg.com/tesseract.js@v5.0.4/dist/tesseract.min.js",
      ])
    )
  );
});
