# File-Type Specific Linting & Validation Guide

**Purpose**: After making rebranding changes, validate using appropriate linters and build systems to ensure nothing broke.

---

## Overview

This guide provides instructions for:
1. Detecting available linters for each file type
2. Running linters on modified files
3. Auto-fixing common errors
4. Detecting and running build systems
5. Parsing errors and attempting fixes
6. Generating validation reports

---

## Part 1: File-Type Linters

### JSON Files

**Detection**:
- Always available (Python or jq)
- No config file needed

**Validation Command**:
```bash
python -m json.tool file.json > /dev/null 2>&1
# OR
jq empty file.json > /dev/null 2>&1
```

**Common Errors After Rebrand**:
- Trailing commas
- Missing quotes
- Invalid escape sequences in strings

**Auto-fix Strategy**:
Write code to:
- Remove trailing commas before `}` or `]`
- Ensure all keys are quoted
- Fix escaped characters

---

### YAML Files

**Detection**:
- Check for `yamllint` installation
- Or use Python's yaml module

**Validation Command**:
```bash
yamllint file.yml
# OR
python -c "import yaml; yaml.safe_load(open('file.yml'))"
```

**Common Errors After Rebrand**:
- Incorrect indentation
- Unquoted strings with special characters
- Duplicate keys

**Auto-fix Strategy**:
- Re-indent consistently (2 or 4 spaces)
- Quote strings with colons or hashes
- Report duplicate keys for manual resolution

---

### JavaScript/TypeScript

**Detection**:
Look for config files:
- `.eslintrc`
- `.eslintrc.js`
- `.eslintrc.json`
- `eslint.config.js`
- `.eslintrc.yml`
- `package.json` with `eslintConfig` field

**Validation Command**:
```bash
npx eslint . --ext .js,.jsx,.ts,.tsx
# With auto-fix:
npx eslint . --ext .js,.jsx,.ts,.tsx --fix
```

**If ESLint not installed**:
```bash
# Basic syntax check
node --check file.js
```

**Common Errors After Rebrand**:
- String length exceeding max-len rules
- Changed variable names not following naming conventions
- Import/require paths referencing old name

**Auto-fix Strategy**:
- Run `eslint --fix` automatically
- For remaining errors, present to user
- Check if errors are rule violations (non-critical) vs. syntax errors (critical)

---

### Python

**Detection**:
Look for:
- `setup.cfg` with `[flake8]` section
- `.flake8`
- `pyproject.toml` with `[tool.flake8]` or `[tool.pylint]`
- `pylint.rc`, `.pylintrc`

**Validation Commands**:
```bash
# flake8
flake8 file.py

# pylint
pylint file.py

# Basic syntax check
python -m py_compile file.py
```

**Common Errors After Rebrand**:
- Line length violations
- Import statement changes
- Docstring updates needed

**Auto-fix Strategy**:
- Use `autopep8` or `black` if available:
  ```bash
  autopep8 --in-place file.py
  black file.py
  ```
- For linting violations (not syntax errors), log warnings
- Fix critical syntax errors only

---

### CSS/SCSS

**Detection**:
Look for:
- `.stylelintrc`
- `.stylelintrc.json`
- `stylelint.config.js`
- `package.json` with `stylelint` field

**Validation Command**:
```bash
stylelint "**/*.css"
# With auto-fix:
stylelint "**/*.css" --fix
```

**If Stylelint not installed**:
Basic syntax validation (check for balanced braces, valid selectors)

**Common Errors After Rebrand**:
- Color format inconsistencies
- Custom property name changes
- Selector specificity changes

**Auto-fix Strategy**:
- Run `stylelint --fix`
- For color format issues, standardize to hex
- Report selector errors for manual review

---

### HTML

**Detection**:
Look for:
- `htmlhint` or `html-validate` in package.json
- `.htmlhintrc`

**Validation Command**:
```bash
htmlhint **/*.html
# OR
html-validate **/*.html
```

**If not installed**:
Basic syntax check (balanced tags, valid attributes)

**Common Errors After Rebrand**:
- Title/meta tags with old name not updated
- Alt text on images not updated
- Broken links or references

