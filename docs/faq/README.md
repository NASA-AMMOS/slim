# Frequently Asked Questions (FAQ)

> _Common questions about GenAI Marketplace, the catalog, and how to get started with AI-powered best practices._

---

### Q: What use cases is GenAI Marketplace for?

GenAI Marketplace automates best practices across the entire GenAI development lifecycle. Use GenAI Marketplace to:

- Generate and maintain changelogs, READMEs, and documentation
- Create meeting agendas and summaries with action items
- Set up project governance (codes of conduct, contributing guidelines, issue templates)
- Implement security audits and vulnerability scanning
- Add licensing and intellectual property documentation
- Configure testing frameworks and continuous integration
- Establish project workspaces with organized folder structures
- Connect to external services (GitHub, Slack, Jira) via MCP servers
- Set up rebranding and visual identity updates
- Create custom workflows and skill templates
- and more...

GenAI Marketplace is ideal for standardizing practices across projects, onboarding teams faster, and modernizing codebases without manual implementation.

---

### Q: What do I need to leverage GenAI Marketplace best practices?

To use GenAI Marketplace best practices effectively, you're recommended to have an AI agent installed such as:

- **Claude Code** - Command-line AI agent by Anthropic
- **Cursor** - AI-powered code editor
- **Gemini Code Assist** - Google's AI coding assistant
- **Windsurf** - Agentic IDE by Codeium
- **Aider** - AI pair programming in your terminal
- Other AI assistants with skill/MCP support

**Important:** The AI agent needs to be an _agentic AI agent_ - not just a browser-based chatbot. It should be a command-line tool or IDE integration that can actually perform actions like reading/writing files, executing commands, and automating workflows.

**Using Individual Best Practices:**

Once you have an AI agent installed, browse the [marketplace](/) and select any best practice. Click the **"Install"** button on the artifact card to see installation instructions. After installing, you can use it by following the **example usage** provided. For instance:

- "Add a changelog to my project following Keep a Changelog standards"
- "Set up issue templates for my repository"
- "Generate a comprehensive README for this codebase"

**Combining Multiple Best Practices:**

The real power of GenAI Marketplace comes from combining multiple best practices in a single request. Your AI agent will intelligently invoke the appropriate tools and skills as needed. For example, you can say:

- _"Set up my project with a README, changelog, and MIT license"_ - The AI will automatically use the README Generator, Changelog Manager, and License Setup skills
- _"Initialize governance for my project including a code of conduct, contributing guidelines, and issue templates"_ - The AI orchestrates multiple governance artifacts
- _"Prepare my project for open source with proper documentation, licensing, and governance"_ - The AI determines which best practices are needed and applies them in the right order

Your AI agent understands the context and dependencies, automatically chaining together the necessary artifacts to accomplish your goal. This makes it easy to modernize entire aspects of your project with a single natural language request.

---

### Q: I want to use GenAI Marketplace for project-specific tasks that involve knowing about my project - not just the code, but the team, scope, requirements, experiments, etc. How do I get started?

For project-aware tasks that go beyond just code, we recommend starting with the **[Project-Aware Workspace](/?search=New%20Project-Aware%20Workspace)** skill. This skill sets up a project-ready workspace environment with:

- **Date-organized dynamic folders** for daily work
- **A static folder** for project context (team info, requirements, scope, etc.)
- **Integration tracking** for tools and services (MCP servers, APIs, scripts)
- **Organized structure** for meeting notes, summaries, and action items

Once you have the workspace set up, you can leverage several other artifacts that depend on it:

- **[Meeting Summary Generator](/?search=Meeting%20Summary)** - Automatically generates comprehensive meeting summaries with action items, using context from your project workspace
- **[Meeting Agenda Generator](/?search=Meeting%20Agenda)** - Creates meeting agendas by pulling context from previous summaries, GitHub issues, Slack discussions, and other project information

**To get started:** Search for ["New Project-Aware Workspace"](/?search=New%20Project-Aware%20Workspace) in the catalog above, install it, and then ask your AI agent to set up a new workspace for your project.

---

### Q: I want to customize the GenAI Marketplace website for my own project and provide a catalog for my own AI skills, agents, MCP servers, etc. How do I do that?

