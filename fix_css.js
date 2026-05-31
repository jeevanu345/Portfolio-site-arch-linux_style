const fs = require('fs');
let p = 'styles/index.css';
let content = fs.readFileSync(p, 'utf8');
let newContent = content.replace(/\.\/images\//g, '/images/');
fs.writeFileSync(p, newContent);
console.log('Fixed', p);
