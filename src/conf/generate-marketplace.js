/**
 * Generate .claude-plugin/marketplace.json from static/data/registry.json
 *
 * `registry.json` is the single, hand-authored SOURCE OF TRUTH, and the
 * Claude Code plugin marketplace manifest is GENERATED from it.
 *
 * The script also "hydrates" registry.json — it fills in the derived fields
 * (`type`, `skill_file_url`, `zip_file_path`) so authors never have to write
 * them by hand. Hydration is deterministic and idempotent.
 *
 * Run via `npm run prebuild` (or directly: `node src/conf/generate-marketplace.js`).
 */

const fs = require("fs");
const path = require("path");

// Paths
const configPath = path.join(__dirname, "../../docusaurus.config.js");
const registryPath = path.join(__dirname, "../../static/data/registry.json");
const marketplacePath = path.join(
  __dirname,
  "../../.claude-plugin/marketplace.json",
);

// Registry-only fields that must never be copied into marketplace.json.
const REGISTRY_ONLY_FIELDS = [
  "type",
  "displayName",
  "category",
  "example",
  "lastUpdated",
  "dependencies",
  "skill_file_url",
  "zip_file_path",
];

// Optional metadata fields copied through to the marketplace plugin as-is.
const PASSTHROUGH_FIELDS = [
  "version",
  "author",
  "homepage",
  "repository",
  "license",
];

/**
 * Read the docusaurus baseUrl (used only to build skill_file_url paths).
 *
 * The config file is read as text and scanned with a regex rather than
 * `require()`-d, so this generator runs even before `npm install`.
 *
 * @returns {string} baseUrl, guaranteed to end with a single "/"
 */
