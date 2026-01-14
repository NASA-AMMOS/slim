# Hero Customization Guide

This guide provides step-by-step instructions for customizing the SLIM website hero section, specifically removing the 4 corner sidebars and updating branding elements.

## Overview

The hero section (`src/components/HubHero.js`) is the first thing users see. For domain-specific SLIM forks, we want to:
1. **Remove** the 4 corner feature sidebars (they're SLIM-specific)
2. **Keep** the center content (logo, tagline, buttons, search)
3. **Update** logo and tagline for the new project

## Current Hero Structure

The hero currently has:
- **Center**: Logo, tagline, 3 action buttons, search box
- **4 Corners**: Feature sidebars with icons and text
  - Top-left: "AI-powered automation..."
  - Bottom-left: "Made by the community..."
  - Top-right: "Fully open source..."
  - Bottom-right: "Skills, agents, and MCP servers..."

## Target Result

After customization:
- **Center**: New logo, new tagline, same buttons/search
- **Corners**: REMOVED (cleaner, more focused)

---

## Step 1: Modify HubHero.js

**File**: `/Users/rverma/src/slim/slim/src/components/HubHero.js`

### Change 1.1: Remove cornerFeatures Array

**Lines to Remove**: 57-78

**Current Code**:
```javascript
const cornerFeatures = [
  {
    position: "top-left",
    icon: "ai-centric.png",
    text: "AI-powered automation for instant best practice infusion",
  },
  {
    position: "bottom-left",
    icon: "community.svg",
    text: "Made by the community for the community",
  },
  {
    position: "top-right",
    icon: "iterative.svg",
    text: "Fully open source and free of charge",
  },
  {
    position: "bottom-right",
    icon: "scope.svg",
    text: "Skills, agents, and MCP servers for governance, lifecycle, and communication",
  },
];
```

**Action**: Delete this entire array declaration (lines 57-78)

### Change 1.2: Remove Corner Feature Rendering

**Lines to Remove**: 83-88

**Current Code**:
```jsx
{/* Corner features */}
{cornerFeatures.map((feature, idx) => (
  <div key={idx} className={`corner-feature corner-${feature.position}`}>
    <img src={useBaseUrl(`img/${feature.icon}`)} alt="" />
    <p>{feature.text}</p>
  </div>
))}
```

**Action**: Delete this entire JSX block (lines 83-88)

### Change 1.3: Update Logo Path

**Line to Modify**: 93

**Current Code**:
```jsx
<img src={useBaseUrl("img/logo.svg")} height="275" alt="SLIM Logo" />
```

**New Code** (if user uploaded custom logo):
```jsx
<img src={useBaseUrl("img/autodocs-logo.svg")} height="275" alt="AutoDocs Logo" />
```

**New Code** (if auto-generated):
```jsx
<img src={useBaseUrl("img/logo.svg")} height="275" alt="AutoDocs Logo" />
```

**Note**: If auto-generating, the logo.svg file will be replaced with Phosphor icon in a separate step.

### Change 1.4: Update Tagline

**Lines to Modify**: 96-98

**Current Code**:
```jsx
<p style={{ padding: "15px", fontSize: "1.1rem", paddingBottom: "30px" }}>
  Modernizing software through the automated infusion of best practices.
</p>
```

**New Code** (with user's new tagline):
```jsx
<p style={{ padding: "15px", fontSize: "1.1rem", paddingBottom: "30px" }}>
  AI-powered documentation automation for software projects.
</p>
```

### Result After Changes

The modified HubHero.js should look like:

```jsx
function HubHero({ searchTerm, setSearchTerm, isSearchActive, setIsSearchActive }) {
  // ... existing scroll and focus handlers ...

  return (
    <div className={clsx("hero hero--info", styles.heroBanner, "hub-hero")}>
      {/* Center content */}
      <div className="container hub-hero-center">
        {/* Logo */}
        <img src={useBaseUrl("img/autodocs-logo.svg")} height="275" alt="AutoDocs Logo" />

        {/* Tagline */}
        <p style={{ padding: "15px", fontSize: "1.1rem", paddingBottom: "30px" }}>
          AI-powered documentation automation for software projects.
        </p>

        {/* Three action buttons */}
        <Row className="justify-content-center" style={{ marginBottom: "20px" }}>
          <Col xs="auto">
            <Link className="button button--secondary button--lg" to="/docs/contribute">
              Contribute
            </Link>
          </Col>
          <Col xs="auto">
            <Link className="button button--secondary button--lg" to="/docs/faq">
              FAQ
            </Link>
          </Col>
          <Col xs="auto">
            <Link className="button button--secondary button--lg" to="/docs/about">
              About
            </Link>
          </Col>
        </Row>

        {/* Search box */}
        <div id="hero-search-container" className="hero-search-container">
          {/* ... existing search implementation ... */}
        </div>
      </div>
    </div>
  );
}
```

---

## Step 2: Remove Corner CSS Styles

**File**: `/Users/rverma/src/slim/slim/src/css/custom.css`

### Styles to Remove

**Estimated Lines**: ~501-675 (search for `.corner-feature`)

**Sections to Delete**:

1. **Base corner-feature class**:
```css
.corner-feature {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 280px;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
}
```

2. **Corner positioning classes**:
```css
.corner-top-left {
  top: 20px;
  left: 20px;
}

.corner-bottom-left {
  bottom: 20px;
  left: 20px;
}

.corner-top-right {
  top: 20px;
  right: 20px;
}

.corner-bottom-right {
  bottom: 20px;
  right: 20px;
}
```

3. **Visible state**:
```css
.corner-feature.visible {
  opacity: 1;
}
```

4. **Icon styling**:
```css
.corner-feature img {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.corner-feature p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--ifm-color-emphasis-800);
}
```

5. **Dark theme support**:
```css
[data-theme='dark'] .corner-feature {
  background: rgba(30, 33, 37, 0.95);
}

[data-theme='dark'] .corner-feature p {
  color: var(--ifm-color-emphasis-200);
}
```

6. **Responsive media queries**:
```css
@media (max-width: 1200px) {
  .corner-feature {
    max-width: 240px;
    font-size: 0.85rem;
  }
}

@media (max-width: 996px) {
  .corner-top-left,
  .corner-bottom-left {
    left: 10px;
  }
  .corner-top-right,
  .corner-bottom-right {
    right: 10px;
  }
}

@media (max-width: 768px) {
  .corner-feature {
    display: none; /* Hide on mobile */
  }
}
```

**Action**: Search for `.corner-feature` in custom.css and delete all related styles (approximately 175 lines)

---

## Step 3: Handle Logo File

### Option A: User Uploaded Custom Logo

If user provided a logo file:

1. **Copy file** to `static/img/`
   - Rename to match project: `autodocs-logo.svg` or `autodocs-logo.png`
   - Preserve format (SVG preferred)

2. **Update HubHero.js** reference (already done in Step 1.3)

### Option B: Auto-Generate from Phosphor Icons

If no logo provided, generate from Phosphor Icons:

1. **Extract keywords** from project name:
   - "AutoDocs" → ["auto", "docs", "automation", "documentation"]
   - "ResearchOps" → ["research", "ops", "operations", "science"]

2. **Match to Phosphor icon**:
   - Use `phosphor-icons-guide.md` mapping
   - Examples:
     - Documentation → "file-doc", "file-text", "article"
     - Research → "flask", "test-tube", "microscope"
     - Automation → "robot", "gear", "cpu"

3. **Fetch SVG** from Phosphor CDN:
   ```
   https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/file-doc.svg
   ```

4. **Save as** `static/img/logo.svg`

5. **Generate favicon**:
   - Convert SVG to ICO format
   - Save as `static/img/favicon.ico`
   - Update `docusaurus.config.js` if needed

### Validation

After logo handling:
- Verify file exists: `static/img/logo.svg` or `static/img/autodocs-logo.svg`
- Verify file is valid image format
- Verify file size is reasonable (< 500KB recommended)

---

## Step 4: Validation

### Check JSX Syntax

Run ESLint or verify manually:
```bash
npx eslint src/components/HubHero.js
```

Expected: No errors (only possible warnings about unused imports)

### Check CSS Syntax

Basic validation:
```bash
# Check for syntax errors
grep -n "corner-feature" src/css/custom.css
# Should return no results after deletion
```

### Visual Check (if possible)

Run local development server:
```bash
npm start
```

Navigate to homepage and verify:
- ✓ Hero displays center content (logo, tagline, buttons, search)
- ✓ No corner sidebars visible
- ✓ Logo displays correctly
- ✓ Tagline shows new text
- ✓ No console errors
- ✓ Responsive layout works (test different screen sizes)

---

## Troubleshooting

### Issue: Build fails after changes

**Symptom**: `npm run build` fails with React/JSX errors

**Common causes**:
1. Syntax error in JSX (unclosed tag, missing comma)
2. Orphaned import statement (if corner features imported something)

**Solution**:
- Check error message for line number
- Verify JSX syntax at that line
- Remove any unused imports

### Issue: Logo doesn't display

**Symptom**: Broken image icon in hero section

**Common causes**:
1. Wrong file path in HubHero.js
2. Logo file doesn't exist in `static/img/`
3. Logo file name mismatch

**Solution**:
- Verify file exists: `ls -la static/img/logo.svg`
- Verify path in HubHero.js matches actual file name
- Check file permissions (should be readable)

### Issue: Corners still visible

**Symptom**: Corner features still appear on page

**Common causes**:
1. Didn't remove JSX rendering code (lines 83-88)
2. Didn't remove CSS styles

**Solution**:
- Verify lines 83-88 are deleted from HubHero.js
- Search for `.corner-feature` in custom.css - should return no results
- Clear browser cache and hard refresh

### Issue: Styling looks broken

**Symptom**: Layout is misaligned or colors are off

**Common causes**:
1. Accidentally deleted other CSS while removing corner styles
2. Missing closing brace in CSS

**Solution**:
- Validate CSS syntax: run through CSS validator
- Check that you only deleted corner-related styles
- Verify closing braces match opening braces

---

## Commit Message

After completing all hero customization changes:

```bash
git add src/components/HubHero.js src/css/custom.css static/img/
git commit -m "Rebrand: Update hero section (remove corners, update branding)"
```

**Commit should include**:
- Modified HubHero.js (removed corners, updated logo/tagline)
- Modified custom.css (removed corner styles)
- New/updated logo file (if applicable)

---

## Summary

This guide covered:
1. ✅ Remove cornerFeatures array from HubHero.js
2. ✅ Remove corner rendering JSX
3. ✅ Update logo path and alt text
4. ✅ Update tagline text
5. ✅ Remove ~175 lines of corner CSS
6. ✅ Handle logo file (upload or auto-generate)
7. ✅ Validate changes (syntax, visual, build)

**Result**: Clean, focused hero section with project-specific branding and no SLIM-specific corner features.
