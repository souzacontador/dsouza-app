/* ============================================================
   DSouza — PWA vanilla · sw.js (Service Worker)
   Estrategia:
   - Precache del "app shell" al instalar
   - Navegaciones: network-first con fallback a caché (offline.html)
   - Recursos estáticos: cache-first con actualización en segundo plano
   ============================================================ */

'use strict';

const CACHE = 'dsouza-app-v1';

// Rutas relativas para que funcione también bajo subcarpeta (GitHub Pages).
const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './css/styles.css',
  './js/app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// ---------- Install: precache ----------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ---------- Activate: limpiar cachés viejos ----------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ---------- Fetch ----------
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Solo GET del mismo origen.
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  // Navegaciones (páginas): network-first.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('./offline.html')))
    );
    return;
  }

  // Recursos estáticos: cache-first + revalidación.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
