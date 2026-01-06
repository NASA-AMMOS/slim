# Page Template Guide

This guide provides simple, lightweight markdown templates for generating customized documentation pages for rebranded SLIM websites.

## Overview

Generate three essential pages with minimal, demonstration-level content that users can expand later:
1. **Contribute Page** - Basic contribution workflow
2. **FAQ Page** - Single example question
3. **About Page** - Simple project overview

---

## Template 1: Contribute Page

**File**: `docs/contribute/submit-best-practice.md`

**Template**:

```markdown
---
sidebar_position: 1
---

# Submit a Best Practice

Want to share your expertise with the {PROJECT_NAME} community? Here's how to contribute.

## Quick Start

1. **Create an issue** to discuss your idea
2. **Build your contribution** - Create a skill, agent, or guide
3. **Submit a pull request** - We'll review and help you merge it

## What Can You Contribute?

- **Skills**: Reusable workflows or templates
- **Agents**: Multi-step autonomous processes
- **MCP Servers**: Integrations with external services

## Development Process

1. Fork the repository
2. Create a feature branch
3. Add your contribution to `marketplace/`
4. Test thoroughly
5. Submit a pull request

## Getting Help

Have questions? Create an issue or start a discussion in the repository.

---

Thank you for contributing to {PROJECT_NAME}!
```

---

## Template 2: FAQ Page

**File**: `docs/faq/README.md`

**Template** (single example question):

```markdown
# Frequently Asked Questions (FAQ)

## Q: What is {PROJECT_NAME}?

{PROJECT_DESCRIPTION}

{PROJECT_NAME} provides a curated collection of best practices and automation tools to help teams work more efficiently.

---

_Have more questions? Create an issue in our repository._
```

---

## Template 3: About Page

**File**: `docs/about/README.md`

**Template**:

```markdown
---
sidebar_position: 1
---

# About {PROJECT_NAME}

> _{TAGLINE}_

## Overview

{PROJECT_DESCRIPTION}

## What We Provide

**Skills**: Reusable workflows and templates that automate common tasks

**Agents**: Autonomous processes for complex workflows

**MCP Servers**: Integrations with external tools and services

## Get Involved

We welcome contributions! See our [Contributing Guide](../contribute/submit-best-practice) to get started.

---

_Built by the {PROJECT_NAME} community_
```

---

## Template Usage

### Placeholders to Replace

- `{PROJECT_NAME}`: New project name from questionnaire
- `{TAGLINE}`: New tagline from questionnaire
- `{PROJECT_DESCRIPTION}`: Project description from user input

### Generation Process

1. Load each template
2. Replace placeholders with user-provided values
3. Write to respective file locations
4. Validate markdown syntax

### Default Values

If user didn't provide certain information:

- `{PROJECT_DESCRIPTION}`: Use generic: "{PROJECT_NAME} is a collection of best practices and automation tools."
- `{TAGLINE}`: Keep from existing docusaurus.config.js

---

## File Locations

- Contribute: `docs/contribute/submit-best-practice.md`
- FAQ: `docs/faq/README.md`
- About: `docs/about/README.md`

---

## Note on Governance Files

**Not included**: Code of Conduct, Governance, License files

These are project-specific and should be added by users if needed. The templates don't assume or reference these files.

---

## Summary

Simple, lightweight templates that provide:
- Basic structure for each page
- Minimal demonstration content
- Easy for users to expand and customize later
- No assumptions about governance infrastructure
