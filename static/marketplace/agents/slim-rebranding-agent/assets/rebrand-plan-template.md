# Rebranding Plan: [Old Name] → [New Name]

**Generated**: [Date and Time]
**Project Type**: [Detected project type(s)]
**Target Branch**: `[branch-name]`

---

## Executive Summary

This plan outlines all changes required to rebrand **[Old Name]** to **[New Name]**.

### Overview Statistics

| Category | Files Affected | Total Occurrences | Risk Level |
|----------|----------------|-------------------|------------|
| Text/Naming | [count] | [count] | [Low/Medium/High] |
| Documentation | [count] | [count] | [Low/Medium/High] |
| Visual Assets | [count] | [count] | [Low/Medium/High] |
| Colors/Theming | [count] | [count] | [Low/Medium/High] |
| Configuration | [count] | [count] | [Low/Medium/High] |
| **TOTAL** | **[count]** | **[count]** | **[Overall Risk]** |

### Primary Color Change

- **Current Primary Color**: `[#hexcode or "N/A"]`
- **New Primary Color**: `[#hexcode or "Keeping current"]`
- **Color Transformation**: `[Yes/No]` - Will transform color variations (lighter/darker shades)

### Imagery Strategy

| Item | Source | Status |
|------|--------|--------|
| Logo (SVG) | [User-provided / Phosphor: "icon-name"] | [✓ Ready / ⏳ To Generate] |
| Logo (PNG) | [User-provided / Phosphor: "icon-name"] | [✓ Ready / ⏳ To Generate] |
| Favicon (ICO) | [User-provided / Phosphor: "icon-name"] | [✓ Ready / ⏳ To Generate] |
| Icon 16x16 | [User-provided / Phosphor: "icon-name"] | [✓ Ready / ⏳ To Generate] |
| Icon 32x32 | [User-provided / Phosphor: "icon-name"] | [✓ Ready / ⏳ To Generate] |
| Icon 192x192 | [User-provided / Phosphor: "icon-name"] | [✓ Ready / ⏳ To Generate] |
| Icon 512x512 | [User-provided / Phosphor: "icon-name"] | [✓ Ready / ⏳ To Generate] |
| Apple Touch Icon | [User-provided / Phosphor: "icon-name"] | [✓ Ready / ⏳ To Generate] |
| Social Card (OG) | [User-provided / Phosphor-based / N/A] | [✓ Ready / ⏳ To Generate] |
| Twitter Card | [User-provided / Phosphor-based / N/A] | [✓ Ready / ⏳ To Generate] |

**User-provided imagery**: [count] files
**Phosphor-generated imagery**: [count] files
**Phosphor icon selected**: `[icon-name]` (from keywords: [keywords])

---

## Detailed Changes by Category

### 1. Text/Naming Changes

**Scope**: Replace project name across codebase (whole-word, case-preserving)

**Case Variations to Replace**:
- `[OldName]` → `[NewName]` (original case)
- `[oldname]` → `[newname]` (lowercase)
- `[OLDNAME]` → `[NEWNAME]` (uppercase)
- `[old-name]` → `[new-name]` (kebab-case)
- `[old_name]` → `[new_name]` (snake_case)
- `[oldName]` → `[newName]` (camelCase)

**Files to Modify** ([count] files, [count] total occurrences):

| File Path | Occurrences | Changes Preview | Risk |
|-----------|-------------|-----------------|------|
| `[path/to/file1.ext]` | [count] | `[OldName]` → `[NewName]` in [context] | Low |
| `[path/to/file2.ext]` | [count] | `[old-name]` → `[new-name]` in [context] | Low |
| `[path/to/file3.ext]` | [count] | `[OLD_NAME]` → `[NEW_NAME]` in [context] | Medium |
| ... | ... | ... | ... |

**High-Risk Files** (require careful review):
- `[path/if/any]`: [reason for high risk]

**Excluded Paths** (will NOT be changed):
- `node_modules/`
- `.git/`
- `build/`, `dist/`
- `[custom exclusions from user]`

