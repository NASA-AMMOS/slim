/**
 * Create marketplace zip files for localhost installation
 * Generates individual zip files for each skill and MCP server
 *
 * This script runs during the Docusaurus build process to create
 * downloadable zip archives of marketplace items for local development.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration paths
const REGISTRY_PATH = path.join(__dirname, '../../static/data/registry.json');
const MARKETPLACE_PATH = path.join(__dirname, '../../static/marketplace');
const OUTPUT_PATH = path.join(__dirname, '../../static/assets/zip');

/**
 * Create a zip file for a marketplace item
 * @param {string} itemName - Name of the item (e.g., 'slim-changelog')
 * @param {string} itemType - Type of item ('skills' or 'mcp-servers')
 * @returns {boolean} - True if successful, false otherwise
 */
function createZip(itemName, itemType) {
  const sourcePath = path.join(MARKETPLACE_PATH, itemType, itemName);
  const zipFileName = `${itemName}.zip`;
  const zipFilePath = path.join(OUTPUT_PATH, zipFileName);

  // Check if source directory exists
  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠ Skipping ${itemName}: directory not found at ${sourcePath}`);
    return false;
  }

  try {
    // Change to the parent directory and create zip with parent folder included
    const marketplaceTypeDir = path.join(MARKETPLACE_PATH, itemType);
    const zipCommand = `cd "${marketplaceTypeDir}" && zip -r "${zipFilePath}" "${itemName}/"`;

    execSync(zipCommand, { stdio: 'pipe' });

    // Verify zip was created
    if (fs.existsSync(zipFilePath)) {
      const stats = fs.statSync(zipFilePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`✓ Created ${zipFileName} (${sizeKB} KB)`);
      return true;
    } else {
      console.error(`✗ Failed to create ${zipFileName}: file not found after zip command`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Failed to create ${zipFileName}:`, error.message);
    return false;
  }
}

/**
 * Main function to generate all marketplace zips
 */
function generateMarketplaceZips() {
  console.log('\n🗜️  Generating marketplace zip files...\n');

  // Check if registry exists
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error(`❌ Error: Registry not found at ${REGISTRY_PATH}`);
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_PATH}`);
  }

  // Read registry
  let registry;
  try {
    const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf8');
    registry = JSON.parse(registryContent);
  } catch (error) {
    console.error(`❌ Error reading registry: ${error.message}`);
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;
  let totalItems = 0;

  // Process skills
  if (registry.skills && Array.isArray(registry.skills)) {
    console.log(`📦 Processing ${registry.skills.length} skills...`);
    for (const skill of registry.skills) {
      totalItems++;
      if (createZip(skill.name, 'skills')) {
        successCount++;
      } else {
        failCount++;
      }
    }
  }

  // Process MCP servers
  if (registry.mcp && Array.isArray(registry.mcp)) {
    console.log(`\n🔌 Processing ${registry.mcp.length} MCP servers...`);
    for (const mcp of registry.mcp) {
      totalItems++;
      if (createZip(mcp.name, 'mcp-servers')) {
        successCount++;
      } else {
        failCount++;
      }
    }
  }

  // Process agents (if any)
  if (registry.agents && Array.isArray(registry.agents)) {
    console.log(`\n🤖 Processing ${registry.agents.length} agents...`);
    for (const agent of registry.agents) {
      totalItems++;
      if (createZip(agent.name, 'agents')) {
        successCount++;
      } else {
        failCount++;
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully created: ${successCount}/${totalItems} zips`);
  if (failCount > 0) {
    console.log(`⚠️  Failed: ${failCount}/${totalItems} zips`);
  }
  console.log(`📂 Output directory: ${OUTPUT_PATH}`);
  console.log('='.repeat(50) + '\n');

  // Exit with error code if all zips failed
  if (failCount === totalItems && totalItems > 0) {
    console.error('❌ All zip creations failed!');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  generateMarketplaceZips();
}

module.exports = { generateMarketplaceZips, createZip };
