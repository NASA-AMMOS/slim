# Pull Requests

<pre align="center">A template to standardize pull-requests.</pre>

![pr-screenshot-example](/img/pr-screen.png)

*Example pull request template in action rendering*

## Introduction

**Background**: Pull requests help manage contributions to projects, especially on platforms like GitHub. By using a standardized pull request template, projects can streamline the contribution process, providing clarity and consistency for both contributors and maintainers. This guide will help you implement a GitHub Pull Request Template to improve how contributions are made to your project.

**Use Cases**:
- Standardizing the format of pull requests for clarity and efficiency.
- Providing guidelines to contributors for submitting well-documented pull requests.

---

## Prerequisites

* Access to a GitHub repository where you can add files.
* Basic understanding of GitHub's file structure and Markdown formatting.

---

## Quick Start

**[⬇️ Pull Request Template](PULL_REQUEST_TEMPLATE)** ([see example](https://github.com/riverma/terraformly/blob/main/.github/PULL_REQUEST_TEMPLATE))

Our recommended pull request template for projects.

**[📔 GitHub Pull Request Template Documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)**

Recommendations from GitHub.com on how-to facilitate the use of pull request templates.

---

## Step-by-Step Guide

1. **Team Discussion**: Discuss the benefits of a pull request template with your team. Gain consensus on adopting this approach for consistency in contributions. Below is an explanation of our recommended [Pull Request Template](PULL_REQUEST_TEMPLATE) file's fields. Adjust as necessary.
   - ***Purpose***: To clearly state the intention behind the pull request. This helps reviewers understand the context and significance of your changes.
   - ***Proposed Changes***:
      - `[ADD]` for new features or content the contributor introduced.
      - `[CHANGE]` for modifications to existing features or code.
      - `[REMOVE]` for removals features or code.
      - `[FIX]` for bug fixes the contributor implemented.
   - ***Issues***: To link any related issues your PR addresses. This creates a traceable connection between the issue and the solution provided.
   - ***Testing***: To document how the contributor tested the changes. Including links to test results or noting the operating systems on which the tests were performed. This assures reviewers of the reliability and effectiveness of changes.

2. **Create Template Directory**:
   - In your GitHub repository, create a `.github/` folder to hold community health files.

3. **Add Pull Request Template**:
   - Copy the [Pull Request Template](PULL_REQUEST_TEMPLATE) into `.github/PULL_REQUEST_TEMPLATE`.
   - Commit and push this file to the `main` branch of your repository.

4. **Usage**:
   - Once set up, this template will automatically appear in the pull request description box for contributors to fill out.

---

## Frequently Asked Questions (FAQ)

- Q: How does a pull request template improve contributions?
- A: It provides a structured format for contributors, ensuring all necessary information is included, which facilitates better review and collaboration.

---

## Credits 

**Authorship**:
- [Rishi Verma](https://www.github.com/riverma)

---

## Feedback and Contributions

We welcome feedback and contributions to enhance this guide. For contributing, please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
