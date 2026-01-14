# Detailed Workflow Steps & Validation Rules

## Step 1: Context Detection & Validation

### Git Repository Validation
```bash
# Check if git repository exists
git rev-parse --git-dir >/dev/null 2>&1 || ERROR="Not a git repository"

# Check working directory status
DIRTY_FILES=$(git status --porcelain)
[ -z "$DIRTY_FILES" ] || WARNING="Working directory has uncommitted changes"

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
```

### Docusaurus Detection
```bash
# Verify Docusaurus config exists
[ -f "docusaurus.config.js" ] || ERROR="Not a Docusaurus website"

# Test config syntax
node -e "require('./docusaurus.config.js')" || ERROR="Invalid Docusaurus config"

# Check for SLIM-specific structure
[ -f "src/components/HubHero.js" ] || WARNING="HubHero component not found"
[ -f "static/data/registry.json" ] || WARNING="Registry file not found"
```

### Metadata Extraction
```javascript
// Extract from docusaurus.config.js
const config = require('./docusaurus.config.js');
const metadata = {
  title: config.title,
  tagline: config.tagline,
  url: config.url,
  baseUrl: config.baseUrl,
  organizationName: config.organizationName,
  projectName: config.projectName
};

// Extract from package.json
const pkg = require('./package.json');
metadata.packageName = pkg.name;
metadata.packageDescription = pkg.description;

// Extract registry statistics
const registry = require('./static/data/registry.json');
metadata.registryStats = {
  skills: registry.skills?.length || 0,
  agents: registry.agents?.length || 0,
  mcp: registry.mcp?.length || 0
};
```

### Structure Verification
```bash
# Check marketplace structure
[ -d "static/marketplace/skills" ] && HAS_SKILLS=true
[ -d "static/marketplace/agents" ] && HAS_AGENTS=true
[ -d "static/marketplace/mcp-servers" ] && HAS_MCP=true

# Check documentation structure
[ -d "docs/contribute" ] && HAS_DOCS=true
[ -f "docs/contribute/submit-best-practice.md" ] && HAS_CONTRIBUTE=true
```

**Expected Output**:
```
✓ Git repository detected (branch: main)
✓ Docusaurus website confirmed
✓ Current title: "SLIM"
✓ Current tagline: "Software Lifecycle Improvement & Modernization"
✓ Registry: 17 skills, 2 agents, 1 MCP server
⚠ Working directory has 3 uncommitted files
```

## Step 2: User Input Collection & Validation

### Input Schema Validation
```javascript
const validateInput = (input) => {
  const errors = [];

  // Required fields
  if (!input.projectName || input.projectName.trim().length < 2) {
    errors.push("Project name must be at least 2 characters");
  }

  // Validate project name format
  if (!/^[A-Za-z][A-Za-z0-9\s-_]*$/.test(input.projectName)) {
    errors.push("Project name must start with letter, contain only letters, numbers, spaces, hyphens, underscores");
  }

  // Validate GitHub URLs
  if (input.imports.enabled && input.imports.sources) {
    input.imports.sources.forEach(url => {
      if (!url.match(/^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/)) {
        errors.push(`Invalid GitHub URL: ${url}`);
      }
    });
  }

  return errors;
};
```

### Input Collection Process
```
1. Project Name: [Required] New project name
   Example: "DataFlow", "TeamHub", "DevOps Toolkit"

2. Tagline: [Optional] Project tagline (leave blank to keep current)
   Example: "Streamlining data workflows", "Team collaboration made easy"

3. Logo: [Optional] Upload file or auto-generate from keywords
   Options: "upload", "auto-generate", "keep-current"

4. Project Purpose: [Required] 2-3 sentences describing the project
   Example: "DataFlow helps teams automate data processing pipelines..."

5. Organization: [Required]
   - Name: "DataFlow Team"
   - GitHub: "https://github.com/dataflow-org"
   - Contact: "contact@dataflow.org"

6. Registry Imports: [Optional]
   - Enable: yes/no
   - Sources: ["https://github.com/NASA-AMMOS/slim"]
   - Keep existing: yes/no

7. Git Branch: [Optional] Custom branch name
   Default: "rebrand/website-slim-to-dataflow"
```

