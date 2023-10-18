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

1. **Team Discussion:** Before diving into any configurations, we recommend engaging with your development team about the importance of GitHub’s security features. Establish a consensus on which ones to prioritize and implement.

2. **Set Up Dependabot:**
   - Head over to the Security tab of your repository.
   - We recommend enabling Dependabot alerts to stay informed about insecure dependencies in your project.
   - We suggest turning on Dependabot security updates to automatically generate pull requests for known vulnerabilities in your dependencies.

3. **Enable Code Scanning:**
   - In the Security tab of your repository, navigate to Code Scanning Alerts.
   - Click on Set up code scanning.
   - We recommend enabling:
     - CodeQL Analysis workflow: a free tool provided by GitHub that scans your code for vulnerabilities across a variety of languages.

4. **Enable Secret Scanning:**
   - Head to the Security tab and select Secret Scanning Alerts.
   - We recommend clicking on Set up secret scanning and following the step-by-step instructions provided.

## Frequently Asked Questions (FAQ)

- Q: Can these security features be used outside of GitHub?

  A: This guide specifically focuses on GitHub’s ecosystem. While some tools might have external equivalents, the integrations and configurations here are GitHub-specific.

## Credits

**Authorship:**
- John Engelke [@jpl-jengelke](http://github.com/jpl-jengelke/)
- Rishi Verma [@riverma](http://github.com/riverma/)

**Acknowledgements:**
- GitHub for providing the security features and related documentation. See [GitHub’s Security Features](https://docs.github.com/en/code-security) to access an overview of the suite of security features GitHub provides for repositories.

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this guide. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
