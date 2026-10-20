/* Service worker: app shell (cache-first, refreshed in background) + visited OSM tiles & hotel photos (runtime cache, capped). */
/* После правки файлов поменяйте VERSION — тогда кэш оболочки обновится у всех сразу. */
const VERSION = "ldn26-v6";
const SHELL = VERSION + "-shell";
const TILES = "ldn26-tiles";
const IMGS = "ldn26-img";
const MAX_TILES = 1500;
const MAX_IMGS = 80;
const SHELL_FILES = [
  "./", "index.html", "data.js", "xmas-data.js", "assets/app.js", "assets/styles.css", "assets/xmas.js", "assets/xmas.css",
  "assets/leaflet/leaflet.js", "assets/leaflet/leaflet.css",
  "assets/leaflet/images/marker-icon.png", "assets/leaflet/images/marker-icon-2x.png", "assets/leaflet/images/marker-shadow.png",
  "assets/leaflet/images/layers.png", "assets/leaflet/images/layers-2x.png",
  "assets/icons/icon.svg", "assets/icons/icon-192.png", "assets/icons/icon-512.png", "manifest.webmanifest", "assets/img/home-roland32.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.endsWith("-shell") && k !== SHELL).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

async function trim(cacheName, max) {
  const c = await caches.open(cacheName);
  const keys = await c.keys();
  for (let i = 0; i < keys.length - max; i++) await c.delete(keys[i]);
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // OSM tiles: cache-first (only tiles you have actually viewed are stored)
  if (url.hostname === "tile.openstreetmap.org") {
    e.respondWith(caches.open(TILES).then(async (c) => {
      const hit = await c.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok || res.type === "opaque") { c.put(req, res.clone()); trim(TILES, MAX_TILES); }
        return res;
      } catch (err) { return new Response("", { status: 504 }); }
    }));
    return;
  }

  // Same-origin: stale-while-revalidate for the app shell; navigation falls back to index.html
  if (url.origin === self.location.origin) {
    e.respondWith(caches.open(SHELL).then(async (c) => {
      const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === "navigate" ? await c.match("index.html") : null);
      const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => null);
      return hit || (await net) || new Response("Offline", { status: 503 });
    }));
    return;
  }

  // Cross-origin images (hotel photos): cache-first
  if (req.destination === "image") {
    e.respondWith(caches.open(IMGS).then(async (c) => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const res = await fetch(req); c.put(req, res.clone()); trim(IMGS, MAX_IMGS); return res; }
      catch (err) { return new Response("", { status: 504 }); }
    }));
  }
});
