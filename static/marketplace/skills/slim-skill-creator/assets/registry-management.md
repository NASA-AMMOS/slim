# SLIM Registry Management Guide

## Overview

The SLIM marketplace registry (`website/static/data/registry.json`) is the central catalog that defines all available skills, agents, and MCP servers in the ecosystem. This guide covers the structure, maintenance procedures, and best practices for registry management.

## Registry Structure

### File Location
```
website/static/data/registry.json
```

### Top-Level Structure
```json
{
  "skills": [
    // Array of skill entries
  ],
  "agents": [
    // Array of agent entries (future expansion)
  ],
  "mcp": [
    // Array of MCP server entries (future expansion)
  ],
  "local_marketplace_path": "/path/to/local/marketplace"
}
```

## Skill Entry Structure

### Required Fields

Every skill entry must include these fields:

```json
{
  "name": "skill-name",
  "displayName": "Human Readable Name",
  "description": "Brief marketplace description for browsing",
  "category": "category/subcategory",
  "tags": ["tag1", "tag2", "tag3"],
  "version": "1.0.0",
  "install_commands": {
    "plugin": "/plugin install slim-skill-name@slim-marketplace",
    "marketplace_add_local_template": "/plugin marketplace add {{MARKETPLACE_PATH}}",
    "marketplace_add_github": "/plugin marketplace add https://github.com/nasa-ammos/slim/tree/main/website/static/marketplace"
  },
  "download_url": "/slim/downloads/skills/skill-name.zip",
  "skill_file_url": "/slim/marketplace/skills/skill-name/SKILL.md",
  "readme_url": "/slim/marketplace/skills/skill-name/README.md",
  "type": "skill"
}
```

### Optional Fields

Additional fields for enhanced functionality:

```json
{
  "dependencies": {
    "skills": ["required-skill-1", "required-skill-2"],
    "mcp_servers": ["required-mcp-1", "required-mcp-2"],
    "external": ["api-service", "system-requirement"]
  },
  "metadata": {
    "created": "2024-01-15",
    "updated": "2024-03-20",
    "author": "Author Name",
    "license": "Apache-2.0",
    "repository": "https://github.com/example/repo",
    "documentation": "https://docs.example.com",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  }
}
```

## Field Specifications

### name
- **Format**: lowercase letters, numbers, hyphens only
- **Pattern**: `^[a-z0-9-]+$`
- **Examples**: `pdf-processor`, `github-webhook-handler`, `data-analyzer`
- **Must match**: Directory name and skill frontmatter name

### displayName
- **Format**: Human-readable title for marketplace display
- **Guidelines**: Use title case, include descriptive terms
- **Examples**: "PDF Document Processor", "GitHub Webhook Handler", "Data Analysis Tool"

### description
- **Purpose**: Brief summary for marketplace browsing (different from skill frontmatter description)
- **Length**: 50-200 characters recommended
- **Style**: Marketing-friendly, action-oriented
- **Examples**: "Process and manipulate PDF documents with advanced features", "Handle GitHub webhooks with custom response logic"

### category
- **Format**: `main-category/subcategory`
- **Consistency**: Must match existing category structure
- **Current Categories**:
  - `governance/legal`
  - `governance/contributions`
  - `communication/integration`
  - `communication/reporting`
  - `communication/documentation`
  - `software-lifecycle/integration`
  - `software-lifecycle/testing`
  - `software-lifecycle/security`
  - `software-lifecycle/project-setup`

### tags
- **Format**: Array of lowercase strings
- **Purpose**: Improve searchability and filtering
- **Guidelines**: Use relevant, specific terms that users might search for
- **Common Tags**: `setup`, `templates`, `automation`, `github`, `documentation`, `analysis`

### version
- **Format**: Semantic versioning (`MAJOR.MINOR.PATCH`)
- **Examples**: `1.0.0`, `2.3.1`, `0.9.0-beta`
- **Updates**: Increment appropriately for changes

### install_commands
- **Structure**: Object with standard installation methods
- **plugin**: Standard SLIM marketplace installation command
- **marketplace_add_***: Commands for adding marketplace source
- **Consistency**: Follow established patterns exactly

### URLs
- **download_url**: Path to packaged skill ZIP file
- **skill_file_url**: Direct path to SKILL.md file
- **readme_url**: Path to README.md (if different from SKILL.md)
- **Format**: Relative paths starting with `/slim/`

### type
- **Current Values**: `"skill"` (future: `"agent"`, `"mcp"`)
- **Purpose**: Distinguish between different marketplace item types

## Category Management

### Existing Category Hierarchy

**Governance**:
- `governance/legal` - Legal compliance, licensing
- `governance/contributions` - Community management, conduct policies

**Communication**:
- `communication/integration` - External service integration
- `communication/reporting` - Report generation, summaries
- `communication/documentation` - Documentation creation and management

**Software Lifecycle**:
- `software-lifecycle/integration` - Development tool integration
- `software-lifecycle/testing` - Testing frameworks and quality assurance
- `software-lifecycle/security` - Security scanning and compliance
- `software-lifecycle/project-setup` - Project initialization and configuration

### Adding New Categories

**Process**:
1. **Analyze existing skills** to identify gaps
2. **Propose category structure** that fits existing hierarchy
3. **Use extract-categories.py** to analyze current patterns
4. **Update multiple skills** to establish new category
5. **Document category purpose** and scope

**Guidelines**:
- Maintain two-level hierarchy (`main/sub`)
- Use descriptive, action-oriented names
- Ensure categories are mutually exclusive
- Consider future expansion and related skills

