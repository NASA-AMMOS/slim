# SLIM Website Rebranding Questionnaire

This questionnaire is designed specifically for rebranding SLIM-based Docusaurus websites for domain-specific projects.

## Purpose

The goal of this questionnaire is to collect essential information needed to customize a SLIM website fork for a specific domain, organization, or use case while maintaining the structure and functionality of the SLIM architecture.

## Question Structure

**Maximum Questions**: 10 (keeps questionnaire concise and focused)

**Question Types**:
- **Required**: Information necessary for basic rebranding
- **Optional**: Additional customization options
- **Conditional**: Only asked based on previous answers

---

## Question 1: Current Project Name (Auto-Detected)

**Type**: Auto-Detected (Confirmation Only)

**Source**: `docusaurus.config.js` → `title` field

**Purpose**: Confirm the current project name before replacement

**Agent Behavior**:
```
Read docusaurus.config.js
Extract: config.title

Display: "Current project name detected: 'SLIM'"
Ask: "Is this correct? (yes/no)"

If no → Ask user to provide correct current name
If yes → Proceed
```

**Example**:
```
✓ Detected current project name: "SLIM"
✓ Detected in: docusaurus.config.js (title field)
```

---

## Question 2: New Project Name

**Type**: Required

**Format**: Text input (single word or hyphenated)

**Purpose**: Determine the new brand name that will replace "SLIM" throughout the website

**Agent Behavior**:
```
Ask: "What should the new project name be?"

Examples:
- AutoDocs (for documentation automation)
- TeamHub (for team collaboration)
- DevBestPractices (for development best practices)
- ResearchOps (for research operations)

Validation:
- Not empty
- No special characters (except hyphens and underscores)
- Reasonable length (3-30 characters)

Store: {NEW_PROJECT_NAME}
```

**Usage**: This name will be used for:
- Registry entry prefixes: "{new-name}-readme", "{new-name}-license", etc.
- Package name: "{new-name}-website"
- Documentation references
- Page titles and headings

**Examples**:
- "AutoDocs" → autodocs-readme, autodocs-license
- "ResearchOps" → researchops-readme, researchops-license

---

## Question 3: New Tagline

**Type**: Optional (Default: Keep current)

**Format**: Text input (short phrase)

**Purpose**: Update the hero section tagline to reflect the new project's focus

**Agent Behavior**:
```
Current tagline (from docusaurus.config.js):
"{CURRENT_TAGLINE}"

Ask: "What should the new tagline be? (Leave blank to keep current)"

Examples:
- "AI-powered documentation automation for software projects"
- "Team collaboration best practices and workflows"
- "Streamlining research operations with automation"

If blank → Keep current tagline
If provided → Use new tagline

Store: {NEW_TAGLINE} or {CURRENT_TAGLINE}
```

**Usage**: This tagline appears in:
- Hero section (prominently displayed)
- `docusaurus.config.js` → `tagline` field
- SEO metadata
- About page (optional)

---

## Question 4: New Logo File

**Type**: Optional (Default: Auto-generate from Phosphor icons)

**Format**: File upload (SVG or PNG preferred)

**Purpose**: Provide custom logo for the rebranded website

**Agent Behavior**:
```
Ask: "Would you like to upload a custom logo? (yes/no)"

If yes:
  Ask: "Please upload your logo file (SVG or PNG recommended)"
  Accept: .svg, .png, .jpg, .jpeg files
  Validate: File exists and is image format
  Store path: {LOGO_FILE_PATH}

If no:
  Auto-generate from Phosphor Icons:
    1. Extract keywords from {NEW_PROJECT_NAME}
    2. Match to Phosphor icon
    3. Fetch from Phosphor CDN
    4. Convert to needed formats (SVG, PNG, ICO)

  Store: {AUTO_GENERATE_LOGO} = true
```

**Auto-Generation Logic**:
If no logo uploaded, use Phosphor Icons Guide to:
- Extract keywords: "AutoDocs" → "file-doc", "docs", "files"
- Match to category: Documentation → "file-text", "file-doc", "article"
- Fetch SVG: `https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/file-doc.svg`
- Generate sizes: logo.svg, favicon.ico, various PNG sizes

**Usage**:
- Hero section center logo
- Favicon (browser tab icon)
- Social media cards
- About page header

---

## Question 5: Project Purpose/Domain

**Type**: Optional but Recommended

**Format**: Text input (2-3 sentences)

**Purpose**: Describe the project's purpose for use in About page and FAQ

