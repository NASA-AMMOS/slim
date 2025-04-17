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

## Step-by-Step Guides

### Pull Request Template

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

### Pull Request Automatic Reviewer Assignment

1. **Team Discussion**: Discuss the benefits of automatically requesting reviews for opened pull requests, see [best practice information below](#designation-of-pull-request-reviewers-and-assignees). This is achieved by creating a `CODEOWNERS` file that details the individuals and/or teams from which a review should automatically be requested when a pull request is opened. 

2. **Create `CODEOWNERS` file**:
    - Add a file named `CODEOWNERS` at one of the following locations in your repo (folder location are based off the root of your repository)
      - root of your repository
      - `.github/`
      - `docs/`

3. **Configure Reviewers**:

    - Every line added to the `CODEOWNERS` file should include a file pattern, followed by a space, and the people or team(s) that manages those files. A note from the [GitHub code owners documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) about people and teams:

        > The people you choose as code owners must have write permissions for the repository. When the code owner is a team, that team must be visible and it must have write permissions, even if all the individual members of the team already have write permissions directly, through organization membership, or through another team membership.
    
    - Using this method described above, one could associate people/teams with different parts of your codebase for review; however, if your people/teams need to review your entire codebase, the setup is very simple. Some examples of how a code owners file may be configured are shown below.
    
      These examples assume:

      1. A repository has two collaborators with the usernames, `johndoe` and `janedoe`
      2. A GitHub Organization has two teams named, `AppsTeam` and `ApiTeam` 
      3. At the root of a repository, there are two folders named, `apps` and `api`.

      **Example 1 - A request for review needs to be sent to specific collaborators for changes to any file:**

      ```
      # Each line is a file pattern followed by one or more owners.
      * @johndoe @janedoe
      ```

      **Example 2 - A request for review needs to be sent to a team for changes to any file:**

      ```
      # Each line is a file pattern followed by one or more owners.
      * @AppsTeam
      ```

      **Example 3 - A request for review needs to be sent to specific collaborators and teams depending on the files that are changed:**

        ```
        # Each line is a file pattern followed by one or more owners.
        /apps/ @johndoe @AppsTeam
        /api/ @janedoe @ApiTeam
        ```

      Visit the [GitHub code owners documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) to learn of additional code owners file configuration capabilities.

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
* Have a discussion with your team about adopting a code versioning convention your project will follow and document it to refer back to as new developers are onboarded or when there are questions about the adopted versioning scheme. Your project's versioning scheme may require additional qualifiers, e.g. build identifiers or release desiginations (e.g. unstable, stable, prerelease), so be sure to discuss all aspects of your software development lifecycle when defining your versioning scheme.
* For each pull request, ensure that a summary of the changes are captured in the repository's CHANGELOG and that those changes are associated with a version number that follows the team's/project's code versioning scheme.

### Automated Code Quality and Security Scans

If your project is not currently employing automated code quality and/or security scans, it is highly recommended that they be added to your repositories. The code quality scans can provide a wealth of information to improve the maintainability of your code and avoid potential bugs and the security scans are invaluable in indentifying potential threat vectors. They will help your team ensure that releases of your code will not only be secure and free of known vulnerabilities at the time of the scan, but can help avoid the unnecessary publishing of secrets (e.g. tokens, passwords, PII, etc.).

If the automated scans find issues, regardless if they are related to code changes that were introduced as part of the newly opened pull request, it's important that they are handled in a timely manner.

  - If the changes _can be_ addressed as part of your pull request, [convert the pull request into a draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request#converting-a-pull-request-to-a-draft) to signal to reviewers that a review is not needed and add a comment that you will be address the fixes. As you resolve the issues, periodically push the changes to the branch associated with the pull request on GitHub to retrigger the scans to verify the applied fixes resolved the previously reported issues. Repeat this process until all the issues have been fixed and [mark the pull request as ready for review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request#marking-a-pull-request-as-ready-for-review).
  - If the changes _can't be_ addressed as part of your pull request, be sure to catalogue the reported issues as new tickets so that they are not forgotten and in the newly created issues, link to the pull request in which the issues were found for reference.

For more information about code quality and security scans, visit:

- [GitHub Security](../../../software-lifecycle/security/github-security/README.md)
- [Secrets Detection](../../../software-lifecycle/security/secrets-detection/README.md)
- [Container Vulnerability Scanning](../../../software-lifecycle/security/container-vulnerability-scanning/README.mdx)

### Designation of Pull-Request Reviewers and Assignees

Pull requests need to be acted on in a timely manner to keep the team's development lifecycle running efficiently and so that they don't hinder the team's release schedule. This can be accomplished by:

1. Determining who should review a pull request — This can be accomplished by adding a CODEOWNERS file to the repository that will instruct GitHub to automatically request a review from those specified in the `CODEOWNERS` file when the pull request is opened. For codebases that are very large, like monorepos, the options for how the `CODEOWNERS` file can be configured provides for granularity so that specific folders can be assigned to specific individuals and/or teams. Please see [this](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#example-of-a-codeowners-file) `CODEOWNERS` file for examples on how this file may be configured.

2. Who should take action after the pull request has been approved — Have a discussion with your team about how to merge and close the pull request after an pull request approval has been issued. Some teams may prefer that the approver merge and close the pull request, other teams may designate the original submitter of the pull request merge and close the pull request. In either scenario, be sure to also clean up any artifacts of the pull request, like the removal of the branch the pull request targeted.

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
