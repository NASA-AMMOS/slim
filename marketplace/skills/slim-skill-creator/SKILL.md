---
name: slim-skill-creator
description: Meta-skill for creating and integrating new best practices (skills, agents, MCP servers) into the SLIM marketplace with dependency tracking and automated registry updates. Use when users want to create custom skills, develop specialized workflows, build skill templates, add new capabilities to SLIM, create project-specific tools, or integrate skills with marketplace infrastructure.
---

# SLIM Best Practice Creator

## Overview

Create and integrate new Claude skills, autonomous agents, and MCP servers into the SLIM marketplace through an automated, guided workflow. This meta-skill combines the power of Claude's skill-creator with SLIM-specific marketplace patterns, dependency management, and automatic registry integration.

Unlike standalone creation tools, this skill ensures your new best practices follow SLIM marketplace conventions, include proper dependency tracking, integrate seamlessly with the marketplace infrastructure, and are automatically registered for distribution.

## Prerequisites

- **Access to SLIM marketplace structure**: Working within a SLIM project with marketplace directory
- **Basic understanding of Claude skills, agents, and MCP servers**: Familiarity with SLIM best practice concepts
- **Python environment**: For running management scripts
- **Git repository access**: For committing new best practices to marketplace

## Artifact Type Selection

### Step 0: Choose Your Best Practice Type

**I will first help you determine which type of best practice to create:**

**Option A: Claude Code Skill**
- Interactive step-by-step workflows that guide users through specific tasks
- User-facing functionality with prompts and decision points
- Use when: You want to create reusable workflows, templates, or guided procedures
- Examples: Documentation generators, setup wizards, analysis tools

**Option B: Autonomous Agent**
- Semi-autonomous tools that execute complex tasks with minimal user intervention
- Plan-execute workflows with built-in validation and error handling
- Use when: You want to automate complex multi-step processes
- Examples: Rebranding agents, migration tools, comprehensive auditing systems

**Option C: MCP Server**
- Model Context Protocol servers that provide external service integration
- API wrappers and service connectors for Claude Code
- Use when: You want to integrate external services, databases, or APIs
- Examples: GitHub integration, database connections, third-party service APIs

*Which type of best practice would you like to create? Please specify A, B, or C, or describe your specific needs.*

## Interactive Workflow

### Step 1: Requirements Gathering

**I will gather comprehensive information about your best practice requirements:**

**Core Information:**
- What is the name? (use lowercase with hyphens, e.g., 'pdf-analyzer', 'data-migration-agent', 'slack-mcp-server')
- What is the display name for the marketplace? (e.g., 'PDF Document Analyzer', 'Data Migration Agent', 'Slack MCP Server')
- What does this best practice do? (comprehensive description of functionality)
- When should this be used? (specific use cases and contexts)

**Functionality Requirements:**
- What are the main capabilities this should provide?
- What types of user needs or automation requirements does this address?
- Are there specific file types, formats, domains, or services this works with?

**Dependencies and Integration:**
- Does this require other SLIM skills, agents, or MCP servers to function?
- Does this need specific external services, APIs, or tools?
- Are there any special authentication, credentials, or access requirements?

**Resource Requirements:**
- Do you need Python/Node.js scripts for automation or complex operations?
- Do you have template files, configuration files, or assets to include?
- Do you have reference documentation, API guides, or setup instructions to bundle?

### Step 2: Type-Specific Creation

Based on your selection from Step 0, I will follow the appropriate creation path:

## Path A: Claude Code Skill Creation

**For interactive step-by-step workflows:**

1. **Invoke skill-creator**: Use document-skills:skill-creator to create the foundational skill structure
2. **Generate base SKILL.md**: Create comprehensive workflow instructions with user interaction patterns
3. **Establish resource structure**: Set up scripts/, assets/, and initial file organization
4. **Implement interactive workflows**: Develop user prompting and decision point logic

## Path B: Autonomous Agent Creation

**For semi-autonomous task automation:**

