
# Website
<pre align="center">Guide to set up a software product website with docs</pre>

## Introduction

**Background**:  
A well-structured product website helps brand but also provides a go-to place for documentation that guides users and developers in software easily. This guide provides best practices for setting up a software product website using Docusaurus. By following this guide, you can expect a polished and functional website that enhances the accessibility and usability of your software product and a place for your developers to publish documentation.

**Use Cases**:
- Establishing a new product website for open-source or proprietary software
- Integrating product documentation with an API reference and blog for ongoing communication
- Describing your team, project, or discussing news updates

---

## Prerequisites

- **Docusaurus**: A static site generator optimized for documentation websites.
- **Basic knowledge of Markdown**: For writing documentation content.
- **Git and GitHub account**: For version control and deploying the website.
- **Node.js, npm, yarn**: To install and manage Docusaurus and its dependencies.

---

## Quick Start
**[Template Repository for Website/Docs](https://github.com/nasa-ammos/slim-docsite-template)**

_The above link provides a working template project for setting up a Docusaurus-based product website._

1. Clone the above repository
2. Run `yarn start` in the cloned directory
3. Open up `localhost:3000` in a web browser

---

## Step-by-Step Guide

1. **Clone the Template Repository**:  
   Start by cloning the template repository to your local machine. This repository contains a pre-configured Docusaurus setup that you can customize for your project.
   ```bash
   git clone https://github.com/nasa-ammos/slim-docsite-template.git
   cd slim-docsite-template
   ```

2. **Run the Repository Locally**:  
   Use `yarn` to install dependencies and start the development server. This will allow you to view your site locally as you make changes.
   ```bash
   yarn install
   yarn start
   ```
   Once the server is running, open a web browser and navigate to `http://localhost:3000` to view your site.

3. **Adjust Website Content**:  
   Customize the content of your site by editing the files in the `/blog`, `/docs`, and `/src` directories:
   - **/blog**: This directory contains Markdown files for blog posts. You can remove the example posts and create new ones relevant to your project.
   - **/docs**: This directory contains your documentation files. Structure your documentation into logical sections like "Getting Started", "API Reference", and "User Guides".
   - **/src**: This directory contains the source code for the site’s layout and components. Adjust the layout, styling, or add new components as needed to fit your branding and content requirements.

4. **Deploy the Website to GitHub Pages**:  
   After making the necessary adjustments, you can deploy your site to GitHub Pages. Ensure you have a GitHub repository set up, and then run the following command:
   ```bash
   GIT_USER=<Your GitHub Username> USE_SSH=true yarn deploy
   ```
   This command builds the site and pushes the static files to the `gh-pages` branch of your repository, making your website live on GitHub Pages.

---

## Frequently Asked Questions (FAQ)

- **Q: Can I use other documentation tools instead of Docusaurus?**  
  **A:** While this guide focuses on Docusaurus, you can explore other tools like Sphinx (for Python projects) or MkDocs. However, Docusaurus offers broad functionality that fits most use cases, especially for JavaScript-based projects.

- **Q: How do I integrate an API reference in my site?**  
  **A:** Docusaurus supports Swagger UI and other API documentation generators. You can integrate your API reference as a separate page using the `@docusaurus/plugin-content-api` plugin.

- **Q: Can I add a blog to the site?**  
  **A:** Yes, Docusaurus has built-in support for blogs. You can create blog posts using Markdown files, which will be automatically rendered into a blog section.

---

## Credits 

**Authorship**:
- [@PaulMRamirez](https://www.github.com/PaulMRamirez)
- [@riverma](https://github.com/riverma)

**Acknowledgements**:
* [OPERA project](https://www.jpl.nasa.gov/go/opera) for feedback on adaptation 

---

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this page. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