**Agent Behavior**:
```
Ask: "Describe your project's purpose in 2-3 sentences. This will be used in the About page and FAQ."

Examples:
- "AutoDocs provides AI-powered documentation generation and maintenance for software projects. It automates README creation, API documentation, and changelog management."

- "TeamHub is a centralized platform for team collaboration best practices. It includes workflow templates, communication guidelines, and project management tools."

- "ResearchOps streamlines research operations with automated workflows for data collection, analysis, and reporting. It's designed for academic and scientific research teams."

If blank → Use generic template
If provided → Incorporate into page templates

Store: {PROJECT_DESCRIPTION}
```

**Usage**:
- About page: Project overview section
- FAQ: "What is {PROJECT_NAME}?" answer
- README.md (if updated)
- SEO metadata description

---

## Question 6: Team/Organization Info

**Type**: Optional

**Format**: Text input (organization name, GitHub org, contact)

**Purpose**: Populate team and community sections of the website

**Agent Behavior**:
```
Ask: "Who maintains this project? Provide organization name, GitHub org, or contact info."

Examples:
- "AutoDocs Team (https://github.com/autodocs)"
- "NASA AMMOS (slim@jpl.nasa.gov)"
- "University Research Lab (contact@research.edu)"

If blank → Use placeholder: "{PROJECT_NAME} Team"
If provided → Use in About page, footer, contribution guidelines

Store: {TEAM_INFO}
```

**Usage**:
- About page: Community members section
- Footer: Copyright and contact
- Contribute page: Where to get help
- Package.json: author field

---

## Question 7: Import from External SLIM Instances?

**Type**: Optional (Default: no)

**Format**: yes/no choice

**Purpose**: Determine if user wants to import best practices from other SLIM instances

**Agent Behavior**:
```
Ask: "Do you want to import best practices from other SLIM instances? (yes/no)"

Explanation:
"You can import registry entries from other SLIM-based websites as external references. This creates links to those best practices without downloading the files locally."

Default: no

If yes → Proceed to Question 8
If no → Skip to Question 9

Store: {IMPORT_EXTERNAL} = true/false
```

**Impact**:
- If yes: Registry will contain external entries with `external_only: true`
- If no: Registry will be empty (fresh start)

**Note**: External entries are references only. The actual best practice files remain in their original repositories.

---

## Question 8: GitHub URLs for Import (Conditional)

**Type**: Conditional on Question 7 = yes

**Format**: Comma-separated URLs

**Purpose**: Collect GitHub repository URLs to import registry entries from

**Agent Behavior**:
```
Only ask if {IMPORT_EXTERNAL} = true

Ask: "Provide GitHub URLs of SLIM instances to import (comma-separated)"

Examples:
- "https://github.com/NASA-AMMOS/slim"
- "https://github.com/NASA-AMMOS/slim, https://github.com/other-org/slim-fork"

Validation:
- URLs must start with "https://github.com/"
- Parse each URL to extract org/repo
- Construct registry URL: https://raw.githubusercontent.com/{org}/{repo}/main/static/data/registry.json
- Verify accessibility (HTTP HEAD request)

Store: {IMPORT_URLS} = array of URLs
```

**Processing**:
For each URL:
1. Fetch `static/data/registry.json` from that repository
2. Transform entries:
   - Rename: "slim-*" → "{new-project-name}-*"
   - Add: `external_only: true`
   - Add: `repository.url` pointing to source
   - Keep: `skill_file_url` pointing to original location
3. Merge into new registry.json

**Example Transformation**:
```json
// Original from NASA-AMMOS/slim
{
  "name": "slim-readme",
  "skill_file_url": "/slim/marketplace/skills/slim-readme/SKILL.md"
}

// Transformed for AutoDocs
{
  "name": "autodocs-readme",
  "skill_file_url": "https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/marketplace/skills/slim-readme/SKILL.md",
  "external_only": true,
  "repository": {
    "url": "https://github.com/NASA-AMMOS/slim",
    "type": "git"
  }
}
```

---

## Question 9: Keep Existing Marketplace Entries?

**Type**: Optional (Default: no)

**Format**: yes/no choice

**Purpose**: Determine whether to preserve local marketplace entries or start fresh

**Agent Behavior**:
```
Ask: "Keep existing local marketplace entries? (yes/no)"

Current status:
- {X} local skills
- {Y} local agents
- {Z} local MCP servers

Options:
1. "no" (default - fresh start):
   - Clear all local marketplace folders
   - Use only imported external entries (if any)
   - Or have completely empty marketplace

2. "yes" (keep existing):
   - Preserve local marketplace folders
   - Rename entries: "slim-*" → "{new-project-name}-*"
   - Merge with imported entries (if any)

Default: no (recommended for forks)

Store: {KEEP_EXISTING} = true/false
```

**Impact**:
- **No**: Clean slate, only external references (if any)
- **Yes**: Keep and rename local entries, merge with external

