# Homepage Customization Guide

This guide provides instructions for customizing the Docusaurus homepage (`src/pages/index.js`) with project-specific content.

## Homepage Structure

The homepage consists of several key sections:

1. **Hero Section** - Main title, tagline, and call-to-action
2. **Features Section** - Key project features and capabilities
3. **Additional Sections** - Optional sections for more content

## Customization Strategy

### 1. Extract Project Information

From project analysis, gather:
- **Project name**: Official name from README, package.json, etc.
- **Description**: Summary of what the project does
- **Key features**: 3-5 main capabilities or benefits
- **Target audience**: Who uses this project
- **Call-to-action**: What should users do first (install, try demo, read docs, etc.)

### 2. Hero Section Customization

**Template code location**: `src/pages/index.js`

**Update these elements**:

```javascript
function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          {siteConfig.title}  // Use discovered project name
        </h1>
        <p className="hero__subtitle">
          {siteConfig.tagline}  // Use AI-generated tagline
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Get Started  // Update based on documentation structure
          </Link>
        </div>
      </div>
    </header>
  );
}
```

**Tagline generation**:
- Should be 5-15 words
- Clearly describe project purpose
- Use active, engaging language
- Examples:
  - "Build fast, modern documentation websites with ease"
  - "Automate your workflow with AI-powered tools"
  - "Secure, scalable data processing for research teams"

### 3. Features Section Customization

**Identify 3-6 key features** from project analysis:

**Feature selection criteria**:
- Most important capabilities
- Unique differentiators
- User-facing benefits
- Technical highlights (if developer-focused)

**Feature template**:

```javascript
const FeatureList = [
  {
    title: '[Feature Name]',
    Svg: require('@site/static/img/[icon-name].svg').default,  // Or use emoji
    description: (
      <>
        [2-3 sentences describing the feature and its benefit]
      </>
    ),
  },
  // ... more features
];
```

**Feature writing guidelines**:
- **Title**: 2-5 words, action-oriented
- **Description**: Focus on benefits, not just capabilities
- **Icon**: Use relevant icon or emoji if no custom icons available

**Example feature transformations**:

*From project analysis*: "Uses React for UI components"

*Generated feature*:
```javascript
{
  title: 'Built with React',
  Svg: require('@site/static/img/react-icon.svg').default,
  description: (
    <>
      Leverage the power of React for building interactive, component-based
      user interfaces with excellent performance and developer experience.
    </>
  ),
}
```

*From project analysis*: "Automated testing framework"

*Generated feature*:
```javascript
{
  title: 'Automated Testing',
  description: (
    <>
      Comprehensive testing framework ensures reliability and quality.
      Run tests automatically on every change with continuous integration.
    </>
  ),
}
```

### 4. Additional Content Sections

**Optional sections to add based on project type**:

#### A. Getting Started Section
For user-focused projects:

```jsx
function GettingStartedSection() {
  return (
    <section className={styles.gettingStarted}>
      <div className="container">
        <h2>Quick Start</h2>
        <p>Get up and running in minutes:</p>
        <ol>
          <li>Install: <code>npm install [package-name]</code></li>
          <li>Configure: Add configuration to your project</li>
          <li>Run: Execute your first command</li>
        </ol>
        <Link to="/docs/getting-started">View full documentation →</Link>
      </div>
    </section>
  );
}
```

#### B. Showcase Section
For projects with examples or demos:

```jsx
function ShowcaseSection() {
  return (
    <section className={styles.showcase}>
      <div className="container">
        <h2>See It In Action</h2>
        <p>Explore examples and live demos</p>
        {/* Add examples, screenshots, or demo links */}
      </div>
    </section>
  );
}
```

#### C. Community Section
For open-source projects:

```jsx
function CommunitySection() {
  return (
    <section className={styles.community}>
      <div className="container">
        <h2>Join the Community</h2>
        <p>Contribute, get help, and stay updated</p>
        {/* Add GitHub, Slack, Discord, or other community links */}
      </div>
    </section>
  );
}
```

### 5. Configuration File Updates

