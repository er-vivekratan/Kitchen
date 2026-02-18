self.addEventListener("install",e=>{
e.waitUntil(
caches.open("mumma-cache").then(cache=>{
return cache.addAll([
"index.html","recipes.html","cart.html","style.css","script.js"
]);
})
);
});
