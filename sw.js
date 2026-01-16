const CACHE_NAME = "campus-circle-v1";
const ASSETS_TO_CACHE = [
    "./",
    "index.html",
    "signup.html",
    "./dashboard.html",
    "profile.html",
    "./my-listings.html",
    "./post-item.html",
    "./product-details.html",
    "./favorites.html",
    "./edit-item.html",
    "./contact.html",
    "./terms.html",
    "./manifest.json"
];

// 1. Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching files...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Activate & Remove Old Caches
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

// 3. Fetch (Serve from Cache first, then Network)
self.addEventListener("fetch", (event) => {
    // We only want to cache local files, not API calls (Supabase)
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached file if found, otherwise fetch from network
            return cachedResponse || fetch(event.request);
        })
    );
});
const CACHE_NAME = 'campus-circle-v1';
const ASSETS = [
  '/',
  'index.html',
  'profile.html',
  'manifest.json'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch resources
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

