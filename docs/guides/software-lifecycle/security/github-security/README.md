# GitHub Security Best Practices

<pre align="center">Recommendations for enabling GitHub security features for your repositories.</pre>

## Introduction

**Background:** GitHub offers a suite of security features to help maintainers and developers protect their code and ensure the safety of their repositories. From automatically detecting vulnerabilities in dependencies to scanning for secrets and setting security policies, these tools are essential for any project, especially in today’s security-conscious environment.

**Use Cases:**
- Being alerted over e-mail or GitHub notifications about known vulnerabilities in your dependencies and having pull-requests automatically created to resolve the issues. 
- Being alerted if your dependencies have updated versions available.
- Being alerted if your commits have potentially harmful secrets or sensitive information within the code - including being blocked from pushing your commits. 

## Prerequisites

- A GitHub repository
- Familiarity with GitHub’s user interface
- Admin rights for certain security configuration tasks
- Team discussion: before diving into any configurations, we recommend engaging with your development team about the importance of GitHub’s security features. Establish a consensus on which ones to prioritize and implement.

## Quick Start

The fastest way to enable recommended GitHub Security features is to perform it in bulk for _all_ of your repositories within a given organization. Consult [Enabling security features for multiple repositories](https://docs.github.com/en/enterprise-cloud@latest/code-security/security-overview/enabling-security-features-for-multiple-repositories) for details. Organization administrative-level access is required. 

We recommend enabling the below features for all your repositories:

![img](https://github.com/NASA-AMMOS/slim/assets/3129134/be02ee5f-74cb-4869-bdf2-020c184516ec)

Specifically:
- Dependency graphs (select "Enable All")
  - Select "Automatically enable for new private repositories"
- Dependabot Alerts (select "Enable All")
  - Select "Automatically enable for new repositories"
- Dependabot Security Updates (select "Enable All")
  - Select "Automatically enable for new repositories"
- Code Scanning (select "Enable All")
  - Select the default "CodeQL high-precision queries" option

If you do not have organizational permissions or if you wish to customize security features per repository, see our Step-by-Step guide below for repository-specific guidance. 
 
## Step-by-Step Guide per Repository

1. **Set Up Dependabot:**
   - Navigate to your repository and click on the `Settings` tab.
   - From the left sidebar, select the `Code security and analysis` menu.
   - Under the "Dependabot" section:
     - We recommend enabling Dependabot alerts to stay informed about insecure dependencies in your project.
     - For added security, we suggest turning on Dependabot security updates to automatically generate pull requests for known vulnerabilities in your dependencies.
     - We also recommend enabling Dependabot version updates _if you are using a package manager for your project_. This will help you keep your dependencies up-to-date. To configure Dependabot version updates:
       1. Create a `.github/dependabot.yml` file in your repository.
       2. Specify the package-ecosystem, directory, and schedule for the updates. For example:
          ```yml
          version: 2
          updates:
            - package-ecosystem: "npm"
              directory: "/"
              schedule:
                interval: "daily"
          ```
   - To view Dependabot alerts and version updates:
     - Head back to the main page of your repository.
     - Click on the `Security` tab. Here, you can select `Dependabot alerts` to view security alerts, and you can see version updates in the `Pull requests` tab labeled with "Dependabot".


2. **Enable Code Scanning:**
   - In the `Code security and analysis` menu from the `Settings` tab, click the "Set Up" or enable the following workflows:
     - _CodeQL Analysis workflow:_ a free tool provided by GitHub that scans your code for vulnerabilities across a variety of languages. Simply choose a CodeQL Analysis template (default is acceptable) and follow the instructions.
   - To view Code scanning alerts:
     - Return to the repository main page.
     - Click on the `Security` tab and select `Code scanning alerts`.

3. **Enable Secret Scanning:**
   - In the `Code security and analysis` menu from the `Settings` tab:
     - Click on the `Secret scanning` enable button.
     - We recommend enabling "Push protection" for blocking commits containing secrets
   - To view Secret scanning alerts:
     - Navigate to the repository main page.
     - Click on the `Security` tab and select `Secret scanning alerts`.

## Frequently Asked Questions (FAQ)

- **Q: Can these security features be used outside of GitHub?**

  A: This guide specifically focuses on GitHub’s ecosystem. While some tools might have external equivalents, the integrations and configurations here are GitHub-specific.

- **Q: Are these security features available on GitHub Enterprise?**

  A: It depends on your institution's particular version of GitHub deployed. You'll have to check your Settings tab to view the features that are provided. GitHub.com is the most up-to-date version we recommend for. 

- **Q: If I receive security alerts, what should I do and how soon should I act?**

  A: When you receive a security alert, it indicates a potential vulnerability in your repository. First, review the details of the alert to understand the severity and the affected component. Address critical vulnerabilities immediately, as they can pose a significant risk to your project. For less severe alerts, plan to address them in a timely manner. Always keep in mind that the sooner you act on security alerts, the better you can protect your code and users from potential threats.
  
## Credits

**Authorship:**
- John Engelke [@jpl-jengelke](http://github.com/jpl-jengelke/)
- Rishi Verma [@riverma](http://github.com/riverma/)

**Acknowledgements:**
- GitHub for providing the security features and related documentation. See [GitHub’s Security Features](https://docs.github.com/en/code-security) to access an overview of the suite of security features GitHub provides for repositories.
- [OWASP DevSecOps Guideline](https://owasp.org/www-project-devsecops-guideline/latest/) for providing a Shift Left strategy to secure all phases of development.
  
## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this guide. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
