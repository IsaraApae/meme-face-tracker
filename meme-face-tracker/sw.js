// Service worker: keeps a copy of the page and everything it loads, so the
// online version also opens with no connection after the first visit.
//
// - The page itself: from the network first, so a new version shows up at
//   once; the saved copy is only used when the network can't be reached.
// - vendor/ (the MediaPipe library and models, about 22 MB): the saved copy,
//   always. These files only change when MediaPipe is updated; change
//   MEDIAPIPE below when that happens (the Check workflow makes sure it
//   matches the version in index.html), and they are downloaded afresh.
// - Everything else (meme images, icons): the saved copy at once, refreshed
//   in the background for next time.

const MEDIAPIPE = "0.10.14";
// every project on this site's address shares one cache storage, so only
// caches with this prefix are ours to clean up
const PREFIX = "meme-face-tracker-";
const VENDOR = `${PREFIX}vendor-${MEDIAPIPE}`;
const PAGE = `${PREFIX}page`;

const HOME = self.registration.scope; // the folder index.html is in, ending in "/"
const isVendor = url => url.startsWith(HOME + "vendor/");

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith(PREFIX) && name !== VENDOR && name !== PAGE) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = request.url.split(/[?#]/)[0];
  if (request.method !== "GET" || !url.startsWith(HOME) || request.headers.has("range")) return;
  if (request.mode === "navigate") {
    // other pages in the folder (a README opened directly) are left alone
    if (url === HOME || url === HOME + "index.html") event.respondWith(pageFromNetworkFirst(request));
  } else {
    event.respondWith(savedFirst(event, isVendor(url) ? VENDOR : PAGE, request, !isVendor(url)));
  }
});

async function pageFromNetworkFirst(request) {
  const cache = await caches.open(PAGE);
  try {
    const response = await fetch(request);
    // one copy under the folder's address, whatever ?photo= it was opened with
    if (response.ok) await cache.put(HOME, response.clone());
    return response;
  } catch (err) {
    const saved = await cache.match(HOME);
    if (saved) return saved;
    throw err;
  }
}

async function savedFirst(event, cacheName, request, refresh) {
  const cache = await caches.open(cacheName);
  const saved = await cache.match(request);
  if (saved && !refresh) return saved;
  const fetched = fetch(request).then(async response => {
    if (response.ok) await cache.put(request, response.clone());
    return response;
  });
  if (!saved) return fetched;
  // offline, the refresh fails and the saved copy is all there is
  event.waitUntil(fetched.catch(() => {}));
  return saved;
}

// The page lists what it loaded before this worker took over, so that one
// visit is enough. These come out of the browser's own cache, not the network.
self.addEventListener("message", event => {
  if (event.data?.type !== "keep") return;
  event.waitUntil((async () => {
    for (const url of event.data.urls) {
      if (!url.startsWith(HOME)) continue;
      const cache = await caches.open(isVendor(url) ? VENDOR : PAGE);
      if (await cache.match(url)) continue;
      try {
        const response = await fetch(url);
        if (response.ok) await cache.put(url, response);
      } catch {} // it will be saved the next time the page asks for it
    }
  })());
});
