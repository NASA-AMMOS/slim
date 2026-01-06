---
name: slim-rebranding-agent
description: Comprehensive autonomous rebranding agent for projects. Handles all aspects of rebranding including text/naming, documentation, visual assets, colors/theming, and configuration files. Works with any codebase (Node, Python, Java, C++, Rust, Go, etc.). Auto-integrates free Phosphor icons. Presents detailed plan for approval before executing changes. Creates git branch and commits with clear messages. Validates changes with linters and build systems. Use when rebranding a project, changing project name, updating visual identity, or modernizing brand assets.
---

# SLIM Rebranding Agent

## Overview

The SLIM Rebranding Agent is a comprehensive, semi-autonomous tool designed to rebrand software projects across any technology stack. It handles all aspects of rebranding including text/naming updates, documentation changes, visual asset replacement, color scheme transformations, and configuration file updates.

**Key Features**:
- 🌐 **Universal Compatibility**: Works with any codebase (Node, Python, Java, C++, Rust, Go, Ruby, PHP, .NET, etc.)
- 🤖 **Runtime Code Generation**: Writes optimized, project-specific code at runtime (no pre-existing scripts)
- 🎨 **Smart Imagery**: Fill-in-the-gaps approach using user-provided files + auto-generated Phosphor Icons
- ✅ **Linter & Build Validation**: Auto-detects and runs file-type linters and build systems
- 🔒 **Git Safety**: Creates isolated branch, incremental commits, easy rollback
- 📋 **Semi-Autonomous**: Presents plan for approval before execution

##

 When to Use

- Rebranding a project with a new name or identity
- Changing project name across entire codebase
- Updating visual identity (logos, icons, colors)
- Modernizing brand assets
- Preparing for product launch with new branding

## Dependencies

**None** - This agent works standalone with any codebase. No marketplace dependencies required.

## Prerequisites

- Git repository initialized
- Write access to project files
- Clean working directory (recommended)

## Interactive Workflow

### Step 1: Context Gathering

**I will verify your project setup and detect the project type:**

1. **Git Repository Check**:
   - Verify git repository exists
   - Check working directory status
   - Warn if there are uncommitted changes

2. **Project Type Detection**:
   - Write runtime code to scan for config files:
     - **Node.js**: package.json, package-lock.json, yarn.lock, pnpm-lock.yaml
     - **Python**: pyproject.toml, setup.py, requirements.txt, Pipfile, poetry.lock
     - **Java**: pom.xml, build.gradle, settings.gradle
     - **Rust**: Cargo.toml, Cargo.lock
     - **Go**: go.mod, go.sum
     - **Ruby**: Gemfile, Gemfile.lock, .gemspec
     - **PHP**: composer.json, composer.lock
     - **.NET**: *.csproj, *.sln, packages.config
     - **C/C++**: CMakeLists.txt, Makefile, configure.ac
     - **Web frameworks**: docusaurus.config.js, gatsby-config.js, next.config.js, app.json
     - **Static HTML**: index.html, index.htm
   - Extract current project metadata (name, version, etc.)
   - Identify project type(s) - can be multiple for polyglot projects

---

### Step 2: Brand Questionnaire

**I will ask essential questions to understand your rebranding needs:**

Using the brand questionnaire template (`assets/brand-questionnaire.md`), I'll ask up to 8 questions:

