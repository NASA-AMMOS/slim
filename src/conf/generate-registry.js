/**
 * Generate registry.json from marketplace.json sources
 * This script reverses the data flow - generating registry.json FROM marketplace.json
 * while preserving user-managed fields (displayName, example, category, dependencies, lastUpdated)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Paths
const configPath = path.join(__dirname, '../../docusaurus.config.js');
const registryPath = path.join(__dirname, '../../static/data/registry.json');

/**
 * Load registry sources from configuration
 * @param {Object} config - Configuration object with slimConfig.registrySources
 * @returns {Promise<Array>} Array of parsed marketplace objects with metadata
 */
async function loadRegistrySources(config) {
  const sources = [];
  const registrySources = config.slimConfig?.registrySources || [];

  console.log(`📂 Loading ${registrySources.length} registry source(s)...\n`);

  for (const source of registrySources) {
    if (!source.enabled) {
      console.log(`⏭️  Skipping disabled source: ${source.path}`);
      continue;
    }

    try {
      let marketplace;
      let sourceMetadata = { ...source };

      if (source.type === 'marketplace-json') {
        if (source.path.startsWith('http://') || source.path.startsWith('https://')) {
          // Fetch from URL
          console.log(`🌐 Fetching marketplace from URL: ${source.path}`);
          marketplace = await fetchFromUrl(source.path);
          sourceMetadata.isRemote = true;
        } else {
          // Read from local file
          const fullPath = path.resolve(source.path);
          console.log(`📄 Reading marketplace from local file: ${fullPath}`);

          if (!fs.existsSync(fullPath)) {
            console.warn(`⚠️  Source file not found: ${fullPath} - skipping`);
            continue;
          }

          marketplace = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          sourceMetadata.isRemote = false;
          sourceMetadata.resolvedPath = fullPath;
        }

        sources.push({
          marketplace,
          metadata: sourceMetadata
        });

        console.log(`✓ Loaded marketplace with ${marketplace.plugins?.length || 0} plugins`);
      } else {
        console.warn(`⚠️  Unknown source type: ${source.type} - skipping`);
      }
    } catch (error) {
      console.error(`❌ Error loading source ${source.path}:`, error.message);
      console.log(`   Continuing with other sources...\n`);
    }
  }

  if (sources.length === 0) {
    console.warn(`⚠️  No sources loaded successfully`);
  }

  return sources;
}

/**
 * Fetch marketplace JSON from URL
 * @param {string} url - URL to fetch from
 * @returns {Promise<Object>} Parsed marketplace JSON
 */
function fetchFromUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https://') ? https : http;

    client.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (error) {
          reject(new Error(`Invalid JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Transform marketplace.json to registry.json format
 * @param {Object} marketplace - Marketplace object
 * @param {Object} sourceMetadata - Source metadata
 * @returns {Object} Registry object with { skills: [], agents: [], mcp: [] }
 */
function transformMarketplaceToRegistry(marketplace, sourceMetadata) {
  const registry = {
    skills: [],
    agents: [],
    mcp: []
  };

  if (!marketplace.plugins || !Array.isArray(marketplace.plugins)) {
    console.warn(`⚠️  No plugins array found in marketplace`);
    return registry;
  }

  for (const plugin of marketplace.plugins) {
    try {
      // Determine plugin type and extract entries
      if (plugin.skills && Array.isArray(plugin.skills)) {
        // Skills plugin
        for (const skillPath of plugin.skills) {
          const skill = createRegistryEntry(plugin, 'skill', skillPath, sourceMetadata);
          registry.skills.push(skill);
        }
      } else if (plugin.agents) {
        // Agents plugin
        const agent = createRegistryEntry(plugin, 'agent', plugin.agents, sourceMetadata);
        registry.agents.push(agent);
      } else if (plugin.source && (typeof plugin.source === 'object')) {
        // MCP server (external)
        const mcp = createRegistryEntry(plugin, 'mcp', null, sourceMetadata);
        registry.mcp.push(mcp);
      } else if (plugin.external_only || plugin.npm_package) {
        // External MCP server
        const mcp = createRegistryEntry(plugin, 'mcp', null, sourceMetadata);
        registry.mcp.push(mcp);
      } else {
        console.warn(`⚠️  Unknown plugin type for: ${plugin.name}`);
      }
    } catch (error) {
      console.error(`❌ Error processing plugin ${plugin.name}:`, error.message);
    }
  }

  return registry;
}

/**
 * Create a registry entry from a marketplace plugin
 * @param {Object} plugin - Marketplace plugin object
 * @param {string} type - Type: 'skill', 'agent', or 'mcp'
 * @param {string|null} itemPath - Path to skill/agent file (null for MCP)
 * @param {Object} sourceMetadata - Source metadata
 * @returns {Object} Registry entry
 */
function createRegistryEntry(plugin, type, itemPath, sourceMetadata) {
  const entry = {
    name: plugin.name,
    description: plugin.description || '',
    tags: plugin.keywords || [],
    type: type,
    skill_file_url: constructSkillFileUrl(plugin, type, itemPath, sourceMetadata),
  };

  // Copy additional marketplace fields
  if (plugin.version) entry.version = plugin.version;
  if (plugin.author) entry.author = plugin.author;
  if (plugin.homepage) entry.homepage = plugin.homepage;
  if (plugin.repository) entry.repository = plugin.repository;
  if (plugin.license) entry.license = plugin.license;

  // MCP-specific fields
  if (type === 'mcp') {
    if (plugin.external_only) entry.external_only = true;
    if (plugin.npm_package) entry.npm_package = plugin.npm_package;
  }

  return entry;
}

/**
 * Construct skill_file_url from plugin info
 * @param {Object} plugin - Marketplace plugin
 * @param {string} type - Entry type
 * @param {string|null} itemPath - Path to item file
 * @param {Object} sourceMetadata - Source metadata
 * @returns {string} Constructed URL
 */
function constructSkillFileUrl(plugin, type, itemPath, sourceMetadata) {
  if (type === 'mcp') {
    // For MCP, use repository URL or npm package URL
    if (plugin.repository?.url) {
      return plugin.repository.url.includes('github.com')
        ? `https://raw.githubusercontent.com/${plugin.repository.url.split('github.com/')[1]}/main/README.md`
        : plugin.repository.url;
    }
    if (plugin.npm_package) {
      return `https://www.npmjs.com/package/${plugin.npm_package}`;
    }
    return plugin.homepage || '#';
  }

  if (sourceMetadata.isRemote) {
    // Remote source - construct external URL
    const baseUrl = plugin.source;
    if (type === 'agent') {
      return itemPath; // Agent path is already complete
    } else {
      return `${baseUrl}/${itemPath}/SKILL.md`;
    }
  } else {
    // Local source - construct local URL path
    if (type === 'agent') {
      // Agent path points directly to .md file
      return `/slim/marketplace/${itemPath}`;
    } else {
      // Skill path needs SKILL.md appended, remove leading "./"
      const cleanPath = itemPath.startsWith('./') ? itemPath.substring(2) : itemPath;
      return `/slim/marketplace/${cleanPath}/SKILL.md`;
    }
  }
}

/**
 * Merge generated registry with existing registry
 * Only updates marketplace-sourced fields, preserves user-managed fields
 * @param {Object} generated - Generated registry from marketplace
 * @param {Object} existing - Existing registry
 * @returns {Object} Merged registry
 */