## Step 3: Plan Generation & Risk Assessment

### Plan Template Structure
```markdown
# Rebranding Plan: {OLD_NAME} → {NEW_NAME}

## Summary
- **Files to modify**: {FILE_COUNT}
- **Registry changes**: Import {IMPORT_COUNT} external entries
- **Local entries**: {KEEP_LOCAL ? "Preserve" : "Clear"} existing entries
- **Git branch**: {BRANCH_NAME}

## Changes by Category

### 1. Hero Section (Risk: Medium)
| File | Action | Lines |
|------|--------|-------|
| src/components/HubHero.js | Remove corner features, update branding | ~50 |
| src/css/custom.css | Remove corner CSS | ~175 |
| static/img/logo.svg | {LOGO_ACTION} | N/A |

### 2. Registry & Marketplace (Risk: High)
| Action | Count | Risk Level |
|--------|-------|-----------|
| Import external entries | {IMPORT_COUNT} | Low |
| Clear local marketplace | {LOCAL_COUNT} files | High |
| Transform naming | {RENAME_COUNT} entries | Low |

### 3. Configuration (Risk: High)
| File | Changes | Preservation |
|------|---------|--------------|
| docusaurus.config.js | title, tagline, URLs | Footer attribution (CRITICAL) |
| package.json | name, description | All other fields |

### 4. Documentation Pages (Risk: Low)
| Page | Action |
|------|--------|
| docs/contribute/ | Generate from template |
| docs/faq/ | Generate from template |
| docs/about/ | Generate from template |

## Preservation Guarantees
✓ SLIM project attribution in footer (never modified)
✓ External registry source URLs (maintained)
✓ File permissions and ownership
✓ Git history and branches

## Rollback Plan
```bash
git checkout main
git branch -D {BRANCH_NAME}
# All changes discarded, return to original state
```

## Approval Required
This plan will make significant changes to your codebase.
Review carefully before proceeding.

Options: [yes] [no] [modify]
```

### Risk Calculation
```javascript
const calculateRisk = (changes) => {
  let riskScore = 0;

  // File modification risks
  riskScore += changes.filesModified * 1;
  riskScore += changes.configFiles * 5;      // Config changes are risky
  riskScore += changes.clearMarketplace ? 10 : 0;  // Clearing data is risky
  riskScore += changes.externalImports * 0.5;     // Imports are safer

  // Determine risk level
  if (riskScore < 10) return "Low";
  if (riskScore < 25) return "Medium";
  return "High";
};
```

## Step 4: Git Branch Management

### Branch Naming Convention
```javascript
const generateBranchName = (oldName, newName, custom) => {
  if (custom) return custom;

  const oldSlug = oldName.toLowerCase().replace(/\s+/g, '-');
  const newSlug = newName.toLowerCase().replace(/\s+/g, '-');
  return `rebrand/website-${oldSlug}-to-${newSlug}`;
};
```

### Branch Creation Process
```bash
# Generate unique branch name if collision
BRANCH_NAME="rebrand/website-slim-to-dataflow"
COUNTER=1

while git show-ref --verify --quiet refs/heads/$BRANCH_NAME; do
  BRANCH_NAME="rebrand/website-slim-to-dataflow-$COUNTER"
  COUNTER=$((COUNTER + 1))
done

# Create and switch to branch
git checkout -b $BRANCH_NAME || ERROR="Failed to create branch"

# Confirm branch creation
CURRENT=$(git rev-parse --abbrev-ref HEAD)
[ "$CURRENT" = "$BRANCH_NAME" ] || ERROR="Failed to switch to new branch"
```

## Step 5: Execution Steps with Validation

### 5.1 Hero Section Modifications

**Pre-Execution Validation**:
```bash
# Verify files exist
[ -f "src/components/HubHero.js" ] || ERROR="HubHero.js not found"
[ -f "src/css/custom.css" ] || ERROR="custom.css not found"

# Create backup
cp src/components/HubHero.js src/components/HubHero.js.bak
cp src/css/custom.css src/css/custom.css.bak
```

**Execution Steps**:
1. Remove corner features array from HubHero.js
2. Remove corner features rendering from HubHero.js
3. Update logo path and tagline in HubHero.js
4. Remove corner CSS styles from custom.css
5. Generate/place logo file

