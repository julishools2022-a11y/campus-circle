const CACHE_NAME = "campus-circle-v2"; // Incremented version to force update
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/signup.html",
    "/dashboard.html",
    "/profile.html",
    "/my-listings.html",
    "/post-item.html",
    "/product-details.html",
    "/favorites.html",
    "/edit-item.html",
    "/contact.html",
    "/terms.html",
    "/manifest.json"
];

// 1. Install: Cache local assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching core assets...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Force the waiting service worker to become active
});

// 2. Activate: Clean up old versions
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("[Service Worker] Removing old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// 3. Fetch: Strategy (Network-first for dynamic content, Cache-first for static)
self.addEventListener("fetch", (event) => {
    // If it's a Supabase/External call, go straight to network
    if (!event.request.url.startsWith(self.location.origin)) {
        return; 
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
