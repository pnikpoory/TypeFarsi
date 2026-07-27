const CACHE='farsitype-ipados-v17';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.png','./assets/opentype.min.mjs','./assets/harfbuzz/index.mjs','./assets/harfbuzz/harfbuzz.js','./assets/harfbuzz/harfbuzz.wasm'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.mode==='navigate' || url.pathname.endsWith('/index.html')){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',c));return r;}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
