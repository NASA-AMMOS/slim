---
name: slim-meeting-agenda
description: Write comprehensive meeting agendas by orchestrating context gathering from previous summaries, querying external services (GitHub, Slack, etc. via TECH.md), and matching custom format templates. Automatically identifies and suggests generation of missing meeting summaries. Use when preparing for upcoming meetings and need structured agenda with context from multiple sources.
---

# Meeting Agenda

## Overview

Writes meeting agendas by orchestrating context from multiple sources: previous meeting summaries, external services (via TECH.md), and custom templates. Supports natural language date inputs and flexible template formats.

## Dependencies

**Required Skills:**
- `slim-project-aware-workspace`: Provides AGENTS.md and static files (PROJECT.md, TEAM.md, PRODUCTS.md, MEETINGS.md, TECH.md)

**Related Skills:**
- `slim-meeting-summary`: Used to generate missing summaries when needed

**External Tools** (discovered dynamically from TECH.md):
- MCP Servers, APIs, or scripts for GitHub, Slack, email, etc.

## Prerequisites

- slim-project-aware-workspace initialized with all static files current
- MEETINGS.md includes meeting metadata (frequency, attendees, optional template reference)
- TECH.md configured with available MCP servers/APIs/scripts (optional but recommended)

## Execution

**To generate a meeting agenda, follow [WORKFLOW.md](WORKFLOW.md).**

The workflow guides you through gathering user inputs, discovering meeting metadata, checking for previous summaries, querying external services, and generating the final agenda.

## Critical Non-Obvious Requirements

### 1. Consolidated Folder Structure

**All files for one agenda go in ONE folder:**

```
dynamic/[agenda-date]/meeting-agendas/[meeting-name]/
├── meeting-agenda-[meeting-name].[ext]  ← Final agenda at ROOT
└── prep/                                ← Prep work in SUBFOLDER
    ├── context/
    ├── previous-summaries/
    ├── external-context/
    └── template/
```

**Do NOT create separate folders** for prep work and final agenda.

### 2. Format Matching Requirement

**The generated agenda MUST match the template in:**
- **File type** (.md, .docx, or .txt)
- **Structure** (sections, ordering)
- **Formatting style** (tables, lists, headers)

Analyze the template carefully before generation. Default template: [assets/meeting-agenda-template.md](assets/meeting-agenda-template.md)

### 3. No Summary Files

**Do NOT create intermediate summary files** (e.g., context-summary.md). Use prep files directly during generation to save tokens.

### 4. Meeting Frequency Calculation

Calculate expected meeting dates based on MEETINGS.md frequency field (e.g., "Weekly", "Biweekly") to identify which summaries should exist.

### 5. On-Demand Summary Generation

When summaries are missing, **guide user to invoke slim-meeting-summary** (skills cannot invoke each other programmatically). Provide clear instructions and wait for confirmation. Suggest the user execute the slim-meeting-summary skill in a separate AI instance for all needed meetings to maintain proper context within the current skill. 

## Troubleshooting

**Issue: Cannot find AGENTS.md**
- Run slim-project-aware-workspace first

**Issue: Meeting not in MEETINGS.md**
- Prompt user for metadata manually or guide them to update MEETINGS.md

**Issue: No previous summaries found**
- Guide user to generate with slim-meeting-summary OR proceed without

**Issue: Multiple meetings match search**
- Display all matches and let user choose

---

**For detailed step-by-step execution, see [WORKFLOW.md](WORKFLOW.md).**
