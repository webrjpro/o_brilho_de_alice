const CACHE_NAME = 'historias-magicas-v1';
const DYNAMIC_CACHE_NAME = 'historias-magicas-dynamic-v1';

// Assets to pre-cache immediately
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  // Cover images
  './assets/capa.png',
  './assets/cores_capa.png',
  './assets/sereia_unicornio_capa.png',
  './assets/lucas_capa.png',
  './assets/familia_capa.png',
  './assets/pagina10.png',
  // Stories configuration files
  './stories/diary.js',
  './stories/alice.js',
  './stories/mermaid_unicorn.js',
  './stories/cores_amizade.js',
  './stories/voo_lucas.js',
  './stories/arvore_abracos.js'
];

// Install event: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event: Network-first falling back to Cache-first strategy for dynamic resources
// and Cache-first for local static resources
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and local requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // For static/pre-cached shell assets (HTML, CSS, JS, and UI icons), serve Cache-First
  const isPreCached = ASSETS_TO_CACHE.some(asset => {
    // Resolve relative path to absolute URL for comparison
    const resolvedAssetUrl = new URL(asset, self.location.origin);
    return resolvedAssetUrl.pathname === requestUrl.pathname;
  });

  if (isPreCached) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // For other assets (specifically images inside assets/ like lucas_pagina1.png, which are dynamic)
    // we use a Cache-First strategy to guarantee offline capabilities after the first load.
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          // If network fails, return cached response if available
        });
      })
    );
  }
});
