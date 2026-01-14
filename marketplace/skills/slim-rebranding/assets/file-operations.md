# File Operations & Modification Patterns

## Hero Component Operations

### HubHero.js Modifications
**Target**: `src/components/HubHero.js`

**Remove Corner Features (Lines 57-78)**:
```javascript
// DELETE THESE LINES:
const cornerFeatures = [
  { position: "top-left", icon: "🚀", text: "Quick Start" },
  { position: "bottom-left", icon: "📚", text: "Documentation" },
  { position: "top-right", icon: "💡", text: "Examples" },
  { position: "bottom-right", icon: "🤝", text: "Community" }
];
```

**Remove Corner Rendering (Lines 83-88)**:
```javascript
// DELETE THESE LINES:
{cornerFeatures.map((feature, index) => (
  <div key={index} className={`corner-feature corner-${feature.position}`}>
    <span>{feature.icon}</span>
    <span>{feature.text}</span>
  </div>
))}
```

**Update Logo Path (Line ~93)**:
```javascript
// CHANGE FROM:
<img src="/img/logo.svg" alt="Logo" />

// CHANGE TO:
<img src="/img/logo.svg" alt="{PROJECT_NAME} Logo" />
```

**Update Tagline (Lines ~96-98)**:
```javascript
// CHANGE FROM:
<p style={{ padding: "15px", fontSize: "1.1rem", paddingBottom: "30px" }}>
  Modernizing software through the automated infusion of best practices.
</p>

// CHANGE TO:
<p style={{ padding: "15px", fontSize: "1.1rem", paddingBottom: "30px" }}>
  {USER_TAGLINE}
</p>
```

### CSS Cleanup
**Target**: `src/css/custom.css`

**Remove Corner Feature Styles (Estimated lines 501-675)**:
```css
/* DELETE ALL CORNER-RELATED CSS:
.corner-feature {
  position: fixed;
  z-index: 1000;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 6px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.corner-top-left { top: 20px; left: 20px; }
.corner-bottom-left { bottom: 20px; left: 20px; }
.corner-top-right { top: 20px; right: 20px; }
.corner-bottom-right { bottom: 20px; right: 20px; }

@media (max-width: 768px) {
  .corner-feature { display: none; }
}
*/
```

## Configuration File Operations

### docusaurus.config.js Updates
**Target**: `docusaurus.config.js`

