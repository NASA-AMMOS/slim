# Registry Import Guide

This guide provides detailed instructions for importing registry entries from external SLIM instances while leveraging the existing `external_only: true` support in the codebase.

## Purpose

Allow users to import best practices from other SLIM-based websites as **references only** - no files are downloaded. All imported entries point back to their original sources.

## Existing Infrastructure

The SLIM codebase **already supports external entries** through:

1. **Registry Structure** (`static/data/registry.json`):
   - `external_only: true` flag marks entries as external
   - `repository.url` field points to source repository
   - `skill_file_url` contains full external URL

2. **Build Script** (`src/conf/generate-claude-marketplace.js`):
   - Lines 40-56: Skills with `external_only` get special handling
   - Lines 86-103: Agents with `external_only` get special handling
   - Lines 129-147: MCPs with `external_only` get special handling
   - External entries show correct install instructions in UI

3. **UI Component** (`src/components/SkillBrowser.js`):
   - Line 136-139: Checks for `external_only` flag
   - Shows external install instructions
   - Renders external entries differently

**Our job**: Transform imported entries to match this existing format.

---

## Import Workflow Overview

```
User provides GitHub URLs
       ↓
Parse URLs (org/repo)
       ↓
Construct raw registry URLs
       ↓
Fetch external registry.json files
       ↓
Transform entries (rename, add external_only, add repository)
       ↓
Merge & deduplicate
       ↓
Validate
       ↓
Write to local registry.json
```

---

## Step 1: Parse GitHub URLs

**Input**: User-provided comma-separated GitHub URLs

**Examples**:
```
https://github.com/NASA-AMMOS/slim
https://github.com/NASA-AMMOS/slim, https://github.com/other-org/slim-fork
```

**Parsing Logic**:

```javascript
function parseGitHubUrl(url) {
  // Validate URL format
  if (!url.startsWith('https://github.com/')) {
    throw new Error(`Invalid GitHub URL: ${url}. Must start with https://github.com/`);
  }

  // Remove trailing slashes and .git
  url = url.replace(/\.git$/, '').replace(/\/$/, '');

  // Extract org and repo
  // Pattern: https://github.com/{org}/{repo}
  const match = url.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);

  if (!match) {
    throw new Error(`Could not parse GitHub URL: ${url}`);
  }

  return {
    org: match[1],
    repo: match[2],
    url: url
  };
}
```

**Examples**:
```javascript
parseGitHubUrl('https://github.com/NASA-AMMOS/slim')
// Returns: { org: 'NASA-AMMOS', repo: 'slim', url: 'https://github.com/NASA-AMMOS/slim' }

