---
name: slim-readme
description: Create a comprehensive README.md template for your project
---

# README Writer

## Overview

A template and workflow to help developers and users understand your repository's project code concisely and clearly. A good README is often the first thing people see when they discover your project, making it critical for adoption and contribution.

## When to Use This Skill

- Starting a new project that needs documentation
- Improving an existing project's documentation
- Onboarding new team members or contributors
- Making your project more discoverable and understandable
- Preparing a project for open source release

## What Makes a Good README

A comprehensive README should answer:
- **What** is this project?
- **Why** does it exist?
- **How** do I use it?
- **Who** can I contact for help?

## Workflow

### Step 1: Check for Existing README

Check if a README already exists:

```bash
ls -la README.md
```

If it exists:
- Ask if the user wants to replace it or enhance it
- Consider backing up the existing version
- Offer to merge content from the template

### Step 2: Understand the Project

Before generating the README, gather key information:

1. **Project Purpose**: What problem does it solve?
2. **Target Audience**: Who will use this?
3. **Key Features**: What are the main capabilities?
4. **Technology Stack**: What languages/frameworks are used?
5. **Installation Method**: How do users get started?

You can analyze the repository to gather this information:
- Check `package.json`, `pyproject.toml`, `Cargo.toml` for dependencies
- Look at directory structure for architecture
- Review existing documentation

### Step 3: Choose Generation Method

**Option A: Use Template**
```bash
cp assets/README.md README.md
```
Then manually customize the placeholders.

**Option B: AI-Enhanced Generation (Recommended)**
1. Read the template from `assets/README.md`
2. Analyze the repository:
   - Scan key files (package.json, setup.py, etc.)
   - Identify programming languages
   - Find existing documentation
   - Detect frameworks and tools
3. Use AI to fill in sections based on repository context
4. Generate a customized README

### Step 4: Customize Sections

The template includes these key sections. Customize each:

**Required Sections:**
- **Project Title & Description**: Clear, concise summary
- **Features**: Bullet list of key capabilities
- **Installation**: Step-by-step setup instructions
- **Usage**: Basic examples and common use cases
- **Contributing**: How others can help
- **License**: Reference to LICENSE file

**Optional Sections:**
- **Prerequisites**: System requirements
- **Configuration**: Environment variables, config files
- **API Documentation**: If applicable
- **Testing**: How to run tests
- **Deployment**: Production deployment guide
- **FAQ**: Common questions
- **Acknowledgments**: Credits and thanks
- **Badges**: Build status, coverage, version

### Step 5: Add Project-Specific Elements

Enhance the README with:

**Badges** (at the top):
```markdown
![Build Status](https://img.shields.io/github/workflow/status/...)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Version](https://img.shields.io/github/v/release/...)
```

**Screenshots or Demos**:
- Add visuals if it's a UI project
- Include terminal output examples
- Link to live demos if available

**Quick Start Example**:
```markdown
## Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/project.git

# Install dependencies
npm install

# Run the application
npm start
\`\`\`
```

### Step 6: Validate README

Check that the README:
- [ ] Has a clear title and description
- [ ] Explains what the project does
- [ ] Provides installation instructions
- [ ] Includes usage examples
- [ ] Links to additional documentation
- [ ] Specifies the license
- [ ] Has contact/contribution information
- [ ] Is free of placeholders like `[INSERT HERE]`

### Step 7: Keep It Updated

Remind the user to:
- Update README when adding major features
- Keep installation instructions current
- Update badges and links
- Review periodically for accuracy

## AI Enhancement Tips

When using AI to customize the README:

1. **Scan the codebase** to understand:
   - Main programming language
   - Framework being used
   - Project structure
   - Existing scripts in package.json or similar

2. **Extract key information** from:
   - `package.json`: Project name, description, scripts
   - `pyproject.toml` or `setup.py`: Python project metadata
   - `Cargo.toml`: Rust project information
   - Source code comments and docstrings

3. **Infer installation steps** from:
   - Presence of `package.json` → `npm install`
   - Presence of `requirements.txt` → `pip install -r requirements.txt`
   - Presence of `Cargo.toml` → `cargo build`

4. **Generate usage examples** based on:
   - CLI entry points
   - Main functions or classes
   - Example code in tests or docs

## Best Practices

1. **Write for your audience**: Adjust technical depth appropriately
2. **Keep it concise**: Link to detailed docs rather than including everything
3. **Use clear examples**: Show, don't just tell
4. **Update regularly**: README should reflect current state
5. **Test instructions**: Ensure installation steps actually work
6. **Use proper markdown**: Format code blocks, lists, headers correctly
7. **Add visuals**: Screenshots and diagrams improve understanding

## Common Mistakes to Avoid

- ❌ Assuming too much knowledge
- ❌ Missing installation steps
- ❌ No usage examples
- ❌ Outdated information
- ❌ Broken links
- ❌ Missing license information
- ❌ No contact information

## Assets Available

- `README.md`: Comprehensive template with all standard sections

## Template Structure

The provided template includes:

```markdown
# Project Title
Brief description

## Features
- Feature 1
- Feature 2

## Installation
Step-by-step instructions

## Usage
Examples and code snippets

## Contributing
Guidelines for contributors

## License
License reference

## Contact
How to reach maintainers
```

## Additional Resources

- [Make a README](https://www.makeareadme.com/)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [README Best Practices](https://github.com/jehna/readme-best-practices)
