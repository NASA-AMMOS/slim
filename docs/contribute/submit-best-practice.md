---
sidebar_position: 1
---

# Submit a Best Practice

Want to share your expertise with the SLIM community? Here's how to contribute a best practice as a skill, agent, or guide.

## Quick Start

**3 simple steps:**

1. **Create an issue** - [Start here](https://github.com/NASA-AMMOS/slim/issues/new) to discuss your idea
2. **Build your contribution** - Create a skill, agent, or guide
3. **Submit a pull request** - We'll review and help you merge it

---

## Step 1: Create an Issue

**Before coding, discuss your idea:**
- [Browse existing issues](https://github.com/NASA-AMMOS/slim/issues) to avoid duplicates
- [Create a new issue](https://github.com/NASA-AMMOS/slim/issues/new/choose) using a template:
  - "New Best Practice Guide"
  - "Improve Existing Guide"
  - "New Process Improvement Need"

**Why?** This helps the community provide early feedback and avoid duplicate work.

---

## Step 2: Build Your Contribution

### Option A: Use the Skill Creator (Recommended)

The easiest way to create a new skill is with **[slim-skill-creator](https://nasa-ammos.github.io/slim/?search=SLIM%20Skill%20Creator)**:

1. Install: [View in marketplace](https://nasa-ammos.github.io/slim/?search=SLIM%20Skill%20Creator)
2. Open your AI tool (Claude Code, Cursor, Windsurf, Aider, etc.)
3. Ask: "Create a new SLIM skill for [your best practice]"
4. Follow the interactive prompts

The skill creator handles everything: folder structure, templates, registry updates, and validation.

### Option B: Create Manually

**SLIM emphasizes automation through:**
- **Skills** - AI-powered workflows for best practices ([learn more](https://agentskills.io/home))
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
Add to `.claude-plugin/marketplace.json`:
```json
{
  "name": "your-skill-name",
  "description": "What it does and when to use it",
  "source": "./static/marketplace",
  "strict": false,
  "skills": ["./skills/your-skill-name"],
  "keywords": [
    "readme",
    "documentation",
    "project-setup",
    "templates",
    "onboarding"
  ]
}
```

NOTE: make sure to add your entry to the marketplace place JSON - that will ensure it gets properly detected and then inserted or updated into the `/maap-ai/static/data/registry.json` file.

**Need help?** See [skill development best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

---

## Step 3: Submit Your Pull Request

**Set up your fork:**
1. Fork [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim)
2. Clone: `git clone https://github.com/YourUsername/slim.git`
3. Work on the `main` branch
4. Enable GitHub Pages for preview at `https://your-username.github.io/slim`

**Submit as draft:**
1. Push your changes to your fork
2. Click "Contribute" → "Open pull request"
3. Mark as [draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests/) while iterating
4. Link related issues and provide demo link
5. Mark "Ready for review" when complete

**Get feedback:**
- Tag `@slim-community` or `@slim-committers` for faster review
- Share in [discussions](https://github.com/NASA-AMMOS/slim/discussions)
- Address review comments promptly

**Stay synced:**
```bash
git fetch upstream
git merge upstream/main
```

---

## Review & Merge Process

**We'll check for:**
- ✅ Clear purpose and documentation
- ✅ Follows SLIM standards
- ✅ Works with multiple AI tools
- ✅ Proper registry entry
- ✅ Live demo link provided

**Timeline:** We aim to review within a week. Complex contributions may need multiple review cycles.

---

## Resources

### Skill Development
- [slim-skill-creator](https://nasa-ammos.github.io/slim/?search=SLIM%20Skill%20Creator) - Automate skill creation (recommended)
- [AgentSkills.io](https://agentskills.io/home) - Community patterns & best practices
- [Claude Skills Guide](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) - Official documentation
- [SLIM Process Overview](/slim/docs/about/#our-process) - High-level workflow

### Getting Help
- [Discussions](https://github.com/NASA-AMMOS/slim/discussions) - Ask questions
- [Issues](https://github.com/NASA-AMMOS/slim/issues) - Report problems
- [Planning Board](https://github.com/orgs/NASA-AMMOS/projects/3/views/4) - Current priorities

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

**Questions?** Ask in [discussions](https://github.com/NASA-AMMOS/slim/discussions) or create an [issue](https://github.com/NASA-AMMOS/slim/issues).