parseGitHubUrl('https://github.com/other-org/slim-fork.git/')
// Returns: { org: 'other-org', repo: 'slim-fork', url: 'https://github.com/other-org/slim-fork' }
```

**Error Handling**:
- Invalid URL format → Show error, ask user to correct
- Missing org or repo → Show error, ask user to correct

---

## Step 2: Construct Raw Registry URLs

**Purpose**: Build URL to fetch `registry.json` from GitHub raw content

**Pattern**:
```
https://raw.githubusercontent.com/{org}/{repo}/main/static/data/registry.json
```

**Implementation**:

```javascript
function constructRegistryUrl(githubUrl) {
  const { org, repo } = parseGitHubUrl(githubUrl);

  // Try main branch first (most common)
  const mainUrl = `https://raw.githubusercontent.com/${org}/${repo}/main/static/data/registry.json`;

  // Fallback to master branch if main doesn't exist
  const masterUrl = `https://raw.githubusercontent.com/${org}/${repo}/master/static/data/registry.json`;

  return {
    mainUrl,
    masterUrl,
    org,
    repo,
    githubUrl
  };
}
```

**Branch Detection**:
Try `main` first, fall back to `master` if 404:

```javascript
async function fetchWithBranchDetection(urls) {
  // Try main branch
  let response = await fetch(urls.mainUrl);

  if (response.status === 404) {
    console.log(`main branch not found, trying master...`);
    response = await fetch(urls.masterUrl);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch registry from ${urls.githubUrl}: ${response.status}`);
  }

  return response;
}
```

---

## Step 3: Fetch External Registry

**Purpose**: Download registry.json from external repository

**Implementation**:

```javascript
async function fetchExternalRegistry(githubUrl) {
  const urls = constructRegistryUrl(githubUrl);

  console.log(`Fetching registry from: ${urls.githubUrl}`);

  try {
    // Fetch with branch detection (main or master)
    const response = await fetchWithBranchDetection(urls);

    // Parse JSON
    const registry = await response.json();

    // Validate structure
    if (!registry.skills && !registry.agents && !registry.mcp) {
      throw new Error(`Invalid registry structure: missing skills, agents, and mcp arrays`);
    }

    console.log(`✓ Fetched registry from ${urls.org}/${urls.repo}`);
    console.log(`  - ${registry.skills?.length || 0} skills`);
    console.log(`  - ${registry.agents?.length || 0} agents`);
    console.log(`  - ${registry.mcp?.length || 0} MCP servers`);

    return {
      registry,
      source: {
        githubUrl: urls.githubUrl,
        org: urls.org,
        repo: urls.repo
      }
    };

  } catch (error) {
    console.error(`❌ Error fetching registry from ${urls.githubUrl}:`, error.message);

    // Ask user if they want to continue without this source
    return {
      error: error.message,
      source: {
        githubUrl: urls.githubUrl,
        org: urls.org,
        repo: urls.repo
      }
    };
  }
}
```

**Error Handling**:
- 404 Not Found → "Registry not found in this repository"
- Network error → "Network connection failed"
- Invalid JSON → "Registry file is not valid JSON"
- Invalid structure → "Registry file doesn't have expected structure"

For each error:
1. Log the error
2. Ask user: "Continue without this source? (yes/no)"
3. If yes → Skip this source, continue with others
4. If no → Abort import

---

## Step 4: Transform Entries (Key Step)

**Purpose**: Convert external entries to match existing `external_only: true` format

**This is the most important step** - we're formatting entries to work with the existing infrastructure.

### Example Transformation

**Original Entry** (from NASA-AMMOS/slim):
```json
{
  "name": "slim-readme",
  "displayName": "README Writer",
  "description": "Create a comprehensive README.md template",
  "category": "documentation",
  "tags": ["documentation", "project-setup", "templates"],
  "lastUpdated": "2024-08-02",
  "skill_file_url": "/slim/marketplace/skills/slim-readme/SKILL.md",
  "type": "skill",
  "example": "Create a comprehensive README for this project"
}
```

**Transformed Entry** (for AutoDocs project):
```json
{
  "name": "autodocs-readme",  // RENAMED: slim- → autodocs-
  "displayName": "README Writer",
  "description": "Create a comprehensive README.md template",
  "category": "documentation",
  "tags": ["documentation", "project-setup", "templates"],
  "lastUpdated": "2024-08-02",
  "skill_file_url": "https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/marketplace/skills/slim-readme/SKILL.md",  // FULL URL
  "external_only": true,  // NEW: marks as external
  "repository": {  // NEW: points to source
    "url": "https://github.com/NASA-AMMOS/slim",
    "type": "git"
  },
  "type": "skill",
  "example": "Create a comprehensive README for this project"
}
```

### Transformation Implementation

```javascript
function transformEntry(entry, source, newProjectName, entryType) {
  const { org, repo, githubUrl } = source;

  // 1. Rename: "slim-*" → "{newProjectName}-*"
  const oldPrefix = 'slim-';
  const newPrefix = `${newProjectName.toLowerCase()}-`;

  let transformedName = entry.name;
  if (entry.name.startsWith(oldPrefix)) {
    transformedName = entry.name.replace(oldPrefix, newPrefix);
  }

  // 2. Convert skill_file_url to full external URL
  let externalUrl = entry.skill_file_url;
  if (!externalUrl.startsWith('http')) {
    // Relative path → convert to full GitHub raw URL
    // Remove leading slash if present
    const path = externalUrl.startsWith('/') ? externalUrl.slice(1) : externalUrl;
    externalUrl = `https://raw.githubusercontent.com/${org}/${repo}/main/${path}`;
  }

  // 3. Build transformed entry
  return {
    ...entry,  // Keep all original fields
    name: transformedName,  // Renamed
    skill_file_url: externalUrl,  // Full external URL
    external_only: true,  // Mark as external
    repository: {  // Add repository info
      url: githubUrl,
      type: 'git'
    }
  };
}
```

### Transform All Entries

```javascript
function transformRegistry(externalData, newProjectName) {
  const { registry, source } = externalData;

  const transformed = {
    skills: [],
    agents: [],
    mcp: []
  };

  // Transform skills
  if (registry.skills && Array.isArray(registry.skills)) {
    for (const skill of registry.skills) {
      transformed.skills.push(transformEntry(skill, source, newProjectName, 'skill'));
    }
  }

  // Transform agents
  if (registry.agents && Array.isArray(registry.agents)) {
    for (const agent of registry.agents) {
      transformed.agents.push(transformEntry(agent, source, newProjectName, 'agent'));
    }
  }

  // Transform MCP servers
  if (registry.mcp && Array.isArray(registry.mcp)) {
    for (const mcp of registry.mcp) {
      transformed.mcp.push(transformEntry(mcp, source, newProjectName, 'mcp'));
    }
  }

  return transformed;
}
```

---

## Step 5: Merge & Deduplicate

**Purpose**: Combine entries from multiple sources and remove duplicates

### Merge Multiple Sources

```javascript
function mergeRegistries(transformedRegistries) {
  const merged = {
    skills: [],
    agents: [],
    mcp: []
  };

  // Merge all skills
  for (const registry of transformedRegistries) {
    merged.skills.push(...registry.skills);
    merged.agents.push(...registry.agents);
    merged.mcp.push(...registry.mcp);
  }

  return merged;
}
```

### Deduplicate by Name

```javascript
function deduplicateEntries(entries) {
  const seen = new Set();
  const unique = [];

  for (const entry of entries) {
    if (!seen.has(entry.name)) {
      seen.add(entry.name);
      unique.push(entry);
    } else {
      console.log(`⚠ Skipping duplicate entry: ${entry.name}`);
    }
  }

  return unique;
}