1. **Current project name**: What is the exact current name?
2. **New project name**: What should the new name be?
3. **New primary color** (optional): Hex color code (e.g., #FF5733) or leave blank to keep current
4. **Custom imagery**: Upload any custom logo/icon/image files to the chat. Agent will use these where applicable and auto-generate remaining imagery using Phosphor Icons.
5. **Configuration files**: Update package manager configs (package.json, pom.xml, etc.)? (yes/no, default: yes)
6. **Files/folders to exclude**: Comma-separated paths or leave blank for defaults (node_modules, .git, build, dist)
7. **Git branch name**: Custom name or leave blank for auto-generated
8. **Special instructions**: Any specific requirements or files to handle carefully? (optional)

**Automatic Defaults** (no questions needed):
- **Scope**: Full codebase rebrand (unless files excluded)
- **Code comments**: Always update project name in code comments
- **Icon names**: Auto-generate from project name for Phosphor icons

---

### Step 3: Discovery Phase

**I will write runtime code to scan your project and identify all rebrandable elements:**

Based on the detected project type, I'll create custom discovery code that:

1. **Text Reference Detection**:
   - Search for current project name in all case variations:
     - Original: "OldName"
     - lowercase: "oldname"
     - kebab-case: "old-name"
     - snake_case: "old_name"
     - camelCase: "oldName"
     - PascalCase: "OldName"
     - UPPERCASE: "OLDNAME"
   - Record file path, line number, context
   - Count occurrences per file
   - Categorize by file type

2. **Documentation Identification**:
   - Find: README.md, CHANGELOG.md, CONTRIBUTING.md, LICENSE, etc.
   - Find docs/ directory and all markdown files
   - Find website/ or wiki/ directories

3. **Visual Asset Discovery**:
   - Search for: logo.*, favicon.*, icon.*, [project-name].*
   - Look in: static/, public/, assets/, src/images/, root directory
   - File types: .png, .svg, .ico, .jpg, .jpeg, .webp, .gif
   - Identify: favicons, app icons, social cards, brand imagery

4. **Color Extraction**:
   - Find CSS files (.css, .scss, .less, .sass)
   - Extract CSS custom properties: `--*`
   - Extract hex colors: `#RRGGBB`
   - Extract rgb/rgba, hsl/hsla
   - Find design token files (tokens.json, theme.json, tailwind.config.js)

5. **Configuration File Detection** (project-type specific):
   - For Node: package.json, package-lock.json
   - For Python: pyproject.toml, setup.py
   - For Java: pom.xml, build.gradle
   - For Rust: Cargo.toml
   - For Go: go.mod
   - For web frameworks: docusaurus.config.js, gatsby-config.js, next.config.js, etc.

**Output**: Generate findings report showing:
- Total files with references
- Occurrences by category (text, docs, assets, colors, config)
- Risk assessment (high/medium/low)

After discovery, I'll present the summary and ask: **"Proceed with plan generation? (yes/no)"**

---

### Step 4: Plan Generation

**I will generate a comprehensive, detailed rebranding plan:**

Using the rebrand-plan-template (`assets/rebrand-plan-template.md`), I'll create a plan showing:

**Plan Structure**:
```markdown
# Rebranding Plan: [Old Name] → [New Name]

## Summary
- Total files to modify: X
- Text replacements: Y occurrences across Z files
- Visual assets: N images
- Color transformations: M definitions
- Configuration updates: P files

## Changes by Category

### 1. Text/Naming Changes
| File | Current | New | Occurrences | Risk |
|------|---------|-----|-------------|------|
| ... | ... | ... | ... | ... |

### 2. Documentation Updates
| File | Changes | Risk |
|------|---------|------|
| ... | ... | ... |

### 3. Visual Asset Changes
| Current | New/Source | Location | Risk |
|---------|------------|----------|------|
| logo.svg | [User-provided / Phosphor: "sparkle"] | static/img/ | Medium |
| ... | ... | ... | ... |

### 4. Color/Theming Updates
| File | Properties | Changes | Risk |
|------|------------|---------|------|
| custom.css | --primary-color | #old → #new | Low |
| ... | ... | ... | ... |

### 5. Configuration File Updates
| File | Fields | Risk |
|------|--------|------|
| package.json | name, description | High |
| ... | ... | ... |

## Git Strategy
Branch: rebrand/[old-name]-to-[new-name]
Commits: 5 (text, docs, assets, colors, config)

## Risk Assessment
- High Risk: X files
- Medium Risk: Y files
- Low Risk: Z files

## Rollback Plan
git checkout main && git branch -D rebrand/[branch-name]
```

---

### Step 5: Plan Approval

**I will present the plan and wait for your approval:**

**Options**:
1. **"yes"** - Approve and proceed with rebranding
2. **"no"** - Cancel the operation
3. **"modify"** - Request specific changes to the plan

**If "modify"**:
- I'll ask what you'd like to adjust
- Options: change scope, exclude files, adjust colors, modify git branch name
- Regenerate plan with changes
- Present updated plan for approval

**Only after explicit "yes" approval will I proceed to execution.**

---

### Step 6: Git Branch Creation

**I will create a safe working branch:**

1. Generate branch name:
   - Auto: `rebrand/[old-slug]-to-[new-slug]`
   - Or use your custom branch name from questionnaire

2. Create branch:
   ```bash
   git checkout -b rebrand/old-name-to-new-name
   ```

3. Verify branch creation successful
4. Inform you of the branch name

**All changes will be isolated from your main branch.**

---

### Step 7: Execute Changes

**I will write runtime-optimized code to apply changes in safe, validated order:**

#### 7.1 Text/Naming Changes
- Write custom replacement code for your project type
- Strategy:
  - **Whole-word matching**: Use `\b` regex boundaries (avoid partial matches like "Slim" → "Slimmer")
  - **Case-preserving**: Detect and preserve case (OldName → NewName, oldname → newname, OLDNAME → NEWNAME)
  - **Context-aware**:
    - JSON: Update values only, not keys (unless specified)
    - YAML: Update values, preserve keys
    - Code: Update strings and comments
    - Markdown: Update all text
- Create backups before modification (`.rebrand_backups/`)
- Validate syntax after each file
- Rollback file if validation fails
- **Commit**: `"Rebrand: Update text and naming references"`

#### 7.2 Documentation Updates
- Apply same text replacement to documentation files
- Update README, CHANGELOG, CONTRIBUTING, docs/
- Validate markdown rendering
- **Commit**: `"Rebrand: Update documentation"`

#### 7.3 Visual Assets (Smart Imagery Integration)
Using phosphor-icons-guide (`assets/phosphor-icons-guide.md`):

**Step A: Identify imagery needs**
- Scan for: logo.svg, favicon.ico, icon-*.png, social cards, etc.

**Step B: Match user-provided imagery**
- If user uploaded files to chat:
  - Match "my-logo.svg" → use for logo
  - Match "my-icon.png" → resize for all icon sizes
  - Match "social-card.jpg" → use for social cards
- Track which needs are fulfilled

**Step C: Fill gaps with Phosphor Icons**
- For imagery NOT provided by user:
  1. Auto-generate icon name from project name:
     - Extract keywords: "DataAnalyzer" → "chart-line" or "database"
     - Match to Phosphor categories (tech, business, communication, creative, generic)
     - Examples: "ChatApp" → "chat-circle", "DevTools" → "code", "Generic" → "sparkle"
  2. Fetch SVG from Phosphor CDN:
     ```
     https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/[icon-name].svg
     ```
  3. Convert to needed formats:
     - SVG → logo.svg
     - SVG → PNG → logo.png, icon-16x16.png, icon-32x32.png, favicon.ico
  4. Place in appropriate locations
  5. Update all references in HTML, config files

**Step D: Summary**
- Report: "Logo from user upload, favicon from Phosphor (sparkle), icons from Phosphor (sparkle)"
- **Commit**: `"Rebrand: Replace visual assets"`

#### 7.4 Colors/Theming
- Write code to transform color scheme
- Update CSS custom properties
- Update design tokens
- Validate CSS syntax
- **Commit**: `"Rebrand: Update color scheme"`

#### 7.5 Configuration Files
- Write project-type-specific code to update configs:
  - Node: package.json (name, description, homepage, repository)
  - Python: pyproject.toml (name, description, urls)
  - Java: pom.xml (groupId, artifactId, name, description)
  - Rust: Cargo.toml (name, description, homepage)
  - Go: go.mod (module path)
  - Web frameworks: docusaurus.config.js, gatsby-config.js (title, tagline, url)
- Validate JSON/YAML/TOML syntax
- **Commit**: `"Rebrand: Update configuration files"`

Each step includes validation before committing.

---

### Step 8: Icon Integration

(This step is integrated into Step 7.3 above - see Visual Assets section)

---

### Step 9: Validation with Iterative Build Loop

**I will run comprehensive validation using linter-validation-guide (`assets/linter-validation-guide.md`):**

#### A. File-Type Linter Detection & Execution

**JSON files**:
```bash
python -m json.tool file.json  # or jq
```

**YAML files**:
```bash
yamllint file.yml  # or python yaml.safe_load()
```

**JavaScript/TypeScript**:
- Detect: `.eslintrc`, `eslint.config.js`
- Run: `npx eslint .` or `eslint --fix`

**Python**:
- Detect: `.flake8`, `pyproject.toml`
- Run: `flake8` or `pylint`

**CSS/SCSS**:
- Detect: `.stylelintrc`
- Run: `stylelint` or basic validation

**Parse linter output, identify errors, auto-fix common issues**

#### B. Build System Detection & Iterative Build Loop

**IMPORTANT: I will loop over the build process until it succeeds.**

**Build System Detection:**

**Node.js**:
```bash
npm run build  # or yarn build or pnpm build
```

**Python**:
```bash
python setup.py build  # or pip install -e . or python -m build
```

**Java/Maven**:
```bash
mvn compile  # or mvn package
```

**Rust**:
```bash
cargo build
```

**Go**:
```bash
go build
```

**.NET**:
```bash
dotnet build
```

**C/C++**:
```bash
make  # or cmake . && make
```

**Iterative Build Loop Algorithm:**

```
1. Detect build system (check for package.json, Cargo.toml, go.mod, pom.xml, etc.)
2. If NO build system detected → SKIP build validation, proceed to linting only
3. If build system detected → START LOOP:

   Loop (max 5 attempts):
     a. Run build command

     b. If build SUCCEEDS → BREAK LOOP, continue to validation report

     c. If build FAILS:
        i.   Parse error output to identify issues:
             - Import/require path errors (old name references)
             - Module not found errors (package name changes)
             - Syntax errors introduced by text replacement
             - Type errors from renamed variables/functions
             - Missing dependencies

        ii.  Attempt automatic fixes:
             - Fix import paths referencing old name
             - Update package.json name if imports break
             - Revert problematic text replacements if needed
             - Fix JSON/YAML syntax errors
             - Update TypeScript types if needed

        iii. Commit fixes: "Rebrand: Fix build errors (attempt N)"

        iv.  Re-run build (next loop iteration)

     d. If max attempts reached (5) and still failing:
        - Present errors to user
        - Provide manual fix guidance
        - Ask: "Continue despite build failures? (yes/no)"
        - If yes → proceed with warnings
        - If no → pause for manual intervention

4. Generate validation report
```

**Example Build Loop Execution:**

```
Attempt 1: Running build...
❌ Build failed: Cannot find module './old-name'
   → Auto-fixing import paths...
   → Fixed 3 import statements in src/
   ✓ Committed fixes

Attempt 2: Running build...
❌ Build failed: Package name mismatch in imports
   → Updating internal imports to use new package name...
   → Fixed 8 import statements
   ✓ Committed fixes

Attempt 3: Running build...
✓ Build successful (npm run build - 52s)
   Loop complete after 3 attempts
```

#### C. Validation Report
```
Validation Results
==================
✓ All JSON files valid (5 files)
✓ All YAML files valid (2 files)
✓ ESLint passed with auto-fixes (42 files)
⚠ Found "OldName" in 2 archived comments (non-critical)
✓ Build successful after 3 attempts (npm run build - 52s)
  - Attempt 1: Fixed import paths (3 files)
  - Attempt 2: Fixed package name in imports (8 files)
  - Attempt 3: Build succeeded

Status: PASS with warnings
Build Loop: 3 iterations, all errors auto-resolved
```

**If linting errors found**: I'll write code to auto-correct common issues or present errors for manual review.

**If build system not detected**: Validation report will note "No build system detected - skipping build validation"

**If build succeeds**: Continue to finalization

**If build fails after 5 attempts**: Present errors and ask for user decision

After validation, I'll ask: **"Proceed to finalization? (yes/no)"**

---

### Step 10: Summary Report

**I will generate a comprehensive completion report:**

Using example-rebrand-report (`assets/example-rebrand-report.md`):

```markdown
# Rebranding Complete: [Old Name] → [New Name]

## Summary
✓ 58 files modified
✓ 5 commits created
✓ All validation checks passed
✓ Branch: rebrand/old-to-new

## Changes Applied
- Text/naming: 342 occurrences across 42 files
- Documentation: 8 files updated
- Visual assets: 12 images (5 user-provided, 7 Phosphor-generated)
- Colors: 45 definitions in 6 CSS files
- Configuration: 5 files updated

## Imagery Summary
- Logo: user-provided (my-logo.svg)
- Favicon: Phosphor (sparkle icon)
- Icons: Phosphor (sparkle icon, various sizes)
- Social cards: Phosphor (sparkle icon)

## Validation Results
✓ Linters: All passed
✓ Build: Successful (npm run build)
⚠ Warnings: 2 archived comments (non-critical)

## Git Information
Branch: rebrand/old-name-to-new-name
Status: Clean (all committed)

## Next Steps
1. Review changes: git diff main...rebrand/old-name-to-new-name
2. Test locally: npm run build && npm start
3. Create PR: gh pr create --title "Rebrand: Old to New"
4. After approval: merge to main

## Rollback if needed
git checkout main
git branch -D rebrand/old-name-to-new-name
```

**Final question**: **"Would you like help creating a pull request? (yes/no)"**

---

## Best Practices

### For Users
1. **Always use git branches** - Never rebrand directly on main/master
2. **Commit recent work** - Ensure clean state before rebranding
3. **Test thoroughly** - Verify build and functionality after rebrand
4. **Review plan carefully** - Understand all changes before approval
5. **Start with documentation** - Consider docs-only scope first to test

### For Safety
1. **Backup critical files** - Agent creates backups, but extra safety helps
2. **Check name availability** - Verify npm/PyPI/etc. name available before rebranding
3. **Inform team** - Coordinate with team on timing
4. **Test in staging** - Don't rebrand production directly

---

## FAQ

**Q: Can I rebrand just documentation without touching code?**
A: Yes! In the questionnaire, specify which files/folders to exclude (e.g., "src/, exclude everything except docs/").

**Q: What if I want to undo the rebrand?**
A: All changes are on a git branch. Simply:
```bash
git checkout main
git branch -D rebrand/[branch-name]
```

**Q: Can this handle monorepos or multi-package projects?**
A: Yes! The agent detects multiple project types and handles polyglot codebases. Review the plan carefully for each package.

**Q: What about database names, API endpoints, infrastructure?**
A: The agent focuses on codebase files. Infrastructure changes (databases, DNS, APIs) require manual updates.

**Q: How do I verify the new package name is available?**
A: Check before rebranding:
- npm: `npm search [new-name]`
- PyPI: `pip search [new-name]` or visit pypi.org
- Maven: search central.maven.org
- crates.io: search crates.io

**Q: Can I customize which files get rebranded?**
A: Yes! Use the "Files/folders to exclude" question to specify exclusions like "node_modules, .git, test/fixtures, docs/archive".

**Q: What if I don't have any custom imagery?**
A: No problem! Just don't upload any files. The agent will auto-generate all imagery using Phosphor Icons based on your project name.

**Q: What if I only have a logo but need icons too?**
A: Perfect! Upload your logo, and the agent will use it for the logo while auto-generating icons/favicons/social cards from Phosphor.

---

## Troubleshooting

**Issue: Git branch creation fails**
- **Cause**: Uncommitted changes or dirty working directory
- **Solution**:
  ```bash
  git status  # Check status
  git add . && git commit -m "Save work before rebrand"
  ```

**Issue: Syntax errors after text replacement**
- **Cause**: Complex replacement patterns or edge cases
- **Solution**: Agent auto-validates and rolls back. Review validation report for details.

**Issue: New logo not displaying**
- **Cause**: Path mismatch or caching
- **Solution**:
  - Verify new logo path matches old path
  - Check image format compatibility
  - Clear browser cache
  - Rebuild project

**Issue: Color changes not visible**
- **Cause**: CSS caching or build not refreshed
- **Solution**:
  - Run build: `npm run build`
  - Clear browser cache
  - Verify CSS custom property names

**Issue: Package name conflicts**
- **Cause**: Name already taken in registry
- **Solution**:
  - Check availability first
  - Use scoped packages: `@org/package-name`
  - Choose alternative name

**Issue: Build fails after rebrand**
- **Cause**: Missed reference or syntax error
- **Solution**: Agent attempts auto-fix. If unsuccessful, check validation report for specific errors and fix manually.

**Issue: Linter errors**
- **Cause**: Linter rules violated by new name
- **Solution**: Agent runs `eslint --fix` or equivalent. For persistent errors, review and fix manually or adjust linter config.

---

## Advanced Tips

### Partial Rebranding
To rebrand only specific parts:
1. Use "Files/folders to exclude" to exclude what you don't want changed
2. Example: Rebrand only docs: exclude "src/, test/, scripts/"

### Staged Rebranding
For large projects, rebrand in stages:
1. Stage 1: Documentation only
2. Stage 2: Source code
3. Stage 3: Configuration and build files

### Custom Icon Selection
If auto-generated icon doesn't match:
1. Browse https://phosphoricons.com/
2. Upload your preferred icon SVG to chat
3. Agent will use your selection instead

### Color Palette Generation
To generate a full palette from one color:
- Provide just the primary color
- Agent extracts and transforms related colors
- Or manually specify all colors in questionnaire

---

## Asset Files

This agent uses the following instruction guides (located in `assets/`):

1. **brand-questionnaire.md** - Template for essential questions (max 8)
2. **phosphor-icons-guide.md** - Smart imagery integration guide
3. **linter-validation-guide.md** - File-type linting and build testing guide
4. **rebrand-plan-template.md** - Plan format template
5. **example-rebrand-report.md** - Completion report example

These guides provide instructions for runtime code generation, ensuring flexibility across different project types.