You can easily customize the GenAI Marketplace website for your own organization! Here's how:

**Step 1: Fork or Clone the Repository**

Start by forking or cloning the [GenAI Marketplace GitHub repository](https://github.jpl.nasa.gov/GenAI/genai-marketplace). This gives you a complete copy of the website that you can customize.

**Step 2: Rebrand the Website (Optional)**

If you want to update the look and feel to match your organization's branding, you can use the **[Rebranding Agent](/?search=Rebranding)** from the catalog. This agent can help you update colors, logos, names, and other visual elements throughout the site.

**Step 3: Customize Your Catalog**

The entire catalog is driven by two key components:

- **`static/data/registry.json`** - This JSON file contains all the metadata for your skills, agents, and MCP servers (names, descriptions, categories, tags, dependencies, etc.)
- **`static/marketplace/`** - This folder contains the actual files for each artifact (skill instructions, configuration files, assets, etc.)

To add your own artifacts:

1. Add your artifact folders to `static/marketplace/skills/`, `static/marketplace/mcp-servers/`, or `static/marketplace/agents/`
2. Update `static/data/registry.json` with the metadata for your new artifacts

**Step 4: Deploy**

You can host your customized website using **GitHub Pages**. Just enable GitHub Pages in your repository settings, and your catalog will be live!

**Pro tip:** Check out the existing artifacts in the marketplace folder to see examples of how to structure your own.

---

### Q: What's the difference between Skills, Agents, and MCP Servers in the catalog?

GenAI Marketplace provides three types of AI artifacts, each serving different purposes:

**Skills**

Skills are specialized instruction sets that guide AI agents to perform specific tasks. Think of them as "recipes" or "playbooks" that teach your AI how to handle particular workflows like creating changelogs, setting up governance, or generating documentation.

**Agents**

Agents are autonomous AI systems that can execute complex, multi-step workflows independently. They're more sophisticated than skills and can make decisions, call multiple tools, and orchestrate entire processes. Examples include the Rebranding Agent or custom workflow orchestrators.

**MCP Servers**

MCP (Model Context Protocol) Servers are integrations that connect AI agents to external services and APIs. They enable your AI to interact with tools like GitHub, Slack, Jira, databases, and more. Think of them as "bridges" that give AI agents access to real-world systems.

**Working Together:** These artifacts can be combined - for example, a Skill might depend on an MCP Server to access GitHub data, or an Agent might leverage multiple Skills to accomplish a complex task.

---

### Q: How do I contribute my own best practice to the catalog?

We welcome contributions from the JPL GenAI community! Here's how to add your own best practice:

1. **Review the guidelines:** Check out the [Submit a Best Practice](/docs/contribute/submit-best-practice) documentation to understand the requirements and structure
2. **Create your artifact:** Develop your skill, agent, or MCP server following the structure and conventions
3. **Test thoroughly:** Make sure your artifact works as expected and includes clear documentation
4. **Submit a pull request:** Add your artifact to the appropriate marketplace folder and update the registry.json file
5. **Community review:** The GenAI team will review your submission and provide feedback

Your contribution helps the entire JPL GenAI community modernize their practices. Thank you for giving back!

**→ [Full contribution guide](/docs/contribute/submit-best-practice)**

---

### Q: Can I use GenAI Marketplace best practices with my existing CI/CD pipeline?

Yes! GenAI Marketplace best practices are designed to complement and enhance your existing workflows. Many artifacts can be:

- Integrated into GitHub Actions or other CI/CD tools
- Run as part of pre-commit hooks
- Executed in automated testing pipelines
- Used for code review automation
- Incorporated into release processes

The artifacts are flexible and can be adapted to fit your team's specific workflow. Many teams use GenAI Marketplace to automate repetitive tasks like generating changelogs, creating documentation, enforcing governance policies, and maintaining consistency across projects.

**Tip:** Start small by integrating one or two artifacts that address your team's biggest pain points, then expand from there.

---

## Still have questions?

Join our community discussions or reach out on GitHub!

**→ [GitHub Discussions](https://github.jpl.nasa.gov/GenAI/genai-marketplace/discussions)**

**→ Contact: [rishi.verma@jpl.nasa.gov](mailto:rishi.verma@jpl.nasa.gov)**
