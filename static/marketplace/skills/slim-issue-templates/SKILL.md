---
name: slim-issue-templates
description: Add standardized GitHub issue templates for bug reports and feature requests
---

# Issue Template Writer

## Overview

Helps development teams keep the language of bug reports, feature requests, and other types of issues readable and consistent. This skill provides both traditional Markdown templates and modern GitHub Form templates.

## When to Use This Skill

- Setting up a new repository's issue tracking
- Improving issue quality and consistency
- Reducing incomplete or poorly formatted bug reports
- Streamlining the contribution process
- Ensuring all necessary information is captured

## Templates Provided

### Bug Report Templates
- **Markdown format** (`bug_report.md`): Traditional freeform template with guidance
- **GitHub Form** (`bug_report.yml`): Structured form with required fields

### Feature Request Templates
- **Markdown format** (`new_feature.md`): Freeform template for feature proposals
- **GitHub Form** (`new_feature.yml`): Structured form for feature requests

## Workflow

### Step 1: Check Existing Templates

Check if issue templates already exist:

```bash
ls -la .github/ISSUE_TEMPLATE/
```

If templates exist, ask the user if they want to replace them or keep them.

### Step 2: Choose Template Format

Ask the user which format they prefer:

1. **Markdown templates**: More flexible, freeform text
2. **GitHub Forms**: Structured with dropdowns, checkboxes, validation
3. **Both**: Provide both options for contributors

**Recommendation**: GitHub Forms (`.yml`) provide better structure and validation, reducing incomplete reports.

### Step 3: Create Directory Structure

Create the `.github/ISSUE_TEMPLATE/` directory if it doesn't exist:

```bash
mkdir -p .github/ISSUE_TEMPLATE
```

### Step 4: Copy Templates

Based on the user's choice, copy the appropriate templates:

**For Markdown templates:**
```bash
cp assets/bug_report.md .github/ISSUE_TEMPLATE/
cp assets/new_feature.md .github/ISSUE_TEMPLATE/
```

**For GitHub Forms:**
```bash
cp assets/bug_report.yml .github/ISSUE_TEMPLATE/
cp assets/new_feature.yml .github/ISSUE_TEMPLATE/
```

**For both:**
```bash
cp assets/*.md .github/ISSUE_TEMPLATE/
cp assets/*.yml .github/ISSUE_TEMPLATE/
```

### Step 5: Customize Templates (Optional)

The templates can be customized to fit the project:

1. Update labels in the YAML frontmatter
2. Modify sections to match project needs
3. Add project-specific questions or fields
4. Update placeholder text

### Step 6: Test Templates

1. Go to the GitHub repository's Issues tab
2. Click "New Issue"
3. Verify that templates appear as options
4. Test filling out a template to ensure it works as expected

## Template Comparison

### Markdown Templates (.md)

**Advantages:**
- Familiar format for most developers
- Flexible and easy to edit
- Works in any text editor
- No validation constraints

**Disadvantages:**
- Users can skip sections
- Inconsistent formatting
- No required fields

### GitHub Forms (.yml)

**Advantages:**
- Structured data collection
- Required fields enforcement
- Dropdowns and checkboxes
- Better data quality
- Searchable/filterable issues

**Disadvantages:**
- Less flexible
- Requires YAML knowledge to customize
- Only works on GitHub

## Customization Guide

### For Markdown Templates

Edit the `.md` files to:
- Add/remove sections
- Update example text
- Modify instructions
- Change labels in frontmatter

### For GitHub Forms

Edit the `.yml` files to:
- Add/remove input fields
- Change field types (input, textarea, dropdown, checkboxes)
- Set validation rules
- Update labels and descriptions
- Configure required vs optional fields

Example field types:
```yaml
- type: input          # Single-line text
- type: textarea       # Multi-line text
- type: dropdown       # Select from options
- type: checkboxes     # Multiple selection
```

## Best Practices

1. **Keep templates concise**: Only ask for essential information
2. **Use clear labels**: Make it obvious what information is needed
3. **Provide examples**: Show users what good input looks like
4. **Test regularly**: Periodically review and update templates
5. **Monitor usage**: Check if users are completing templates properly

## Assets Available

- `bug_report.md`: Markdown bug report template
- `bug_report.yml`: GitHub Form bug report template
- `new_feature.md`: Markdown feature request template
- `new_feature.yml`: GitHub Form feature request template

## Additional Resources

- [GitHub Issue Templates Documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)
- [GitHub Forms Syntax](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema)