1. **Design agent architecture**: Plan the autonomous workflow with validation checkpoints
2. **Generate base AGENT.md**: Create agent description with capabilities and dependencies
3. **Establish agent structure**: Set up autonomous workflows, error handling, and validation
4. **Implement planning logic**: Develop plan-execute patterns with user approval gates

## Path C: MCP Server Creation

**For external service integration:**

1. **Design MCP interface**: Plan the server capabilities and API endpoints
2. **Generate base MCP.md**: Create server description with setup and authentication instructions
3. **Establish server structure**: Set up MCP protocol implementation and API wrappers
4. **Implement service integration**: Develop external service connections and error handling

### Step 3: SLIM Marketplace Integration

**Transform the base creation for SLIM marketplace compatibility:**

#### A. Directory Structure Alignment

Based on the selected type, I will establish the appropriate SLIM marketplace structure:

**For Skills:**
```bash
python scripts/create-skill-directory.py [name]
```
Creates: `static/marketplace/skills/[name]/SKILL.md`, `scripts/`, `assets/`

**For Agents:**
```bash
python scripts/create-agent-directory.py [name]
```
Creates: `static/marketplace/agents/[name]/AGENT.md`, `scripts/`, `assets/`

**For MCP Servers:**
```bash
python scripts/create-mcp-directory.py [name]
```
Creates: `static/marketplace/mcp-servers/[name]/MCP.md`, `src/`, `assets/`

#### B. Enhanced Documentation Creation

Using type-specific templates, I will generate comprehensive documentation that includes:

**Required SLIM Sections (All Types):**
- **Dependencies**: Document required skills, agents, and MCP servers
- **Prerequisites**: SLIM-specific requirements and setup
- **When to Use**: Clear triggering contexts and use cases
- **Integration Guidelines**: SLIM marketplace best practices

**Type-Specific Content:**
- **Skills**: Interactive workflows, user prompting patterns, asset management
- **Agents**: Autonomous workflows, validation checkpoints, plan-execute patterns
- **MCP Servers**: Installation instructions, authentication setup, API documentation

### Step 4: Category and Tag Assignment

**Intelligent categorization using registry analysis:**

```bash
# Execute extract-categories.py to analyze existing marketplace patterns
python scripts/extract-categories.py
```

Based on your best practice's functionality, I will:

1. **Analyze existing categories**: Review current marketplace organization across skills, agents, and MCP servers
2. **Suggest appropriate category**: Map your creation to existing category structure (project-setup, documentation, security, etc.)
3. **Generate relevant tags**: Create searchable tags based on functionality and type
4. **Validate categorization**: Ensure consistency with marketplace patterns and type-specific conventions

### Step 5: Dependency Documentation

**Comprehensive dependency tracking for all types:**

In your documentation file (SKILL.md, AGENT.md, or MCP.md), I will create a detailed Dependencies section:

```markdown
## Dependencies

### Required SLIM Best Practices
- **Skills**: `[skill-name]` - Brief description of why this skill is needed
- **Agents**: `[agent-name]` - Specific autonomous functionality this agent provides
- **MCP Servers**: `[mcp-server-name]` - External service integration provided

### External Requirements
- **Authentication**: API keys, credentials, or tokens needed
- **Software**: Prerequisites or system requirements (Node.js, Python, etc.)
- **Services**: External APIs, databases, or third-party services

### Installation Order
1. Install required MCP servers: [specific commands]
2. Install dependent agents: [specific commands]
3. Install dependent skills: [specific commands]
4. Install this best practice: [installation command]
```

### Step 6: Registry Integration

**Automatic registry.json updates based on type:**

Based on your selection, I will execute the appropriate registry update command:

```bash
# For Skills
python scripts/update-registry.py [name] [category] [tags] --type=skill

# For Agents
python scripts/update-registry.py [name] [category] [tags] --type=agent

# For MCP Servers
python scripts/update-registry.py [name] [category] [tags] --type=mcp
```

This process:

1. **Parses existing registry**: Maintains structure and formatting consistency across all types
2. **Generates type-specific entry**: Creates complete marketplace entry with all required fields
3. **Validates JSON syntax**: Ensures registry remains valid after updates
4. **Creates backup**: Saves original registry before modifications
5. **Integrates seamlessly**: Adds your best practice without disrupting existing entries

