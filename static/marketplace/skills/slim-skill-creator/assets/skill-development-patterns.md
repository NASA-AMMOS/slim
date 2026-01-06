# SLIM Skill Development Patterns

## Overview

This guide provides proven patterns and best practices for developing Claude skills that integrate seamlessly with the SLIM marketplace ecosystem.

## Core Design Patterns

### Interactive User Workflow Pattern

**Purpose**: Enable AI agents to gather user preferences and make informed decisions

**Structure**:
```markdown
### Step N: User Selection/Configuration
**I will present options and gather your preferences:**

**Option A**: [Clear description]
- Use when: [Specific conditions]
- Benefits: [Key advantages]

**Option B**: [Alternative description]
- Use when: [Different conditions]
- Benefits: [Different advantages]

*Which option would you prefer? Please specify A or B.*
```

**Best Practices**:
- Always provide at least 2 meaningful choices
- Include clear "use when" criteria for each option
- Ask specific questions rather than open-ended prompts
- Use consistent formatting for options (A, B, C...)

### Progressive Disclosure Pattern

**Purpose**: Present information in digestible chunks based on user needs

**Structure**:
1. **Overview**: High-level summary of capabilities
2. **Decision Points**: User chooses their path
3. **Detailed Instructions**: Specific to chosen path
4. **Advanced Options**: Additional customization if needed

**Implementation**:
```markdown
## Quick Start
[Essential steps for most users]

## Advanced Configuration
[Detailed options for power users]

## Customization Options
[Template modifications and extensions]
```

### Dependency Documentation Pattern

**Purpose**: Clearly communicate skill and system requirements

**Required Sections**:
```markdown
## Dependencies

### Required Skills
- `skill-name`: Why this skill is needed and what it provides

### Required MCP Servers
- `mcp-server-name`: Functionality provided and setup requirements

### External Requirements
- API keys, credentials, or external services
- Software prerequisites or system requirements

### Installation Order
1. Specific step-by-step installation commands
2. Verification steps to confirm dependencies work
```

### Asset Organization Pattern

**Purpose**: Logical organization of skill resources

**Directory Structure**:
```
skill-name/
├── SKILL.md                    # Main skill documentation
├── scripts/                    # Python automation scripts
│   ├── primary_script.py       # Main automation
│   ├── helper_script.py        # Supporting functionality
│   └── validation_script.py    # Quality checks
└── assets/                     # Templates and resources
    ├── templates/              # File templates with placeholders
    ├── examples/               # Reference implementations
    └── docs/                   # Supporting documentation
```

**Asset Types**:
- **Templates**: Files with `[INSERT_PLACEHOLDER]` markers for customization
- **Examples**: Complete reference implementations
- **Scripts**: Python tools for automation and validation
- **Documentation**: Supporting guides and references

### Validation and Error Handling Pattern

**Purpose**: Ensure quality and provide helpful error messages

**Implementation**:
```markdown
### Step N: Validation and Quality Checks

**Validation checklist:**
- ✅ [Specific validation item]
- ✅ [Another validation item]
- ✅ [Third validation item]

**Common issues and solutions:**
- **Issue**: [Specific problem description]
  - **Solution**: [Step-by-step fix]
  - **Prevention**: [How to avoid this issue]
```

## SLIM-Specific Patterns

### Marketplace Integration Pattern

**Registry Integration**:
- Consistent naming: lowercase-with-hyphens
- Category alignment: Use existing marketplace categories
- Tag optimization: Include searchable, relevant tags
- Version management: Semantic versioning (1.0.0)

**Installation Commands**:
```json
"install_commands": {
  "plugin": "/plugin install slim-[skill-name]@slim-marketplace",
  "marketplace_add_local_template": "/plugin marketplace add {{MARKETPLACE_PATH}}",
  "marketplace_add_github": "/plugin marketplace add https://github.com/nasa-ammos/slim/tree/main/website/static/marketplace"
}
```

### NASA/Government Compliance Pattern

**For government-sponsored projects**:
- Include institutional compliance guidance
- Provide both general and NASA-specific templates
- Cover publication and citation requirements
- Address government project considerations

**Implementation**:
```markdown
## Compliance Considerations

### NASA Projects
- [Specific NASA requirements]
- [Publication and citation guidelines]
- [Institutional approval processes]

### General Government Projects
- [Broader government compliance]
- [Security and privacy considerations]
- [Documentation requirements]
```

### Research/Academic Integration Pattern

**For scientific and academic use**:
- Citation management (CITATION.cff integration)
- Publication workflow support
- Research integrity guidelines
- Collaboration policy templates

**Structure**:
```markdown
## Academic Integration

### Citation Support
- Automatic CITATION.cff generation
- DOI integration for publications
- Author metadata management

### Research Workflows
- Publication preparation templates
- Collaboration agreement templates
- Research integrity checklists
```

## Content Quality Patterns

### Description Writing Pattern

**Frontmatter Description**:
- Include both WHAT the skill does AND WHEN to use it
- Cover all major triggering contexts
- Use action-oriented language
- Be comprehensive but concise

