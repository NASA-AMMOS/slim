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

3. **Select Reviewers**:

    - A note from the [GitHub code owners documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners):

        > The people you choose as code owners must have write permissions for the repository. When the code owner is a team, that team must be visible and it must have write permissions, even if all the individual members of the team already have write permissions directly, through organization membership, or through another team membership.

    - Every line added to the codeowners file should include a file pattern, followed by a space, and the individual(s) or team that manages those files. Using this method, one could associate individuals/teams with different parts of your codebase for review; however, if the set of reviewers covers your entire codebase, the setup is very simple. Examples of these two are shown below.
    
      Both of these examples assumes:
      1. There are two users named, `johndoe`, and `janedoe`
      2. Teams are two teams named, `AppsTeam` and `ApiTeam` 
      3. The codebase contains two folders at the root, `apps` and `api`.

      ##### Example 1 - Any change to the codebase is sent to members, `johndoe` and `janedoe`, and the team, `AppsTeam`.

      ```
      # Each line is a file pattern followed by one or more owners.
      * @johndoe @janedoe @AppsTeam
      ```

      ##### Example 2 - Changes to the `apps` folder and `api` folder have differing reviewers

        ```
        # Each line is a file pattern followed by one or more owners.
        apps/ @johndoe @AppsTeam
        api/ @janedoe @ApiTeam
        ```

      Please refer to the [GitHub code owners documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) for more customization information.

    References:
      * [GitHub documentation for Code Owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
      * [Designation of Pull-Request Reviewers and Assignees](#designation-of-pull-request-reviewers-and-assignees) Best Practice.
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
* Your team's versioning scheme may require additional delienation between versions, e.g. build identifiers or release desiginations (e.g. unstable, stable, prerelease). Have a discussion with your team about adopting a code versioning convention the project will follow and document it to refer back to as new developers are onboarded or when there are questions about the adopted versioning scheme.
* For each pull request, ensure that the code changes are captured in the repo's CHANGELOG and that the changes are associated with a version number that follows the team's/project's code versioning scheme.

### Automated Code Quality and Security Scans

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
