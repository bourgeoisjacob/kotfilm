/* Kotfilm service worker — minimal, honest offline support.
 * Kotfilm's pages are dynamic (live DB), so we don't pretend to cache the whole
 * catalogue. We do: serve a friendly offline page when navigation fails, and
 * cache-first the static build assets, fonts, and images for speed.
 */
const VERSION = "kotfilm-v1";
const STATIC_CACHE = `${VERSION}-static`;
const ASSET_CACHE = `${VERSION}-assets`;
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll([OFFLINE_URL, "/icon-192.png", "/kotfilm-icon.png"]),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    /\.(?:png|jpg|jpeg|webp|avif|svg|gif|ico|woff2?|ttf)$/i.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Only handle same-origin requests; never intercept YouTube/Archive embeds.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, fall back to cache, then the offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cached = await caches.match(request);
        return cached || caches.match(OFFLINE_URL);
      }),
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  if (isAsset(url)) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      }),
    );
  }
});
