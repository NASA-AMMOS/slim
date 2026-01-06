---
name: slim-project-aware-workspace
description: Sets up a folder based project-aware workspace area on local disk with date-organized dynamic folders for project-aware skill execution and a static folder for relevant information about a project such as personnel, project background, meeting information, products, repos etc. This skill is a foundation skill that sets up structures that allow other AI skills to operate within a project-aware workspace with automatic date-based folder management. For example, skills such as generating executive summaries, writing meeting notes, writing meeting agendas or other skills that involve working with third-party services to coordinate complex behaviors can benefit from the skill.
---

# Project-Aware Workspace

## Overview

Initialize an AI-powered task workspace folder strucuture that provides organization for running multiple skills within a project-aware environment. This skill creates a workspace foundation with date-based organization that enables other skills to operate efficiently while maintaining project context and daily work organization.

This skill should be used when:
- Starting a new AI project or task that needs organized workspace structure
- Needing a place to store project context information, such as background, personnel, list of repositories, communication channels, etc. 
- Setting up a project-aware environment for running multiple skills
- Creating a workspace where daily work can be organized and tracked
- Beginning any project that needs date-organized dynamic content management

Example project-aware workspace folder structure that will be created:

```
WorkspaceName/
├── AGENTS.md                  # AI agent workspace guide
├── CLAUDE.md                  # Symbolic link to AGENTS.md
├── dynamic/                   # Date-organized dynamic content
│   └── 2024-12-24/           # Today's folder (YYYY-MM-DD format)
│       └── [ready for skill subfolders]
└── static/                    # Project documentation and templates
    ├── PROJECT.md            # Project information template
    ├── TEAM.md              # Team and collaboration info
    ├── MEETINGS.md          # Meeting notes template
    ├── PRODUCTS.md          # Product/deliverables tracking
    └── TECH.md              # Technology stack and tool integrations
```

## Steps

### Step 1: Gather Workspace Information

Ask the user:
- What would you like to name your project-aware workspace?
- Where should the workspace be created? (optional - defaults to current directory)

### Step 2: Initialize the Workspace

Execute the creation script:

```bash
python scripts/create_ai_workspace.py <workspace_name> [base_path]
```

### Step 3: Customizing the static folder

Do the following to finalize setup:
- For each file within the `static/` directory that was just generated, ask the user to provide any URLs, upload documents, links to documentation, textual input, etc., that can be used to fill in the respective template.
  - `MEETINGS.md`: Ask the user to provide ICS calendar files for all the meetings being held or ask the user to provide some textual information based on the template requirements.
  - `PRODUCTS.md`: Ask the user to provide a requirements document, of file listing key deliverables or even a list of software repositories to help fill out this template. it. Free text is also an option for the user to provide information.
  - `TEAM.md`: Ask the user to provide a document containing the information that's needed to fill out this template or free text that includes contact information as well as names, descriptions, and the other information that's needed for this template for each team member.
  - `TECH.md`: Ask the user to list the tools used in their tech stack (e.g., Slack, GitHub, JIRA, Google Docs). For each tool, collect: (1) URLs to project-specific resources (channels, repos, workspaces, etc.), (2) MCP server URLs, API endpoints, or local scripts that enable AI agent integration with the tool. Use the commented examples in the template as a guide.
- Each template may have differing information needs, so make sure to ask the user are relevant information only. 

### Step 4: Provide an Example

Based on the information within the static folder, Try generating a markdown file within the dynamic folder for the current day that summarizes information from or about the project, project, including from any URLs or any other third-party services that may have been listed. You can generate examples such as a pitch deck paragraph about the project or a meeting note agenda based on the most recent information about the project and what to talk about next, etc. 

## Resources

### Need to Customize:
- [assets/PROJECT.md](assets/PROJECT.md)] - Core project information and goals
- [assets/TEAM.md](assets/TEAM.md)] - Team members, roles, and collaboration details
- [assets/MEETINGS.md](assets/MEETINGS.md)] - Meeting notes and decision tracking
- [assets/PRODUCTS.md](assets/PRODUCTS.md)] - Deliverables and product tracking
- [assets/TECH.md](assets/TECH.md)] - Technology stack and tool integrations (MCP servers, APIs, scripts)

Templates include placeholder text in brackets `[like this]` for users to customize with their project-specific information.

### No need to customize:
- [scripts/create_ai_workspace.py](create_ai_workspace.py) - Core script that initializes the project-aware workspace with date-based dynamic folders
- [assets/AGENTS.md](assets/AGENTS.md)] - AI agent workspace guide with workflow instructions (no need to modify!)
