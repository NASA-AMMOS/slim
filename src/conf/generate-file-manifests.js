/**
 * Generate centralized file manifest for marketplace items
 * This script scans the marketplace directory and creates a single marketplace-files.json
 * in the static/data directory containing file trees for all skills and MCP servers
 */

const fs = require('fs');
const path = require('path');

// Directories to scan
const marketplaceDirs = [
  { type: 'skill', path: path.join(__dirname, '../../static/marketplace/skills') },
  { type: 'mcp-server', path: path.join(__dirname, '../../static/marketplace/mcp-servers') }
];

// Output path for centralized manifest
const outputPath = path.join(__dirname, '../../static/data/marketplace-files.json');

// Files and directories to exclude
const excludePatterns = [
  '.DS_Store',
  '.git',
  '.gitignore',
  'node_modules',
  'Thumbs.db',
  '.vscode',
  '.idea',
  '.tmp'
];

// Check if a file/dir should be excluded
function shouldExclude(name) {
  return excludePatterns.some(pattern => {
    return name === pattern || name.startsWith(pattern);
  });
}

// Count total files in a tree
function countFiles(items) {
  let count = 0;
  for (const item of items) {
    if (item.type === 'file') {
      count++;
    } else if (item.type === 'directory' && item.children) {
      count += countFiles(item.children);
    }
  }
  return count;
}

// Recursively build file tree
function buildFileTree(dirPath, relativePath = '') {
  const items = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (shouldExclude(entry.name)) continue;

      const fullPath = path.join(dirPath, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        const children = buildFileTree(fullPath, relPath);
        const fileCount = countFiles(children);
        items.push({
          name: entry.name,
          type: 'directory',
          path: relPath,
          children: children,
          fileCount: fileCount
        });
      } else {
        const stats = fs.statSync(fullPath);
        items.push({
          name: entry.name,
          type: 'file',
          path: relPath,
          size: stats.size
        });
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }

  return items;
}

// Generate centralized manifest for all marketplace items
function generateCentralizedManifest() {
  const manifest = {
    skills: {},
    'mcp-servers': {}
  };

  let totalScanned = 0;

  for (const { type, path: marketplacePath } of marketplaceDirs) {
    if (!fs.existsSync(marketplacePath)) {
      console.log(`Skipping ${type}s - directory not found: ${marketplacePath}`);
      continue;
    }

    const items = fs.readdirSync(marketplacePath, { withFileTypes: true });
    const pluralType = type === 'skill' ? 'skills' : 'mcp-servers';

    for (const item of items) {
      if (!item.isDirectory() || shouldExclude(item.name)) continue;

      const itemPath = path.join(marketplacePath, item.name);
      const fileTree = buildFileTree(itemPath);

      if (fileTree.length > 0) {
        const totalFileCount = countFiles(fileTree);
        manifest[pluralType][item.name] = {
          name: item.name,
          type: 'directory',
          children: fileTree,
          fileCount: totalFileCount
        };
        console.log(`Scanned ${type}: ${item.name} (${totalFileCount} files)`);
        totalScanned++;
      } else {
        console.log(`Skipped ${type}: ${item.name} (no files found)`);
      }
    }
  }

  // Ensure the output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the centralized manifest
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✓ Generated centralized manifest at: ${outputPath}`);
  console.log(`✓ Total items scanned: ${totalScanned}`);
}

// Run the script
generateCentralizedManifest();
