# Documentation Structure Guide

This guide provides instructions for organizing and generating documentation content in the `docs/` directory.

## Documentation Organization Principles

1. **User journey first** - Organize by how users will consume content
2. **Progressive complexity** - Start simple, add detail gradually
3. **Logical grouping** - Related topics together
4. **Clear hierarchy** - No more than 3 levels deep
5. **Consistent naming** - Follow naming conventions

## Standard Documentation Sections

### Core Sections (Almost always include)

#### 1. Getting Started
**Purpose**: Help users begin using the project quickly

**Typical pages**:
- `intro.md` - Project overview and prerequisites
- `installation.md` - Installation instructions
- `quick-start.md` - First steps and basic usage
- `configuration.md` - Basic setup and configuration

**Example structure**:
```
docs/
├── intro.md
└── getting-started/
    ├── installation.md
    ├── quick-start.md
    └── configuration.md
```

#### 2. User Guide
**Purpose**: Comprehensive usage documentation

**Typical pages**:
- Core features and how to use them
- Common workflows and patterns
- Examples and tutorials
- Tips and best practices

**Example structure**:
```
docs/
└── user-guide/
    ├── basic-usage.md
    ├── advanced-features.md
    ├── tutorials/
    │   ├── tutorial-01.md
    │   └── tutorial-02.md
    └── best-practices.md
```

#### 3. Reference
**Purpose**: Detailed technical reference

**Typical pages**:
- API documentation
- Configuration options
- CLI commands
- Data formats and schemas

**Example structure**:
```
docs/
└── reference/
    ├── api/
    │   ├── overview.md
    │   ├── endpoints.md
    │   └── authentication.md
    ├── cli.md
    └── configuration-options.md
```

### Optional Sections (Include based on project type)

#### 4. Developer Documentation
**For**: Open source projects, extensible tools

**Typical pages**:
- Architecture overview
- Contributing guidelines
- Development setup
- Plugin/extension development
- Testing guide

**Example structure**:
```
docs/
└── developers/
    ├── architecture.md
    ├── contributing.md
    ├── development-setup.md
    └── plugin-development.md
```

#### 5. Deployment/Operations
**For**: Deployed applications, services

**Typical pages**:
- Deployment guides
- Configuration management
- Monitoring and logging
- Troubleshooting
- Performance tuning

**Example structure**:
```
docs/
└── operations/
    ├── deployment.md
    ├── monitoring.md
    ├── troubleshooting.md
    └── performance.md
```

#### 6. FAQ and Troubleshooting
**For**: Projects with common questions

**Typical pages**:
- Frequently asked questions
- Common issues and solutions
- Error messages and fixes
- Migration guides

**Example structure**:
```
docs/
└── support/
    ├── faq.md
    ├── troubleshooting.md
    └── migration-guide.md
```

## Content Generation Strategy

### From Project Analysis

**Input sources**:
- README.md - Project description, quick start
- Existing documentation - Structure and content
- Code comments - API documentation
- Configuration files - Setup and options
- Package metadata - Installation, dependencies

**Extraction patterns**:

1. **README.md**:
   ```markdown
   # Project Name → Use for intro.md title
   ## Description → Use for intro.md overview
   ## Installation → Use for installation.md
   ## Usage → Use for quick-start.md
   ## Contributing → Use for developers/contributing.md
   ```

2. **Code analysis**:
   - Extract public APIs for reference documentation
   - Identify main features for user guide sections
   - Find configuration options for configuration.md
   - Detect CLI commands for CLI reference

3. **Configuration files**:
   - package.json → Installation methods, scripts
   - requirements.txt → Python dependencies
   - Dockerfile → Deployment options
   - .github/workflows → CI/CD documentation

### Document Templates

#### Template: intro.md
```markdown
---
sidebar_position: 1
---

# Introduction

## What is [Project Name]?

[AI-generated project description based on analysis]

## Key Features

- **[Feature 1]**: [Description]
- **[Feature 2]**: [Description]
- **[Feature 3]**: [Description]

## Who is this for?

[Target audience description based on project analysis]

## Prerequisites

[List based on dependencies and requirements found]

- Requirement 1
- Requirement 2

## Next Steps

- [Installation](./getting-started/installation.md)
- [Quick Start](./getting-started/quick-start.md)
```

