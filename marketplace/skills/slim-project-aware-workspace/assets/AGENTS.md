# AI Agent Workspace Guide

## Overview

This workspace is designed for AI agents to work efficiently within a project-aware environment with organized file management and clear separation between static project information and dynamic work outputs.

## Workspace Structure

```
Workspace/
├── static/              # Project information and templates (READ-ONLY for context)
│   ├── PROJECT.md      # Core project information and goals
│   ├── TEAM.md         # Team members, roles, and contacts
│   ├── MEETINGS.md     # Meeting notes and decisions
│   ├── PRODUCTS.md     # Deliverables and product information
│   └── TECH.md         # Technology stack and tool integrations
├── dynamic/            # Agent work area (READ-WRITE for outputs)
│   └── [DATE]/         # Today's folder (YYYY-MM-DD format)
│       └── [task-folders] # Create subfolders for each task
└── AGENTS.md          # This guide (YOU ARE HERE)
```

## Agent Workflow

### Step 1: Review Static Information
**ALWAYS START HERE** - Before beginning any task:

1. **Read `static/PROJECT.md`** to understand:
   - Project goals and objectives
   - Current status and priorities
   - Key requirements and constraints

2. **Review `static/TEAM.md`** for:
   - Team member roles and expertise
   - Contact information and responsibilities
   - Collaboration guidelines

3. **Check `static/MEETINGS.md`** for:
   - Recent decisions and context
   - Outstanding action items
   - Project direction changes

4. **Examine `static/PRODUCTS.md`** for:
   - Expected deliverables
   - Quality standards and requirements
   - Timeline and milestone information

5. **Review `static/TECH.md`** for:
   - Technology stack and tools in use
   - Project-specific resource URLs (Slack channels, GitHub repos, etc.)
   - Available MCP servers, APIs, and scripts for tool integration
   - Integration capabilities for accessing external systems

### Step 2: Work in Dynamic Folder
**ALL OUTPUT GOES HERE** - For any task execution:

1. **Navigate to today's folder**: `dynamic/[TODAY]/`
   - Format: `dynamic/2024-12-24/` (YYYY-MM-DD)
   - Create if it doesn't exist

2. **Create task-specific subfolders**:
   ```
   dynamic/2024-12-24/
   ├── analysis/          # Data analysis and insights
   ├── reports/           # Generated reports and summaries
   ├── code/              # Code development and scripts
   ├── research/          # Research findings and notes
   ├── drafts/            # Work-in-progress documents
   └── outputs/           # Final deliverables
   ```

3. **Use descriptive naming**:
   - Include task context in folder names
   - Use timestamps for iterations if needed
   - Example: `analysis-user-feedback-20241224-v2/`

### Step 3: Maintain Organization
**KEEP WORK ORGANIZED** - Throughout task execution:

1. **Reference static information** as needed for context
2. **Document your process** in markdown files within task folders
3. **Save intermediate results** for potential reuse
4. **Create clear file names** that indicate purpose and version

## Usage Guidelines

### DO:
- ✅ Always read static/ folder first for project context
- ✅ Create organized subfolders in dynamic/[DATE]/ for each task
- ✅ Use descriptive file and folder names
- ✅ Reference project information when making decisions
- ✅ Save both intermediate and final outputs
- ✅ Document your reasoning and process

### DON'T:
- ❌ Write or modify files in the static/ folder
- ❌ Create files in the root workspace directory
- ✅ Put outputs in previous days' folders (use today's date)
- ❌ Mix unrelated tasks in the same subfolder
- ❌ Ignore project context from static files

## Task Execution Pattern

For each new task, follow this pattern:

```markdown
1. CONTEXT: Review relevant static/ files
2. PLAN: Create appropriate subfolder in dynamic/[TODAY]/
3. WORK: Execute task with organized outputs
4. DOCUMENT: Save process notes and decisions
5. DELIVER: Place final outputs in clearly named files
```

## File Organization Best Practices

### Naming Conventions:
- **Folders**: lowercase with hyphens (`user-analysis`, `weekly-report`)
- **Files**: descriptive with context (`project-summary-2024-12-24.md`)
- **Versions**: append version indicators (`v1`, `v2`, `final`)

### Content Organization:
- **One task per subfolder** in daily directory
- **Related files together** within task subfolders
- **Clear hierarchies** for complex tasks with sub-components
- **Markdown documentation** for processes and decisions

## Agent Behavior Expectations

### Information Processing:
1. **Parse static files** to understand project context
2. **Extract relevant constraints** and requirements
3. **Identify key stakeholders** and their needs
4. **Understand success criteria** from project documentation

### Work Execution:
1. **Plan approach** based on project context
2. **Create organized workspace** for the task
3. **Execute with awareness** of project goals
4. **Document decisions** and reasoning
5. **Produce structured outputs** ready for review

### Quality Assurance:
1. **Verify alignment** with project objectives
2. **Check completeness** against requirements
3. **Ensure organization** follows established patterns
4. **Validate outputs** meet expected standards

---

*This workspace enables project-aware AI task execution with organized daily workflows and persistent project context.*