**Auto-fix Strategy**:
- Fix obvious issues (unclosed tags)
- Report semantic errors for manual review

---

### Markdown

**Detection**:
Look for:
- `markdownlint` in package.json
- `.markdownlint.json`
- `remark` configuration

**Validation Command**:
```bash
markdownlint **/*.md
# OR
remark --use remark-lint .
```

**Common Errors After Rebrand**:
- Link reference changes
- Heading hierarchy issues
- Line length violations

**Auto-fix Strategy**:
- Fix link references automatically
- Log style violations (non-critical)

---

## Part 2: Build System Detection & Testing

### Node.js / JavaScript

**Detection**:
Check `package.json` for `scripts` field:
```json
{
  "scripts": {
    "build": "...",
    "test": "...",
    "start": "..."
  }
}
```

**Build Commands**:
```bash
# npm
npm run build
npm run test

# yarn
yarn build
yarn test

# pnpm
pnpm build
pnpm test
```

**Common Build Errors After Rebrand**:
- Import paths referencing old name
- Environment variables with old name
- Build output paths with old name

**Error Detection**:
Parse build output for:
- `Error:`
- `ERROR`
- `FATAL`
- `✖` or similar symbols
- Exit code non-zero

**Auto-fix Attempts**:
1. Check for obvious import path issues
2. Update environment variable references
3. If module not found, check if it's a renamed import
4. Re-run build after fixes

---

### Python

**Detection**:
Look for:
- `setup.py`
- `pyproject.toml`
- `requirements.txt`
- `Pipfile`

**Build Commands**:
```bash
# setup.py
python setup.py build

# modern (pyproject.toml)
pip install -e .
# OR
python -m build
```

**Common Build Errors**:
- Package name conflicts
- Import errors after rename
- Entry point references

**Auto-fix Attempts**:
1. Update package name in setup.py/pyproject.toml
2. Fix import statements
3. Update entry points

---

### Java / Maven

**Detection**:
Look for:
- `pom.xml` (Maven)
- `build.gradle`, `settings.gradle` (Gradle)

**Build Commands**:
```bash
# Maven
mvn compile
mvn package
mvn test

# Gradle
gradle build
gradle test
./gradlew build
```

**Common Build Errors**:
- GroupId or ArtifactId changes
- Package name refactoring needed
- Resource files with old name

**Auto-fix Attempts**:
1. Update pom.xml/build.gradle references
2. Check for package name consistency
3. Update resource file paths

---

### Rust

**Detection**:
Look for:
- `Cargo.toml`
- `Cargo.lock`

**Build Commands**:
```bash
cargo build
cargo test
cargo check  # faster than build
```

**Common Build Errors**:
- Package name in Cargo.toml
- Crate references
- Module paths

**Auto-fix Attempts**:
1. Update Cargo.toml name field
2. Check for internal crate references
3. Update module imports

---

### Go

**Detection**:
Look for:
- `go.mod`
- `go.sum`

**Build Commands**:
```bash
go build
go test ./...
go vet
```

**Common Build Errors**:
- Module path in go.mod
- Import paths
- Package references

**Auto-fix Attempts**:
1. Update module path in go.mod
2. Update import statements
3. Run `go mod tidy`

---

### C/C++

**Detection**:
Look for:
- `CMakeLists.txt` (CMake)
- `Makefile` (Make)
- `configure`, `configure.ac` (Autotools)

**Build Commands**:
```bash
# CMake
cmake .
make

# Make
make
make test

# Autotools
./configure
make
```

**Common Build Errors**:
- Project name in CMakeLists.txt
- Target names
- Header file paths

**Auto-fix Attempts**:
1. Update project() call in CMakeLists.txt
2. Update target names
3. Check header include paths

---

### .NET

**Detection**:
Look for:
- `*.csproj` files
- `*.sln` files
- `packages.config`

**Build Commands**:
```bash
dotnet build
dotnet test
msbuild
```

**Common Build Errors**:
- Assembly name
- Root namespace
- Package references

