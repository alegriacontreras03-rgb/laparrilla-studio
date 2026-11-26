// v11 app-shell network-first (con app.js) + Cloudinary stale-while-revalidate (no intercepta POST ni Apps Script)
const SHELL_CACHE = "lp-studio-shell-v11";
const IMG_CACHE = "lp-studio-img-v11";
const SHELL_ASSETS = ["./", "./index.html", "./app.js", "./manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  const keep = new Set([SHELL_CACHE, IMG_CACHE]);
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }
  if (url.hostname.includes("script.google.com") || url.hostname.includes("script.googleusercontent.com")) {
    return;
  }

  // Imágenes de Cloudinary: stale-while-revalidate
  if (url.hostname === "res.cloudinary.com") {
    e.respondWith(
      caches.open(IMG_CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        const networkPromise = fetch(req).then((resp) => {
          if (resp && resp.ok) cache.put(req, resp.clone()).catch(() => {});
          return resp;
        }).catch(() => cached);
        return cached || networkPromise;
      })
    );
    return;
  }

  // Navegación / App Shell: network-first con respaldo offline
  if (req.mode === "navigate" || url.origin === self.location.origin) {
    e.respondWith(
      fetch(req)
        .then((resp) => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return resp;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
  }
});
