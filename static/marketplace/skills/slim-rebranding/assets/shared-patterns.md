# Shared Code Patterns & Configurations

## Branding Configuration Operations

### Generate brandingConfig Object
```javascript
const generateBrandingConfig = (userInput) => ({
  logoPath: userInput.logoPath || "/img/logo.svg",
  hero: {
    showCornerFeatures: userInput.showCornerFeatures !== false,
    cornerFeatures: userInput.cornerFeatures || getDefaultCornerFeatures(),
    customTagline: userInput.heroTagline || null
  },
  marketplace: {
    showEmptyState: userInput.showEmptyState !== false
    // Note: External registries managed via slimConfig.registries
    // Note: Local marketplace clearing handled during skill execution, not stored in config
  }
});
```

### Update Docusaurus Configuration
```javascript
import { applyBrandingToConfig, updateExternalRegistries } from '../src/utils/brandingUtils.js';

const updateConfig = (configPath, brandingInput) => {
  let existingConfig = require(configPath);

  // First update branding configuration
  existingConfig = applyBrandingToConfig(existingConfig, brandingInput);

  // Separately update external registries if needed (avoids duplication with slimConfig)
  if (brandingInput.externalRegistries && brandingInput.externalRegistries.length > 0) {
    existingConfig = updateExternalRegistries(existingConfig, brandingInput.externalRegistries);
  }

  // Write back to config file
  const configContent = `module.exports = ${JSON.stringify(existingConfig, null, 2)};`;
  fs.writeFileSync(configPath, configContent);
};
```

## Registry Operations

