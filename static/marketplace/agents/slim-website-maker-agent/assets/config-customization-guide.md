# Configuration Customization Guide

This guide provides instructions for customizing Docusaurus configuration files to match project-specific needs.

## Primary Configuration File

### docusaurus.config.js

This is the main configuration file for the entire Docusaurus website.

**Location**: `docusaurus.config.js` (project root)

## Essential Customizations

### 1. Site Metadata

**Purpose**: Define basic site information used throughout the website

```javascript
const config = {
  // Site title - appears in browser tab, navbar, metadata
  title: '[Discovered Project Name]',

  // Tagline - appears on homepage, metadata
  tagline: '[AI-generated tagline]',

  // Favicon
  favicon: 'img/favicon.ico',

  // Production URL - where the site will be hosted
  url: 'https://your-username.github.io',

  // Base URL - subpath if hosted on GitHub Pages or subdirectory
  // For https://username.github.io/ → baseUrl: '/'
  // For https://username.github.io/repo/ → baseUrl: '/repo/'
  baseUrl: '/your-repo-name/',

  // Organization/project name
  organizationName: '[GitHub username or org]',
  projectName: '[Repository name]',

  // Deployment branch (for GitHub Pages)
  deploymentBranch: 'gh-pages',

  // GitHub Pages deployment configuration
  trailingSlash: false,
};
```

**How to populate**:
- **title**: From package.json `name` field, README title, or repository name
- **tagline**: Generated from project description
- **url**: From package.json `homepage`, or infer from repository
- **organizationName**: From git remote URL
- **projectName**: From repository name

### 2. Navigation Configuration

**Purpose**: Define header navigation menu

```javascript
const config = {
  themeConfig: {
    navbar: {
      title: '[Project Name]',
      logo: {
        alt: '[Project Name] Logo',
        src: 'img/logo.svg',
      },
      items: [
        // Documentation link
        {
          type: 'doc',
          docId: 'intro',  // Points to docs/intro.md
          position: 'left',
          label: 'Docs',
        },
        // Blog link (optional - remove if no blog)
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        // External links (GitHub, etc.)
        {
          href: '[Repository URL]',
          label: 'GitHub',
          position: 'right',
        },
        // Version dropdown (for versioned docs)
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
      ],
    },
  },
};
```

**Customization based on project**:
- **Developer library**: Include API reference, GitHub, npm/PyPI badge
- **Application**: Include features, documentation, community
- **Research tool**: Include methodology, examples, publications
- **Documentation site**: Include guides, reference, about

### 3. Footer Configuration

**Purpose**: Define footer links and information

```javascript
const config = {
  themeConfig: {
    footer: {
      style: 'dark',  // or 'light'
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'User Guide',
              to: '/docs/user-guide',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: '[Repository URL]',
            },
            // Add if found in project
            {
              label: 'Discord',
              href: '[Discord URL]',
            },
            {
              label: 'Twitter',
              href: '[Twitter URL]',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Changelog',
              href: '[Repository URL]/blob/main/CHANGELOG.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} [Project Name or Organization]. Built with Docusaurus.`,
    },
  },
};
```

**How to populate**:
- Extract links from README (badges, social media)
- Find community links in CONTRIBUTING.md
- Identify relevant external resources
- Include changelog, releases, issues if applicable

### 4. Theme Customization

**Purpose**: Configure colors, syntax highlighting, and UI preferences

```javascript
const config = {
  themeConfig: {
    // Color mode (light/dark theme)
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Announcement bar (optional - for important notices)
    announcementBar: {
      id: 'announcement',  // Change to show different announcements
      content: '⭐️ Star us on <a href="[repo-url]">GitHub</a>!',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: true,
    },

    // Code block theme
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      // Add languages as needed based on project
      additionalLanguages: ['python', 'java', 'rust', 'bash'],
    },
  },
};
```

**Language detection**:
- Scan codebase to identify programming languages used
- Add to `additionalLanguages` for proper syntax highlighting
- Common additions: python, java, rust, go, cpp, ruby, php, kotlin, swift

### 5. SEO and Metadata

**Purpose**: Improve search engine visibility and social sharing

```javascript
const config = {
  // SEO metadata
  metadata: [
    {name: 'keywords', content: '[project-related, keywords, here]'},
    {name: 'description', content: '[Project description]'},
  ],

  // Open Graph metadata (social sharing)
  themeConfig: {
    metadata: [
      {property: 'og:title', content: '[Project Name]'},
      {property: 'og:description', content: '[Description]'},
      {property: 'og:image', content: '[Social card image URL]'},
      {property: 'og:type', content: 'website'},
    ],

    // Social card (Twitter, etc.)
    image: 'img/social-card.jpg',
  },
};
```

**How to populate**:
- **keywords**: Extract from README, package.json keywords
- **description**: Use project summary
- **image**: Use project logo or create social card

### 6. Search Configuration

**Purpose**: Enable site search functionality

**Option A: Local Search (Simple)**
```javascript
const config = {
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        highlightSearchTerms: true,
      },
    ],
  ],
};
```

**Option B: Algolia Search (Advanced)**
```javascript
const config = {
  themeConfig: {
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
      contextualSearch: true,
    },
  },
};
```

**Decision**: Use local search by default; mention Algolia as upgrade option

### 7. Plugin Configuration

**Purpose**: Enable additional Docusaurus features

```javascript
const config = {
  plugins: [
    // Google Analytics (if analytics ID found)
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'UA-XXXXX',
        anonymizeIP: true,
      },
    ],

    // Ideal image plugin (image optimization)
    '@docusaurus/plugin-ideal-image',

    // PWA support (optional)
    [
      '@docusaurus/plugin-pwa',
      {
        offlineModeActivationStrategies: ['appInstalled', 'standalone'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#rgb(37, 194, 160)',
          },
        ],
      },
    ],
  ],
};
```

## Custom CSS Configuration

### src/css/custom.css

**Purpose**: Override default styles and add custom styling

```css
/**
 * Custom CSS for [Project Name]
 */

