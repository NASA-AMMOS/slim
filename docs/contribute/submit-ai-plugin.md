---
sidebar_position: 1
---

# Submit a an AI marketplace plugin

Want to share your expertise with the JPL GenAI community? Here's how to contribute a best practice as a skill, agent, or guide.

## Quick Start

**3 simple steps:**

1. **Create an issue** - [Start here](https://github.jpl.nasa.gov/GenAI/genai-marketplace/issues/new) to discuss your idea
2. **Build your contribution** - Create a skill, agent, or guide
3. **Submit a pull request** - We'll review and help you merge it

---

## Step 1: Create an Issue

**Before coding, discuss your idea:**
- [Browse existing issues](https://github.jpl.nasa.gov/GenAI/genai-marketplace/issues) to avoid duplicates
- [Create a new issue](https://github.jpl.nasa.gov/GenAI/genai-marketplace/issues/new/choose) using a template:
  - "New Best Practice Guide"
  - "Improve Existing Guide"
  - "New Process Improvement Need"

**Why?** This helps the community provide early feedback and avoid duplicate work.

---

## Step 2: Build Your Contribution

### Option A: Use the Skill Creator (Recommended)

The easiest way to create a new skill is with **[skill-creator](/?search=Skill%20Creator)**:

1. Install: [View in marketplace](/?search=Skill%20Creator)
2. Open your AI tool (Claude Code, Cursor, Windsurf, Aider, etc.)
3. Ask: "Create a new skill for [your best practice]"
4. Follow the interactive prompts

The skill creator handles everything: folder structure, templates, registry updates, and validation.

### Option B: Create Manually

**GenAI Marketplace emphasizes automation through:**
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

NOTE: make sure to add your entry to the marketplace JSON - that will ensure it gets properly detected and then inserted or updated into the `/static/data/registry.json` file.

**Need help?** See [skill development best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

---

## Step 3: Submit Your Pull Request

**Set up your fork:**
1. Fork [GenAI/genai-marketplace](https://github.jpl.nasa.gov/GenAI/genai-marketplace)
2. Clone: `git clone https://github.jpl.nasa.gov/YourUsername/genai-marketplace.git`
3. Work on the `main` branch
4. Enable GitHub Pages for preview

**Submit as draft:**
1. Push your changes to your fork
2. Click "Contribute" → "Open pull request"
3. Mark as [draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests/) while iterating
4. Link related issues and provide demo link
5. Mark "Ready for review" when complete

**Get feedback:**
- Tag team members for faster review
- Share in [discussions](https://github.jpl.nasa.gov/GenAI/genai-marketplace/discussions)
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
- ✅ Follows marketplace standards
- ✅ Works with multiple AI tools
- ✅ Proper registry entry
- ✅ Live demo link provided

**Timeline:** We aim to review within a week. Complex contributions may need multiple review cycles.

---

## Resources

### Skill Development
- [skill-creator](/?search=Skill%20Creator) - Automate skill creation (recommended)
- [AgentSkills.io](https://agentskills.io/home) - Community patterns & best practices
- [Claude Skills Guide](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) - Official documentation
- [Process Overview](/docs/about/#our-process) - High-level workflow

### Getting Help
- [Discussions](https://github.jpl.nasa.gov/GenAI/genai-marketplace/discussions) - Ask questions
- [Issues](https://github.jpl.nasa.gov/GenAI/genai-marketplace/issues) - Report problems

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

**Questions?** Ask in [discussions](https://github.jpl.nasa.gov/GenAI/genai-marketplace/discussions), create an [issue](https://github.jpl.nasa.gov/GenAI/genai-marketplace/issues), or contact [rishi.verma@jpl.nasa.gov](mailto:rishi.verma@jpl.nasa.gov).
