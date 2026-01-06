# Website Generation Plan Template

This template shows the format for presenting the website generation plan to users.

## Plan Structure

```markdown
# Website Generation Plan: [Project Name]

Generated: [Date and time]

## Summary

- **Destination directory**: [Full path to destination]
- **Source analysis**: [Performed / Skipped]
- **Source directory**: [Path if provided, or "N/A"]
- **Project type detected**: [Node.js / Python / Java / etc. or "Generic"]
- **Customization level**: [AI-generated / Basic template]
- **Git branch**: [Branch name]

## Project Analysis Results

[Include this section only if source analysis was performed]

### Discovered Information

- **Project name**: [Extracted name]
- **Description**: [Generated summary]
- **Key features**:
  - [Feature 1]
  - [Feature 2]
  - [Feature 3]

- **Technology stack**: [Languages, frameworks, tools]
- **Target audience**: [Developers / End-users / Researchers / etc.]
- **Documentation found**:
  - README: [Yes/No - path if yes]
  - Existing docs: [Yes/No - count if yes]
  - Other materials: [List]

## Website Structure

### Homepage

**Content to be generated**:
- **Title**: [Project Name]
- **Tagline**: [AI-generated tagline]
- **Description**: [Project summary]
- **Key Features Section**:
  - [Feature 1: Description]
  - [Feature 2: Description]
  - [Feature 3: Description]

### Documentation Sections

| Section | Content | Source |
|---------|---------|--------|
| 📘 Getting Started | Installation, quick start, prerequisites | README analysis, code analysis |
| 📖 User Guide | Usage patterns, tutorials, examples | Code patterns, existing docs |
| 🔧 Developer Documentation | API reference, contributing, architecture | Code structure, config files |
| ❓ FAQ | Common questions and troubleshooting | Inferred from project type |
| 📝 Additional Resources | Links, references, related projects | Found in documentation |

**Total pages to be created**: [Number]

### Navigation Configuration

**Main Navigation**:
- Home
- Documentation
  - Getting Started
  - User Guide
  - Developer Docs
  - FAQ
- [Additional items based on analysis]

**Footer**:
- About
- GitHub / Repository link
- [Additional links based on project]

### Content Categories

[List categories based on project analysis]:
- Category 1: [Description]
- Category 2: [Description]
- ...

## Customizations to be Applied

### 1. Template Setup
- Clone NASA-AMMOS/slim-docsite-template
- Initialize fresh git repository
- Install dependencies (yarn install)

### 2. Homepage Customization
- Update title and branding
- Generate project-specific description
- Create feature highlights
- Customize hero section
- Update call-to-action buttons

### 3. Documentation Generation
- Create section hierarchy
- Generate Getting Started guide
- Populate user documentation
- Create developer documentation
- Set up API reference (if applicable)
- Generate FAQ content

### 4. Configuration Updates
- Update docusaurus.config.js:
  - Site metadata (title, tagline, description)
  - URL and base path configuration
  - Navigation menu structure
  - Footer content and links
  - Search configuration (if applicable)
  - GitHub/repository links

- Update src/css/custom.css:
  - Color scheme [if brand colors found: "Customized" / else: "Template default"]
  - Typography [if needed]
  - Custom styling

### 5. Content Population

[If source analysis performed]:
- Extract content from README
- Adapt existing documentation
- Generate section introductions
- Create placeholder content for gaps
- Ensure proper cross-references

[If no source analysis]:
- Basic template structure
- Placeholder content
- Generic documentation sections

## Git Strategy

**Branch name**: `website/[project-slug]-docusaurus`

**Commit sequence**:
1. "Website: Initialize Docusaurus template"
2. "Website: Customize homepage with project details"
3. "Website: Create documentation structure and content"
4. "Website: Configure site metadata and navigation"
5+ "Website: Fix build errors (attempt N)" [as needed during validation]

## Build Validation Plan

### Phase 1: Initial Build
- Run `yarn build`
- Capture any errors

### Phase 2: Iterative Error Fixing
- **Maximum attempts**: 5
- **Auto-fix strategies**:
  - Install missing dependencies
  - Fix configuration syntax errors
  - Repair MDX and frontmatter issues
  - Update broken links
  - Fix React component errors
  - Adjust plugin configurations

### Phase 3: Success Validation
- Successful build completion
- Development server test (yarn start)
- Navigation functionality check
- Content rendering verification
- Link validation

### Expected Outcome
- ✓ Clean build with no errors
- ⚠ Clean build with minor warnings (acceptable)
- ❌ Build failures after 5 attempts (requires manual intervention)

## Risk Assessment

**Low Risk**:
- [List low-risk operations]
- Example: Template cloning, dependency installation

**Medium Risk**:
- [List medium-risk operations]
- Example: Content customization, navigation configuration

**High Risk**:
- [List high-risk operations - usually none for this operation]
- Example: None expected

## Rollback Plan

If anything goes wrong:

```bash
# Switch back to main branch
git checkout main

# Delete the website branch
git branch -D website/[project-slug]-docusaurus

# Remove destination directory if needed
rm -rf [destination-directory]
```

## Success Criteria

**Website generation will be considered successful when**:
- ✓ Template cloned and initialized
- ✓ Dependencies installed successfully
- ✓ Customizations applied correctly
- ✓ Build completes without errors (or with acceptable warnings only)
- ✓ Development server starts and website loads
- ✓ Navigation and links work properly
- ✓ All commits created successfully
- ✓ Branch ready for review and merge

## Next Steps After Generation

1. **Review**: Examine generated website at http://localhost:3000
2. **Refine**: Edit content for accuracy and completeness
3. **Enhance**: Add additional customization as needed
4. **Test**: Verify all features and links work correctly
5. **Deploy**: Set up GitHub Pages or other hosting
6. **Merge**: Create PR to merge website branch to main

## Estimated Timeline

[Note: Provide steps, not time estimates]

**Setup Phase**:
- Template cloning and initialization

**Customization Phase**:
- Content generation and application

**Validation Phase**:
- Build testing and error fixing (iterative)

**Completion Phase**:
- Final verification and reporting

---

**Do you approve this plan? (yes/no/modify)**
```

## Notes for Agent

When generating the plan:

1. **Be specific**: Use actual paths, names, and detected information
2. **Be comprehensive**: Include all sections with detailed information
3. **Be clear**: Explain what will happen in each step
4. **Be honest**: If source analysis wasn't performed, clearly indicate template mode
5. **Be helpful**: Provide enough detail for user to understand and approve

Remember: The plan is a contract with the user. Only proceed after explicit "yes" approval.
