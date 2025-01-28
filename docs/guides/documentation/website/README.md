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

   ### **/docs Directory**
   The `/docs` directory contains your documentation files. The following are provided as samples to help you structure your documentation:

   - **`index.md`**: This file serves as the entry point for your documentation. It provides a high-level overview and introduction to your project’s documentation.

   - **`contributing.md`**: This file outlines the guidelines for contributing to the project. It typically includes instructions on how to submit issues, pull requests, and coding standards.

   - **`developer/`**: This subdirectory contains documentation specifically aimed at developers:
     - **`api.md`**: Provides detailed information on the project's API, including endpoints, request/response formats, and example usage.
     - **`getting-started-dev.md`**: A guide for developers to set up their development environment and start contributing to the project.
     - **`project-structure.md`**: Explains the organization of the codebase, helping developers understand the structure and purpose of various files and directories.
     - **`testing.md`**: Describes how to run and write tests for the project to ensure code quality.
     - **`tutorials.md`**: Offers step-by-step tutorials for common development tasks or advanced features.
     - **`index.md`**: Provides an overview and entry point for the developer documentation section.

   - **`download.md`**: Instructions on how to download and install the software, including links to different versions and checksums for verification.

   - **`faqs.md`**: A compilation of frequently asked questions and their answers, helping users troubleshoot common issues.

   - **`user/`**: This subdirectory contains user-focused documentation:
     - **`advanced-usage.md`**: Guides users through advanced features and custom configurations.
     - **`features.md`**: Describes the key features of the software and how to use them effectively.
     - **`installation.md`**: Step-by-step instructions for installing the software on various platforms.
     - **`quick-start.md`**: A concise guide to help users get started quickly with the software.
     - **`troubleshooting.md`**: Provides solutions to common issues that users might encounter.
     - **`tutorials.md`**: Contains tutorials that guide users through specific use cases or advanced topics.
     - **`index.md`**: Serves as the entry point for user documentation, providing an overview and links to key sections.

   ### **/src Directory**
   The `/src` directory contains the source code for the site’s layout and components. Here's an overview of what's included:

   - **`components/`**: This subdirectory contains reusable UI components:
     - **`HomepageFeatures/`**: A sample component that displays features on the homepage, complete with a `styles.module.css` file for custom styling.
     - **`index.js`**: The main file that aggregates and exports the component.
     - **`styles.module.css`**: A CSS module for styling the component.

   - **`css/`**: Contains global styles for the site:
     - **`custom.css`**: A file for adding custom CSS that applies site-wide, allowing you to easily modify the look and feel of your site.

   - **`pages/`**: This directory contains the pages of the website:
     - **`about.js`**: A sample "About" page implemented as a React component, with its corresponding stylesheet in `about.module.css`.
     - **`index.js`**: The main homepage file, which is also implemented as a React component, with styling in `index.module.css`.
     - **`markdown-page.md`**: A sample page written in Markdown, demonstrating how you can create simple content pages using Markdown syntax.

   Customize these files and directories to fit your branding and content requirements. The provided samples offer a solid foundation to build upon, allowing you to quickly create a comprehensive and professional-looking documentation site.

4. **Deploy the Website to GitHub Pages**:  
   The project is configured to automatically build and deploy using GitHub Actions. The workflow files located within the `.github/workflows` directory are set up to trigger builds whenever commits are pushed to the `main` branch. Additionally, pull requests will be automatically built for testing purposes.

   To ensure your site is properly deployed:

   1. **Enable GitHub Pages**: Ensure that GitHub Pages is enabled for your repository. You can enable it by going to the repository settings on GitHub and selecting the branch you want to use for GitHub Pages, typically `gh-pages` or `main`.

   2. **Manual Deployment**: If you prefer manual deployment or are not using GitHub Actions, you can still deploy manually:
      - **Deploy using SSH**:
        ```bash
        USE_SSH=true yarn deploy
        ```
      - **Deploy without SSH**:
        ```bash
        GIT_USER=<Your GitHub Username> yarn deploy
        ```

   By following these steps, your site will be automatically built and deployed when changes are made to the `main` branch or when pull requests are created. Manual deployment commands are also available if needed.

   > **Note**: For more detailed information on deploying with GitHub Actions, please refer to the [Docusaurus documentation](https://docusaurus.io/docs/deployment#triggering-deployment-with-github-actions).

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
