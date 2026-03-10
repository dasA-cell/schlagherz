const CACHE = 'schlagherz-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.svg',
  './icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
________________________________________
icon-192.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6e5123"/>
      <stop offset="1" stop-color="#24170d"/>
    </linearGradient>
    <radialGradient id="lamp" cx="50%" cy="40%" r="55%">
      <stop offset="0" stop-color="#ffe8b6"/>
      <stop offset="0.45" stop-color="#ffb347"/>
      <stop offset="1" stop-color="#8d4e17"/>
    </radialGradient>
  </defs>
  <rect x="8" y="8" width="176" height="176" rx="28" fill="url(#bg)" stroke="#d3ae62" stroke-width="6"/>
  <rect x="28" y="28" width="136" height="36" rx="8" fill="#1a120c" stroke="#b48a46"/>
  <g fill="url(#lamp)">
    <rect x="28" y="84" width="18" height="18" rx="4"/>
    <rect x="52" y="84" width="18" height="18" rx="4"/>
    <rect x="76" y="84" width="18" height="18" rx="4"/>
    <rect x="100" y="84" width="18" height="18" rx="4"/>
    <rect x="124" y="84" width="18" height="18" rx="4"/>
    <rect x="148" y="84" width="18" height="18" rx="4"/>
    <rect x="28" y="108" width="18" height="18" rx="4"/>
    <rect x="52" y="108" width="18" height="18" rx="4"/>
    <rect x="76" y="108" width="18" height="18" rx="4"/>
    <rect x="100" y="108" width="18" height="18" rx="4"/>
    <rect x="124" y="108" width="18" height="18" rx="4"/>
    <rect x="148" y="108" width="18" height="18" rx="4"/>
  </g>
  <circle cx="50" cy="150" r="14" fill="#c89a50" stroke="#e4c078"/>
  <circle cx="96" cy="150" r="14" fill="#c89a50" stroke="#e4c078"/>
  <circle cx="142" cy="150" r="14" fill="#c89a50" stroke="#e4c078"/>
</svg>