**Update Fields**:
```javascript
// MODIFY THESE FIELDS:
const config = {
  title: "{PROJECT_NAME}",                    // Replace
  tagline: "{USER_TAGLINE}",                  // Replace
  url: "{USER_URL}",                          // Replace
  baseUrl: "{USER_BASE_URL}",                 // Replace
  organizationName: "{USER_ORG}",             // Replace
  projectName: "{USER_REPO}",                 // Replace

  // PRESERVE THIS SECTION EXACTLY:
  themeConfig: {
    footer: {
      copyright: `Based on the Software Lifecycle Improvement & Modernization (SLIM) project <a href="https://nasa-ammos.github.io/slim/" style="color: cyan;">https://nasa-ammos.github.io/slim/</a><br/>Copyright © ${new Date().getFullYear()} California Institute of Technology ("Caltech"). U.S. Government sponsorship acknowledged. Contents licensed under Apache License Version 2.0.<br/>`
    }
  }
};
```

### package.json Updates
**Target**: `package.json`

**Update Fields**:
```json
{
  "name": "{PROJECT_NAME_LOWERCASE}-website",
  "description": "{PROJECT_NAME} documentation website and best practices hub",
  "homepage": "{USER_URL}"
}
```

## Registry Operations

### External Registry Transformation
**Input**: External registry.json from GitHub
**Output**: Transformed entries for local registry

**Transform Skills**:
```javascript
const transformSkill = (skill, projectName, sourceUrl) => ({
  name: skill.name.replace(/^slim-/, `${projectName.toLowerCase()}-`),
  displayName: skill.displayName,
  description: skill.description,
  category: skill.category,
  tags: skill.tags,
  lastUpdated: skill.lastUpdated,
  type: "skill",
  external_only: true,
  repository: {
    url: sourceUrl,
    type: "git"
  },
  skill_file_url: skill.skill_file_url,  // Keep original URL
  example: skill.example
});
```

### Registry Write
**Target**: `static/data/registry.json`

**Standard Structure**:
```json
{
  "skills": [],
  "agents": [],
  "mcp": [],
  "metadata": {
    "categoryIcons": {
      "collaboration": "🤝",
      "collaboration/meetings": "📅",
      "collaboration/policy": "🏛",
      "infrastructure": "🏗",
      "security": "🔒"
    }
  }
}
```

### Marketplace Cleanup
**Targets**:
- `static/marketplace/skills/`
- `static/marketplace/agents/`
- `static/marketplace/mcp-servers/`

**Actions**:
```bash
# Clear contents but preserve structure
rm -rf static/marketplace/skills/*
rm -rf static/marketplace/agents/*
rm -rf static/marketplace/mcp-servers/*

# Create .gitkeep files
touch static/marketplace/skills/.gitkeep
touch static/marketplace/agents/.gitkeep
touch static/marketplace/mcp-servers/.gitkeep
```

## Page Template Generation

### Contribute Page Template
**Target**: `docs/contribute/submit-best-practice.md`

**Template Structure**:
```markdown
---
sidebar_position: 1
---

# Submit a Best Practice

Want to share your expertise with the {PROJECT_NAME} community? Here's how to contribute.

## Quick Start

**3 simple steps:**

1. **Create an issue** - [Start here]({GITHUB_ISSUES_URL}) to discuss your idea
2. **Build your contribution** - Create a skill, agent, or guide
3. **Submit a pull request** - We'll review and help you merge it

## Contribution Types

### Skills
Reusable workflows and templates that automate common tasks.

### Agents
Multi-step autonomous processes that handle complex workflows.

### Guides
Documentation and best practices for specific domains.

## Requirements

- Clear documentation with examples
- Tested on multiple projects
- Compatible with {PROJECT_NAME} architecture

## Review Process

1. **Initial Review** (48 hours) - Maintainers check submission
2. **Community Feedback** (1 week) - Community reviews and provides input
3. **Integration** (varies) - Final review and merge

## Resources

- [GitHub Discussions]({GITHUB_DISCUSSIONS_URL})
- [Examples Repository]({EXAMPLES_URL})
- [Style Guide]({STYLE_GUIDE_URL})

Get started today and help grow the {PROJECT_NAME} ecosystem!
```

### FAQ Page Template
**Target**: `docs/faq/README.md`

**Template Structure**:
```markdown
---
sidebar_position: 1
---

# Frequently Asked Questions

## General

### What is {PROJECT_NAME}?

{PROJECT_DESCRIPTION}

### How do I get started?

1. Browse the marketplace for relevant best practices
2. Install the ones that fit your project needs
3. Follow the usage examples to integrate them
4. Customize as needed for your specific requirements

### What types of projects work with {PROJECT_NAME}?

{USE_CASES}

## Technical

### What are the prerequisites?

- Node.js and npm installed
- Basic command line knowledge
- Project with compatible structure

### How do I contribute?

See our [Contributing Guide](/docs/contribute/submit-best-practice) for detailed instructions.

### Can I customize the best practices?

Yes! All best practices are designed to be customizable. Fork them and adapt to your needs.

## Troubleshooting

### Installation fails
Check that you have the latest Node.js version and try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Best practice doesn't work
1. Check the requirements in the documentation
2. Verify your project structure matches expectations
3. Check [GitHub Issues]({GITHUB_ISSUES_URL}) for known issues

## Support

- [GitHub Discussions]({GITHUB_DISCUSSIONS_URL})
- [Issue Tracker]({GITHUB_ISSUES_URL})
- [Documentation](/docs/about)
```

### About Page Template
**Target**: `docs/about/README.md`

**Template Structure**:
```markdown
---
sidebar_position: 1
---

# About {PROJECT_NAME}

{PROJECT_DESCRIPTION}

## Features

{FEATURES_LIST}

## Architecture

{PROJECT_NAME} is built on proven technologies:
- **Docusaurus** for documentation websites
- **Modern JavaScript** for tooling and automation
- **Git-based workflows** for version control and collaboration

## Team

{TEAM_INFO}

## Getting Started

Ready to explore? Check out our:
- [Marketplace](/) - Browse available best practices
- [Contributing Guide](/docs/contribute/submit-best-practice) - Add your own
- [FAQ](/docs/faq) - Common questions and answers

## License

Licensed under Apache-2.0. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Based on the Software Lifecycle Improvement & Modernization (SLIM) project: https://nasa-ammos.github.io/slim/

Special thanks to the open source community and all contributors who make this project possible.
```

## Logo Operations

### Logo Generation (Phosphor Icons)
**Target**: `static/img/logo.svg`

**Auto-Generation Process**:
1. Extract keywords from project name
2. Select appropriate Phosphor icon
3. Fetch SVG from CDN: `https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/{ICON}.svg`
4. Customize colors if needed
5. Save as `static/img/logo.svg`

### Favicon Generation
**Target**: `static/img/favicon.ico`

**Process**:
1. Convert SVG logo to multiple sizes (16x16, 32x32, 48x48)
2. Combine into favicon.ico
3. Optional: Generate additional sizes for app icons

## Empty State Operations

### SkillBrowser Modification
**Target**: `src/components/SkillBrowser.js`

**Add Empty State Check (Around line 970-1000)**:
```javascript
// ADD THIS AFTER LOADING REGISTRY DATA:
if (allItems.length === 0) {
  return (
    <Container className="mt-5">
      <Card className="text-center p-5 shadow-sm">
        <Card.Body>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
          <h3>No best practices available yet</h3>
          <p className="text-muted mb-4" style={{ maxWidth: "500px", margin: "0 auto 1.5rem" }}>
            Get started by importing from other SLIM instances or creating your own!
          </p>
          <div>
            <Button
              variant="primary"
              onClick={() => window.location.href = '/docs/contribute/submit-best-practice'}
              className="me-2"
            >
              Learn How to Contribute
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => window.location.href = '/docs/about'}
            >
              About {PROJECT_NAME}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
```

## Validation Operations

### Pre-Modification Checks
```bash
# Verify file exists before modifying
[ -f "FILE_PATH" ] || { echo "File not found: FILE_PATH"; exit 1; }

# Check git status
git status --porcelain | grep -q . && echo "Working directory not clean" && exit 1

# Verify Node.js project
[ -f "package.json" ] || { echo "Not a Node.js project"; exit 1; }
```

### Post-Modification Validation
```bash
# JSON syntax check
python -c "import json; json.load(open('static/data/registry.json'))"

# JS syntax check
node -c src/components/HubHero.js

# Build test
npm run build
```