### External Registry Fetch
```javascript
const fetchExternalRegistry = async (githubUrl) => {
  const [org, repo] = githubUrl.replace('https://github.com/', '').split('/');
  const registryUrl = `https://raw.githubusercontent.com/${org}/${repo}/main/static/data/registry.json`;
  const response = await fetch(registryUrl);
  return response.ok ? await response.json() : null;
};
```

### Entry Transformation
```javascript
const transformEntry = (entry, newProjectName, sourceUrl) => ({
  ...entry,
  name: entry.name.replace('slim-', `${newProjectName.toLowerCase()}-`),
  external_only: true,
  repository: { url: sourceUrl, type: 'git' },
  skill_file_url: entry.skill_file_url // Keep original URL
});
```

### Registry Write
```javascript
const writeRegistry = (registryPath, data) => {
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(registryPath, content, 'utf8');
};
```

## File Path Mappings

### Standard SLIM Paths
```javascript
const SLIM_PATHS = {
  config: 'docusaurus.config.js',
  registry: 'static/data/registry.json',
  hero: 'src/components/HubHero.js',
  css: 'src/css/custom.css',
  packageJson: 'package.json',
  logo: 'static/img/logo.svg',
  favicon: 'static/img/favicon.ico',

  // Marketplace structure
  marketplace: {
    skills: 'static/marketplace/skills/',
    agents: 'static/marketplace/agents/',
    mcp: 'static/marketplace/mcp-servers/'
  },

  // Documentation pages
  docs: {
    contribute: 'docs/contribute/submit-best-practice.md',
    faq: 'docs/faq/README.md',
    about: 'docs/about/README.md'
  }
};
```

## Text Replacement Patterns

### Safe String Replacement
```javascript
const safeReplace = (content, oldName, newName, options = {}) => {
  const { caseSensitive = false, wholeWord = true } = options;

  const flags = caseSensitive ? 'g' : 'gi';
  const pattern = wholeWord ? `\\b${oldName}\\b` : oldName;
  const regex = new RegExp(pattern, flags);

  return content.replace(regex, newName);
};
```

### Project Name Variations
```javascript
const generateNameVariations = (oldName, newName) => ({
  // Original cases
  [oldName]: newName,
  [oldName.toUpperCase()]: newName.toUpperCase(),
  [oldName.toLowerCase()]: newName.toLowerCase(),

  // Kebab case
  [oldName.toLowerCase().replace(/\s+/g, '-')]: newName.toLowerCase().replace(/\s+/g, '-'),

  // Snake case
  [oldName.toLowerCase().replace(/\s+/g, '_')]: newName.toLowerCase().replace(/\s+/g, '_'),

  // Camel case
  [oldName.replace(/\s(.)/g, (match, p1) => p1.toUpperCase())]:
    newName.replace(/\s(.)/g, (match, p1) => p1.toUpperCase())
});
```

## Validation Commands

### JSON Validation
```bash
python -c "import json; json.load(open('FILE_PATH'))" 2>/dev/null
```

### Build Commands
```bash
npm run build          # Standard Docusaurus build
npm run start          # Development server
npm run serve          # Serve built site
```

### Git Operations
```bash
git status --porcelain                    # Check clean state
git checkout -b BRANCH_NAME               # Create branch
git add FILE_PATH                         # Stage file
git commit -m "MESSAGE"                   # Commit changes
git diff main...BRANCH_NAME              # Show changes
```

## Standard Configurations

### Docusaurus Config Updates
```javascript
const updateConfig = (config, updates) => ({
  ...config,
  title: updates.projectName,
  tagline: updates.tagline,
  url: updates.url,
  baseUrl: updates.baseUrl,
  organizationName: updates.orgName,
  projectName: updates.repoName,
  // PRESERVE: footer.copyright (SLIM attribution)
});
```

### Package.json Updates
```javascript
const updatePackage = (pkg, updates) => ({
  ...pkg,
  name: `${updates.projectName.toLowerCase()}-website`,
  description: `${updates.projectName} documentation website and best practices hub`,
  homepage: updates.url
});
```

## Phosphor Icons

### Icon Selection Logic
```javascript
const selectIcon = (keywords) => {
  const iconMap = {
    doc: 'file-doc', docs: 'file-doc', documentation: 'file-doc',
    auto: 'robot', automation: 'robot', ai: 'robot',
    test: 'test-tube', testing: 'test-tube',
    build: 'hammer', builder: 'hammer',
    data: 'database', db: 'database',
    api: 'plugs-connected', connect: 'plugs-connected',
    web: 'globe', website: 'globe',
    tool: 'wrench', tools: 'wrench'
  };

  for (const keyword of keywords) {
    if (iconMap[keyword.toLowerCase()]) {
      return iconMap[keyword.toLowerCase()];
    }
  }

  return 'file-doc'; // Default fallback
};
```

### Icon Fetch URL
```
https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/{ICON_NAME}.svg
```

## Empty State Components

### SkillBrowser Empty State
```jsx
const EmptyMarketplace = ({ projectName }) => (
  <Container className="mt-5">
    <Card className="text-center p-5 shadow-sm">
      <Card.Body>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
        <h3>No best practices available yet</h3>
        <p className="text-muted mb-4">
          Get started by importing from other SLIM instances or creating your own!
        </p>
        <Button variant="primary" href="/docs/contribute/submit-best-practice">
          Learn How to Contribute
        </Button>
      </Card.Body>
    </Card>
  </Container>
);
```

## Error Patterns

### Common Error Types
```javascript
const ERROR_TYPES = {
  BUILD_FAILED: 'build_failed',
  JSON_INVALID: 'json_invalid',
  FILE_NOT_FOUND: 'file_not_found',
  GIT_DIRTY: 'git_dirty',
  NETWORK_ERROR: 'network_error',
  VALIDATION_FAILED: 'validation_failed'
};
```

### Auto-Fix Patterns
```javascript
const autoFixes = {
  // Remove orphaned imports
  orphanedImport: (content) =>
    content.replace(/import.*from\s+['"]\.[^'"]*['"]\s*;\s*\n/g, ''),

  // Fix trailing commas in JSON
  trailingComma: (content) =>
    content.replace(/,(\s*[}\]])/g, '$1'),

  // Fix JSX syntax
  unclosedTag: (content) =>
    content.replace(/<(\w+)([^>]*)(?<!\/)>/g, '<$1$2/>'),
};
```