**Post-Execution Validation**:
```bash
# Syntax check
node -c src/components/HubHero.js || ERROR="HubHero.js syntax error"

# Verify logo exists
[ -f "static/img/logo.svg" ] || WARNING="Logo file not created"

# Test React component compilation
npm run build:component HubHero 2>/dev/null || WARNING="Component may have issues"
```

**Commit**: "Rebrand: Update hero section (remove corners, update branding)"

### 5.2 Registry & Marketplace Updates

**External Registry Processing**:
```javascript
const processExternalRegistries = async (sources, projectName) => {
  const results = [];

  for (const source of sources) {
    try {
      const registry = await fetchExternalRegistry(source);
      if (registry) {
        const transformed = transformRegistry(registry, projectName, source);
        results.push(...transformed);
      }
    } catch (error) {
      console.warn(`Failed to fetch ${source}: ${error.message}`);
    }
  }

  return results;
};
```

**Marketplace Cleanup**:
```bash
# Clear marketplace directories
for dir in skills agents mcp-servers; do
  if [ -d "static/marketplace/$dir" ]; then
    rm -rf static/marketplace/$dir/*
    touch static/marketplace/$dir/.gitkeep
  fi
done
```

**Registry Write with Validation**:
```javascript
const writeRegistryWithValidation = (registryPath, data) => {
  // Validate schema
  const schema = {
    skills: Array.isArray(data.skills),
    agents: Array.isArray(data.agents),
    mcp: Array.isArray(data.mcp)
  };

  if (!Object.values(schema).every(Boolean)) {
    throw new Error("Invalid registry schema");
  }

  // Write with pretty formatting
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(registryPath, content, 'utf8');

  // Validate written file
  JSON.parse(fs.readFileSync(registryPath, 'utf8'));
};
```

**Commit**: "Rebrand: Update registry and marketplace (import external entries)"

### 5.3 Page Template Generation

**Template Processing**:
```javascript
const generatePage = (templateName, placeholders) => {
  const template = getTemplate(templateName);
  let content = template;

  // Replace placeholders
  Object.entries(placeholders).forEach(([key, value]) => {
    const pattern = new RegExp(`{${key}}`, 'g');
    content = content.replace(pattern, value);
  });

  return content;
};
```

**Validation**:
```bash
# Check markdown syntax
for file in docs/contribute/submit-best-practice.md docs/faq/README.md docs/about/README.md; do
  [ -f "$file" ] || ERROR="Generated file missing: $file"

  # Verify frontmatter
  head -n 5 "$file" | grep -q "sidebar_position" || WARNING="Missing frontmatter in $file"

  # Check for unresolved placeholders
  grep -q "{[A-Z_]*}" "$file" && WARNING="Unresolved placeholders in $file"
done
```

**Commit**: "Rebrand: Generate page templates (contribute, FAQ, about)"

### 5.4 Configuration Updates with Attribution Preservation

**Critical Preservation Check**:
```javascript
const preserveSlimAttribution = (configPath) => {
  const content = fs.readFileSync(configPath, 'utf8');

  // Verify SLIM attribution exists
  const hasAttribution = content.includes('Based on the Software Lifecycle Improvement & Modernization (SLIM) project');

  if (!hasAttribution) {
    throw new Error("SLIM attribution not found in footer - will not proceed");
  }

  return content;
};
```

**Safe Config Update**:
```javascript
const updateConfigSafely = (configPath, updates) => {
  const originalContent = preserveSlimAttribution(configPath);

  // Parse and update
  const config = require(configPath);
  const updatedConfig = {
    ...config,
    title: updates.projectName,
    tagline: updates.tagline,
    url: updates.url,
    baseUrl: updates.baseUrl,
    organizationName: updates.orgName,
    projectName: updates.repoName
    // Never modify themeConfig.footer.copyright
  };

  // Write back as module.exports
  const newContent = `module.exports = ${JSON.stringify(updatedConfig, null, 2)};`;
  fs.writeFileSync(configPath, newContent);

  // Verify attribution is still present
  const verifyContent = fs.readFileSync(configPath, 'utf8');
  if (!verifyContent.includes('Based on the Software Lifecycle Improvement & Modernization (SLIM) project')) {
    throw new Error("SLIM attribution was accidentally removed - rolling back");
  }
};
```

