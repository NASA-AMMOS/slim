# Smart Imagery Integration with Phosphor Icons

**Purpose**: Fill in any gaps in imagery that the user didn't provide. Use Phosphor Icons as automatic fallback for professional, free icons.

**Phosphor Icons**: https://phosphoricons.com/ - 6000+ free, open-source icons

---

## Workflow for Agent

### Step 1: Identify All Imagery Needed in Project

Scan project for existing imagery locations:

**Logo files**:
- `logo.svg`, `logo.png`, `logo.jpg`
- Common locations: `static/`, `public/`, `assets/`, `src/images/`, root

**Favicons**:
- `favicon.ico`, `favicon.png`, `favicon-16x16.png`, `favicon-32x32.png`
- Common locations: `static/`, `public/`, root

**Icon sizes**:
- `icon-16x16.png`
- `icon-32x32.png`
- `icon-192x192.png`
- `icon-512x512.png`
- `apple-touch-icon.png` (typically 180x180)

**Social cards**:
- `og-image.png`, `og-image.jpg`
- `twitter-card.png`, `twitter-card.jpg`
- `social-card.png`, `social-card.jpg`
- Common locations: `static/`, `public/`, `static/img/`

**Other brand imagery**:
- Project-specific images found during discovery
- Screenshots with project name
- Diagrams with branding

**Create a complete inventory** of all imagery that needs rebranding.

---

### Step 2: Match User-Provided Imagery to Needs

Users can upload custom image files to the chat conversation.

**Matching logic**:

1. **Logo files**:
   - User uploads "my-logo.svg" → use for `logo.svg`
   - User uploads "new-logo.png" → use for `logo.png`
   - If SVG provided: use as master, convert to PNG if needed
   - If PNG provided: use as-is, may need SVG variant from Phosphor

2. **Icons**:
   - User uploads "my-icon.png" → use as base for all icon sizes
   - Resize to needed dimensions: 16x16, 32x32, 192x192, 512x512
   - Generate favicon.ico from PNG

3. **Social cards**:
   - User uploads "social-card.jpg" → use for og-image, twitter-card
   - Resize if dimensions don't match requirements

4. **Flexible matching**:
   - Match by file type (svg, png, jpg)
   - Match by name similarity
   - Ask user for clarification if ambiguous

**Track fulfillment**:
- Create a mapping: `{ "logo.svg": "user-provided", "favicon.ico": "needs-generation", ... }`
- Identify gaps where Phosphor is needed

---

### Step 3: Generate Phosphor Icons for Remaining Gaps

For any imagery NOT provided by user, auto-generate using Phosphor Icons.

#### 3.1 Auto-Generate Icon Name from Project Name

**Strategy**: Extract keywords from new project name and match to Phosphor icons.

**Keyword extraction examples**:
- "DataAnalyzer" → extract: data, analyzer → match: chart-line, database, table
- "ChatApp" → extract: chat, app → match: chat-circle, chat-dots, chat-centered
- "DevTools" → extract: dev, tools → match: code, terminal, wrench
- "CloudSync" → extract: cloud, sync → match: cloud, cloud-arrow-up, arrows-clockwise
- "SecureVault" → extract: secure, vault → match: lock, shield, vault

**Matching to Phosphor categories**:

1. **Tech/Development** icons:
   - Keywords: code, dev, data, api, terminal, git, tech, software
   - Phosphor icons: code, terminal, cpu, database, cloud, git-branch, brackets, file-code

2. **Business** icons:
   - Keywords: business, chart, analytics, dashboard, finance, sales
   - Phosphor icons: briefcase, chart, chart-line, rocket, target, trend-up, presentation

3. **Communication** icons:
   - Keywords: chat, message, mail, talk, communicate, social
   - Phosphor icons: chat, chat-circle, envelope, megaphone, phone, paper-plane

4. **Creative** icons:
   - Keywords: design, create, art, draw, paint, creative
   - Phosphor icons: palette, pen, pen-nib, sparkle, lightbulb, magic-wand

