const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
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
      try {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.tsx', '.ts', '.js', '.json', '.html', '.css', '.xml', '.env', '.txt', '.md', '.yml', '.yaml', '.svg', '.ico'].includes(ext) || !ext) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          if (content.includes('utme-1')) {
            const lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].includes('utme-1')) {
                const relPath = path.relative(process.cwd(), fullPath);
                console.log(`\nFILE: ${relPath} (line ${i + 1})`);
                // Show context: the matching line + 1 line before and after
                const start = Math.max(0, i - 2);
                const end = Math.min(lines.length, i + 3);
                for (let j = start; j < end; j++) {
                  const marker = j === i ? '>>> ' : '    ';
                  console.log(`  ${marker}${lines[j]}`);
                }
              }
            }
          }
        }
      } catch (e) {
        // skip binary
      }
    }
  }
}

walk(rootDir);
console.log('\n--- Search complete ---');