**Auto-fix Attempts**:
1. Update AssemblyName in .csproj
2. Update RootNamespace
3. Check NuGet package references

---

## Part 3: Validation Workflow

### Step 1: Run All Applicable Linters

```
For each modified file:
  1. Detect file type (.js, .py, .json, etc.)
  2. Check for available linter
  3. Run linter
  4. Collect results
```

### Step 2: Categorize Errors

**Critical** (must fix):
- Syntax errors (JSON/YAML parse failures)
- Import/require failures
- Undefined references
- Build-blocking errors

**Non-Critical** (warnings):
- Style violations (line length, naming)
- Linting rules (prefer-const, etc.)
- Minor formatting issues

### Step 3: Auto-Fix Where Possible

```
For each error:
  If error.type == "syntax":
    attempt_fix(error)
  Else if error.type == "style":
    log_warning(error)
  Else:
    present_to_user(error)
```

### Step 4: Run Build System with Iterative Loop

**IMPORTANT: Loop until build succeeds or max attempts reached.**

```
# Step 4.1: Detect Build System
If build_system_detected:
  identified_system = detect_build_system()  # npm, mvn, cargo, go, etc.
  build_command = get_build_command(identified_system)
Else:
  log("No build system detected - skipping build validation")
  skip_to_step_5()

# Step 4.2: Iterative Build Loop
max_attempts = 5
attempt = 0

While attempt < max_attempts:
  attempt += 1
  log(f"Build attempt {attempt}/{max_attempts}")

  # Run build
  result = run_build(build_command)

  # Check if build succeeded
  If result.exit_code == 0:
    log(f"✓ Build successful after {attempt} attempt(s)")
    build_duration = result.duration
    break  # Exit loop - success!

  # Build failed - parse errors
  Else:
    log(f"❌ Build failed (attempt {attempt})")
    errors = parse_build_errors(result.stderr, result.stdout)

    # Categorize errors
    import_errors = filter_errors(errors, type="import")
    syntax_errors = filter_errors(errors, type="syntax")
    type_errors = filter_errors(errors, type="type")
    dependency_errors = filter_errors(errors, type="dependency")

    # Attempt automatic fixes
    fixed_files = []

    # Fix import path errors (common after renaming)
    For error in import_errors:
      If error.message.contains("cannot find module"):
        old_path = extract_old_path(error.message)
        new_path = replace_name_in_path(old_path, old_name, new_name)
        If file_exists(new_path):
          fix_import_statement(error.file, old_path, new_path)
          fixed_files.append(error.file)

    # Fix package name in imports (e.g., internal imports)
    For error in dependency_errors:
      If error.message.contains("package not found") OR error.message.contains("module not found"):
        If error.references_old_package_name:
          update_import_to_new_package_name(error.file)
          fixed_files.append(error.file)

    # Fix syntax errors introduced by text replacement
    For error in syntax_errors:
      If is_json_or_yaml(error.file):
        attempt_syntax_fix(error.file)
        fixed_files.append(error.file)

    # Log fixes
    If fixed_files:
      log(f"→ Auto-fixed {len(fixed_files)} file(s)")
      for file in fixed_files:
        log(f"  - {file}")

      # Commit fixes
      git_commit(f"Rebrand: Fix build errors (attempt {attempt})")
    Else:
      log("→ No automatic fixes available")

    # If last attempt, present errors to user
    If attempt == max_attempts:
      log(f"⚠ Build failed after {max_attempts} attempts")
      present_errors_to_user(errors)

      user_choice = ask_user("Continue despite build failures? (yes/no)")
      If user_choice == "no":
        pause_for_manual_intervention()
      Else:
        log("⚠ Proceeding with build failures (user accepted)")
        break

    # Continue to next loop iteration
```

**Build Error Parsing Strategies:**

