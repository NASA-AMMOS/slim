# Error Reference & Quick Fixes

## Build Errors

### B001: NPM Build Failed
**Pattern**: `npm run build` exits with non-zero code
**Auto-Fix**: Remove orphaned imports, fix JSX syntax
**Command**: `sed -i '/^import.*from\s*["\']\..*["\'];$/d' FILE`

### B002: JSON Syntax Error
**Pattern**: `SyntaxError: Unexpected token` in JSON files
**Auto-Fix**: Remove trailing commas, fix quotes
**Command**: `python -c "import json; json.loads(open('FILE').read())"`

### B003: Module Not Found
**Pattern**: `Cannot resolve module './ComponentName'`
**Auto-Fix**: Remove import statement
**Command**: `grep -v "import.*ComponentName" FILE > temp && mv temp FILE`

### B004: JSX Syntax Error
**Pattern**: `JSX element 'tag' has no corresponding closing tag`
**Auto-Fix**: Convert to self-closing tags
**Command**: `sed -i 's/<([a-zA-Z][^>]*)(?<!\/)\>/\<\1\/\>/g' FILE`

## Git Errors

### G001: Dirty Working Directory
**Pattern**: `git status --porcelain` returns non-empty
**Fix**: Commit or stash changes first
**Command**: `git add . && git commit -m "Save work before rebranding"`

### G002: Branch Already Exists
**Pattern**: `fatal: A branch named 'BRANCH' already exists`
**Fix**: Use different branch name or delete existing
**Command**: `git branch -D BRANCH_NAME || git checkout -b BRANCH_NAME-2`

### G003: Merge Conflict
**Pattern**: Merge conflict during branch operations
**Fix**: Abort and retry with clean state
**Command**: `git merge --abort && git reset --hard HEAD`

## File System Errors

### F001: File Not Found
**Pattern**: `ENOENT: no such file or directory`
**Fix**: Check if path exists, create if needed
**Command**: `mkdir -p $(dirname FILE) && touch FILE`

### F002: Permission Denied
**Pattern**: `EACCES: permission denied`
**Fix**: Check file permissions
**Command**: `chmod 644 FILE` or `sudo chown $USER FILE`

### F003: Path Too Long
**Pattern**: `ENAMETOOLONG: name too long`
**Fix**: Shorten file path
**Command**: Use relative paths or abbreviate names

## Network Errors

### N001: Registry Fetch Failed
**Pattern**: `fetch failed` for external registry URLs
**Fix**: Verify URL and network connectivity
**Command**: `curl -I URL` to test accessibility

### N002: Icon Download Failed
**Pattern**: Phosphor icon CDN unavailable
**Fix**: Use local fallback icon
**Command**: Use default file-doc icon from local assets

### N003: GitHub API Rate Limited
**Pattern**: `403 rate limit exceeded`
**Fix**: Wait or use different approach
**Command**: Retry after 1 hour or use authenticated requests

## Validation Errors

### V001: Registry Schema Invalid
**Pattern**: Registry missing required fields
**Fix**: Add missing fields with defaults
```json
{
  "skills": [],
  "agents": [],
  "mcp": [],
  "metadata": {"categoryIcons": {}}
}
```

### V002: Config Schema Invalid
**Pattern**: Invalid docusaurus.config.js structure
**Fix**: Preserve original structure, update only known fields
**Command**: Validate with `node -e "require('./docusaurus.config.js')"`

### V003: Template Variable Missing
**Pattern**: Placeholder `{VARIABLE}` not replaced
**Fix**: Provide default value
**Command**: `sed -i 's/{MISSING_VAR}/DefaultValue/g' FILE`

## Linting Errors

### L001: ESLint Errors
**Pattern**: `eslint` command fails
**Auto-Fix**: `npx eslint --fix FILE`
**Manual**: Review and fix remaining issues

### L002: Prettier Formatting
**Pattern**: Code formatting inconsistent
**Auto-Fix**: `npx prettier --write FILE`
**Manual**: Configure prettier rules

### L003: TypeScript Errors
**Pattern**: `tsc` compilation errors
**Fix**: Add type annotations or ignore
**Command**: `// @ts-ignore` for quick fixes

## Recovery Procedures

### R001: Complete Rollback
```bash
git checkout main
git branch -D rebrand-branch-name
# All changes discarded, back to clean state
```

### R002: Partial Rollback
```bash
git reset --hard HEAD~N  # N = number of commits to undo
git push --force-with-lease  # If already pushed
```

### R003: File-Specific Rollback
```bash
git checkout HEAD -- FILE_PATH  # Restore single file
git checkout main -- FILE_PATH   # Restore from main branch
```

### R004: Build Recovery
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
# Fresh install often resolves build issues
```

## Auto-Fix Patterns

### Text Replacement Fixes
```bash
# Remove trailing commas in JSON
sed -i 's/,\(\s*[}\]]\)/\1/g' file.json

# Fix import paths (remove ./)
sed -i 's/from\s*["\']\.\/\([^"\']*\)["\']/from "\1"/g' file.js

# Convert self-closing JSX
sed -i 's/<\([a-zA-Z][^>]*\)>/\<\1\/>/g' file.jsx
```

### Validation Commands
```bash
# JSON validation
python -c "import json; print('Valid' if json.load(open('FILE')) else 'Invalid')"

# JS syntax check
node -c FILE.js

# Build test
npm run build 2>&1 | grep -q "success" && echo "OK" || echo "FAILED"
```

## Common Error Combinations

### C001: Build + Import Errors
**Cause**: Removed component still imported
**Fix**: Remove all imports of removed components
**Pattern**: Remove corner feature imports after hero cleanup

### C002: JSON + Registry Errors
**Cause**: Malformed registry after transformation
**Fix**: Validate each step of registry transformation
**Pattern**: Check external_only field format

### C003: Config + Path Errors
**Cause**: Invalid paths after baseUrl change
**Fix**: Update all relative paths consistently
**Pattern**: Verify logo and asset paths after config change