function getBaseUrl() {
  let baseUrl = "/";
  try {
    const text = fs.readFileSync(configPath, "utf8");
    const match = text.match(/baseUrl:\s*["'`]([^"'`]+)["'`]/);
    if (match) baseUrl = match[1];
  } catch (err) {
    console.warn(`⚠️  Could not read baseUrl from config: ${err.message}`);
  }
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

/**
 * Determine whether an MCP entry is hosted externally.
 * @param {Object} entry - Registry entry
 * @returns {boolean}
 */
function isExternal(entry) {
  return Boolean(
    entry.external_only ||
      entry.npm_package ||
      (entry.source && typeof entry.source === "object"),
  );
}

/**
 * Build the website-facing `skill_file_url` for a local entry.
 * @param {string} type - "skill" | "agent" | "mcp"
 * @param {string} name - Entry name
 * @param {string} baseUrl - Docusaurus baseUrl (ends with "/")
 * @returns {string}
 */
function deriveFileUrl(type, name, baseUrl) {
  if (type === "agent") {
    return `${baseUrl}marketplace/agents/${name}/AGENT.md`;
  }
  if (type === "mcp") {
    return `${baseUrl}marketplace/mcp-servers/${name}/MCP.md`;
  }
  return `${baseUrl}marketplace/skills/${name}/SKILL.md`;
}

/**
 * Hydrate registry entries in place: set `type`, and derive `skill_file_url`
 * and `zip_file_path` for every local (non-external) entry.
 * @param {Object} registry - Parsed registry object
 * @param {string} baseUrl - Docusaurus baseUrl
 */
function hydrateRegistry(registry, baseUrl) {
  const groups = [
    ["skills", "skill"],
    ["agents", "agent"],
    ["mcp", "mcp"],
  ];

  for (const [key, type] of groups) {
    if (!Array.isArray(registry[key])) continue;
    for (const entry of registry[key]) {
      entry.type = type;
      if (type === "mcp" && isExternal(entry)) {
        // External MCP: skill_file_url is hand-authored; no local zip.
        delete entry.zip_file_path;
      } else {
        entry.skill_file_url = deriveFileUrl(type, entry.name, baseUrl);
        entry.zip_file_path = `assets/zip/${entry.name}.zip`;
      }
    }
  }
}

/**
 * Transform a single registry entry into a marketplace plugin object.
 * @param {Object} entry - Hydrated registry entry
 * @param {string} marketplaceSource - The marketplace.source string
 * @returns {Object} Marketplace plugin
 */
function toPlugin(entry, marketplaceSource) {
  const plugin = {
    name: entry.name,
    description: entry.description || "",
  };

  if (entry.type === "skill") {
    plugin.source = marketplaceSource;
    plugin.strict = false;
    plugin.skills = [`./skills/${entry.name}`];
  } else if (entry.type === "agent") {
    plugin.source = marketplaceSource;
    plugin.strict = false;
    plugin.agents = `./agents/${entry.name}`;
  } else if (entry.type === "mcp") {
    if (isExternal(entry)) {
      // External MCP server — carry through its source/package descriptors.
      if (entry.source) plugin.source = entry.source;
      if (entry.npm_package) plugin.npm_package = entry.npm_package;
      if (entry.external_only) plugin.external_only = true;
    } else {
      plugin.source = marketplaceSource;
      plugin.strict = false;
    }
  }

  plugin.keywords = Array.isArray(entry.tags) ? entry.tags : [];

  for (const field of PASSTHROUGH_FIELDS) {
    if (entry[field] !== undefined) plugin[field] = entry[field];
  }

  // Defensive: never leak registry-only fields.
  for (const field of REGISTRY_ONLY_FIELDS) {
    delete plugin[field];
  }

  return plugin;
}

/**
 * Warn about incomplete website metadata; hard-fail on missing required fields.
 * @param {Object} registry - Hydrated registry
 * @returns {boolean} true if valid (no hard errors)
 */
function validateRegistry(registry) {
  const userFields = ["displayName", "category", "example", "lastUpdated"];
  let hardErrors = 0;
  let warnings = 0;

  for (const key of ["skills", "agents", "mcp"]) {
    if (!Array.isArray(registry[key])) continue;
    for (const entry of registry[key]) {
      if (!entry.name || !entry.description) {
        console.error(
          `❌ CRITICAL: ${key} entry missing required field 'name' or 'description': ${JSON.stringify(entry.name || entry)}`,
        );
        hardErrors++;
        continue;
      }
      const missing = userFields.filter((f) => !entry[f]);
      if (missing.length > 0) {
        console.warn(
          `⚠️  '${entry.name}' is missing recommended fields: ${missing.join(", ")}`,
        );
        warnings++;
      }
    }
  }

  if (warnings > 0) {
    console.log(
      `\n💡 ${warnings} entr${warnings === 1 ? "y" : "ies"} have incomplete website metadata (see warnings above).`,
    );
  }
  return hardErrors === 0;
}

/**
 * Main generator.
 */
function generateMarketplace() {
  console.log("🚀 Generating marketplace.json from registry.json...\n");

  // 1. Load registry (required).
  if (!fs.existsSync(registryPath)) {
    console.error(`❌ registry.json not found at ${registryPath}`);
    process.exit(1);
  }
  let registry;
  try {
    registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  } catch (err) {
    console.error(`❌ Invalid JSON in registry.json: ${err.message}`);
    process.exit(1);
  }

  // 2. Require the top-level `marketplace` identity block.
  const mp = registry.marketplace;
  if (!mp || !mp.name || !mp.owner || !mp.metadata) {
    console.error(
      "❌ registry.json must contain a top-level `marketplace` block with " +
        "`name`, `owner`, and `metadata`.",
    );
    process.exit(1);
  }
  const marketplaceSource = mp.source || "./static/marketplace";

  // 3. Hydrate derived fields and write the registry back.
  const baseUrl = getBaseUrl();
  hydrateRegistry(registry, baseUrl);
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
  console.log(`✓ Hydrated registry.json (derived type / urls / zip paths)`);

  // 4. Validate.
  const isValid = validateRegistry(registry);

  // 5. Build the marketplace manifest.
  const plugins = [];
  for (const key of ["skills", "agents", "mcp"]) {
    if (!Array.isArray(registry[key])) continue;
    for (const entry of registry[key]) {
      plugins.push(toPlugin(entry, marketplaceSource));
    }
  }

  const marketplace = {
    name: mp.name,
    owner: mp.owner,
    metadata: mp.metadata,
    plugins,
  };

  // 6. Write .claude-plugin/marketplace.json.
  fs.mkdirSync(path.dirname(marketplacePath), { recursive: true });
  fs.writeFileSync(
    marketplacePath,
    JSON.stringify(marketplace, null, 2) + "\n",
  );
  console.log(
    `✓ Wrote .claude-plugin/marketplace.json (${plugins.length} plugin${plugins.length === 1 ? "" : "s"})`,
  );

  if (!isValid) {
    console.error("\n❌ Registry has critical errors — see above.");
    process.exit(1);
  }
  console.log("\n✅ Done.");
}

// Run.
if (require.main === module) {
  generateMarketplace();
}

module.exports = {
  generateMarketplace,
  hydrateRegistry,
  toPlugin,
  validateRegistry,
};
