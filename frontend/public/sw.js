const CACHE_NAME = 'em-pulse-v1';

// Instalar Service Worker
self.addEventListener('install', () => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(self.clients.claim());
  
  // Limpiar caches viejos (en background, no bloquea)
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      if (cacheName !== CACHE_NAME) {
        console.log('Borrando cache viejo:', cacheName);
        caches.delete(cacheName);
      }
    });
  });
});

// Fetch - Estrategia Network First con timeout corto
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // No cachear API calls o POST requests
  if (request.method !== 'GET' || url.pathname.includes('/api/')) {
    return;
  }

  event.respondWith(
    // Timeout de 5 segundos para network
    Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 5000)
      )
    ])
      .then((response) => {
        // Clonar y guardar en cache (en background)
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla o timeout, intentar desde cache
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }
          // Si no está en cache, dejar que el navegador manejo el error
          return fetch(request);
        });
      })
  );
});