5. **Generic** icons (fallback):
   - Keywords: app, tool, project, system, platform
   - Phosphor icons: package, app-window, cube, stack, grid, squares-four

**Selection priority**:
1. First keyword match in specific category
2. Second keyword match in any category
3. Fallback to generic icons: "sparkle" (versatile, modern) or "package" (universal)

**Example matching**:
```
"DataAnalyzer"
→ keywords: [data, analyzer]
→ category: Tech/Development
→ matches: [database, chart-line, table]
→ select: "chart-line" (best match for analysis)
```

```
"ChatMate"
→ keywords: [chat, mate]
→ category: Communication
→ matches: [chat-circle, chat-dots, users]
→ select: "chat-circle" (direct match)
```

```
"ProjectX"
→ keywords: [project]
→ category: Generic
→ matches: [package, folder, cube]
→ select: "sparkle" (fallback for generic name)
```

#### 3.2 Fetch and Convert Phosphor Icon

Once icon name is determined (e.g., "chart-line"):

**Fetch SVG from Phosphor CDN**:
```
URL: https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/[icon-name].svg
Example: https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/chart-line.svg
```

**Styles available**:
- `regular/` - default, balanced weight
- `bold/` - heavier weight
- `fill/` - filled style
- `duotone/` - two-tone style

**Recommendation**: Use `regular` as default for clean, professional look.

**Convert to needed formats**:

1. **SVG** (vector, scalable):
   - Save directly: `logo.svg`
   - No conversion needed

2. **PNG** (raster, specific sizes):
   - Use image conversion library or tool
   - Convert SVG to PNG at required dimensions:
     - `logo.png` (e.g., 200x200 or project-specific size)
     - `icon-16x16.png`
     - `icon-32x32.png`
     - `icon-192x192.png`
     - `icon-512x512.png`
     - `apple-touch-icon.png` (180x180)

3. **ICO** (favicon format):
   - Convert SVG/PNG to `favicon.ico`
   - Typically contains 16x16 and 32x32 variants
   - Use image conversion tool

4. **Social cards** (if needed):
   - Generate larger PNG (e.g., 1200x630 for og-image)
   - Center icon on background
   - Add project name text (optional)

**Conversion tools** (write runtime code to use):
- Python: Pillow (PIL), cairosvg
- Node: sharp, svg2png
- Command-line: ImageMagick, inkscape

#### 3.3 Place in Appropriate Locations

Replace existing imagery files with generated icons:

```
Logo:
  static/img/logo.svg → Phosphor SVG
  static/img/logo.png → Phosphor PNG (200x200)

Favicons:
  static/favicon.ico → Phosphor ICO (16x16, 32x32)
  static/favicon-16x16.png → Phosphor PNG (16x16)
  static/favicon-32x32.png → Phosphor PNG (32x32)

Icons:
  static/icon-192x192.png → Phosphor PNG (192x192)
  static/icon-512x512.png → Phosphor PNG (512x512)
  static/apple-touch-icon.png → Phosphor PNG (180x180)

Social Cards:
  static/img/og-image.png → Phosphor-based social card (1200x630)
  static/img/twitter-card.png → Phosphor-based social card (1200x600)
```

**Update all references**:
- HTML files: `<link rel="icon" href="...">`, `<img src="...">`
- Config files: `docusaurus.config.js`, `manifest.json`, `app.json`
- Documentation: README.md, docs/

---

### Step 4: Summary Report

Generate a clear summary of imagery sources:

**Example**:
```markdown
## Imagery Summary

### User-Provided
✓ Logo (SVG): my-logo.svg → static/img/logo.svg
✓ Logo (PNG): (generated from SVG) → static/img/logo.png

### Phosphor-Generated (icon: "sparkle")
✓ Favicon (ICO): static/favicon.ico
✓ Icon 16x16: static/favicon-16x16.png
✓ Icon 32x32: static/favicon-32x32.png
✓ Icon 192x192: static/icon-192x192.png
✓ Icon 512x512: static/icon-512x512.png
✓ Apple Touch Icon: static/apple-touch-icon.png
✓ Social Card: static/img/og-image.png

### Total
- User-provided: 1 file
- Phosphor-generated: 7 files
- All imagery needs fulfilled: ✓
```