**Commit Message**:
```
Rebrand: Update project name from [OldName] to [NewName]

- Replace all case variations of project name
- [count] files modified, [count] occurrences

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

### 2. Documentation Updates

**Scope**: Update project name, descriptions, links in documentation files

**Files to Modify** ([count] files):

| File Path | Changes | Risk |
|-----------|---------|------|
| `README.md` | Project name, description, links | Medium |
| `docs/[file].md` | Project references, screenshots | Low |
| `CHANGELOG.md` | [Keep old name / Update current] | Low |
| `CONTRIBUTING.md` | Project name references | Low |
| `package.json` (description) | Package description | Low |
| ... | ... | ... |

**Special Handling**:
- CHANGELOG.md: [Keep old name in historical entries / Update only current version]
- Archived docs: [Include / Exclude from updates]
- Translations: [Update / Skip for now]

**Commit Message**:
```
Rebrand: Update documentation for [NewName]

- Update README, docs, contributing guides
- [Special notes if any]

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

### 3. Code Comments Updates

**Scope**: Update project name in code comments (always included)

**Files to Modify** ([count] files):

| File Path | Comment Changes | Risk |
|-----------|-----------------|------|
| `[path/to/code1.ext]` | [count] comment blocks | Low |
| `[path/to/code2.ext]` | [count] inline comments | Low |
| ... | ... | ... |

**Commit Message**:
```
Rebrand: Update code comments with [NewName]

- Update project references in code comments
- [count] files modified

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

### 4. Visual Assets Replacement

**Scope**: Replace logos, icons, favicons, social cards

**Files to Replace/Generate** ([count] files):

| File Path | Current | New Source | Action | Risk |
|-----------|---------|------------|--------|------|
| `static/img/logo.svg` | [Old logo] | [User: my-logo.svg / Phosphor: "icon-name"] | Replace | Medium |
| `static/img/logo.png` | [Old logo] | [Derived from SVG / User-provided] | Replace | Medium |
| `static/favicon.ico` | [Old favicon] | [Phosphor: "icon-name" (16x16, 32x32)] | Replace | Low |
| `static/favicon-16x16.png` | [Old icon] | [Phosphor: "icon-name"] | Replace | Low |
| `static/favicon-32x32.png` | [Old icon] | [Phosphor: "icon-name"] | Replace | Low |
| `static/icon-192x192.png` | [Old icon] | [Phosphor: "icon-name"] | Replace | Low |
| `static/icon-512x512.png` | [Old icon] | [Phosphor: "icon-name"] | Replace | Low |
| `static/apple-touch-icon.png` | [Old icon] | [Phosphor: "icon-name" (180x180)] | Replace | Low |
| `static/img/og-image.png` | [Old social card] | [User-provided / Phosphor-based (1200x630)] | Replace | Medium |
| ... | ... | ... | ... | ... |

**Imagery Generation Details**:
- **User-provided files**: [List files uploaded by user with original names]
- **Phosphor icon**: `[icon-name]` (regular style)
  - Fetched from: `https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/[icon-name].svg`
  - Converted to: SVG, PNG (multiple sizes), ICO
- **Original files backed up**: Yes (in commit history)

**Files Referencing Imagery** (to update):

| File Path | References to Update | Risk |
|-----------|---------------------|------|
| `index.html` | `<link rel="icon">`, `<meta property="og:image">` | Medium |
| `docusaurus.config.js` | `favicon`, `image`, `navbar.logo` | Medium |
| `manifest.json` | `icons` array | Low |
| `README.md` | Logo image link | Low |
| ... | ... | ... |

**Commit Message**:
```
Rebrand: Replace visual assets for [NewName]

- Replace logo, icons, favicons, social cards
- User-provided: [count] files
- Phosphor-generated: [count] files (icon: "[icon-name]")
- Update all references in HTML and config files

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

### 5. Colors/Theming Changes

**Scope**: Transform color scheme from `[old-color]` to `[new-color]`

**Primary Color Transformation**:
- **Old Primary**: `[#hexcode]`
- **New Primary**: `[#hexcode]`
- **Strategy**: Transform all color variations (lighter/darker shades)

**Files to Modify** ([count] files):

| File Path | Color Changes | Risk |
|-----------|---------------|------|
| `src/css/custom.css` | `:root` CSS variables, color definitions | Medium |
| `docusaurus.config.js` | `themeConfig.colorMode` colors | Low |
| `src/theme/[file].js` | Inline color values | Low |
| `tailwind.config.js` | Color palette definitions | Medium |
| ... | ... | ... |

**Color Mapping** (detected variations):

| Old Color | Usage | New Color | Context |
|-----------|-------|-----------|---------|
| `[#oldcolor]` | Primary | `[#newcolor]` | Main brand color |
| `[#oldcolor-light]` | Primary light | `[#newcolor-light]` | Lighter shade (calculated) |
| `[#oldcolor-dark]` | Primary dark | `[#newcolor-dark]` | Darker shade (calculated) |
| ... | ... | ... | ... |