function deduplicateRegistry(registry) {
  return {
    skills: deduplicateEntries(registry.skills),
    agents: deduplicateEntries(registry.agents),
    mcp: deduplicateEntries(registry.mcp)
  };
}
```

### Sort Alphabetically

```javascript
function sortRegistry(registry) {
  return {
    skills: registry.skills.sort((a, b) => a.name.localeCompare(b.name)),
    agents: registry.agents.sort((a, b) => a.name.localeCompare(b.name)),
    mcp: registry.mcp.sort((a, b) => a.name.localeCompare(b.name))
  };
}
```

---

## Step 6: Validation

**Purpose**: Ensure all transformed entries have required fields and accessible URLs

### Validate Entry Structure

```javascript
function validateEntry(entry, entryType) {
  const errors = [];

  // Required fields
  if (!entry.name) errors.push(`Missing name`);
  if (!entry.displayName) errors.push(`Missing displayName`);
  if (!entry.description) errors.push(`Missing description`);
  if (!entry.category) errors.push(`Missing category`);
  if (!entry.skill_file_url) errors.push(`Missing skill_file_url`);
  if (!entry.type) errors.push(`Missing type`);

  // External-specific fields
  if (!entry.external_only) errors.push(`Missing external_only flag`);
  if (!entry.repository?.url) errors.push(`Missing repository.url`);

  // Type should match
  if (entry.type !== entryType) {
    errors.push(`Type mismatch: expected ${entryType}, got ${entry.type}`);
  }

  return errors;
}
```

### Validate Registry

```javascript
function validateRegistry(registry) {
  const allErrors = [];

  // Validate skills
  registry.skills.forEach((skill, index) => {
    const errors = validateEntry(skill, 'skill');
    if (errors.length > 0) {
      allErrors.push(`Skill ${index} (${skill.name || 'unnamed'}): ${errors.join(', ')}`);
    }
  });

  // Validate agents
  registry.agents.forEach((agent, index) => {
    const errors = validateEntry(agent, 'agent');
    if (errors.length > 0) {
      allErrors.push(`Agent ${index} (${agent.name || 'unnamed'}): ${errors.join(', ')}`);
    }
  });

  // Validate MCPs
  registry.mcp.forEach((mcp, index) => {
    const errors = validateEntry(mcp, 'mcp');
    if (errors.length > 0) {
      allErrors.push(`MCP ${index} (${mcp.name || 'unnamed'}): ${errors.join(', ')}`);
    }
  });

  return allErrors;
}
```

### Validate URL Accessibility (Optional)

```javascript
async function validateUrlAccessibility(entry) {
  try {
    // HTTP HEAD request to check if URL is accessible
    const response = await fetch(entry.skill_file_url, { method: 'HEAD' });

    if (response.ok) {
      console.log(`✓ ${entry.name}: URL accessible`);
      return true;
    } else {
      console.warn(`⚠ ${entry.name}: URL returned ${response.status}`);
      return false;
    }
  } catch (error) {
    console.warn(`⚠ ${entry.name}: URL not accessible - ${error.message}`);
    return false;
  }
}

