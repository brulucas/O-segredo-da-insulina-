const fs = require('fs');
const js = fs.readFileSync('/tmp/app_bundle.js', 'utf8');

// Search for route definitions or main screens
const routes = [];
const routeMatches = js.matchAll(/path:\s*["'`]([^"'`]+)["'`]/g);
for (const m of routeMatches) {
  routes.push(m[1]);
}
console.log('Routes:', routes);

// Look for tab names, navigation items, page components
const tabs = js.matchAll(/label:\s*["'`]([^"'`]+)["'`]/g);
const labels = new Set();
for (const m of tabs) labels.add(m[1]);
console.log('Labels:', Array.from(labels).slice(0, 30));

// Check localStorage keys
const lsMatches = js.matchAll(/localStorage\.(?:getItem|setItem)\(\s*["'`]([^"'`]+)["'`]/g);
const lsKeys = new Set();
for (const m of lsMatches) lsKeys.add(m[1]);
console.log('LocalStorage keys:', Array.from(lsKeys));