**Design Token Updates**:
- CSS custom properties (CSS variables)
- Sass/SCSS variables
- JavaScript theme objects
- Tailwind config colors

**Commit Message**:
```
Rebrand: Update color scheme to [#newcolor]

- Transform primary color and all variations
- Update CSS variables, theme configs, design tokens
- [count] files modified

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

### 6. Configuration File Updates

**Scope**: Update project name/metadata in package manager and build configs

**Files to Modify** ([count] files):

| File Path | Changes | Risk |
|-----------|---------|------|
| `package.json` | `name`, `description`, `repository.url`, `bugs.url`, `homepage` | High |
| `Cargo.toml` | `[package] name`, `description`, `homepage` | High |
| `pyproject.toml` | `[project] name`, `description`, `urls` | High |
| `pom.xml` | `<artifactId>`, `<name>`, `<description>`, `<url>` | High |
| `go.mod` | `module` path | High |
| `composer.json` | `name`, `description`, `homepage` | High |
| `*.csproj` | `<AssemblyName>`, `<RootNamespace>`, `<Description>` | High |
| `setup.py` | `name`, `description`, `url` | High |
| `Gemfile` | Gem references (if applicable) | Medium |
| `docusaurus.config.js` | `title`, `tagline`, `url`, `baseUrl`, `organizationName`, `projectName` | Medium |
| `manifest.json` | `name`, `short_name`, `description` | Low |
| ... | ... | ... |

**Special Considerations**:
- Package name changes may affect imports/dependencies
- Module path changes (Go, .NET) require import updates
- Maven artifactId changes affect dependency references
- npm package name must follow naming conventions

**Validation After Changes**:
- Run package manager install/build to verify
- Check for broken imports
- Verify dependency resolution

**Commit Message**:
```
Rebrand: Update configuration files for [NewName]

- Update package.json, [other-configs]
- Update project metadata, URLs, descriptions
- [count] files modified

⚠️ Note: Package/module name changes may affect imports

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## Git Strategy

### Branch Creation

**Branch Name**: `[branch-name]` (e.g., `rebrand/oldname-to-newname`)

**Base Branch**: `[main/master/develop]` (current branch)

**Command**:
```bash
git checkout -b [branch-name]
```

### Commit Sequence

The rebranding will be executed in **[count] commits**, one per category:

1. **Text/Naming**: Replace project name across codebase
2. **Documentation**: Update README, docs, guides
3. **Code Comments**: Update comments with new name
4. **Visual Assets**: Replace logos, icons, favicons
5. **Colors/Theming**: Transform color scheme (if applicable)
6. **Configuration**: Update package manager configs

**Benefits of Incremental Commits**:
- ✅ Each category is independently reviewable
- ✅ Easy to cherry-pick or revert specific changes
- ✅ Clear git history showing what changed in each step
- ✅ Safer for code review

### Post-Execution

After all commits are made, you can:
- Review changes: `git log [base-branch]..[branch-name]`
- View diff: `git diff [base-branch]..[branch-name]`
- Create pull request (if desired)
- Merge to main branch
- Delete branch after merge

---

## Risk Assessment

### Overall Risk: **[Low/Medium/High]**

### Risk Breakdown by Category

| Category | Risk Level | Rationale | Mitigation |
|----------|------------|-----------|------------|
| Text/Naming | [Low/Medium/High] | [Reason] | Whole-word matching, case-preserving, excludes dependencies |
| Documentation | Low | Static files, low impact | Human review before merge |
| Code Comments | Low | No functional code changes | Automated, safe updates |
| Visual Assets | Medium | User-visible changes | Use high-quality Phosphor icons, validate references |
| Colors/Theming | [Low/Medium/High] | [Reason] | Transform all shades, validate in browser |
| Configuration | High | Affects builds, imports, dependencies | Validate with linters and build system |

### High-Risk Items Requiring Extra Attention

**If any high-risk items exist, list them here**:

1. **[File/Category]**: [Risk description]
   - **Mitigation**: [How we'll handle it]

2. **[File/Category]**: [Risk description]
   - **Mitigation**: [How we'll handle it]

**Overall Mitigation Strategy**:
- ✅ Git branch isolates all changes
- ✅ Incremental commits enable granular review
- ✅ Validation with linters and build systems
- ✅ Easy rollback (see section below)

---

## Validation Plan

After making all changes, the following validation steps will be performed:

### 1. Linter Validation

Run file-type specific linters on modified files:

| File Type | Linter | Command |
|-----------|--------|---------|
| JSON | python/jq | `python -m json.tool [file]` |
| YAML | yamllint | `yamllint [file]` |
| JavaScript/TypeScript | ESLint | `npx eslint . --fix` |
| Python | flake8/pylint | `flake8 [file]` |
| CSS/SCSS | Stylelint | `stylelint "**/*.css" --fix` |
| HTML | html-validate | `html-validate [file]` |
| Markdown | markdownlint | `markdownlint [file]` |

**Auto-fix**: Common errors will be automatically corrected where possible.

### 2. Build System Validation

Detect and run the build system to ensure nothing is broken:

| Project Type | Build Command | Purpose |
|--------------|---------------|---------|
| Node.js | `npm run build` / `yarn build` | Verify project builds successfully |
| Python | `python setup.py build` | Verify package builds |
| Java | `mvn compile` / `gradle build` | Verify compilation |
| Rust | `cargo build` | Verify compilation |
| Go | `go build` | Verify compilation |
| .NET | `dotnet build` | Verify compilation |

**Error Handling**: If build fails, parse errors and attempt automatic fixes (e.g., import path updates).

### 3. Manual Verification Checklist

**Recommended manual checks after rebranding**:
- [ ] Open project in browser/app and verify visual appearance
- [ ] Check that favicon displays correctly
- [ ] Verify social card preview (Twitter, LinkedIn, etc.)
- [ ] Test key functionality to ensure nothing broke
- [ ] Review git diff for any unexpected changes
- [ ] Check that new color scheme looks good across pages

---

## Rollback Instructions

If you need to undo the rebranding changes:

### Option 1: Delete Branch (Before Merge)

If you haven't merged the branch yet:

```bash
# Switch back to main branch
git checkout [base-branch]

# Delete the rebranding branch
git branch -D [branch-name]
```

**Result**: All rebranding changes are discarded.

---

### Option 2: Revert After Merge

If you've already merged to main:

```bash
# Revert the merge commit
git revert -m 1 [merge-commit-hash]

# Or revert individual commits
git revert [commit-hash-1] [commit-hash-2] ...
```

**Result**: Creates new commits that undo the rebranding.

---

### Option 3: Restore Individual Categories

If you only want to undo specific categories (e.g., keep text changes but revert colors):

```bash
# List commits on the branch
git log [base-branch]..[branch-name]

# Revert specific commit
git revert [commit-hash-of-colors-commit]
```

**Result**: Selectively undoes specific categories.

---

### Option 4: Hard Reset (Destructive)

**⚠️ WARNING**: This is destructive and should only be used if you haven't pushed changes.

```bash
# Reset to state before rebranding
git reset --hard [base-branch]
```

**Result**: Completely removes all local changes.

---

## Exclusions

The following paths will **NOT** be modified:

**Default Exclusions**:
- `node_modules/`
- `.git/`
- `build/`
- `dist/`
- `.cache/`
- `coverage/`

**User-Specified Exclusions**:
[List custom exclusions provided by user, or "None" if no custom exclusions]

---

## Special Instructions

**User-provided special instructions**:

[Include any special instructions from questionnaire, or "None" if no special instructions provided]

---

## Approval Required

**⚠️ IMPORTANT**: This plan will NOT be executed until you explicitly approve it.

### Options:

**1. APPROVE** - Proceed with rebranding as planned
- Type: "Approved" or "Yes, proceed" or "Execute the plan"

**2. MODIFY** - Request changes to the plan
- Example: "Exclude docs/archive/ from changes"
- Example: "Don't update configuration files"
- Example: "Change the Phosphor icon to 'rocket' instead"

**3. CANCEL** - Stop the rebranding process
- Type: "Cancel" or "Stop" or "Don't proceed"

---

**What happens after approval?**

1. Create git branch: `[branch-name]`
2. Execute changes in [count] commits (one per category)
3. Run validation (linters + build system)
4. Generate summary report
5. Present next steps (create PR, merge, etc.)

**Estimated time**: [Estimate based on file count, e.g., "5-10 minutes for small projects, 20-30 minutes for large projects"]

---

**Questions or Concerns?**

If you have any questions about this plan or want to modify any aspect of it, please let me know before approval.

---

**Version**: 1.0.0
**Template Last Updated**: 2026-01-04