function mergeWithExisting(generated, existing) {
  console.log(`\n🔄 Merging with existing registry...`);

  const merged = {
    skills: [],
    agents: [],
    mcp: []
  };

  // Preserve local_marketplace_path if it exists
  if (existing.local_marketplace_path) {
    merged.local_marketplace_path = existing.local_marketplace_path;
  }

  // Fields that are marketplace-managed (always update)
  const marketplaceManagedFields = [
    'name', 'description', 'tags', 'type', 'skill_file_url',
    'version', 'author', 'homepage', 'repository', 'license',
    'external_only', 'npm_package'
  ];

  // Fields that are user-managed (never update, preserve existing)
  const userManagedFields = [
    'displayName', 'example', 'category', 'dependencies', 'lastUpdated'
  ];

  let addedCount = 0;
  let updatedCount = 0;
  let unchangedCount = 0;

  for (const category of ['skills', 'agents', 'mcp']) {
    const existingMap = new Map();

    // Build map of existing entries by name
    if (existing[category] && Array.isArray(existing[category])) {
      for (const item of existing[category]) {
        existingMap.set(item.name, item);
      }
    }

    // Process generated entries
    for (const generatedItem of generated[category]) {
      const existingItem = existingMap.get(generatedItem.name);

      if (existingItem) {
        // Merge: update marketplace fields, preserve user fields
        const mergedItem = { ...existingItem };
        let hasChanges = false;

        for (const field of marketplaceManagedFields) {
          if (generatedItem[field] !== undefined) {
            // Special handling for tags: preserve existing tags if marketplace has no keywords
            if (field === 'tags') {
              if (Array.isArray(generatedItem[field]) && generatedItem[field].length > 0) {
                // Marketplace has keywords, use them
                if (JSON.stringify(mergedItem[field]) !== JSON.stringify(generatedItem[field])) {
                  mergedItem[field] = generatedItem[field];
                  hasChanges = true;
                }
              }
              // If marketplace has empty tags but registry has existing tags, preserve them
              else if (Array.isArray(existingItem[field]) && existingItem[field].length > 0) {
                // Keep existing tags, no change needed
                console.log(`   Preserved existing tags for ${generatedItem.name}: [${existingItem[field].join(', ')}]`);
              } else {
                // Both are empty, set empty array
                if (!Array.isArray(mergedItem[field])) {
                  mergedItem[field] = [];
                  hasChanges = true;
                }
              }
            } else {
              // Standard field update for non-tags fields
              if (mergedItem[field] !== generatedItem[field]) {
                mergedItem[field] = generatedItem[field];
                hasChanges = true;
              }
            }
          }
        }

        // Ensure user-managed fields exist with defaults if missing
        for (const field of userManagedFields) {
          if (mergedItem[field] === undefined) {
            switch (field) {
              case 'displayName':
                mergedItem[field] = '';
                break;
              case 'example':
                mergedItem[field] = '';
                break;
              case 'category':
                mergedItem[field] = '';
                break;
              case 'lastUpdated':
                mergedItem[field] = '';
                break;
              case 'dependencies':
                // Don't set a default, leave undefined
                break;
            }
          }
        }

        merged[category].push(mergedItem);
        existingMap.delete(generatedItem.name); // Mark as processed

        if (hasChanges) {
          updatedCount++;
          console.log(`✓ Updated ${category.slice(0, -1)}: ${generatedItem.name}`);
        } else {
          unchangedCount++;
        }
      } else {
        // New entry: add with marketplace fields + empty user fields
        const newItem = { ...generatedItem };

        for (const field of userManagedFields) {
          switch (field) {
            case 'displayName':
              newItem[field] = '';
              break;
            case 'example':
              newItem[field] = '';
              break;
            case 'category':
              newItem[field] = '';
              break;
            case 'lastUpdated':
              newItem[field] = '';
              break;
            case 'dependencies':
              // Don't set a default, leave undefined
              break;
          }
        }

        merged[category].push(newItem);
        addedCount++;
        console.log(`➕ Added new ${category.slice(0, -1)}: ${generatedItem.name}`);
      }
    }

    // Add remaining existing entries (not in generated)
    for (const [name, existingItem] of existingMap) {
      merged[category].push(existingItem);
      console.log(`📋 Preserved existing ${category.slice(0, -1)}: ${name}`);
    }
  }

  console.log(`\n📊 Merge Summary:`);
  console.log(`   ➕ Added: ${addedCount}`);
  console.log(`   ✓ Updated: ${updatedCount}`);
  console.log(`   📋 Unchanged: ${unchangedCount}`);

  return merged;
}

/**
 * Validate registry and report missing required fields
 * @param {Object} registry - Registry to validate
 * @returns {Object} Validation report
 */
function validateRegistry(registry) {
  console.log(`\n🔍 Validating registry...`);

  const requiredFields = {
    marketplace: ['name', 'description', 'tags', 'type', 'skill_file_url'],
    user: ['displayName', 'category', 'example', 'lastUpdated']
  };

  const warnings = [];
  let totalEntries = 0;
  let entriesWithMissingFields = 0;

  for (const category of ['skills', 'agents', 'mcp']) {
    if (!registry[category] || !Array.isArray(registry[category])) continue;

    for (const entry of registry[category]) {
      totalEntries++;
      const missingFields = [];

      // Check marketplace fields (errors)
      for (const field of requiredFields.marketplace) {
        if (field === 'tags') {
          // For tags, check if it exists and is an array (empty array is valid)
          if (!entry[field] || !Array.isArray(entry[field])) {
            missingFields.push(`${field} (marketplace-managed)`);
          }
        } else if (Array.isArray(entry[field])) {
          // Other array fields must not be empty
          if (entry[field].length === 0) {
            missingFields.push(`${field} (marketplace-managed)`);
          }
        } else {
          // Non-array fields must exist and not be empty
          if (!entry[field] || entry[field] === '') {
            missingFields.push(`${field} (marketplace-managed)`);
          }
        }
      }

      // Check user fields (warnings)
      for (const field of requiredFields.user) {
        if (!entry[field] || entry[field] === '') {
          missingFields.push(`${field} (user-managed)`);
        }
      }

      if (missingFields.length > 0) {
        entriesWithMissingFields++;
        warnings.push({
          name: entry.name,
          type: entry.type,
          missingFields
        });
      }
    }
  }

  const report = {
    totalEntries,
    entriesWithMissingFields,
    warnings,
    isValid: warnings.filter(w => w.missingFields.some(f => f.includes('marketplace-managed'))).length === 0
  };

  // Print validation results
  if (report.warnings.length === 0) {
    console.log(`✅ All ${totalEntries} entries are valid!`);
  } else {
    console.log(`⚠️  Validation Warnings:\n`);

    for (const warning of report.warnings) {
      const userMissing = warning.missingFields.filter(f => f.includes('user-managed'));
      const marketplaceMissing = warning.missingFields.filter(f => f.includes('marketplace-managed'));

      if (marketplaceMissing.length > 0) {
        console.log(`❌ CRITICAL - Missing marketplace fields for ${warning.type} '${warning.name}':`);
        for (const field of marketplaceMissing) {
          console.log(`     - ${field}`);
        }
      }

      if (userMissing.length > 0) {
        console.log(`⚠️  Missing user fields for ${warning.type} '${warning.name}':`);
        for (const field of userMissing) {
          const fieldName = field.split(' ')[0];
          let suggestion = '';
          switch (fieldName) {
            case 'displayName':
              suggestion = ' - Please add a human-readable display name';
              break;
            case 'category':
              suggestion = ' - Please add a category (documentation, governance, testing, etc.)';
              break;
            case 'example':
              suggestion = ' - Please add an example usage string';
              break;
            case 'lastUpdated':
              suggestion = ' - Please add last updated date (YYYY-MM-DD)';
              break;
          }
          console.log(`     - ${fieldName}${suggestion}`);
        }
      }
      console.log('');
    }

    console.log(`Build completed with ${entriesWithMissingFields} entries needing manual updates.`);
  }

  return report;
}