```python
def parse_build_errors(stderr, stdout):
    """Parse build output to extract actionable errors"""
    errors = []

    # Node.js / npm / webpack
    if "Module not found" in output:
        errors.append({
            "type": "import",
            "message": extract_module_error(output),
            "file": extract_file_path(output),
            "line": extract_line_number(output)
        })

    # Python
    if "ImportError" in output or "ModuleNotFoundError" in output:
        errors.append({
            "type": "import",
            "message": extract_python_import_error(output)
        })

    # Java / Maven
    if "cannot find symbol" in output:
        errors.append({
            "type": "dependency",
            "message": extract_java_symbol_error(output)
        })

    # Rust / Cargo
    if "unresolved import" in output:
        errors.append({
            "type": "import",
            "message": extract_rust_import_error(output)
        })

    # Go
    if "undefined:" in output or "cannot find package" in output:
        errors.append({
            "type": "dependency",
            "message": extract_go_error(output)
        })

    # Syntax errors (any language)
    if "SyntaxError" in output or "ParseError" in output:
        errors.append({
            "type": "syntax",
            "message": extract_syntax_error(output)
        })

    return errors
```

**Auto-Fix Strategies by Error Type:**

**Import Path Errors:**
```python
def fix_import_path_error(file_path, old_import, new_import):
    """Fix import statement referencing old name"""
    content = read_file(file_path)

    # JavaScript/TypeScript
    content = re.sub(
        rf"from ['\"](.*/)?{old_name}(['\"])",
        rf"from '\1{new_name}\2'",
        content
    )

    # Python
    content = re.sub(
        rf"from {old_name}",
        rf"from {new_name}",
        content
    )

    write_file(file_path, content)
```

**Package Name Errors:**
```python
def fix_package_name_in_imports(file_path, old_pkg_name, new_pkg_name):
    """Update internal imports using old package name"""
    content = read_file(file_path)
    content = content.replace(f'import {old_pkg_name}', f'import {new_pkg_name}')
    content = content.replace(f'from {old_pkg_name}', f'from {new_pkg_name}')
    write_file(file_path, content)
```

**Syntax Errors:**
```python
def fix_syntax_errors(file_path):
    """Attempt to fix common syntax errors"""
    content = read_file(file_path)

    # JSON: Remove trailing commas
    if file_path.endswith('.json'):
        content = re.sub(r',(\s*[}\]])', r'\1', content)

    # YAML: Fix indentation
    if file_path.endswith(('.yml', '.yaml')):
        content = fix_yaml_indentation(content)

    write_file(file_path, content)
```

### Step 5: Generate Validation Report

**Example Report Format (Build succeeded after iterations)**:
```markdown
# Validation Report

## Linter Results

### JSON Files (5 files checked)
✓ All valid

### JavaScript Files (42 files checked)
✓ ESLint passed with auto-fixes
⚠ 3 warnings (line length in comments)

### Python Files (18 files checked)
✓ flake8 passed
✓ All syntax valid

### CSS Files (6 files checked)
✓ Stylelint passed (12 auto-fixes applied)

## Build System Results

### Build System Detected
Node.js (npm)

### Build Command
`npm run build`

### Iterative Build Loop
**Status: ✓ Build successful after 3 attempts**

#### Attempt 1
❌ Build failed: Module not found: './old-project'
→ Auto-fixed import paths in 3 files:
  - src/components/Header.js
  - src/utils/api.js
  - src/services/auth.js
✓ Committed: "Rebrand: Fix build errors (attempt 1)"

#### Attempt 2
❌ Build failed: Cannot resolve module 'old-project'
→ Auto-fixed package name in imports (8 files):
  - src/App.js
  - src/index.js
  - tests/setup.js
  - (5 more files)
✓ Committed: "Rebrand: Fix build errors (attempt 2)"

#### Attempt 3
✓ Build successful (npm run build - 52.3s)
✓ All errors resolved automatically

### Build Duration
52.3 seconds

### Warnings
⚠ Found old project name in 2 archived files (non-critical):
  - docs/archive/2020-notes.md:15
  - test/fixtures/old-data.json:8

## Completeness Check

Searched for old name occurrences:
✓ No critical occurrences found
⚠ 2 occurrences in archived/test files (acceptable)

## Overall Status
✅ PASS with minor warnings

## Build Loop Summary
- Total attempts: 3
- Auto-fixes applied: 11 files
- Final status: Success
- All build errors automatically resolved

## Recommendations
- Review warnings in archived files (optional)
- Consider updating test fixtures in future
- Build successful, safe to proceed
```