**Template**:
```
description: [Primary functionality] that [specific capability]. Use when [trigger context 1], [trigger context 2], [trigger context 3], or [trigger context 4]. Handles [specific use case 1], [specific use case 2], and [workflow integration].
```

### Interactive Prompting Pattern

**Essential Elements**:
1. **Context Setting**: Explain what information is needed
2. **Clear Options**: Present distinct, meaningful choices
3. **Decision Criteria**: Help users choose the right option
4. **Confirmation**: Verify understanding before proceeding

**Template**:
```markdown
**I will now gather your requirements. Please provide:**
- [Required information 1]
- [Required information 2]

**Available approaches:**
**Option A**: [Approach name] - Best for [conditions]
**Option B**: [Approach name] - Best for [different conditions]

*Which approach fits your needs? Please specify A or B.*
```

### Troubleshooting Pattern

**Structure**:
```markdown
**Issue**: [Clear problem description]
- **Symptoms**: [How users identify this issue]
- **Cause**: [Why this happens]
- **Solution**: [Step-by-step fix]
- **Prevention**: [How to avoid recurrence]
```

## Anti-Patterns to Avoid

### Common Mistakes

**Overly Generic Descriptions**:
❌ "Helps with document management"
✅ "Create and edit DOCX files with tracked changes, comments, and formatting preservation. Use when working with professional documents, collaborative editing, or document review workflows."

**Missing User Interaction**:
❌ Direct implementation without user input
✅ Present options and gather user preferences before proceeding

**Unclear Dependencies**:
❌ "Requires other tools"
✅ Specific list of required skills, MCP servers, and external services with installation instructions

**Poor Asset Organization**:
❌ All files in root directory
✅ Logical organization in scripts/ and assets/ directories

**Incomplete Validation**:
❌ No quality checks or error handling
✅ Comprehensive validation with specific success criteria

## Testing and Validation Patterns

### Skill Testing Checklist

**Functional Testing**:
- [ ] Skill triggers correctly for intended use cases
- [ ] Interactive workflow guides users effectively
- [ ] All asset references work correctly
- [ ] Scripts execute without errors
- [ ] Dependencies are properly documented

**Quality Testing**:
- [ ] YAML frontmatter is valid
- [ ] All placeholders are documented
- [ ] Instructions are clear for AI agents
- [ ] Examples are realistic and helpful
- [ ] Error scenarios are covered

**Integration Testing**:
- [ ] Registry entry is valid JSON
- [ ] Installation commands work correctly
- [ ] Categorization is appropriate
- [ ] Tags improve discoverability
- [ ] Dependencies install successfully

### User Experience Testing

**AI Agent Perspective**:
- Can an AI agent follow the instructions without human intervention?
- Are decision points clear and actionable?
- Do validation steps catch common errors?
- Are success criteria specific and measurable?

**Human User Perspective**:
- Are the skill's capabilities clearly explained?
- Do the interactive prompts make sense?
- Is troubleshooting information helpful?
- Are examples relevant and realistic?

## Skill Lifecycle Patterns

### Version Management

**Semantic Versioning**:
- `1.0.0`: Initial stable release
- `1.1.0`: New features, backward compatible
- `1.0.1`: Bug fixes, backward compatible
- `2.0.0`: Breaking changes

**Update Process**:
1. Update skill content and functionality
2. Test thoroughly with validation scripts
3. Update version number in registry entry
4. Update registry.json with new version
5. Test installation and upgrade process

### Maintenance Pattern

**Regular Reviews**:
- Quarterly: Check for broken links and outdated information
- Semi-annually: Review and update dependencies
- Annually: Major review of content and structure
- As needed: Bug fixes and user-reported issues

**Documentation Updates**:
- Keep examples current and realistic
- Update troubleshooting based on user feedback
- Refresh best practices as patterns evolve
- Maintain consistency with SLIM marketplace evolution

## Integration Patterns

### Cross-Skill Dependencies

**When to Create Dependencies**:
- Your skill builds on another skill's functionality
- Complex workflows require multiple specialized tools
- User experience benefits from skill composition

**Dependency Documentation**:
```markdown
## Dependencies

### Required Skills
- `base-skill`: Provides core functionality that this skill extends
- `helper-skill`: Used for [specific functionality] in [specific steps]

### Installation Order
1. Install base-skill: `/plugin install slim-base-skill@slim-marketplace`
2. Install helper-skill: `/plugin install slim-helper-skill@slim-marketplace`
3. Install this skill: `/plugin install slim-current-skill@slim-marketplace`
```

### MCP Server Integration

**Documentation Pattern**:
```markdown
### Required MCP Servers
- `server-name`: Provides [specific functionality] for [use cases]
  - Installation: `[specific installation command]`
  - Configuration: `[required configuration steps]`
  - Verification: `[how to test it works]`
```

This guide provides the foundation for creating high-quality, maintainable Claude skills that integrate seamlessly with the SLIM marketplace ecosystem.