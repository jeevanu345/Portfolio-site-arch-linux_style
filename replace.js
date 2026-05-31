const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.next') {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.js') || dirPath.endsWith('.jsx') || dirPath.endsWith('.json') || dirPath.endsWith('.html') || dirPath.endsWith('.md')) {
        callback(dirPath);
      }
    }
  });
}

walkDir('.', function(filePath) {
  if (filePath === 'replace.js' || filePath === 'source.md' || filePath.includes('package-lock.json')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace GitHub user links
  content = content.replace(/github\.com\/Jeevan\.U\.Gowda/g, 'github.com/jeevanu345');
  content = content.replace(/github1s\.com\/Jeevan\.U\.Gowda/g, 'github1s.com/jeevanu345');
  
  // Replace the repo name references to avoid 404s
  content = content.replace(/Jeevan\.U\.Gowda\.github\.io/g, 'jeevanu345.github.io');
  
  // Replace sponsors button and API links
  content = content.replace(/sponsors\/Jeevan\.U\.Gowda/g, 'sponsors/jeevanu345');
  content = content.replace(/user=Jeevan\.U\.Gowda/g, 'user=jeevanu345');
  content = content.replace(/repos=Jeevan\.U\.Gowda/g, 'repos=jeevanu345');
  content = content.replace(/#Jeevan\.U\.Gowda/g, '#jeevanu345');

  if (content !== original) {
    console.log('Updated: ' + filePath);
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