async function validateAllUrls(registry) {
  const results = {
    accessible: 0,
    inaccessible: 0,
    errors: []
  };

  // Validate skills
  for (const skill of registry.skills) {
    const accessible = await validateUrlAccessibility(skill);
    if (accessible) {
      results.accessible++;
    } else {
      results.inaccessible++;
      results.errors.push(skill.name);
    }
  }

  // Same for agents and MCPs...

  return results;
}
```

**Note**: URL validation is optional and can be time-consuming. Skip if user wants faster import.

---

## Step 7: Write to Local Registry

**Purpose**: Save merged and validated registry to `static/data/registry.json`

### Write Registry File

```javascript
function writeRegistry(registry, registryPath) {
  const registryJson = JSON.stringify(registry, null, 2);

  // Write to file
  fs.writeFileSync(registryPath, registryJson, 'utf8');

  console.log(`✓ Written registry to: ${registryPath}`);
  console.log(`  - ${registry.skills.length} skills`);
  console.log(`  - ${registry.agents.length} agents`);
  console.log(`  - ${registry.mcp.length} MCP servers`);
}
```

### Final Registry Structure

The resulting registry.json will look like:

```json
{
  "skills": [
    {
      "name": "autodocs-readme",
      "displayName": "README Writer",
      "description": "...",
      "category": "documentation",
      "tags": ["..."],
      "lastUpdated": "2024-08-02",
      "skill_file_url": "https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/marketplace/skills/slim-readme/SKILL.md",
      "external_only": true,
      "repository": {
        "url": "https://github.com/NASA-AMMOS/slim",
        "type": "git"
      },
      "type": "skill",
      "example": "..."
    }
    // ... more skills
  ],
  "agents": [
    // ... transformed agents
  ],
  "mcp": [
    // ... transformed MCPs
  ]
}
```

---

## Complete Import Flow

Putting it all together:

```javascript
async function importExternalRegistries(githubUrls, newProjectName) {
  console.log(`Starting registry import...`);
  console.log(`Sources: ${githubUrls.join(', ')}`);
  console.log(`New project name: ${newProjectName}\n`);

  const transformedRegistries = [];

  // Step 1-3: Fetch from each source
  for (const url of githubUrls) {
    const result = await fetchExternalRegistry(url);

    if (result.error) {
      // Ask user: Continue without this source?
      const continueWithout = await askUser(`Continue without ${url}? (yes/no)`);
      if (!continueWithout) {
        throw new Error('Import aborted by user');
      }
      continue;
    }

    // Step 4: Transform
    const transformed = transformRegistry(result, newProjectName);
    transformedRegistries.push(transformed);

    console.log(`✓ Transformed ${result.source.org}/${result.source.repo}`);
    console.log(`  - ${transformed.skills.length} skills → ${newProjectName}-*`);
    console.log(`  - ${transformed.agents.length} agents → ${newProjectName}-*`);
    console.log(`  - ${transformed.mcp.length} MCPs → ${newProjectName}-*\n`);
  }

  // Step 5: Merge & deduplicate
  let merged = mergeRegistries(transformedRegistries);
  merged = deduplicateRegistry(merged);
  merged = sortRegistry(merged);

  console.log(`Merged registry:`);
  console.log(`  - ${merged.skills.length} unique skills`);
  console.log(`  - ${merged.agents.length} unique agents`);
  console.log(`  - ${merged.mcp.length} unique MCPs\n`);

  // Step 6: Validate
  const validationErrors = validateRegistry(merged);
  if (validationErrors.length > 0) {
    console.error(`❌ Validation errors:`);
    validationErrors.forEach(err => console.error(`  - ${err}`));
    throw new Error('Registry validation failed');
  }

  console.log(`✓ Validation passed\n`);

  // Optional: Validate URLs
  const askValidateUrls = await askUser('Validate URL accessibility? (yes/no, takes time)');
  if (askValidateUrls) {
    const urlResults = await validateAllUrls(merged);
    console.log(`URL Validation: ${urlResults.accessible}/${urlResults.accessible + urlResults.inaccessible} accessible`);
    if (urlResults.inaccessible > 0) {
      console.warn(`⚠ ${urlResults.inaccessible} URLs not accessible: ${urlResults.errors.join(', ')}`);
    }
  }

  // Step 7: Write
  const registryPath = 'static/data/registry.json';
  writeRegistry(merged, registryPath);

  console.log(`\n✓ Import complete!`);

  return merged;
}
```

---

## Integration with Existing Infrastructure

**The beauty of this approach**: Once we write the transformed registry.json, everything else works automatically:

### Build Script (`generate-claude-marketplace.js`)

Already handles external entries (lines 40-56):

```javascript
if (skill.external_only) {
  plugins.push({
    name: skill.name,
    source: skill.repository?.url || `external:${skill.name}`,
    description: skill.description || '',
    version: skill.version || '1.0.0',
    author: {
      name: 'External',
      url: skill.repository?.url || '#'
    },
    external_only: true,
    install_command: skill.repository?.url ? `git clone ${skill.repository.url}` : 'See homepage'
  });
}
```

**No changes needed!** It automatically:
- Detects `external_only: true`
- Creates external plugin entries
- Shows correct install instructions

### UI Component (`SkillBrowser.js`)

Already checks for external flag (line 136-139):

```javascript
if (item.external_only) {
  return `# External ${item.type} - install manually using: ${getManualInstallCommand(item)}`;
}
```

**No changes needed!** It automatically:
- Detects external entries
- Shows external install instructions
- Renders differently in UI

### Result

Users see entries in the marketplace, click on them, and get:
- Link to original SKILL.md/AGENT.md/MCP.md on GitHub
- Install instructions pointing to original repository
- No local files - everything stays in source repository

---

## Error Scenarios & Handling

| Scenario | Handling |
|----------|----------|
| Invalid GitHub URL | Show error, ask user to correct |
| 404 Not Found | Try master branch, then ask to skip source |
| Network failure | Retry once, then ask to skip source |
| Invalid JSON | Show error, ask to skip source |
| Missing fields | Show validation errors, abort |
| Duplicate names | Skip duplicates, warn user |
| Inaccessible URLs | Warn but continue (optional check) |

---

## Summary

This guide shows how to import external registries while leveraging the **existing `external_only: true` support** in the codebase.

**Key points**:
1. Fetch registry.json from GitHub raw URLs
2. Transform entries: rename prefix, add `external_only: true`, add `repository.url`
3. Merge, deduplicate, validate
4. Write to local registry.json
5. Existing infrastructure handles the rest automatically

**No code changes needed** to build script or UI - they already support external entries perfectly!
