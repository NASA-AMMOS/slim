/**
 * Generate Claude Code marketplace.json from registry.json
 * This script creates the top-level marketplace.json file that Claude Code uses
 * to discover plugins in the SLIM marketplace.
 */

const fs = require('fs');
const path = require('path');

// Input: registry.json
const registryPath = path.join(__dirname, '../../static/data/registry.json');

// Output: marketplace.json
const outputPath = path.join(__dirname, '../../static/marketplace/.claude-plugin/marketplace.json');

/**
 * Generate the marketplace.json file from registry data
 */
function generateMarketplace() {
  console.log('Generating Claude Code marketplace.json...\n');

  // Read registry.json
  if (!fs.existsSync(registryPath)) {
    console.error(`❌ Error: registry.json not found at ${registryPath}`);
    process.exit(1);
  }

  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  // Build plugins array - one plugin per skill/MCP
  const plugins = [];

  // Add skills as individual plugins
  if (registry.skills && Array.isArray(registry.skills)) {
    for (const skill of registry.skills) {
      // Skills already have 'slim-' prefix in registry, don't add it again
      const pluginName = skill.name.startsWith('slim-') ? skill.name : `slim-${skill.name}`;
      plugins.push({
        name: pluginName,
        source: `./skills/${skill.name}`,
        description: skill.description || '',
        version: skill.version || '1.0.0',
        author: {
          name: 'NASA AMMOS',
          url: 'https://github.com/NASA-AMMOS'
        },
        category: skill.category || 'general',
        homepage: `https://github.com/NASA-AMMOS/slim/tree/main/static/marketplace/skills/${skill.name}`,
        keywords: skill.tags || []
      });
    }
    console.log(`✓ Added ${registry.skills.length} skills`);
  }

  // Add agents as individual plugins
  if (registry.agents && Array.isArray(registry.agents)) {
    for (const agent of registry.agents) {
      // Agents already have 'slim-' prefix in registry, don't add it again
      const pluginName = agent.name.startsWith('slim-') ? agent.name : `slim-${agent.name}`;
      plugins.push({
        name: pluginName,
        source: `./agents/${agent.name}`,
        description: agent.description || '',
        version: agent.version || '1.0.0',
        author: {
          name: 'NASA AMMOS',
          url: 'https://github.com/NASA-AMMOS'
        },
        category: agent.category || 'general',
        homepage: `https://github.com/NASA-AMMOS/slim/tree/main/static/marketplace/agents/${agent.name}`,
        keywords: agent.tags || []
      });
    }
    console.log(`✓ Added ${registry.agents.length} agents`);
  }

  // Add MCP servers as individual plugins
  if (registry.mcp && Array.isArray(registry.mcp)) {
    for (const mcp of registry.mcp) {
      plugins.push({
        name: `slim-${mcp.name}`,
        source: `./mcp-servers/${mcp.name}`,
        description: mcp.description || '',
        version: mcp.version || '1.0.0',
        author: {
          name: 'NASA AMMOS',
          url: 'https://github.com/NASA-AMMOS'
        },
        category: mcp.category || 'general',
        homepage: `https://github.com/NASA-AMMOS/slim/tree/main/static/marketplace/mcp-servers/${mcp.name}`,
        keywords: mcp.tags || []
      });
    }
    console.log(`✓ Added ${registry.mcp.length} MCP servers`);
  }

  // Sort alphabetically by name for consistency
  plugins.sort((a, b) => a.name.localeCompare(b.name));

  // Create marketplace structure
  const marketplace = {
    name: 'slim-marketplace',
    owner: {
      name: 'NASA AMMOS',
      email: 'slim@jpl.nasa.gov'
    },
    metadata: {
      description: 'SLIM - Software Lifecycle Improvement & Modernization best practices',
      version: '1.0.0'
    },
    plugins: plugins
  };

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write marketplace.json
  fs.writeFileSync(outputPath, JSON.stringify(marketplace, null, 2));

  console.log(`\n✓ Generated marketplace.json at: ${outputPath}`);
  console.log(`✓ Total plugins: ${plugins.length}`);
}

// Run the generator
try {
  generateMarketplace();
} catch (error) {
  console.error(`❌ Error generating marketplace.json:`, error.message);
  process.exit(1);
}
