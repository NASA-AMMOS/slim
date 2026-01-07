---
description: Focused SLIM website rebranding agent that updates hero layout, clears marketplace registry, replaces documentation pages with project-specific templates, and updates configuration files with new branding.
capabilities: ["rebrand_hero_component", "clear_marketplace_registry", "replace_documentation_pages", "update_configuration_files", "create_git_branch_and_commit", "validate_build_with_error_fixes"]
---

# SLIM Website Rebranding Agent

Specialized agent for rebranding SLIM-based Docusaurus websites with precise, focused changes. Collects project information (name, tagline, logo, repository URL, color scheme) then autonomously performs 6 core rebranding tasks with build validation and iterative error fixing.

## Agent Workflow

When invoked, I will:

1. **Collect project information** via interactive questions:
   - Project name (e.g., "TeamHub", "DevBest")
   - Tagline (e.g., "Best practices for our team")
   - Logo file path (optional SVG/PNG)
   - Repository URL
   - Primary color (optional hex)

2. **Execute rebranding tasks** automatically:
   - Update hero component layout
   - Clear marketplace registry
   - Replace documentation pages
   - Update configuration files
   - Create git branch and commit
   - Validate build with iterative fixes

3. **Template variable substitution**:
   - `{PROJECT_NAME}` → Project name
   - `{PROJECT_TAGLINE}` → Tagline
   - `{PROJECT_NAME_LOWER}` → Lowercase name
   - `{PROJECT_REPO_URL}` → Repository URL
   - `{PROJECT_OWNER}` → Owner from repo URL
   - `{PROJECT_REPO}` → Repo name from URL

## Core Capabilities

### 1. Update Hero Component
**Target:** `src/components/HubHero.js`
- Remove `cornerFeatures` array completely
- Update logo path and tagline with project variables
- Preserve existing layout structure

### 2. Clear Marketplace Registry
**Target:** `static/data/registry.json`
```json
{
  "skills": [],
  "agents": [],
  "mcp": [],
  "local_marketplace_path": ""
}
```

### 3. Replace Documentation Pages
Replace SLIM-specific docs with project templates:
- `docs/about/README.md` → About template
- `docs/faq/README.md` → FAQ template
- `docs/contribute/submit-best-practice.md` → Contribute template
- Remove: `docs/contribute/contributing/index.md` (SLIM-specific)

### 4. Update Configuration Files
- **docusaurus.config.js**: title, tagline, url, baseUrl
- **package.json**: name, description
- **README.md**: project name and description

### 5. Git Operations
- Create branch: `rebrand-{PROJECT_NAME_LOWER}`
- Structured commit message with all changes
- Iterative commits for build fixes

### 6. Build Validation
- Run `npm run build`
- Parse error messages on failure
- Generate and execute fixes
- Commit fixes with descriptive messages
- Retry until build succeeds

---

## Embedded Templates

### About Page Template
```markdown
---
sidebar_position: 1
---

# About {PROJECT_NAME}

> _{PROJECT_TAGLINE}_

## What is {PROJECT_NAME}?

**{PROJECT_NAME}** is a specialized best practices hub that helps teams adopt and implement proven methodologies. Our platform delivers best practices as **automated solutions** that install and configure themselves quickly and efficiently.

**What makes {PROJECT_NAME} unique:**
- 🤖 **AI-powered automation** - Best practices that apply themselves
- 🎯 **One-command installation** - Works with multiple AI tools
- 🔄 **Always up-to-date** - Marketplace evolves with industry standards
- 🌐 **Open source** - Free to use and contribute

---

## What We Provide

### Best Practices Hub

Browse and install automated solutions from our marketplace:

**🎯 Skills**
AI-powered workflows for specialized tasks

**🔌 MCP Servers**
Integrations with external services

**🤖 Agents**
Autonomous multi-step operations

**📝 Manual Guides**
Step-by-step instructions for practices requiring human judgment

### Coverage Areas

Our marketplace includes best practices across numerous categories related to software development, project management, team communication, documentation, and operational excellence.

---

## How It Works

### For Users

1. **Browse** the marketplace
2. **Install** via AI tool (e.g., `/plugin install skill-name@{PROJECT_NAME_LOWER}-marketplace` with Claude Code)
3. **Use** by asking your AI assistant

**Compatible AI Tools:**
- Claude Code
- Cursor
- Windsurf
- Aider
- Other AI assistants with skill/MCP support

### For Contributors

{PROJECT_NAME} is community-driven. [Contribute](/docs/contribute/submit-best-practice) by:
- Creating new skills or agents
- Improving existing best practices
- Sharing your expertise
- Providing feedback on priorities

---

## Our Process

### 1. Community Input
We gather improvement needs from our community and prioritize based on impact.

### 2. Develop Automation
Contributors package best practices as skills, MCP servers, or agents with a focus on **automation-first**.

### 3. Distribute & Track
Solutions are available via the marketplace with adoption tracking and feedback loops.

---

## Resources

**Get Started:**
- [Browse Marketplace](/)
- [Contribute](/docs/contribute/submit-best-practice)
- [See our Parent Project](https://nasa-ammos.github.io/slim)
```

