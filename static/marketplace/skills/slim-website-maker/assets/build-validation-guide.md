# Build Validation Guide

This guide provides instructions for validating Docusaurus website builds with iterative error fixing.

## Build Loop Strategy

The build validation process MUST loop until successful or max attempts (5) reached.

### Build Command

```bash
cd [destination-directory]
yarn build
```

### Error Detection Patterns

Parse build output to identify common error types:

#### 1. Dependency Errors
```
Error: Cannot find module '@docusaurus/...'
Error: Module not found: ...
```

**Auto-fix**:
```bash
yarn install
# or
yarn add [missing-package]
```

#### 2. Configuration Errors
```
Error: Invalid docusaurus.config.js
SyntaxError: Unexpected token
```

**Auto-fix**:
- Validate JSON/JavaScript syntax
- Fix missing commas, brackets, quotes
- Revert to template config if severely broken
- Re-apply customizations carefully

#### 3. MDX/Frontmatter Errors
```
Error: Invalid frontmatter in docs/...
Error: Failed to parse MDX
SyntaxError in MDX file
```

**Auto-fix**:
- Check frontmatter YAML syntax
- Ensure proper `---` delimiters
- Fix required fields (title, description)
- Escape special characters in MDX
- Fix JSX syntax in MDX content

#### 4. Broken Links
```
Error: Broken link on page /docs/...
Error: Document not found: ...
```

**Auto-fix**:
- Identify target document
- Update link path to correct location
- Remove link if target doesn't exist
- Create placeholder document if needed

#### 5. Plugin Errors
```
Error: Plugin @docusaurus/plugin-... failed
Error: Invalid plugin configuration
```

**Auto-fix**:
- Check plugin configuration syntax
- Verify plugin is installed
- Update plugin options to valid format
- Disable plugin if incompatible

#### 6. React Component Errors
```
Error: Invalid React component
ReferenceError: ... is not defined
```

**Auto-fix**:
- Check component imports
- Fix JSX syntax
- Ensure all components are properly exported
- Revert to template component if broken

### Build Loop Implementation

```javascript
// Pseudocode for build validation loop

const MAX_ATTEMPTS = 5;
let attempt = 0;
let buildSuccessful = false;

while (attempt < MAX_ATTEMPTS && !buildSuccessful) {
  attempt++;

  console.log(`Attempt ${attempt}: Running yarn build...`);

  const result = runCommand('yarn build');

  if (result.success) {
    console.log(`✓ Build successful (yarn build - ${result.duration}s)`);
    buildSuccessful = true;
    break;
  } else {
    console.log(`❌ Build failed: ${result.error}`);

    // Parse error and attempt fix
    const errorType = detectErrorType(result.error);
    const fixApplied = applyAutoFix(errorType, result.error);

    if (fixApplied) {
      console.log(`   → ${fixApplied.description}`);
      console.log(`   ✓ Committed fixes`);

      // Commit the fix
      gitCommit(`Website: Fix build errors (attempt ${attempt})`);
    } else {
      console.log(`   → Unable to auto-fix, proceeding to next attempt`);
    }
  }
}

if (!buildSuccessful) {
  console.log(`\n❌ Build failed after ${MAX_ATTEMPTS} attempts`);
  console.log('Presenting errors to user for manual intervention...');

  const userChoice = askUser('Continue despite build failures? (yes/no)');

  if (userChoice === 'no') {
    console.log('Pausing for manual intervention');
    return 'PAUSED';
  } else {
    console.log('Proceeding with warnings');
    return 'COMPLETED_WITH_WARNINGS';
  }
}

return 'SUCCESS';
```

### Error Priority

Fix errors in this order:
1. **Dependency errors** - Must be resolved first
2. **Configuration errors** - Prevent other errors from appearing
3. **Content errors** - MDX, frontmatter issues
4. **Link errors** - Navigation and references
5. **Styling errors** - CSS and theming issues

### Development Server Testing

After successful build, test the development server:

```bash
yarn start
```

**Validation checklist**:
- [ ] Server starts without errors
- [ ] Homepage loads at http://localhost:3000
- [ ] Navigation menus render correctly
- [ ] Documentation pages are accessible
- [ ] Links work (no 404s)
- [ ] Search functions (if enabled)
- [ ] No console errors in browser

### Validation Report Format

```markdown
Build Validation Results
========================
[Status icon] Template cloned successfully
[Status icon] Dependencies installed (yarn install - Xs)
[Status icon] Build successful after N attempts (yarn build - Xs)
  - Attempt 1: [What was fixed]
  - Attempt 2: [What was fixed]
  - ...
  - Attempt N: Build succeeded

[Status icon] Development server tested (http://localhost:3000)
[Status icon] All navigation links working
[Status icon] Content renders correctly
[Warning icon] Warnings: [List or "None"]

Status: [PASS / PASS_WITH_WARNINGS / FAILED]
Build Loop: N iterations, [all/some/no] errors auto-resolved
```

### Common Auto-Fix Patterns

**Pattern 1: Missing Dependencies**
```bash
# Detect
grep "Cannot find module" build_output.txt

# Fix
yarn install
```

**Pattern 2: Broken Frontmatter**
```bash
# Detect
grep "Invalid frontmatter" build_output.txt

# Fix - ensure proper YAML format
---
title: Document Title
description: Document description
---
```

**Pattern 3: Invalid Config**
```bash
# Detect
grep "Invalid docusaurus.config.js" build_output.txt

# Fix - validate JavaScript syntax
# Revert to template if necessary
cp docusaurus.config.js.backup docusaurus.config.js
```

**Pattern 4: Broken Links**
```bash
# Detect
grep "Broken link" build_output.txt

# Fix - update to correct path
# Old: /docs/nonexistent
# New: /docs/getting-started/intro
```

### Exit Conditions

**Success Exit**:
- Build completes without errors
- Development server starts successfully
- Basic navigation tested and working

**Warning Exit**:
- Build succeeds but with non-critical warnings
- User approves continuing despite warnings
- Document warnings for user review

**Failure Exit**:
- Max attempts reached without success
- User chooses to pause for manual intervention
- Critical errors that cannot be auto-fixed

## Best Practices

1. **Always commit fixes** - Each fix attempt should be committed separately
2. **Log everything** - Detailed logging helps diagnose issues
3. **Parse errors carefully** - Accurate error detection enables better fixes
4. **Test incrementally** - Verify each fix before proceeding
5. **Provide escape hatch** - Allow user intervention when auto-fix fails
6. **Keep trying** - Don't give up before max attempts
7. **Document warnings** - Track non-critical issues for user review