### Tag Management

**Tag Strategy**:
- **Functional Tags**: What the skill does (`analysis`, `generation`, `integration`)
- **Domain Tags**: What it works with (`github`, `docker`, `pdf`, `markdown`)
- **Use Case Tags**: When to use it (`setup`, `maintenance`, `reporting`)
- **Technology Tags**: Technologies involved (`python`, `javascript`, `api`)

**Tag Consistency**:
- Use singular forms: `template` not `templates`
- Use hyphens for multi-word tags: `code-quality` not `code quality`
- Prefer specific over generic: `vulnerability-scanning` not `security`
- Maintain consistency across similar skills

## Registry Maintenance Procedures

### Adding New Skills

**Manual Process**:
1. **Create skill directory** and files
2. **Generate registry entry** using template
3. **Validate skill structure** with validate-skill.py
4. **Add entry to registry.json** maintaining alphabetical order
5. **Validate JSON syntax** and structure
6. **Test installation commands**

**Automated Process** (using slim-skill-creator):
1. **Run update-registry.py** with skill details
2. **Automatic validation** and backup creation
3. **Alphabetical insertion** in correct section
4. **JSON validation** with rollback on error

### Updating Existing Skills

**Version Updates**:
1. **Update skill content** and functionality
2. **Increment version number** following semantic versioning
3. **Update registry entry** with new version
4. **Update metadata dates** if present
5. **Test installation** and upgrade procedures

**Content Updates**:
1. **Modify skill files** as needed
2. **Update description/tags** if functionality changed
3. **Maintain version number** for non-breaking changes
4. **Update `updated` date** in metadata

### Registry Validation

**JSON Structure Validation**:
```bash
python3 -m json.tool website/static/data/registry.json > /dev/null
```

**Schema Validation** (using validate-skill.py):
- Check required fields presence
- Validate field formats and patterns
- Verify URL paths and file references
- Confirm category and tag consistency

**Integrity Checks**:
- **Duplicate Detection**: No duplicate skill names
- **File References**: All referenced files exist
- **Installation Commands**: Follow standard patterns
- **Category Consistency**: Categories exist and are properly formatted

### Backup and Recovery

**Backup Strategy**:
- **Automatic Backups**: Created before each registry update
- **Backup Location**: Same directory with timestamp suffix
- **Backup Format**: `registry.json.backup.YYYYMMDD_HHMMSS`
- **Retention**: Keep recent backups, archive older ones

**Recovery Process**:
1. **Identify Issue**: JSON validation failure or corruption
2. **Locate Backup**: Find most recent valid backup
3. **Restore Registry**: Copy backup to registry.json
4. **Validate Recovery**: Confirm JSON is valid and complete
5. **Investigate Cause**: Analyze what caused the corruption

## Advanced Registry Operations

### Bulk Updates

**Category Migration**:
```bash
# Using update-registry.py for batch category updates
python scripts/update-registry.py --bulk-category-update old-category new-category
```

**Tag Standardization**:
```bash
# Using extract-categories.py to analyze and suggest tag consolidation
python scripts/extract-categories.py --tag-analysis --suggest-consolidation
```

### Registry Analytics

**Usage Statistics**:
- Track skill installation patterns
- Analyze category distribution
- Monitor tag effectiveness
- Identify popular skill combinations

**Quality Metrics**:
- Description completeness scores
- Tag relevance analysis
- Category distribution balance
- Dependency complexity assessment

### Integration Testing

**Registry Validation Pipeline**:
1. **JSON Syntax Check**: Basic JSON validation
2. **Schema Validation**: Field requirements and formats
3. **File Reference Check**: Verify all URLs and paths exist
4. **Installation Testing**: Test sample install commands
5. **Integration Testing**: Verify marketplace loading and display

**Continuous Integration**:
- **Pre-commit Hooks**: Validate registry before commits
- **Automated Testing**: Run validation suite on changes
- **Deployment Checks**: Verify registry integrity before deployment
- **Monitoring**: Track registry loading performance and errors

## Troubleshooting

### Common Issues

**JSON Syntax Errors**:
- **Cause**: Missing commas, brackets, or quotes
- **Detection**: `python3 -m json.tool` fails
- **Solution**: Use JSON linter or editor with syntax highlighting
- **Prevention**: Use update-registry.py for automated updates

**Duplicate Entries**:
- **Cause**: Multiple skills with same name
- **Detection**: Registry loading fails or skills overwrite each other
- **Solution**: Rename skills or remove duplicates
- **Prevention**: Check for existing names before adding

**Broken File References**:
- **Cause**: Skills moved or deleted without updating registry
- **Detection**: 404 errors when accessing skill files
- **Solution**: Update URLs or restore missing files
- **Prevention**: Validate file references after changes

**Category Inconsistencies**:
- **Cause**: Typos in category names or structure changes
- **Detection**: Skills appear in wrong categories or missing
- **Solution**: Standardize category names across all skills
- **Prevention**: Use extract-categories.py to validate categories

### Recovery Procedures

**Registry Corruption**:
1. **Stop marketplace services** if running
2. **Restore from backup** using most recent valid version
3. **Identify corruption source** and fix underlying issue
4. **Validate restored registry** with full test suite
5. **Resume services** and monitor for issues

**Performance Issues**:
- **Large Registry Size**: Consider pagination or lazy loading
- **Complex Dependencies**: Optimize dependency resolution
- **Frequent Updates**: Implement caching and incremental updates
- **Network Issues**: Add retry logic and offline fallbacks

This guide ensures consistent, maintainable registry management for the SLIM marketplace ecosystem.