# GitHub Security Best Practices

<p align="center">A comprehensive guide on enhancing the security of your GitHub repositories.</p>

## Introduction

**Background:** GitHub offers a suite of security features to help maintainers and developers protect their code and ensure the safety of their repositories. From automatically detecting vulnerabilities in dependencies to scanning for secrets and setting security policies, these tools are essential for any project, especially in today’s security-conscious environment.

**Use Cases:**
- Protecting code repositories from known vulnerabilities in dependencies.
- Monitoring and identifying potentially harmful secrets in code.
- Establishing clear security guidelines and policies for contributors.

## Prerequisites

- A GitHub repository
- Familiarity with GitHub’s user interface
- Optional: Admin rights for certain configuration tasks

## Quick Start

[GitHub’s Security Features](https://docs.github.com/en/code-security)

Click the link above to access an overview of the suite of security features GitHub provides for your repositories.

## Step-by-Step Guide

1. **Team Discussion:** Before diving into any configurations, we recommend engaging with your development team about the importance of GitHub’s security features. Establish a consensus on which ones to prioritize and implement.

2. **Set Up Dependabot:**
   - Head over to the Security tab of your repository.
   - We recommend enabling Dependabot alerts to stay informed about insecure dependencies in your project.
   - For added security, we suggest turning on Dependabot security updates to automatically generate pull requests for known vulnerabilities in your dependencies.

3. **Enable Code Scanning:**
   - In the Security tab of your repository, navigate to Code Scanning Alerts.
   - Click on Set up code scanning.
   - For optimal results, we recommend setting up the CodeQL Analysis workflow. This is a powerful, free tool provided by GitHub that meticulously scans your code for vulnerabilities across a variety of languages. Simply choose the CodeQL Analysis template and follow the instructions.

4. **Enable Secret Scanning:**
   - Head to the Security tab and select Secret Scanning Alerts.
   - We recommend clicking on Set up secret scanning and following the step-by-step instructions provided.

5. **Establish a Security Policy:**
   - Within the Security tab, you’ll find an option to draft a SECURITY.md file. We advise using GitHub’s auto-generated template as it provides a comprehensive structure for your policy.
   - We also recommend mentioning this policy in your repository’s CONTRIBUTING.md guide. This ensures potential contributors are well-informed and can adhere to the stipulated security guidelines.

## Frequently Asked Questions (FAQ)

- Q: Can these security features be used outside of GitHub?
  A: This guide specifically focuses on GitHub’s ecosystem. While some tools might have external equivalents, the integrations and configurations here are GitHub-specific.

## Credits

**Authorship:**
- John Engelke (@jpl-jengelke)
- Rishi Verma (@riverma)

**Acknowledgements:**
- GitHub for providing comprehensive security features and related documentation.

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this guide. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).