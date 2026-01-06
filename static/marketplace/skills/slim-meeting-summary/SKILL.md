---
name: slim-meeting-summary
description: Write comprehensive meeting summaries with action items from meeting notes, transcripts, or agendas. Automatically fulfills actionable tasks using available tools discovered from TECH.md (MCP servers, APIs, local scripts) and provides guidance for manual tasks. Use when creating meeting summaries, extracting action items, or preparing agendas for upcoming meetings by reviewing past summaries.
---

# Meeting Summary

## Overview

Writes structured meeting summaries with action items from meeting notes/transcripts/agendas. Leverages workspace context files to enhance accuracy and automatically fulfills action items using discovered automation tools.

**Key Features:**
- Loads all static files (PROJECT.md, TEAM.md, PRODUCTS.md, MEETINGS.md, TECH.md) for context
- Corrects errors, disambiguates names, fills missing information using project context
- Discovers meeting metadata from MEETINGS.md
- Discovers automation tools from TECH.md dynamically
- Enters plan mode before executing automatable action items
- Supports multiple owners per action item (comma-separated)

## Dependencies

**Required Skills:**
- `slim-project-aware-workspace`: Creates workspace with AGENTS.md and static files

**Dynamically Discovered Tools** (from TECH.md at runtime):
- MCP Servers: github-mcp-server, slack-mcp-server, outlook-mcp-server, etc.
- API Endpoints with credentials
- Local scripts for external service communication

## Prerequisites

- slim-project-aware-workspace initialized
- All static files exist and are current:
  - static/PROJECT.md (project info)
  - static/TEAM.md (team members, roles)
  - static/PRODUCTS.md (products, deliverables)
  - static/MEETINGS.md (recurring meeting metadata)
  - static/TECH.md (automation tools)

## Interactive Workflow

### Step 1: Workspace Verification
Verify AGENTS.md and all static files exist. Guide user to run slim-project-aware-workspace if missing.

### Step 2: Project Context Loading
**CRITICAL**: Load all static files for comprehensive context:
- **PROJECT.md**: Project goals, background, initiatives
- **TEAM.md**: Team members, roles, contacts
- **PRODUCTS.md**: Products, deliverables, repositories
- **MEETINGS.md**: Recurring meeting metadata
- **TECH.md**: Available automation tools

**Use context to:**
- Correct typos in names/projects/products
- Fill missing context (roles, full names)
- Disambiguate abbreviations/acronyms
- Validate information against known data

**Example enhancements:**
```
Input: "Bob mentioned the auth bug"
+ TEAM.md: Bob Smith (Senior Developer, Auth Team)
→ Output: "Bob Smith (Senior Developer) mentioned authentication service bug"

Input: "Alice will follow up"
+ TEAM.md: Alice Johnson (Project Manager)
→ Action: Assigned to Alice Johnson (Project Manager)
```

### Step 3: Meeting Input Gathering
Prompt for input format (markdown/Word/text/paste). Parse and cross-reference with loaded context.

### Step 4: Meeting Metadata Discovery
**MEETINGS.md matching logic:**
1. Extract meeting title from input
2. Scan MEETINGS.md for partial match (case-insensitive)
3. If match: extract attendees, cross-reference with TEAM.md for roles, extract type
4. If no match: prompt user for metadata
5. Use markdown lists for attendees (not comma-separated)

**MEETINGS.md format:**
```markdown
## Weekly Team Standup
- **Schedule**: Every Monday, 10:00 AM PST
- **Attendees**: Alice (PM), Bob (Dev), Carol (Design)
- **Type**: Status Update
```

### Step 5: Available Tools Discovery
**TECH.md parsing logic:**
```
For each section in TECH.md:
  - Extract section header (GitHub, Slack, Email, etc.)
  - Look for "MCP Server/API/Script:" line
  - Extract tool type and availability
  - Map to action categories:
    * GitHub/Jira → technical tasks (issues, PRs)
    * Slack → coordination (messages)
    * Email → communication (drafts)
```