/**
 * Main generator function
 */
async function generateRegistry() {
  console.log('🚀 Generating registry.json from marketplace sources...\n');

  try {
    // 1. Load configuration
    if (!fs.existsSync(configPath)) {
      throw new Error(`Configuration file not found: ${configPath}`);
    }

    const config = require(configPath);
    if (!config.customFields?.slimConfig?.registrySources) {
      throw new Error('No customFields.slimConfig.registrySources found in docusaurus.config.js');
    }

    // 2. Load existing registry (required)
    if (!fs.existsSync(registryPath)) {
      throw new Error(`Existing registry.json not found at ${registryPath}`);
    }

    const existingRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    console.log(`📖 Loaded existing registry with ${(existingRegistry.skills?.length || 0) + (existingRegistry.agents?.length || 0) + (existingRegistry.mcp?.length || 0)} entries\n`);

    // 3. Load marketplace sources
    const sources = await loadRegistrySources(config.customFields);
    if (sources.length === 0) {
      throw new Error('No marketplace sources loaded successfully');
    }

    // 4. Transform all sources and merge
    let combinedGenerated = { skills: [], agents: [], mcp: [] };

    for (const source of sources) {
      console.log(`\n🔄 Processing source: ${source.metadata.path}`);
      const generated = transformMarketplaceToRegistry(source.marketplace, source.metadata);

      // Combine all generated entries
      combinedGenerated.skills.push(...generated.skills);
      combinedGenerated.agents.push(...generated.agents);
      combinedGenerated.mcp.push(...generated.mcp);
    }

    console.log(`\n📋 Generated ${combinedGenerated.skills.length} skills, ${combinedGenerated.agents.length} agents, ${combinedGenerated.mcp.length} MCP servers`);

    // 5. Merge with existing registry
    const mergedRegistry = mergeWithExisting(combinedGenerated, existingRegistry);

    // 6. Validate merged registry
    const validationReport = validateRegistry(mergedRegistry);

    // 7. Write updated registry
    fs.writeFileSync(registryPath, JSON.stringify(mergedRegistry, null, 2));

    console.log(`\n✅ Successfully updated registry.json at: ${registryPath}`);
    console.log(`📊 Total entries: ${(mergedRegistry.skills?.length || 0) + (mergedRegistry.agents?.length || 0) + (mergedRegistry.mcp?.length || 0)}`);

    if (!validationReport.isValid) {
      console.log(`\n❌ Registry has critical validation errors - please fix marketplace-managed fields`);
      process.exit(1);
    }

    if (validationReport.warnings.length > 0) {
      console.log(`\n⚠️  Registry generated successfully but has missing user-managed fields`);
      console.log(`💡 Please update the missing fields listed above in registry.json`);
    }

  } catch (error) {
    console.error(`\n❌ Error generating registry:`, error.message);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateRegistry();
}

module.exports = {
  generateRegistry,
  loadRegistrySources,
  transformMarketplaceToRegistry,
  mergeWithExisting,
  validateRegistry
};