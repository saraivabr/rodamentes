// =====================================================
// RODA DE MENTES - SERVICE WORKER
// PWA Support with Offline Functionality
// =====================================================

const CACHE_NAME = 'rodamentes-v1.0.0';
const RUNTIME_CACHE = 'rodamentes-runtime';

// Core files to cache on install
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/config.js',
    '/assets/js/minds-data.js',
    '/assets/js/app.js',
    '/assets/js/openrouter-api.js',
    '/assets/js/voice-engine.js',
    '/assets/js/disruptive-features.js',
    '/manifest.json'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching core assets');
                return cache.addAll(CORE_ASSETS);
            })
            .then(() => {
                console.log('[SW] Core assets cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Failed to cache core assets:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Service worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - network first, fall back to cache
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip OpenRouter API requests
    if (url.origin.includes('openrouter.ai')) {
        return;
    }

    // Skip chrome-extension and other protocols
    if (!url.protocol.startsWith('http')) {
        return;
    }

    event.respondWith(
        networkFirstStrategy(request)
    );
});

/**
 * Network-first strategy with cache fallback
 */
async function networkFirstStrategy(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;

    } catch (error) {
        // Network failed, try cache
        console.log('[SW] Network failed, trying cache for:', request.url);

        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // If it's a navigation request and we have nothing, return the cached index
        if (request.mode === 'navigate') {
            const indexCache = await caches.match('/index.html');
            if (indexCache) {
                return indexCache;
            }
        }

        // Return a fallback response
        return new Response(
            JSON.stringify({
                error: 'Offline',
                message: 'Você está offline e este recurso não está em cache.'
            }),
            {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        );
    }
}

/**
 * Cache-first strategy (for static assets)
 */
async function cacheFirstStrategy(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;

    } catch (error) {
        console.error('[SW] Failed to fetch:', request.url, error);
        throw error;
    }
}

// Message event - for communication with app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((name) => caches.delete(name))
                );
            })
        );
    }
});

// Background sync (for future offline message queue)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-messages') {
        event.waitUntil(syncMessages());
    }
});

async function syncMessages() {
    // Placeholder for offline message sync
    console.log('[SW] Syncing offline messages...');
    // Implementation would sync messages stored while offline
}

console.log('[SW] Service worker loaded');