**Example Report Format (No build system detected)**:
```markdown
# Validation Report

## Linter Results

### Markdown Files (22 files checked)
✓ markdownlint passed

### YAML Files (3 files checked)
✓ All valid

## Build System Results

### Build System Detected
None - This appears to be a documentation-only project

### Status
⚠ No build system detected - skipping build validation

## Completeness Check

Searched for old name occurrences:
✓ No critical occurrences found

## Overall Status
✅ PASS (no build system)

## Recommendations
- All linters passed
- No build system to validate
- Safe to proceed
```

**Example Report Format (Build failed after max attempts)**:
```markdown
# Validation Report

## Linter Results

### JavaScript Files (42 files checked)
✓ ESLint passed

## Build System Results

### Build System Detected
Node.js (npm)

### Build Command
`npm run build`

### Iterative Build Loop
**Status: ❌ Build failed after 5 attempts**

#### Attempt 1
❌ Build failed: Module not found: './old-project'
→ Auto-fixed import paths in 3 files
✓ Committed: "Rebrand: Fix build errors (attempt 1)"

#### Attempt 2
❌ Build failed: Type error in src/types.ts
→ Auto-fixed TypeScript types (2 files)
✓ Committed: "Rebrand: Fix build errors (attempt 2)"

#### Attempt 3-5
❌ Build still failing: Complex type errors
→ No automatic fixes available

### Remaining Errors
```
src/components/Dashboard.tsx:45:12
  Type 'OldProjectConfig' is not assignable to type 'NewProjectConfig'

src/types/index.ts:23:5
  Cannot find type 'OldProjectOptions'
```

## Overall Status
⚠️ PARTIAL - Build failures require manual intervention

## Manual Fix Guidance
1. Update TypeScript interfaces in src/types/index.ts:
   - Rename `OldProjectConfig` to `NewProjectConfig`
   - Rename `OldProjectOptions` to `NewProjectOptions`

2. Re-run build after manual fixes:
   ```bash
   npm run build
   ```

## User Decision Required
Continue despite build failures? (User chose: No - pausing for manual intervention)
```

---

## Part 4: Error Auto-Fix Examples

### Example 1: JSON Trailing Comma

**Error**:
```json
{
  "name": "NewName",
  "version": "1.0.0",  ← trailing comma
}
```

**Fix**:
```python
content = re.sub(r',(\s*[}\]])', r'\1', content)
```

### Example 2: Import Path

**Error**:
```javascript
import { OldName } from './old-name';  // file doesn't exist
```

**Fix**:
Detect if `old-name.js` was renamed to `new-name.js`:
```javascript
import { NewName } from './new-name';
```

### Example 3: Package Name Conflict

**Error**:
```
Module 'old-name' not found
```

**Fix**:
Check if package.json name was updated but imports weren't:
```javascript
import from 'old-name';  →  import from 'new-name';
```

---

## Part 5: Implementation Notes

**For the agent**:

1. **Write runtime code** to:
   - Detect file types of modified files
   - Check for linter availability
   - Run linters with appropriate flags
   - Parse output and categorize errors
   - Attempt auto-fixes
   - Re-run linters to verify fixes

2. **Handle errors gracefully**:
   - If linter not installed, skip with warning
   - If auto-fix fails, report to user
   - Never fail entire rebrand due to linting issues

3. **Prioritize critical over style**:
   - Always fix syntax errors
   - Auto-fix style if easy (eslint --fix)
   - Log style warnings for user review

4. **Build system integration**:
   - Detect build command from package.json/Makefile/etc.
   - Run build
   - Parse output for errors
   - Attempt fixes based on error messages
   - Re-run build to verify

5. **Report clearly**:
   - Use ✓ and ⚠ symbols
   - Separate critical from non-critical
   - Provide file:line references
   - Give overall PASS/FAIL status

---

**Version**: 1.0.0
**Last Updated**: 2026-01-04
