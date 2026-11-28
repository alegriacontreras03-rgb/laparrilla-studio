const SHELL_CACHE = "lp-studio-shell-v12.3";
const IMG_CACHE = "lp-studio-img-v12.3";
const SHELL_FILES = ["./", "./index.html", "./app.js", "./manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== IMG_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.hostname === "script.google.com" || url.hostname === "script.googleusercontent.com") {
    return;
  }

  if (url.hostname === "res.cloudinary.com") {
    e.respondWith(
      caches.open(IMG_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          const net = fetch(req)
            .then((res) => {
              if (res && res.ok) cache.put(req, res.clone());
              return res;
            })
            .catch(() => cached);
          return cached || net;
        })
      )
    );
    return;
  }

  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(SHELL_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then((m) => m || caches.match("./index.html")))
    );
  }
});
