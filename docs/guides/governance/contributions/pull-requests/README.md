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

**[⬇️ Pull Request Template](pathname:///assets/governance/pull-requests/PULL_REQUEST_TEMPLATE.md)** ([see example](https://github.com/riverma/terraformly/blob/main/.github/PULL_REQUEST_TEMPLATE))

Our recommended pull request template for projects.

**[📔 GitHub Pull Request Template Documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository)**

Recommendations from GitHub.com on how-to facilitate the use of pull request templates.

---

## Step-by-Step Guide

1. **Team Discussion**: Discuss the benefits of a pull request template with your team. Gain consensus on adopting this approach for consistency in contributions. Below is an explanation of our recommended [Pull Request Template](pathname:///assets/governance/pull-requests/PULL_REQUEST_TEMPLATE.md) file's fields. Adjust as necessary.
   - ***Purpose***: To clearly state the intention behind the pull request. This helps reviewers understand the context and significance of your changes.
   - ***Proposed Changes***:
      - `[ADD]` for new features or content the contributor introduced.
      - `[CHANGE]` for modifications to existing features or code.
      - `[REMOVE]` for removals of features or code.
      - `[FIX]` for bug fixes the contributor implemented.
   - ***Issues***: To link any related issues your PR addresses. This creates a traceable connection between the issue and the solution provided.
   - ***Testing***: To document how the contributor tested the changes. Including links to test results or noting the operating systems on which the tests were performed. This assures reviewers of the reliability and effectiveness of changes.

2. **Create Template Directory**:
   - In your GitHub repository, create a `.github/` folder to hold community health files.

3. **Add Pull Request Template**:
   - Copy the [Pull Request Template](pathname:///assets/governance/pull-requests/PULL_REQUEST_TEMPLATE.md) into `.github/PULL_REQUEST_TEMPLATE`.
   - Commit and push this file to the `main` branch of your repository.

4. **Usage**:
   - Once set up, this template will automatically appear in the pull request description box for contributors to fill out.

---

## Best Practices

### Versioning

Versioning provides your development team and the consumers of your codebase the ability to keep track of the differences between the release states of your code. To faciliate versioning, we recommend the use of [semantic versioning](https://semver.org/) because it provides a simple set of guidelines that describe how to increment your version numbers based on the changes that are being introduced. Below is a short summary from the semantic versioning website that describe a typical version number scheme:

> Given a version number MAJOR.MINOR.PATCH, increment the:
> 
>1. MAJOR version when you make incompatible API changes
>2. MINOR version when you add functionality in a backward compatible manner
>3. PATCH version when you make backward compatible bug fixes
>
>Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

#### Takeaways:
* Your team's versioning scheme may require additional delination between versions ala build identifiers, release desiginations (e.g. unstable, stable, prerelease), so have a discussion with your team about the code versioning convention the project will follow and document the versioning scheme to refer back to as new developers are onboarded or when there are questions about the adopted versioning scheme.
* For each pull request, ensure that the code changes are captured in the repo's CHANGELOG and that the changes are associated with a version number that follows the team's/project's code versioning scheme.

### Automated Code Quality and Security Scans



---

## Frequently Asked Questions (FAQ)

- Q: How does a pull request template improve contributions?
- A: It provides a structured format for contributors, ensuring all necessary information is included, which facilitates better review and collaboration.

---

## Credits 

**Authorship**:
- [Rishi Verma](https://www.github.com/riverma)
- [Anil Natha](https://www.github.com/anilnatha)

---

## Feedback and Contributions

We welcome feedback and contributions to enhance this guide. For contributing, please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