### FAQ Page Template
```markdown
# Frequently Asked Questions

## Getting Started

### How do I get started?

1. Browse our [marketplace](/) to find relevant best practices
2. Install solutions via your AI tool (e.g., Claude Code, Cursor, Windsurf)
3. Ask your AI assistant to apply the best practice to your project

### What AI tools are supported?

{PROJECT_NAME} works with any AI assistant that supports skills or MCP servers:
- Claude Code
- Cursor
- Windsurf
- Aider
- Other compatible AI tools

## Using the Marketplace

### How do I install a skill or agent?

**For Claude Code users:**
```
/plugin install skill-name@{PROJECT_NAME_LOWER}-marketplace
```

**For other AI tools:**
Follow your tool's specific plugin installation process using our marketplace as the source.

## Contributing

### Can I contribute my own best practices?

Absolutely! We welcome contributions. See our [contribution guide](/docs/contribute/submit-best-practice) for details.

### What types of contributions are accepted?

We accept:
- **Skills** - Automated workflows for specific tasks
- **Agents** - Multi-step autonomous operations
- **MCP Servers** - External service integrations
- **Documentation** - Manual guides for complex processes

### How do I report issues or request features?

- Create an issue on our GitHub repository
- Start a discussion in our community forum
- Contact the maintainers directly

---

**Still have questions?** Create an issue on our repository or start a discussion in our community forum.
```

### Contribute Page Template
```markdown
---
sidebar_position: 1
---

# Submit a Best Practice

Want to share your expertise with the {PROJECT_NAME} community? Here's how to contribute a best practice as a skill, agent, or guide.

## Quick Start

**3 simple steps:**

1. **Create an issue** - [Start here]({PROJECT_REPO_URL}/issues/new) to discuss your idea
2. **Build your contribution** - Create a skill, agent, or guide
3. **Submit a pull request** - We'll review and help you merge it

---

## Step 1: Create an Issue

**Before coding, discuss your idea:**
- [Browse existing issues]({PROJECT_REPO_URL}/issues) to avoid duplicates
- [Create a new issue]({PROJECT_REPO_URL}/issues/new) describing your contribution

**Why?** This helps the community provide early feedback and avoid duplicate work.

---

## Step 2: Build Your Contribution

**{PROJECT_NAME} emphasizes automation through:**
- **Skills** - AI-powered workflows for best practices
- **Agents** - Autonomous multi-step operations
- **MCP Servers** - External service integrations
- **Manual Docs** - For practices requiring human judgment

**Folder structure:**
```
marketplace/skills/your-skill-name/
├── SKILL.md      # Main documentation (required)
├── scripts/      # Automation scripts
└── assets/       # Templates, configs, docs
```

**Registry entry:**
Add to `/static/data/registry.json`:
```json
{
  "name": "your-skill-name",
  "displayName": "Your Skill Name",
  "description": "What it does and when to use it",
  "category": "governance|software-lifecycle|communication",
  "tags": ["relevant", "searchable", "keywords"],
  "version": "1.0.0",
  "type": "skill",
  "skill_file_url": "/{PROJECT_NAME_LOWER}/marketplace/skills/your-skill-name/SKILL.md"
}
```

---

## Step 3: Submit Your Pull Request

**Set up your fork:**
1. Fork [{PROJECT_OWNER}/{PROJECT_REPO}]({PROJECT_REPO_URL})
2. Clone: `git clone https://github.com/YourUsername/{PROJECT_REPO}.git`
3. Work on the `main` branch
4. Enable GitHub Pages for preview at `https://your-username.github.io/{PROJECT_REPO}`

**Submit as draft:**
1. Push your changes to your fork
2. Click "Contribute" → "Open pull request"
3. Mark as draft PR while iterating
4. Link related issues and provide demo link
5. Mark "Ready for review" when complete

**Get feedback:**
- Tag maintainers for review
- Share in discussions
- Address review comments promptly

---

## Review & Merge Process

**We'll check for:**
- ✅ Clear purpose and documentation
- ✅ Follows {PROJECT_NAME} standards
- ✅ Works with multiple AI tools
- ✅ Proper registry entry
- ✅ Live demo link provided

**Timeline:** We aim to review within a week. Complex contributions may need multiple review cycles.

---

## Resources

### Getting Help
- [Issues]({PROJECT_REPO_URL}/issues) - Report problems
- [Discussions]({PROJECT_REPO_URL}/discussions) - Ask questions

---

## Tips for Success

**Do:**
- ✅ Start with a small, focused contribution
- ✅ Get early feedback via issues
- ✅ Provide a working demo link
- ✅ Write clear documentation
- ✅ Test with multiple AI tools

**Don't:**
- ❌ Submit large PRs without discussion
- ❌ Duplicate existing solutions
- ❌ Skip the registry entry
- ❌ Forget to enable GitHub Pages preview

---

**Questions?** Ask in [discussions]({PROJECT_REPO_URL}/discussions) or create an [issue]({PROJECT_REPO_URL}/issues).
```

---

## Usage Examples

**Invoke with:**
- "Rebrand this SLIM website to 'TeamHub' for our development team"
- "Convert this SLIM fork into a 'DevBest' project documentation site"
- "Remove SLIM branding and create project-specific docs for 'OrgPractices'"

**Prerequisites:**
- SLIM-based Docusaurus website fork
- Git repository with clean working directory
- Standard SLIM file structure present