Update `docusaurus.config.js` to match homepage content:

```javascript
const config = {
  title: '[Discovered Project Name]',
  tagline: '[AI-generated tagline]',
  favicon: 'img/favicon.ico',

  url: 'https://your-username.github.io',
  baseUrl: '/your-repo-name/',

  // ... other config
};
```

## Content Generation Examples

### Example 1: Developer Tool Project

**Analysis input**:
- Name: "CodeAnalyzer"
- Type: Developer tool
- Purpose: Static code analysis
- Features: Multi-language support, custom rules, CI/CD integration

**Generated homepage content**:

```javascript
// Title: CodeAnalyzer
// Tagline: Advanced static code analysis for modern development teams

const FeatureList = [
  {
    title: 'Multi-Language Support',
    description: (
      <>
        Analyze code in Python, JavaScript, Java, Go, and more. One tool
        for all your projects, with consistent results across languages.
      </>
    ),
  },
  {
    title: 'Custom Rules Engine',
    description: (
      <>
        Define your own analysis rules to enforce team standards and catch
        project-specific issues before they reach production.
      </>
    ),
  },
  {
    title: 'CI/CD Integration',
    description: (
      <>
        Seamlessly integrate with GitHub Actions, GitLab CI, Jenkins, and
        other platforms. Automate quality checks in your workflow.
      </>
    ),
  },
];
```

### Example 2: Research Project

**Analysis input**:
- Name: "DataProcessor"
- Type: Research tool
- Purpose: Scientific data processing
- Features: Scalable, validated algorithms, publication-ready outputs

**Generated homepage content**:

```javascript
// Title: DataProcessor
// Tagline: Reliable scientific data processing for research excellence

const FeatureList = [
  {
    title: 'Validated Algorithms',
    description: (
      <>
        Use peer-reviewed, scientifically validated algorithms with full
        documentation and references to published research.
      </>
    ),
  },
  {
    title: 'Scalable Processing',
    description: (
      <>
        Process datasets from megabytes to terabytes with efficient parallel
        processing and resource management.
      </>
    ),
  },
  {
    title: 'Publication Ready',
    description: (
      <>
        Generate figures, tables, and reports formatted for academic
        publication with reproducible results.
      </>
    ),
  },
];
```

### Example 3: Web Application

**Analysis input**:
- Name: "TaskManager"
- Type: Web application
- Purpose: Team task management
- Features: Real-time collaboration, mobile support, integrations

**Generated homepage content**:

```javascript
// Title: TaskManager
// Tagline: Collaborative task management made simple

const FeatureList = [
  {
    title: 'Real-Time Collaboration',
    description: (
      <>
        Work together seamlessly with live updates, instant notifications,
        and shared workspaces for your entire team.
      </>
    ),
  },
  {
    title: 'Mobile First',
    description: (
      <>
        Access your tasks anywhere with responsive design and native mobile
        apps for iOS and Android.
      </>
    ),
  },
  {
    title: 'Powerful Integrations',
    description: (
      <>
        Connect with Slack, GitHub, Google Calendar, and dozens of other
        tools you already use every day.
      </>
    ),
  },
];
```

## Best Practices

1. **Keep it concise**: Homepage should be scannable in 30 seconds
2. **Focus on benefits**: Explain why, not just what
3. **Use active language**: "Build", "Create", "Deploy" not "Can be used to..."
4. **Show don't tell**: Use specific examples and concrete features
5. **Clear call-to-action**: Make it obvious what users should do next
6. **Consistent tone**: Match the project's audience and purpose
7. **Mobile friendly**: Ensure content works on small screens

## Validation Checklist

Before finalizing homepage customization:

- [ ] Project name is accurate and properly capitalized
- [ ] Tagline clearly describes project purpose
- [ ] Features are specific and benefit-focused
- [ ] Call-to-action links work and point to appropriate documentation
- [ ] Content is free of placeholder text
- [ ] Icons/images are appropriate and load correctly
- [ ] Layout is responsive and mobile-friendly
- [ ] Spelling and grammar are correct
- [ ] Tone matches target audience
