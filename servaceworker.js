// service-worker.js

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
  // First try to get the resource from the cache.
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // If the response was not found in the cache,
  // try to get the resource from the network.
  try {
    const responseFromNetwork = await fetch(request);
    // If the network request succeeded, clone the response:
    // - put one copy in the cache, for the next time
    // - return the original to the app
    // Cloning is needed because a response can only be consumed once.
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    // If the network request failed,
    // get the fallback response from the cache.
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // When even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object.
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: "/fallback.html",
    }),
  );
});





// install trigger for sw - cache index.html
/*
var staticCacheName = "pwa";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
*/

/*
self.addEventListener('install', function(event) {
    var indexPage = new Request('index.html');
    event.waitUntil(
      fetch(indexPage).then(function(response) {
        return caches.open('offline').then(function(cache) {
          return cache.put(indexPage, response);
        });
    }));
  });
  
  // fetch trigger - serve from cache or fetch from server, cache the file if not previously cached
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).then(function(response) {
        return caches.open('offline').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(function (error) {
        caches.match(event.request).then(function(resp) {
          return resp;    
        });
      })
    );
  });
  */