# Data Schemas & Format Specifications

## Input Collection Formats

### User Input Schema
```json
{
  "projectName": "string",                    // New project name (required)
  "tagline": "string",                       // New tagline (optional, keep current if empty)
  "logoFile": "string|null",                 // Logo file path or null for auto-generate
  "projectPurpose": "string",                // 2-3 sentences describing purpose
  "organization": {
    "name": "string",                        // Organization/team name
    "github": "string",                      // GitHub org URL
    "contact": "string"                      // Contact info
  },
  "imports": {
    "enabled": "boolean",                    // Import from external SLIM instances?
    "sources": ["string"],                   // Array of GitHub URLs
    "keepExisting": "boolean"                // Keep current local entries?
  },
  "gitBranch": "string"                     // Custom branch name (optional)
}
```

### Configuration Detection Schema
```json
{
  "current": {
    "title": "string",                       // From docusaurus.config.js
    "tagline": "string",                     // From docusaurus.config.js
    "url": "string",                         // From docusaurus.config.js
    "baseUrl": "string",                     // From docusaurus.config.js
    "packageName": "string",                 // From package.json
    "entryPattern": "string"                 // e.g., "slim-*" prefix detected
  },
  "structure": {
    "hasHero": "boolean",                    // HubHero.js exists
    "hasRegistry": "boolean",                // registry.json exists
    "hasMarketplace": "boolean",             // marketplace/ folders exist
    "hasDocs": "boolean"                     // docs/ structure exists
  },
  "registryStats": {
    "skills": "number",
    "agents": "number",
    "mcp": "number"
  }
}
```

## Output Formats

### Rebrand Plan Schema
```json
{
  "summary": {
    "oldName": "string",
    "newName": "string",
    "branch": "string",
    "estimatedFiles": "number"
  },
  "changes": [
    {
      "category": "string",                  // "hero", "registry", "config", etc.
      "files": ["string"],                   // List of files to modify
      "actions": ["string"],                 // List of actions to perform
      "risk": "low|medium|high"
    }
  ],
  "preservation": [
    "SLIM footer attribution",               // Critical items to preserve
    "External registry URLs",
    "Existing file permissions"
  ],
  "approval": {
    "required": "boolean",
    "options": ["yes", "no", "modify"]
  }
}
```

### Completion Report Schema
```json
{
  "status": "success|partial|failed",
  "duration": "string",                      // "8m 42s"
  "statistics": {
    "filesModified": "number",
    "textReplacements": "number",
    "visualAssets": "number",
    "commits": "number",
    "buildAttempts": "number"
  },
  "changes": [
    {
      "file": "string",                      // File path
      "action": "string",                    // "modified", "created", "deleted"
      "summary": "string"                    // Brief description
    }
  ],
  "validation": {
    "build": "success|failed",
    "linting": "passed|failed|skipped",
    "errors": ["string"]                     // Error messages if any
  },
  "git": {
    "branch": "string",
    "commits": ["string"],                   // Commit messages
    "status": "clean|dirty"
  }
}
```

## Registry Transformation Schemas

### External Entry Schema
```json
{
  "name": "string",                          // Transformed name (slim-* → project-*)
  "displayName": "string",                   // Human-readable name
  "description": "string",                   // Description text
  "category": "string",                      // Category classification
  "tags": ["string"],                        // Tag array
  "lastUpdated": "YYYY-MM-DD",             // ISO date string
  "type": "skill|agent|mcp",               // Entry type
  "external_only": true,                     // Always true for imports
  "repository": {
    "url": "string",                         // Source GitHub URL
    "type": "git"
  },
  "skill_file_url": "string",               // Original external URL
  "example": "string"                       // Usage example
}
```

### Registry File Schema
```json
{
  "skills": ["ExternalEntrySchema"],
  "agents": ["ExternalEntrySchema"],
  "mcp": ["ExternalEntrySchema"],
  "metadata": {                             // Preserve if exists
    "categoryIcons": {
      "category/subcategory": "emoji"
    }
  }
}
```

## File Modification Schemas

### Hero Component Modifications
```json
{
  "removals": [
    "cornerFeatures array (lines 57-78)",
    "corner features rendering (lines 83-88)",
    "corner CSS styles (~175 lines)"
  ],
  "updates": [
    {
      "target": "logo path (line ~93)",
      "value": "/img/logo.svg"
    },
    {
      "target": "tagline text (lines ~96-98)",
      "value": "USER_PROVIDED_TAGLINE"
    }
  ]
}
```

### Configuration File Updates
```json
{
  "docusaurus.config.js": {
    "preserve": ["footer.copyright"],        // CRITICAL: Never modify
    "update": {
      "title": "NEW_PROJECT_NAME",
      "tagline": "NEW_TAGLINE",
      "url": "NEW_URL",
      "baseUrl": "NEW_BASE_URL",
      "organizationName": "NEW_ORG",
      "projectName": "NEW_REPO"
    }
  },
  "package.json": {
    "update": {
      "name": "new-project-website",
      "description": "Project documentation website",
      "homepage": "NEW_URL"
    }
  }
}
```

## Template Generation Schemas

### Page Template Schema
```json
{
  "contribute": {
    "frontmatter": {
      "sidebar_position": 1
    },
    "placeholders": {
      "PROJECT_NAME": "string",
      "GITHUB_ISSUES_URL": "string",
      "GITHUB_DISCUSSIONS_URL": "string"
    }
  },
  "faq": {
    "frontmatter": {
      "sidebar_position": 1
    },
    "placeholders": {
      "PROJECT_NAME": "string",
      "PROJECT_DESCRIPTION": "string",
      "USE_CASES": ["string"]
    }
  },
  "about": {
    "frontmatter": {
      "sidebar_position": 1
    },
    "placeholders": {
      "PROJECT_NAME": "string",
      "TAGLINE": "string",
      "TEAM_INFO": "string",
      "FEATURES": ["string"]
    }
  }
}
```

## Validation Schemas

### Build Result Schema
```json
{
  "success": "boolean",
  "attempts": "number",                      // 1-5 attempts
  "duration": "number",                      // milliseconds
  "output": "string",                        // Build output
  "errors": [
    {
      "type": "string",                      // Error category
      "file": "string",                      // File path if applicable
      "message": "string",                   // Error message
      "autoFixed": "boolean"                // Was it auto-resolved?
    }
  ]
}
```

### Linting Result Schema
```json
{
  "json": {
    "files": ["string"],                     // Files checked
    "valid": "boolean",
    "errors": ["string"]
  },
  "javascript": {
    "available": "boolean",                  // ESLint detected
    "files": ["string"],
    "passed": "boolean",
    "errors": ["string"]
  }
}
```

## Logo Generation Schema

### Phosphor Icon Schema
```json
{
  "keywords": ["string"],                    // Extracted from project name
  "selected": "string",                      // Icon name (e.g., "file-doc")
  "url": "string",                          // CDN URL
  "svg": "string",                          // SVG content
  "colors": {
    "primary": "string",                     // Hex color
    "secondary": "string"
  }
}
```

## Error Reference Schema

### Error Definition Schema
```json
{
  "code": "string",                          // ERROR_CODE
  "category": "build|validation|git|network",
  "severity": "critical|warning|info",
  "message": "string",                       // Human-readable description
  "autoFixable": "boolean",
  "fix": {
    "command": "string",                     // Fix command if applicable
    "pattern": "string",                     // Regex pattern if text replacement
    "replacement": "string"                  // Replacement text
  }
}
```