**Benefits for user**:
- Clear understanding of what was auto-generated
- Easy to replace Phosphor icons later if desired
- Confirmation that all imagery needs are covered

---

## Phosphor Icon Categories Reference

Full categorization for agent to use when matching:

### Tech/Development
```
code, terminal, cpu, database, cloud, git-branch, brackets, file-code,
bug, gear, wrench, hammer, lightning, circle-notch, binary, function
```

### Business
```
briefcase, chart, chart-line, chart-bar, chart-pie, rocket, target,
trend-up, trend-down, presentation, storefront, buildings, bank
```

### Communication
```
chat, chat-circle, chat-dots, chat-centered, envelope, envelope-open,
megaphone, phone, paper-plane, bell, broadcast, microphone
```

### Creative
```
palette, pen, pen-nib, sparkle, lightbulb, magic-wand, paint-brush,
eyedropper, bezier-curve, figma-logo, image, images
```

### Generic/Universal
```
package, app-window, cube, stack, grid, squares-four, circles-four,
folder, folder-open, file, files, dot-outline, circle, square
```

### Data/Analytics
```
table, rows, columns, database, hard-drive, floppy-disk, chart-line-up,
chart-scatter, funnel, filter, magnifying-glass, list, list-bullets
```

### Security
```
lock, lock-open, shield, shield-check, shield-warning, key, password,
fingerprint, eye, eye-slash, user-circle-check
```

### Cloud/Network
```
cloud, cloud-arrow-up, cloud-arrow-down, globe, globe-hemisphere-west,
wifi, link, link-break, share-network, upload, download
```

---

## CDN & API Information

**Primary CDN**:
```
https://unpkg.com/@phosphor-icons/web@2.0.3/src/[style]/[icon-name].svg
```

**Styles**:
- `regular` - default (recommended)
- `bold` - heavier weight
- `fill` - filled icons
- `duotone` - two-tone

**Browse icons**:
https://phosphoricons.com/ - search by keyword, browse by category

**License**: MIT - free for commercial and personal use

---

## Error Handling

**If icon not found**:
1. Try fallback icon: "sparkle" (always available)
2. If still failing, use: "package" or "cube"
3. Log error and inform user

**If conversion fails**:
1. Skip that specific format
2. Use alternative format (PNG if SVG fails)
3. Inform user which formats couldn't be generated

**If no suitable match**:
1. Default to "sparkle" (versatile, modern icon)
2. Inform user: "Used 'sparkle' icon as generic fallback"
3. Provide link to browse alternatives

---

## Best Practices

1. **Always use `regular` style** unless user requests otherwise
2. **Center icons in square canvas** for consistent appearance
3. **Maintain aspect ratio** when resizing
4. **Use SVG as master format** when possible (scalable)
5. **Generate all common sizes** even if not all currently used
6. **Update all references** atomically to avoid broken images
7. **Backup original files** before replacement
8. **Report clearly** what was user-provided vs. auto-generated

---

## Implementation Notes for Agent

When implementing this guide:

1. **Write runtime code** to:
   - Fetch SVG from CDN
   - Convert to PNG using image library
   - Generate ICO files
   - Resize to all needed dimensions

2. **Handle user uploads** by:
   - Detecting uploaded file types in chat
   - Saving to appropriate temp location
   - Copying to correct project locations

3. **Smart matching** by:
   - Parsing project name for keywords
   - Ranking icon matches by relevance
   - Selecting best match or fallback

4. **Validate results** by:
   - Checking all files exist after generation
   - Verifying file sizes are reasonable
   - Testing at least one format (PNG)

---

**Version**: 1.0.0
**Phosphor Icons Version**: @phosphor-icons/web@2.0.3
**Last Updated**: 2026-01-04