**Recommendation**: For most SLIM forks, choosing "no" is cleaner. You can always add local entries later by creating them or using slim-skill-creator.

---

## Question 10: Git Branch Name

**Type**: Optional (Default: auto-generate)

**Format**: Text input (git branch name)

**Purpose**: Allow custom git branch name or use auto-generated default

**Agent Behavior**:
```
Ask: "Custom git branch name? (Leave blank for auto-generated)"

Default (auto-generated):
rebrand/website-{old-slug}-to-{new-slug}

Example:
rebrand/website-slim-to-autodocs

Validation:
- Valid git branch name characters
- No spaces (use hyphens or underscores)
- Not "main", "master", or existing branch names

If blank → Use auto-generated
If provided → Use custom name

Store: {BRANCH_NAME}
```

**Auto-Generation Logic**:
```javascript
const oldSlug = currentProjectName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const newSlug = newProjectName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const branchName = `rebrand/website-${oldSlug}-to-${newSlug}`;
```

Examples:
- SLIM → AutoDocs: `rebrand/website-slim-to-autodocs`
- SLIM → ResearchOps: `rebrand/website-slim-to-researchops`

---

## Questionnaire Summary

After collecting all answers, display summary for confirmation:

```
Questionnaire Summary:
======================

Project Branding:
- Current name: SLIM
- New name: AutoDocs
- New tagline: "AI-powered documentation automation for software projects"
- Logo: Auto-generate from Phosphor icons (keywords: "docs", "automation")

Project Information:
- Purpose: "AutoDocs provides AI-powered documentation generation..."
- Team/Org: "AutoDocs Team (https://github.com/autodocs)"

Registry & Marketplace:
- Import external: Yes
  - Sources: https://github.com/NASA-AMMOS/slim
  - Expected entries: ~17 (14 skills, 2 agents, 1 MCP)
- Keep existing: No (fresh start)
- Result: Empty local marketplace, 17 external references

Git:
- Branch: rebrand/website-slim-to-autodocs

Proceed with this configuration? (yes/no/modify)
```

---

## Default Values Reference

Quick reference for all default values:

| Question | Default Value | Rationale |
|----------|---------------|-----------|
| 1. Current name | Auto-detected from docusaurus.config.js | Ensures accuracy |
| 2. New name | *Required* | Core to rebranding |
| 3. Tagline | Keep current | Optional customization |
| 4. Logo | Auto-generate | Reduces friction |
| 5. Purpose | Generic template | Optional but recommended |
| 6. Team info | "{PROJECT_NAME} Team" | Minimal placeholder |
| 7. Import external | No | Fresh start default |
| 8. Import URLs | N/A (conditional) | Only if importing |
| 9. Keep existing | No | Clean slate default |
| 10. Branch name | `rebrand/website-{old}-to-{new}` | Descriptive convention |

---

## Validation Rules

**Question 2 (New Project Name)**:
- Not empty
- Alphanumeric + hyphens/underscores only
- Length: 3-30 characters
- Not same as current name

**Question 3 (Tagline)**:
- Length: 10-200 characters (if provided)
- No special formatting characters

**Question 4 (Logo)**:
- File format: .svg, .png, .jpg, .jpeg
- Max file size: 5MB
- Minimum dimensions: 100x100px (if raster)

**Question 5 (Purpose)**:
- Length: 20-500 characters (if provided)

**Question 8 (Import URLs)**:
- Must be valid GitHub URLs
- Must be accessible (HTTP 200 response)
- Must have registry.json at expected path

**Question 10 (Branch Name)**:
- Valid git branch name format
- Not "main" or "master"
- Does not already exist

---

## Error Handling

**If validation fails**:
1. Show clear error message
2. Explain the issue
3. Re-ask the question
4. Provide example of valid input

**If import fails**:
1. Show which URL failed
2. Explain the error (404, network, invalid JSON)
3. Ask: "Continue without this source? (yes/no)"
4. If yes → Skip that source, continue with others
5. If no → Allow user to fix URL and retry

**If auto-detection fails**:
1. Warn: "Could not detect {field} in {file}"
2. Ask user to provide manually
3. Continue with manual input

---

## Usage in Agent Workflow

This questionnaire is used in **Step 2** of the SLIM Website Rebranding Agent workflow:

1. Agent loads this file
2. Agent asks questions 1-10 in order
3. Conditional questions (8) only asked if applicable
4. Answers stored in agent memory for use in subsequent steps
5. Summary displayed for user confirmation
6. User can modify answers before proceeding

**Information Flow**:
```
Questionnaire Answers
       ↓
Discovery & Import (Step 3)
       ↓
Plan Generation (Step 4)
       ↓
Execution (Step 7)
```

Each answer is used throughout the workflow to customize the rebranding process.
