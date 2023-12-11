const cacheName = "AtsutaRyuji-New_Social_Game-0.5.5_WebGL";
const contentToCache = [
    "Build/NewGamPlyaer_AnimationBasicD.loader.js",
    "Build/6f0e6a6228d6dcc942060f2bfb824b0c.js",
    "Build/808f464b974958fd0e735d91bb1a5cac.data",
    "Build/37688cfd5942c7119e17ac4860519e43.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