/* Color Scheme */
:root {
  /* Primary color - customize based on brand */
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;

  /* Code block font */
  --ifm-code-font-size: 95%;

  /* Global font */
  --ifm-font-family-base: system-ui, -apple-system, sans-serif;
}

/* Dark mode color overrides */
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
}

/* Custom styles */
.hero--primary {
  --ifm-hero-background-color: var(--ifm-color-primary);
  --ifm-hero-text-color: var(--ifm-color-white);
}

/* Code block customization */
.docusaurus-highlight-code-line {
  background-color: rgba(0, 0, 0, 0.1);
  display: block;
  margin: 0 calc(-1 * var(--ifm-pre-padding));
  padding: 0 var(--ifm-pre-padding);
}

[data-theme='dark'] .docusaurus-highlight-code-line {
  background-color: rgba(0, 0, 0, 0.3);
}
```

**Color customization strategy**:
1. **If brand colors found**: Extract from existing CSS, README badges, or logo
2. **Generate palette**: Use primary color to generate light/dark variants
3. **Default**: Use Docusaurus default green palette

**Color generation**:
```javascript
// Pseudo-code for color palette generation
function generateColorPalette(primaryColor) {
  return {
    primary: primaryColor,
    dark: darken(primaryColor, 10%),
    darker: darken(primaryColor, 15%),
    darkest: darken(primaryColor, 25%),
    light: lighten(primaryColor, 10%),
    lighter: lighten(primaryColor, 15%),
    lightest: lighten(primaryColor, 20%),
  };
}
```

## Configuration Validation

### Syntax Validation

Before committing configuration changes:

```bash
# Validate JavaScript syntax
node -c docusaurus.config.js

# Test configuration
yarn docusaurus --version  # Should run without errors
```

### Link Validation

Ensure all configured links work:
- Documentation links point to existing pages
- External links are accessible
- GitHub/repository URLs are correct
- Social media links are valid

### Build Testing

Configuration errors often only appear during build:

```bash
yarn build
```

Common configuration errors:
- Invalid URLs (missing protocol, malformed paths)
- Broken document references
- Plugin configuration errors
- Missing required fields

## Project Type Customizations

### Open Source Library

```javascript
const config = {
  themeConfig: {
    navbar: {
      items: [
        {type: 'doc', docId: 'intro', label: 'Docs'},
        {to: '/docs/api', label: 'API'},
        {href: 'https://github.com/org/repo', label: 'GitHub'},
        {href: 'https://npmjs.com/package/name', label: 'npm'},
      ],
    },
  },
};
```

### Research Project

```javascript
const config = {
  themeConfig: {
    navbar: {
      items: [
        {type: 'doc', docId: 'intro', label: 'Documentation'},
        {to: '/docs/methodology', label: 'Methodology'},
        {to: '/docs/examples', label: 'Examples'},
        {to: '/docs/citing', label: 'Citation'},
      ],
    },
  },
};
```

### Product Documentation

```javascript
const config = {
  themeConfig: {
    navbar: {
      items: [
        {type: 'doc', docId: 'intro', label: 'Get Started'},
        {to: '/docs/features', label: 'Features'},
        {to: '/docs/guides', label: 'Guides'},
        {to: '/docs/support', label: 'Support'},
      ],
    },
  },
};
```

## Best Practices

1. **Keep it simple**: Only customize what's necessary
2. **Validate early**: Test configuration after each change
3. **Document custom values**: Add comments explaining choices
4. **Use environment variables**: For deployment-specific values
5. **Version control**: Commit configuration changes separately
6. **Test builds**: Always run full build to catch configuration errors

## Troubleshooting

**Issue: Site won't build after configuration changes**
- Check JavaScript syntax in `docusaurus.config.js`
- Verify all URLs are properly formatted
- Ensure all referenced files exist

**Issue: Links don't work**
- Check `baseUrl` matches deployment path
- Verify document IDs match actual file names
- Ensure paths use correct format (`/docs/page` not `docs/page.md`)

**Issue: Colors don't apply**
- Verify CSS variable names are correct
- Check for syntax errors in `custom.css`
- Clear browser cache and rebuild

**Issue: Search doesn't work**
- Verify search plugin is installed
- Check plugin configuration syntax
- Rebuild site after configuration changes