#### Template: installation.md
```markdown
---
sidebar_position: 1
---

# Installation

## Prerequisites

[List system requirements, dependencies]

## Install via [Package Manager]

\`\`\`bash
[Installation command from package.json or setup.py]
\`\`\`

## Install from Source

\`\`\`bash
git clone [repository-url]
cd [project-name]
[build/install commands]
\`\`\`

## Verify Installation

\`\`\`bash
[verification command]
\`\`\`

## Troubleshooting

[Common installation issues and solutions]
```

#### Template: quick-start.md
```markdown
---
sidebar_position: 2
---

# Quick Start

Get up and running with [Project Name] in minutes.

## Step 1: [First action]

[Instructions with code example]

\`\`\`[language]
[code example]
\`\`\`

## Step 2: [Second action]

[Instructions with code example]

## Step 3: [Third action]

[Instructions and expected result]

## What's Next?

- [Link to user guide]
- [Link to tutorials]
- [Link to examples]
```

## Sidebar Configuration

### Auto-generated Sidebars (Recommended)

Use `sidebars.js` to control documentation organization:

```javascript
module.exports = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'user-guide/basic-usage',
        'user-guide/advanced-features',
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'user-guide/tutorials/tutorial-01',
            'user-guide/tutorials/tutorial-02',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/api',
        'reference/cli',
        'reference/configuration-options',
      ],
    },
  ],
};
```

### Frontmatter for Ordering

Use `sidebar_position` in frontmatter:

```markdown
---
sidebar_position: 1
title: Installation
---
```

## Content Quality Guidelines

### Writing Style

1. **Clear and concise** - Short sentences, simple words
2. **Active voice** - "Run the command" not "The command should be run"
3. **Present tense** - "The system processes" not "The system will process"
4. **Direct address** - "You can configure" not "Users can configure"
5. **Examples included** - Show, don't just tell

### Code Examples

1. **Syntax highlighting** - Always specify language
2. **Complete examples** - Runnable code when possible
3. **Comments** - Explain non-obvious parts
4. **Output shown** - Include expected results

```markdown
\`\`\`python
# Import the library
import project_name

# Configure the client
client = project_name.Client(api_key="your-key")

# Make a request
result = client.process(data)
print(result)
# Output: {'status': 'success', 'processed': 42}
\`\`\`
```

### Cross-References

Link related documentation:

```markdown
For more details, see the [API Reference](../reference/api.md).

:::tip
Check out the [Quick Start Guide](./quick-start.md) for a step-by-step tutorial.
:::
```

## Project Type Patterns

### Developer Library/SDK

**Focus on**:
- Installation methods (npm, pip, maven, etc.)
- API reference with examples
- Integration guides
- Common use cases

**Structure**:
```
docs/
├── intro.md
├── getting-started/
├── guides/
│   ├── authentication.md
│   ├── making-requests.md
│   └── error-handling.md
├── api/
└── examples/
```

### CLI Tool

**Focus on**:
- Installation
- Command reference
- Common workflows
- Configuration

**Structure**:
```
docs/
├── intro.md
├── installation.md
├── commands/
│   ├── command-1.md
│   └── command-2.md
├── workflows/
└── configuration.md
```

### Web Application

**Focus on**:
- User guides
- Feature documentation
- Screenshots/videos
- FAQ

**Structure**:
```
docs/
├── intro.md
├── getting-started.md
├── features/
│   ├── feature-1.md
│   └── feature-2.md
├── guides/
└── faq.md
```

### Research/Scientific Tool

**Focus on**:
- Methodology
- Algorithm details
- Citation information
- Examples and results

**Structure**:
```
docs/
├── intro.md
├── installation.md
├── methodology/
├── algorithms/
├── examples/
└── citing.md
```

## Validation Checklist

Before finalizing documentation structure:

- [ ] All links work (no broken references)
- [ ] Sidebar organization is logical
- [ ] Each page has clear purpose
- [ ] No orphaned pages (unreachable from navigation)
- [ ] Code examples are syntactically correct
- [ ] Frontmatter is complete (title, position, etc.)
- [ ] Content flows from simple to complex
- [ ] Search-friendly titles and headings
- [ ] Mobile-friendly formatting
