const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    let p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      if (!p.includes('node_modules') && !p.includes('.git') && !p.includes('dist')) {
        walk(p);
      }
    } else if (p.endsWith('.jsx') || p.endsWith('.js')) {
      let content = fs.readFileSync(p, 'utf8');
      let newContent = content.replace(/\.\/themes\//g, '/themes/')
                              .replace(/\.\/images\//g, '/images/')
                              .replace(/\.\/files\//g, '/files/');
      if (content !== newContent) {
        fs.writeFileSync(p, newContent);
        console.log('Fixed', p);
      }
    }
  });
}
walk('components');
walk('apps.config.js');
