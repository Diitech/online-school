const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const extensions = ['.tsx', '.ts', '.js', '.json', '.html', '.css', '.xml', '.env', '.txt', '.md', '.yml', '.yaml', '.ico', '.svg', '.yml', '.yaml'];
const results = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        walk(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext) || !ext) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          if (content.includes('vhttps')) {
            const regex = /vhttps/g;
            const count = (content.match(regex) || []).length;
            results.push({ file: fullPath, count });
            const newContent = content.replace(/vhttps/g, 'https');
            fs.writeFileSync(fullPath, newContent, 'utf-8');
            console.log(`FIXED: ${path.relative(process.cwd(), fullPath)} (${count} occurrence${count > 1 ? 's' : ''})`);
          }
        } catch (e) {
          // skip binary files
        }
      }
    }
  }
}

walk(rootDir);

if (results.length === 0) {
  console.log('No files containing "vhttps" were found.');
} else {
  console.log(`\nTotal files modified: ${results.length}`);
}