**Generated Registry Entry Examples:**

**For Skills:**
```json
{
  "name": "[name]",
  "displayName": "[Display Name]",
  "description": "[Marketplace description]",
  "category": "[category]",
  "tags": ["[relevant-tags]"],
  "lastUpdated": "2025-01-05",
  "skill_file_url": "/slim/marketplace/skills/[name]/SKILL.md",
  "type": "skill"
}
```

**For Agents:**
```json
{
  "name": "[name]",
  "displayName": "[Display Name]",
  "description": "[Marketplace description]",
  "category": "[category]",
  "tags": ["[relevant-tags]"],
  "lastUpdated": "2025-01-05",
  "skill_file_url": "/slim/marketplace/agents/[name]/AGENT.md",
  "type": "agent"
}
```

**For MCP Servers:**
```json
{
  "name": "[name]",
  "displayName": "[Display Name]",
  "description": "[Marketplace description]",
  "category": "[category]",
  "tags": ["[relevant-tags]"],
  "lastUpdated": "2025-01-05",
  "repository": {
    "url": "https://github.com/[user]/[name]",
    "type": "git"
  },
  "skill_file_url": "/slim/marketplace/mcp-servers/[name]/MCP.md",
  "type": "mcp",
  "npm_package": "@[user]/[name]"
}
```

### Step 7: Quality Validation

**Comprehensive validation for all types:**

Based on the type selected, I will execute the appropriate validation:

```bash
# For Skills
python scripts/validate-skill.py [name]

# For Agents
python scripts/validate-agent.py [name]

# For MCP Servers
python scripts/validate-mcp.py [name]
```

**Universal Validation Checklist:**
- ✅ Documentation file (SKILL.md/AGENT.md/MCP.md) has proper YAML frontmatter
- ✅ Directory structure follows SLIM marketplace conventions
- ✅ Dependencies section is complete and accurate
- ✅ All referenced assets and scripts exist and are accessible
- ✅ Registry entry is valid and properly formatted
- ✅ Categorization and tagging are appropriate

**Type-Specific Validation:**

**Skills:**
- ✅ Interactive workflow includes proper user prompting patterns
- ✅ Step-by-step instructions are clear and actionable
- ✅ Asset management documentation is comprehensive

**Agents:**
- ✅ Autonomous workflow includes validation checkpoints
- ✅ Plan-execute patterns are properly documented
- ✅ Error handling and rollback procedures are included

**MCP Servers:**
- ✅ Installation and authentication instructions are complete
- ✅ API endpoint documentation is thorough
- ✅ External service integration is properly configured

### Step 8: Testing and Integration

**Verify best practice functionality:**

**Universal Testing:**
1. **Local Testing**: Test basic functionality and triggering
2. **Dependency Verification**: Confirm all dependencies are properly documented and available
3. **Registry Validation**: Verify registry.json remains valid and complete
4. **Marketplace Integration**: Confirm best practice appears in marketplace correctly

**Type-Specific Testing:**

**Skills:**
- **Interactive Testing**: Verify user prompting and workflow execution
- **Asset Testing**: Confirm all templates and resources are accessible
- **Installation Testing**: Test skill installation and activation

**Agents:**
- **Autonomous Testing**: Verify agent execution and validation checkpoints
- **Plan Testing**: Confirm plan generation and user approval workflow
- **Error Handling Testing**: Test rollback and error recovery procedures

**MCP Servers:**
- **Connection Testing**: Verify external service connectivity
- **Authentication Testing**: Confirm credential handling and security
- **API Testing**: Test all endpoint functionality and error handling

## Best Practice Development Patterns

### Interactive User Workflows (Skills)

**Essential Pattern**: All SLIM marketplace skills should include interactive user prompting:

```markdown
### Step N: User Selection/Configuration
**I will present options and gather your preferences:**

**Option A**: [Description of first approach]
- Use when: [specific conditions]
- Benefits: [advantages]

**Option B**: [Description of second approach]
- Use when: [different conditions]
- Benefits: [different advantages]

*Which option would you prefer? Please specify A or B, or describe your specific needs.*
```

