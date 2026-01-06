# Docusaurus Customization Reference Guide

This guide provides advanced customization options for your AI-generated Docusaurus website.

## Configuration Files

### `docusaurus.config.js` - Main Configuration
```javascript
const config = {
  title: 'Your Project Name',
  tagline: 'Project description',
  url: 'https://your-domain.github.io',
  baseUrl: '/your-repo-name/',

  // Theme customization
  themeConfig: {
    navbar: {
      title: 'Project Name',
      logo: { src: 'img/logo.svg' },
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { href: 'https://github.com/user/repo', label: 'GitHub', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [/* footer links */],
      copyright: `Copyright © ${new Date().getFullYear()} Your Project`
    }
  }
};
```

## Content Structure

### Documentation Organization (`docs/`)
```
docs/
├── intro.md                 # Getting started
├── user-guide/
│   ├── installation.md
│   ├── quick-start.md
│   └── advanced-usage.md
└── developer/
    ├── api-reference.md
    ├── contributing.md
    └── architecture.md
```

### Blog Posts (`blog/`)
- Use date-prefixed filenames: `2024-01-15-post-title.md`
- Include frontmatter: `title`, `authors`, `tags`

## Styling Customization

### `src/css/custom.css` - Global Styles
```css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
}

.hero--primary {
  --ifm-hero-background-color: var(--ifm-color-primary);
}
```

### Component Customization
- Override theme components in `src/theme/`
- Create custom React components in `src/components/`

## Advanced Features

### Search Integration
```javascript
// In docusaurus.config.js
module.exports = {
  themes: ['@docusaurus/theme-search-algolia'],
  themeConfig: {
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'YOUR_INDEX_NAME'
    }
  }
};
```

### Plugin Configuration
```javascript
plugins: [
  '@docusaurus/plugin-ideal-image',
  ['@docusaurus/plugin-pwa', {
    offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString']
  }]
]
```

### Multi-language Support
```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'es']
}
```

## Deployment Options

### GitHub Pages (Automated)
Pre-configured in `.github/workflows/deploy.yml` - automatic deployment on push to main branch.

### Manual Deployment Commands
```bash
# SSH deployment
USE_SSH=true yarn deploy

# HTTPS deployment
GIT_USER=username yarn deploy

# Custom deployment
yarn build
# Copy build/ directory to your hosting provider
```

### Environment Variables
```bash
# .env file for local development
BROWSER=none
PORT=3001
```

## Performance Optimization

### Image Optimization
- Use WebP format when possible
- Implement lazy loading with `@docusaurus/plugin-ideal-image`
- Compress images before adding to `static/img/`

### Bundle Analysis
```bash
# Analyze bundle size
yarn build --bundle-analyzer
```

### Faster Builds
- Use `--no-minify` for development builds
- Configure `swcMinify: true` for production builds

## Common Customization Patterns

### Custom Homepage Components
```javascript
// src/components/HomepageFeatures.js
export default function HomepageFeatures() {
  return (
    <section className="features">
      {/* Custom feature components */}
    </section>
  );
}
```

### API Documentation Integration
- Use `@docusaurus/plugin-content-docs` for multiple doc sets
- Integrate OpenAPI specs with `docusaurus-plugin-openapi-docs`

### Custom MDX Components
```javascript
// docusaurus.config.js
module.exports = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};
```

### Analytics Integration
```javascript
// Google Analytics
gtag: {
  trackingID: 'GA_TRACKING_ID',
  anonymizeIP: true,
}
```

## Troubleshooting

**Build Failures:**
- Check for syntax errors in config files
- Verify all imported modules exist
- Review MDX syntax in documentation files

**Styling Issues:**
- Use browser developer tools to inspect CSS
- Check CSS variable naming and scope
- Verify custom CSS imports in `custom.css`

**Deployment Problems:**
- Ensure correct `baseUrl` configuration
- Check GitHub repository settings for Pages
- Verify workflow permissions in repository settings