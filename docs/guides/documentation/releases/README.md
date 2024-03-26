# Releases

<pre align="center">Streamline software releases through consistent templates, automated aggregation and notifications.</pre>

## Introduction

**Background**: Making releases can be a chore. From ensuring the release notes have helpful information to aggregating many updates and notifying your users - doing the process right can be time consuming and fraught with misunderstandings. In this guide we recommend a standardized, automated way to notify your users of new releases. For example, we recommend using a `.github/release.yml` template to allow for more readable release notes, showcasing the importance of each update. We also provide automation for aggregating releases from many repositories into a super-release that provides a holistic view of project progress. Finally, we recommend automated notifications through GitHub integrations to help keep everyone informed.

**Use Cases**:
- Automating release notes generation with a readable template
- Aggregating multiple repository releases for projects with many repositories
- Streamlining release notifications to keep teams and users informed automatically

---

## Prerequisites
* A GitHub account and repository
* Basic understanding of GitHub Actions and workflows
* Access to IM channels like Slack for integration

---

## Quick Start
**[⬇️ Recommended GitHub release.yml Template](release.yml.md)**

_A customizable GitHub-specific release template. Customize it to fit your project's labeling scheme and presentation preferences for release notes and place it in your GitHub repository's `.github/release.yml` path._

**[⬇️ Python Script to Aggregate GitHub Releases](gh_aggregate_release_notes.py)**

_A Python script that aggregates release notes from many repositories and generates a "super" release text._

NOTE: You'll need a configuration file to use the above Python script. See step 2.2 below for an example file that you can customize for your project.


---

## Step-by-Step Guide

1. **Customize Release Notes**:
   - Create a `.github/release.yml` file in your repository.
   - Download our [GitHub release notes template](release.yml) and place the contents into your `.github/release.yml` file.
   - Customize our recommended template as a baseline and to configure how release notes are generated based on your project's issue labels.
   
2. **Aggregate Releases**:
   We recommend using a script to automatically aggregate release notes from multiple repositories. Details below.

   2.1 Download our script 
   - Copy/download our script to your local machine
      ```
      curl -o gh_aggregate_release_notes.py https://...
      ```

   2.2 Create a configuration file with your project's release information. Save the file with extension `.yml` A sample is provided below:
      ```
      github_token: <INSERT YOUR GH PERSONAL TOKEN>
      urls:
      - https://github.com/NASA-AMMOS/slim/releases/tag/v1.3.0
      - https://github.com/your-org/your-repo/releases/tag/v1.0.0
      ```
   2.3 Run the script to generate aggregated release notes
      ```
      $ python gh_aggregate_release_notes.py your_configuration_file.yml
      ```

   2.3 Review your aggregated release notes
   - Your aggregated release notes should be printed to standard out

3. **Set Up Notifications**:
   - Integrate GitHub with your IM channels, such as Slack, for example installing and configuring extensions like: [GitHub's Slack integration](https://slack.github.com).
   - Conduct individual outreach to your customers/users to encourage them to watch your repository for release updates to stay informed about new releases through GitHub's notification system.

---

## Frequently Asked Questions (FAQ)

- Q: Can I customize which pull requests or issues appear in the release notes?
- A: Yes, by using labels and the `exclude-labels` field in the `.github/release.yml` file, you can control the inclusion of pull requests and issues in your release notes.

---

## Credits 

**Authorship**:
- [@riverma](https://www.github.com/riverma)

**Acknowledgements**:
* @hookhua for inspiration to make this guide.
  
---

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this page. Please see our [contribution guidelines](https://github.com/YOUR_REPOSITORY/contributing.md).
