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
const outputPath = path.join(__dirname, '../../.claude-plugin/marketplace.json');

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
    let skillCount = 0;
    for (const skill of registry.skills) {
      // Skills already have 'slim-' prefix in registry, don't add it again
      const pluginName = skill.name.startsWith('slim-') ? skill.name : `slim-${skill.name}`;

      if (skill.external_only) {
        // External entries get special handling - point to external repository
        plugins.push({
          name: pluginName,
          source: skill.repository?.url || `external:${skill.name}`,
          description: skill.description || '',
          version: skill.version || '1.0.0',
          author: {
            name: 'External',
            url: skill.repository?.url || skill.homepage || '#'
          },
          category: skill.category || 'general',
          homepage: skill.repository?.url || skill.homepage || '#',
          keywords: [...(skill.tags || []), 'external', 'third-party'],
          external_only: true,
          install_command: skill.repository?.url ? `git clone ${skill.repository.url}` : 'See homepage for installation instructions'
        });
        console.log(`✓ Added external skill: ${skill.name}`);
      } else {
        plugins.push({
          name: pluginName,
          source: `./static/marketplace/skills/${skill.name}`,
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
        console.log(`✓ Added local skill: ${skill.name}`);
      }
      skillCount++;
    }
    console.log(`✓ Added ${skillCount} skills total`);
  }

  // Add agents as individual plugins
  if (registry.agents && Array.isArray(registry.agents)) {
    let agentCount = 0;
    for (const agent of registry.agents) {
      // Agents already have 'slim-' prefix in registry, don't add it again
      const pluginName = agent.name.startsWith('slim-') ? agent.name : `slim-${agent.name}`;

      if (agent.external_only) {
        // External entries get special handling - point to external repository
        plugins.push({
          name: pluginName,
          source: agent.repository?.url || `external:${agent.name}`,
          description: agent.description || '',
          version: agent.version || '1.0.0',
          author: {
            name: 'External',
            url: agent.repository?.url || agent.homepage || '#'
          },
          category: agent.category || 'general',
          homepage: agent.repository?.url || agent.homepage || '#',
          keywords: [...(agent.tags || []), 'external', 'third-party'],
          external_only: true,
          install_command: agent.repository?.url ? `git clone ${agent.repository.url}` : 'See homepage for installation instructions'
        });
        console.log(`✓ Added external agent: ${agent.name}`);
      } else {
        plugins.push({
          name: pluginName,
          source: `./static/marketplace/agents/${agent.name}`,
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
        console.log(`✓ Added local agent: ${agent.name}`);
      }
      agentCount++;
    }
    console.log(`✓ Added ${agentCount} agents total`);
  }

  // Add MCP servers as individual plugins
  if (registry.mcp && Array.isArray(registry.mcp)) {
    let mcpCount = 0;
    for (const mcp of registry.mcp) {
      if (mcp.external_only) {
        // External entries get special handling - point to external repository
        plugins.push({
          name: `slim-${mcp.name}`,
          source: mcp.repository?.url || mcp.npm_package || `external:${mcp.name}`,
          description: mcp.description || '',
          version: mcp.version || '1.0.0',
          author: {
            name: mcp.repository?.url.includes('github.com/github/') ? 'GitHub' : 'External',
            url: mcp.repository?.url || `https://www.npmjs.com/package/${mcp.npm_package}`
          },
          category: mcp.category || 'general',
          homepage: mcp.repository?.url || `https://www.npmjs.com/package/${mcp.npm_package}`,
          keywords: [...(mcp.tags || []), 'external', 'third-party'],
          external_only: true,
          npm_package: mcp.npm_package,
          install_command: mcp.npm_package ? `npm install -g ${mcp.npm_package}` : `git clone ${mcp.repository?.url}`
        });
        console.log(`✓ Added external MCP server: ${mcp.name}`);
      } else {
        plugins.push({
          name: `slim-${mcp.name}`,
          source: `./static/marketplace/mcp-servers/${mcp.name}`,
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
        console.log(`✓ Added local MCP server: ${mcp.name}`);
      }
      mcpCount++;
    }
    console.log(`✓ Added ${mcpCount} MCP servers total`);
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