**TECH.md format:**
```markdown
## GitHub
- **Resources:**
  - https://github.com/org/repo
- **MCP Server/API/Script:** github-mcp-server (installed)

## Slack
- **Resources:**
  - #team-channel
- **MCP Server/API/Script:** /usr/local/bin/slack-send.py
```

### Step 6: Meeting Summary Generation
Use meeting-summary-template.md. Fill metadata from MEETINGS.md or user input. Apply context from PROJECT.md, TEAM.md, PRODUCTS.md to correct/enrich. Extract action items, assign owners (single or multiple, comma-separated), assign due dates. Generate with markdown lists for multi-value fields.

### Step 7: File Creation
Create: `dynamic/[YYYY-MM-DD]/meeting-summaries/meeting-summary-[title].md` (no date in filename)

### Step 8: Action Item Automation Analysis
Scan action items table. For each item, determine if automatable using TECH.md tools. Build list of automatable items with execution plan.

### Step 9: Action Item Fulfillment Planning
**Enter Plan Mode**. Present automation plan:
- List automatable items
- Show which tool will be used
- Describe action (e.g., "Create GitHub issue 'Fix auth bug' assigned to Bob")
- Get user approval

### Step 10: Execute Automated Action Items
For approved items: use appropriate tool, execute automation, capture results, update table with links/status.
For non-automatable items: provide guidance and drafts.

### Step 11: Validation and Review
Display file location, show completed/pending items, update summary with results.

## Template Structure

**Review and Follow This Template:**: [Meeting Summary Table](assets/meeting-summary-template.md)

**Key points:**
- Attendees: markdown list format (not comma-separated)
- Owners: comma-separated for multiple (e.g., "Alice, Bob")
- NO Automation column (determined during post-processing)
- NO Follow-up or Next Steps sections

## Context Enhancement Pattern

**Static Files Used:**
- PROJECT.md: Project goals, background, initiatives
- TEAM.md: Team members, roles, contacts, expertise
- PRODUCTS.md: Products, deliverables, repositories, releases
- MEETINGS.md: Recurring meeting metadata
- TECH.md: Automation tools

**Application:**
- Error correction: Fix typos in names/projects
- Context enrichment: Add roles, full names, project details
- Disambiguation: Clarify abbreviations and acronyms
- Validation: Verify against known data

## Meeting Agenda Generation

Can generate agendas for upcoming meetings:
1. Read previous summaries from `dynamic/[date]/meeting-summaries/`
2. Extract pending action items
3. Identify follow-up topics
4. Generate draft agenda with action review section

## Action Item Categorization

**Coordination/Communication**: Schedule meetings, send messages, share info, coordinate teams
**Technical**: Create issues, fix bugs, implement features, update docs, deploy changes

## Tool Discovery

Build capability map from TECH.md:
- Parse sections to extract tool type
- Match action types to tools (GitHub→issues, Slack→messages, Email→drafts)
- Prefer MCP servers over scripts
- Mark automatable only if tool available

## Best Practices

- Keep all static files current for best context
- Be specific with action item descriptions
- Assign owners to every action item
- Update TECH.md when tools change
- Review generated summaries for accuracy

## FAQ

**Q: Can I use without MCP servers?**
A: Yes, generates summaries with guidance for manual action items.

**Q: What if meeting not in MEETINGS.md?**
A: Skill prompts for metadata.

**Q: How does it correct errors?**
A: Loads static files and uses context to fix typos/fill missing info.

**Q: Multiple owners?**
A: Yes, comma-separated in Owners column.

## Troubleshooting

- **Static files missing**: Run slim-project-aware-workspace
- **Tools not detected**: Update TECH.md with proper format
- **Names/roles incorrect**: Update TEAM.md
- **Projects not recognized**: Update PROJECT.md and PRODUCTS.md

---
