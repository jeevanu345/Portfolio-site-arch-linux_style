const fs = require('fs');
let p = 'apps.config.js';
let content = fs.readFileSync(p, 'utf8');
let newContent = content.replace(/\.\/themes\//g, '/themes/')
                        .replace(/\.\/images\//g, '/images/')
                        .replace(/\.\/files\//g, '/files/');
fs.writeFileSync(p, newContent);
console.log('Fixed', p);