**Commit**: "Rebrand: Update configuration files (preserve SLIM attribution)"

### 5.5 Empty Marketplace Handling

**Component Injection**:
```javascript
const addEmptyState = (skillBrowserPath, projectName) => {
  const content = fs.readFileSync(skillBrowserPath, 'utf8');

  // Find insertion point (after data loading)
  const insertionPattern = /(\s*)(if\s*\(\s*loading\s*\)|const\s+filteredItems)/;
  const match = content.match(insertionPattern);

  if (!match) {
    throw new Error("Cannot find insertion point in SkillBrowser.js");
  }

  // Insert empty state check
  const emptyStateCode = generateEmptyStateComponent(projectName);
  const updatedContent = content.replace(
    insertionPattern,
    `$1${emptyStateCode}\n\n$1$2`
  );

  fs.writeFileSync(skillBrowserPath, updatedContent);
};
```

**Commit**: "Rebrand: Handle empty marketplace in SkillBrowser"

### 5.6 Build Validation Loop

**Iterative Build Process**:
```bash
MAX_ATTEMPTS=5
ATTEMPT=1

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
  echo "Build attempt $ATTEMPT of $MAX_ATTEMPTS..."

  # Pre-build linting
  echo "Running pre-build validation..."
  python -c "import json; json.load(open('static/data/registry.json'))" || {
    echo "Registry JSON invalid"
    exit 1
  }

  # Attempt build
  if npm run build; then
    echo "✓ Build successful after $ATTEMPT attempt(s)"
    break
  else
    echo "✗ Build failed on attempt $ATTEMPT"

    if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
      echo "Maximum build attempts reached"
      exit 1
    fi

    # Attempt auto-fixes
    echo "Attempting auto-fixes..."

    # Fix common issues
    find src -name "*.js" -o -name "*.jsx" | xargs grep -l "import.*from.*\.\/" | while read file; do
      sed -i 's/import.*from.*["\x27]\.\/[^"x27]*["\x27];//g' "$file"
    done

    # Commit fixes
    git add .
    git commit -m "Rebrand: Fix build errors (attempt $ATTEMPT)"

    ATTEMPT=$((ATTEMPT + 1))
  fi
done
```

**Final Validation**:
```bash
# Verify build artifacts
[ -d "build" ] || ERROR="Build directory not created"
[ -f "build/index.html" ] || ERROR="Index page not generated"

# Check for critical files
[ -f "build/static/js/main.*.js" ] || WARNING="Main JS bundle missing"
[ -f "build/static/css/main.*.css" ] || WARNING="Main CSS bundle missing"
```

**Commit**: "Rebrand: Build validation complete"

## Step 6: Completion Report Generation

### Report Data Collection
```javascript
const generateCompletionReport = (startTime, changes) => {
  const duration = Date.now() - startTime;
  const commits = getCommitsSinceStart();
  const buildStatus = getBuildStatus();

  return {
    status: buildStatus.success ? "success" : "partial",
    duration: formatDuration(duration),
    statistics: {
      filesModified: changes.filesModified,
      textReplacements: changes.textReplacements,
      commits: commits.length,
      buildAttempts: changes.buildAttempts
    },
    git: {
      branch: getCurrentBranch(),
      commits: commits.map(c => c.message),
      status: getGitStatus()
    },
    nextSteps: generateNextSteps()
  };
};
```

### Validation Rules Summary

**Critical Validations** (Fail if not met):
- Git repository exists and is accessible
- Docusaurus config is valid JavaScript
- SLIM attribution preserved in footer
- Build completes successfully (within 5 attempts)
- All generated files have valid syntax

**Warning Validations** (Warn but continue):
- Working directory has uncommitted changes
- Some external registries fail to fetch
- Optional files not found (favicon, specific docs)
- Build requires multiple attempts but eventually succeeds

**Success Criteria**:
- All critical validations pass
- Final build produces valid website
- Git branch contains all changes with clear commit history
- All essential functionality preserved from original