### Autonomous Workflows (Agents)

**Essential Pattern**: All SLIM marketplace agents should include validation checkpoints:

```markdown
### Step N: Automated Execution with Validation
**I will execute the following actions with your approval:**

1. **Analysis Phase**: [What the agent will analyze]
2. **Proposed Changes**: [What modifications will be made]
3. **Validation Steps**: [How results will be verified]
4. **Rollback Plan**: [How to undo changes if needed]

*Do you approve this execution plan? I will proceed only with your confirmation.*
```

### Service Integration (MCP Servers)

**Essential Pattern**: All SLIM marketplace MCP servers should include comprehensive setup:

```markdown
### Authentication Setup
**Required credentials and configuration:**

1. **Service Account**: [How to create service credentials]
2. **Environment Variables**: [Required environment configuration]
3. **Connection Testing**: [How to verify connectivity]
4. **Error Handling**: [Common issues and troubleshooting]

*Follow these steps to establish secure, reliable integration.*
```

### Asset Organization

**Templates and Resources**: Organize assets by purpose and type:

**Universal Organization:**
- **Assets/**: Templates, documentation, and configuration files
- **Documentation**: Reference materials, guides, and setup instructions

**Type-Specific Organization:**

**Skills:**
- **Scripts/**: Python automation for complex operations
- **Templates/**: Reusable file templates with placeholder markers

**Agents:**
- **Scripts/**: Autonomous execution scripts and validation tools
- **Templates/**: Configuration templates and workflow definitions

**MCP Servers:**
- **Src/**: Server implementation and API endpoint code
- **Config/**: Authentication and connection configuration templates

### Dependency Management

**Clear Documentation**: Always specify:
- **Installation order**: Step-by-step dependency installation for all types
- **Verification steps**: How to confirm dependencies are working
- **Troubleshooting**: Common dependency issues and solutions
- **Version requirements**: Specific version constraints if applicable

## Best Practices

### Naming Conventions
**Universal Naming Rules:**
- Use lowercase with hyphens: `data-analyzer`, `migration-agent`, `slack-mcp-server`
- Include purpose in name: `github-webhook-handler`, `rebranding-agent`, `database-mcp`
- Avoid redundant terms: Use `license` not `license-manager`
- Keep names concise but descriptive

**Type-Specific Naming:**
- **Skills**: End with function: `pdf-analyzer`, `readme-generator`
- **Agents**: End with `agent`: `migration-agent`, `security-agent`
- **MCP Servers**: End with `mcp-server`: `github-mcp-server`, `slack-mcp-server`

### Description Writing
**Universal Guidelines:**
- Include both WHAT it does and WHEN to use it
- List specific triggering contexts and use cases
- Cover all major functionality areas
- Use action-oriented language

**Type-Specific Guidelines:**
- **Skills**: Focus on user interaction and step-by-step guidance
- **Agents**: Emphasize autonomous capabilities and validation features
- **MCP Servers**: Highlight external service integration and API coverage

### Resource Management
**Universal Resource Management:**
- Place all templates and documentation in assets/ directory
- Use meaningful file names with clear extensions
- Include comprehensive documentation for all resources
- Provide clear usage instructions for each asset

**Type-Specific Resource Management:**
- **Skills**: Focus on template organization and user guidance materials
- **Agents**: Emphasize validation scripts and rollback procedures
- **MCP Servers**: Prioritize configuration templates and API documentation

### Registry Integration
- Choose categories that match existing patterns across all types
- Use tags that improve searchability and type identification
- Provide clear, marketing-friendly descriptions
- Ensure metadata follows SLIM conventions for the specific type

## FAQ

**Q: Can I create best practices that depend on other custom skills, agents, or MCP servers?**
A: Yes, document dependencies in the Dependencies section and ensure installation order is clear.

**Q: What if my best practice needs external APIs or services?**
A: Document these in Dependencies under External Requirements with setup instructions.

**Q: How do I update an existing best practice in the marketplace?**
A: Use this meta-skill to regenerate the structure, then update version numbers in registry.json.

**Q: Can I create best practices for internal/private use?**
A: Yes, omit the registry integration step and maintain your best practice locally without marketplace registration.

**Q: What if I need multiple scripts or complex assets?**
A: Organize them clearly in appropriate directories (scripts/, assets/, src/) with documentation explaining their purposes.

**Q: What's the difference between skills, agents, and MCP servers?**
A: **Skills** are interactive workflows, **Agents** are autonomous task executors, **MCP Servers** provide external service integration.

**Q: Can agents and MCP servers depend on skills?**
A: Yes, agents and MCP servers can depend on skills for interactive components or templates.

## Troubleshooting

**Issue: Registry.json validation fails**
- Solution: Check JSON syntax, ensure all required fields present, verify no duplicate entries

**Issue: Best practice not triggering properly**
- Solution: Enhance description field in frontmatter, add more triggering contexts and use cases

**Issue: Dependencies not installing correctly**
- Solution: Verify dependency names, check installation commands, ensure proper installation order

**Issue: Assets not accessible**
- Solution: Verify file paths, check asset organization, ensure proper references in documentation

**Type-Specific Issues:**

**Skills:**
- **Issue**: Interactive workflow not responding
- **Solution**: Check user prompting patterns, ensure clear option presentation

**Agents:**
- **Issue**: Autonomous execution failing
- **Solution**: Verify validation checkpoints, check error handling and rollback procedures

**MCP Servers:**
- **Issue**: Connection or authentication failures
- **Solution**: Verify credentials setup, check environment variables, test API connectivity

## Available Scripts

**Universal Scripts:**
- **`update-registry.py`**: Registry.json management with validation and backup capabilities for all types
- **`extract-categories.py`**: Category analysis and tag suggestion from existing marketplace
- **`validate-marketplace.py`**: Comprehensive marketplace validation and quality assurance

**Type-Specific Scripts:**
- **`create-skill-directory.py`**: Automated skill directory structure creation with SLIM conventions
- **`create-agent-directory.py`**: Automated agent directory structure creation with SLIM conventions
- **`create-mcp-directory.py`**: Automated MCP server directory structure creation with SLIM conventions
- **`validate-skill.py`**: Comprehensive skill validation and quality assurance
- **`validate-agent.py`**: Comprehensive agent validation and quality assurance
- **`validate-mcp.py`**: Comprehensive MCP server validation and quality assurance

## Available Assets

**Universal Assets:**
- **`registry-entry-template.json`**: Complete registry entry templates for all types with required fields
- **`best-practice-development-patterns.md`**: Comprehensive guide to SLIM marketplace patterns
- **`registry-management.md`**: Registry structure documentation and management procedures
- **`quality-checklist.md`**: Detailed quality validation checklist for all development types

**Type-Specific Templates:**
- **`skill-template.md`**: Base SKILL.md template with Dependencies section and SLIM patterns
- **`agent-template.md`**: Base AGENT.md template with autonomous workflow patterns
- **`mcp-template.md`**: Base MCP.md template with service integration patterns

**Configuration Templates:**
- **`skill-config-template.json`**: Configuration template for skill development
- **`agent-config-template.json`**: Configuration template for agent development
- **`mcp-config-template.json`**: Configuration template for MCP server development

## Integration with SLIM Ecosystem

This meta-skill seamlessly integrates with the broader SLIM marketplace:

- **Automatic Registry Updates**: All types (skills, agents, MCP servers) are immediately available in marketplace after creation
- **Dependency Awareness**: Works with SLIM's comprehensive dependency management system across all types
- **Category Consistency**: Maintains marketplace organization and navigation for all best practice types
- **Quality Standards**: Ensures all created best practices meet SLIM marketplace quality requirements
- **Installation Compatibility**: Generated best practices work with standard SLIM installation procedures
- **Type Recognition**: Marketplace automatically recognizes and categorizes different best practice types

Create professional, marketplace-ready Claude skills, autonomous agents, and MCP servers that seamlessly integrate with SLIM infrastructure and provide consistent, high-quality user experiences across the entire DevOps lifecycle.