const fs = require('fs');
let s = fs.readFileSync('sw.js', 'utf8');
s = s.replace(/const CACHE = 'iu-[^']+';/, "const CACHE = 'iu-" + Date.now() + "';");
fs.writeFileSync('sw.js', s);
console.log('sw.js cache оновлено: iu-' + Date.now());
