# Starter Kits

This page contains starter kit information, which represent templates, code and configuration to help you get started quickly with continuous testing best practices described in this overall guide. Please see categories and links below for details. 

## Static Application Security Testing

This section contains links to sample actions, templates and configurations that analyze and validate code for security flaws and sensitive information. Identifying security vulnerabilities and sensitive data is an [OSS cybersecurity](https://www.cisa.gov/uscert/ncas/alerts/aa22-137a) [best practice](https://appel.nasa.gov/2022/06/30/spotlight-on-lessons-learned-open-source-and-commercial-web-software-vulnerabilities/).  

### Detect Secrets 
A OSS tool for detecting sensitive information in project files.

#### Automated Secret Scanning on Commit





## Software Composition Analysis

This section contains links to sample actions, templates and configurations that analyze and validate composition of Open Source Software (OSS) components in software systems. Identifying software and licensing vulnerabilites and ensuring routine software updates is an [OSS cybersecurity](https://www.cisa.gov/uscert/ncas/alerts/aa22-137a) [best practice](https://appel.nasa.gov/2022/06/30/spotlight-on-lessons-learned-open-source-and-commercial-web-software-vulnerabilities/).  

### Dependabot
A GitHub ecosystem tool for dependency version and security vulnerability analysis.

#### Automated Dependency Updates

This Dependabot task provides an automated check for OSS component updates and automatically creates [pull requests](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/managing-pull-requests-for-dependency-updates) to commit new versions. 

Starter Kit:
- [SLIM Starterkit Python -- Dependabot Script](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/.github/dependabot.yml) to install in your GitHub repo

To leverage Dependabot, make sure to do the following:
1. Discuss with your development team the cybersecurity best practice to regularly update OSS to latest versions and seek consensus on a workflow to accept proposed updates.
2. Add Dependabot automation to your repository, either via the **admin console** or **manually** (choose **one**):
> **Shortcut**  
  Copy the pre-set configuration to an identical path in your repository, e.g. `.github/dependabot.yml`.
   * **Admin console:** (requires admin rights)
      1. Proceed to [enable Dependabot alerts through GitHub Settings UI](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/configuring-dependabot-alerts#enabling-or-disabling-dependabot-alerts-for-a-repository).
   * **Manually:** (_approach available to all committers_)
      1. Create an issue and an issue branch to implement a code change. Checkout the issue branch.
      2. Copy the Dependabot configuration file from one of the SLIM Starterkit repos -- for example, [`dependabot.yml` in the Python Starterkit](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/.github/dependabot.yml) -- into the root of your repository at `.github/dependabot.yml`.
3. Modify [Dependabot configurations](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#configuration-options-for-the-dependabotyml-file) for your project: 
> **Requirement**  
  Set properties to match your repository setup, including core packaging system.
   * Set the `package-ecosystem` property to [match your packaging system](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#package-ecosystem) in `dependabot.yml`.
   * Set the `target-branch` to the [name of your default branch](https://github.com/NASA-AMMOS/slim-starterkit-python/branches) in `dependabot.yml`.
   * Optionally, value-added features may be set, including such settings as [scheduling](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#scheduleday), a [strategy for versioning](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#versioning-strategy) and [pull request reviewers](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#reviewers).
4. Dependabot is now installed and detections can be tracked through the dependency graph at [`Insights` **->** `Dependency graph` **->** `Dependabot`](https://github.com/NASA-AMMOS/slim-starterkit-python/network/updates). [Pull Requests](https://github.com/NASA-AMMOS/slim-starterkit-python/pulls) also will include automatically created Dependabot merges.

#### Automated Security Updates

This Dependabot task automates security scanning for [known vulnerabilities](https://github.com/advisories) in OSS components and automatically creates [pull requests](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/managing-pull-requests-for-dependency-updates) to update flagged components.  

[Dependabot Security Updates](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates) requires [Dependabot Automated Dependency Updates](./README.md#automated-dependency-updates) (see above). Although technically part of the same automation stack, it's [enabled through the GitHub Settings UI](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates#enabling-or-disabling-dependabot-security-updates-for-an-individual-repository). Optionally, dependency updates can be disabled so that only security updates create pull requests.

> **Requirement**  
  Install and set up the Starter Kit for Dependabot Automated Dependency Updates.

To leverage this template, make sure to do the following:
1. Discuss with your development team the cybersecurity best practice to regularly scan OSS components for security flaws and seek consensus on a workflow to accept proposed updates.
2. Enable Security Updates:
   1. At [`Settings` **->** `Code security and analysis` **->** `Dependabot`](https://github.com/NASA-AMMOS/slim-starterkit-java/settings/security_analysis), select the `Enable` button to turn on `Dependabot security updates`.
> **Requirement**  
  Admin rights are necessary to modify `Code security and analysis` settings.
3. Modify [Dependabot configurations](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#configuration-options-for-the-dependabotyml-file) for your project: (optional)
   1. If only security-related pull requests are desired, [set the `open-pull-requests-limit` property to `0` for `updates` block(s)](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#open-pull-requests-limit).
