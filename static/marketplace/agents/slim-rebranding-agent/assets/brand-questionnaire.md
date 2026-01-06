# Brand Questionnaire

Essential questions for guiding the rebranding process. Maximum 8 questions, but could be less depending on context.

---

## Essential Questions (Max 8)

### 1. Current Project Name
**Question**: What is the exact current name of the project?

**Examples**:
- "SLIM"
- "DataAnalyzer"
- "MyAwesomeApp"

**Purpose**: Identify all occurrences to replace across the codebase.

---

### 2. New Project Name
**Question**: What should the new project name be?

**Examples**:
- "SuperApp"
- "DataViz Pro"
- "ChatBot Plus"

**Purpose**: Replacement target for all rebranding operations.

---

### 3. New Primary Color (Optional)
**Question**: What is the new primary color? Provide hex code (e.g., #FF5733) or leave blank to keep current color.

**Examples**:
- `#FF5733` (vibrant red-orange)
- `#3498DB` (bright blue)
- `#2ECC71` (emerald green)
- Leave blank to keep existing colors

**Purpose**: Transform color scheme across CSS files and design tokens.

---

### 4. Custom Imagery
**Question**: Upload any custom logo/icon/image files to the chat. The agent will use these where applicable and auto-generate remaining imagery using Phosphor Icons.

**Instructions for users**:
- Upload files directly to the chat conversation
- Supported formats: SVG, PNG, JPG, ICO
- Examples: my-logo.svg, my-icon.png, social-card.jpg

**What happens**:
- Agent identifies all imagery needed (logo, favicon, icons, social cards)
- Matches user uploads to needs
- Fills gaps with auto-generated Phosphor Icons
- If no files uploaded → Phosphor for all imagery
- If some files uploaded → hybrid approach (user files + Phosphor for gaps)

**Purpose**: Smart fill-in-the-gaps imagery strategy.

---

### 5. Configuration Files
**Question**: Update package manager configuration files (package.json, pom.xml, pyproject.toml, Cargo.toml, etc.)?

**Options**:
- **yes** (default) - Update project name/metadata in all config files
- **no** - Leave configuration files unchanged

**Purpose**: Ensure package managers and build systems use new project name.

---

### 6. Files/Folders to Exclude
**Question**: Are there any files or folders you want to exclude from rebranding? Provide comma-separated paths or leave blank for defaults.

**Default exclusions** (automatic):
- `node_modules`
- `.git`
- `build`
- `dist`
- `.cache`
- `coverage`

**Additional examples**:
- `test/fixtures` - Exclude test fixture data
- `docs/archive` - Exclude archived documentation
- `vendor` - Exclude third-party code
- `legacy` - Exclude legacy code not actively maintained

**Format**: Comma-separated, e.g., "test/fixtures, docs/archive, vendor"

**Purpose**: Prevent rebranding in specific areas of the codebase.

---

### 7. Git Branch Name
**Question**: Provide a custom git branch name or leave blank for auto-generated.

**Auto-generated format**:
- `rebrand/[old-slug]-to-[new-slug]`
- Example: `rebrand/slim-to-superapp`

**Custom examples**:
- `feature/new-brand-2024`
- `chore/rebrand-to-newname`
- `brand-update`

**Purpose**: Create isolated branch for all rebranding changes.

---

### 8. Special Instructions (Optional)
**Question**: Are there any specific requirements, files to handle carefully, or special instructions?

**Examples**:
- "Keep old name in CHANGELOG for historical reference"
- "Don't update comments in src/legacy/ folder"
- "Preserve old logo in docs/archive/"
- "Update only English documentation, skip translations"

**Purpose**: Handle edge cases and special requirements unique to your project.

---

## Automatic Defaults (No Questions Needed)

The following behaviors are automatic and don't require user input:

### Rebrand Scope
**Default**: Full codebase rebrand
- All files except excluded folders
- Text, documentation, comments, configuration, assets
- Users can exclude specific files/folders via Question 6

### Code Comments
**Default**: Always update
- Project name in code comments will be updated
- No question needed - this is standard practice

### Icon Names
**Default**: Auto-generate from project name
- For Phosphor Icons, names are generated automatically
- Example: "DataAnalyzer" → "chart-line" or "database"
- Example: "ChatApp" → "chat-circle"
- No user input needed

---

## Rationale for Minimal Questions

**Why only 8 questions maximum?**
1. **User Experience**: Quick start, minimal friction
2. **Single-Pass Goal**: Aim for good results in one pass, not perfection
3. **Customization Later**: Users can always refine after initial rebrand
4. **Essential Focus**: Only ask what's absolutely necessary
5. **Smart Defaults**: Agent makes intelligent decisions based on project context

**Questions we DON'T ask** (handled automatically):
- ❌ Rebrand scope (full vs docs-only) → Handled by exclusions
- ❌ Update code comments? → Always yes
- ❌ Icon names for Phosphor → Auto-generated
- ❌ Backup preference → Always create backups
- ❌ Variable name updates → Included in text replacement

---

## Quick Start Examples

### Example 1: Full Rebrand with Custom Logo
```
1. Current: SLIM
2. New: SuperApp
3. Color: #FF5733
4. Imagery: [Upload my-logo.svg]
5. Config: yes
6. Exclude: (blank - use defaults)
7. Branch: (blank - auto-generate)
8. Special: (none)
```

### Example 2: Documentation-Only Rebrand
```
1. Current: ProjectX
2. New: ProjectY
3. Color: (blank - keep current)
4. Imagery: (no upload - use Phosphor)
5. Config: no
6. Exclude: src/, test/, scripts/
7. Branch: docs-rebrand
8. Special: Keep old name in CHANGELOG
```

### Example 3: Name Change with Auto Icons
```
1. Current: OldApp
2. New: NewApp
3. Color: #2ECC71
4. Imagery: (no upload - Phosphor will auto-generate)
5. Config: yes
6. Exclude: (blank)
7. Branch: (blank)
8. Special: (none)
```

---

## Validation

After collecting answers, the agent will:
1. Validate required fields (questions 1-2 are mandatory)
2. Validate color format (if provided)
3. Verify uploaded files exist and are accessible
4. Confirm exclusion paths are valid
5. Sanitize git branch name

---

## Next Steps After Questionnaire

Once all questions are answered:
1. Agent proceeds to **Discovery Phase** (Step 3 in workflow)
2. Scans project for rebrandable elements
3. Generates comprehensive plan
4. Presents plan for user approval
5. Only executes after explicit approval

---

**Note**: This questionnaire is a guide for the agent. Actual questions may be fewer if some don't apply to the specific project context.
