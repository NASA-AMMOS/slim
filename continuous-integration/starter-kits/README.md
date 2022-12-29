# Starter Kits

This page contains starter kit information, which represent templates, code and configuration to help you get started quickly with continuous integration (CI) best practices described in this overall guide. Please see categories and links below for details. 

## Build, Release and Publish Automation
This section contains links to sample actions, templates and configurations that demonstrate [CI systems](../reference-architectures/) in practice on various platforms using different development languages.

### Python Starter Kit
A complete, deployment-ready Python application that's bundled into a reusable template repository for quick implementation.

#### Integrated Build, Release and Publish on GitHub
This product demonstrates a GitHub-based strategy of [end-to-end CI automation](../reference-architectures/) using modern Python tooling to demonstrate publishing on release.
* Build automation using [GitHub](https://github.com/), [Docker](https://www.docker.com/), [GitHub Actions](https://github.com/features/actions) and [PyPi](https://pypi.org/)
* Compile, tag and release, and publish to the [Python Package Index (PyPi)](https://pypi.org/)
* Modern [PEP 517](https://peps.python.org/pep-0517/)/[518](https://peps.python.org/pep-0518/) compliant tooling using [declarative](https://en.wikipedia.org/wiki/Declarative_programming) [TOML](https://toml.io/en/)-based configurations inside a `pyproject.toml` file.

Starter Kit:
- [SLIM Starterkit Python](https://github.com/NASA-AMMOS/slim-starterkit-python) to [create a new repository](https://github.com/NASA-AMMOS/slim-starterkit-python/generate), clone in [codespace](https://github.com/features/codespaces) or [download files](https://stackoverflow.com/q/4604663/325452) to your own repository

To leverage this template, make sure to do the following:
1. Discuss with your development team continuous integration best practices and seek consensus on a workflow to build, publish and release software. 
2. Create a new repository by cloning the [SLIM Starterkit Python](https://github.com/NASA-AMMOS/slim-starterkit-python) template. 
> **Shortcut**  
  Already skilled with Python build systems? You may selectively apply files from the starter kit to your own project using details below. 
3. Setup account credentials:
   1. PyPi and Test PyPi
   2. GitHub Secrets
4. Move code into place
5. Apply your project settings and customizations
6. Test locally
7. Test on GitHub

#### Deliverables
This starter kit produces several deliverables available for distribution:
* Two artifacts -- Python wheel and ZIP source distribution.
  * GitHub
  * PyPi
* Tagged build versions that correspond to release versions.
* Automatic changelog summaries based on commit history at the time of release.

## Patch Integrity

This section contains links to sample actions, templates, and configuration for ensuring the basic integrity of patches.

### GitHub Actions

#### Developer Certificate of Origin (DCO)

This GitHub Action provides an automated check for ensuring developers have a "signed-off" commit when contributing to a given GitHub repository. 

Starter Kit:
- [GitHub App](https://github.com/apps/dco) to install onto your GitHub repo

To leverage this template, make sure to do the following:
1. Talk with your team about leveraging this GitHub action, and seek wide agreement before you adopt
2. Log into GitHub.com
3. Click the above GitHub App starter kit link
4. Click "Install" in the top-right hand corner of the page
5. Follow the prompts to select the organizations and repositories you'd like to install this app
6. Verify the installation by navigating to your given repository's "Settings" page, and confirming the app appears in the "Integrations -> Applications" left-hand menu

### Git Hooks

#### git-secrets

This tool helps prevent unauthorized sensitive secrets and credentials from being committed to a Git repository. It scans commits and looks for regular patterns of credential information, and through the mechanism of a client-side [Git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks), it alerts the developer to any unintended commits. Further, it also supports the ability to scan a repository's history of commits for any unauthorized commit activity. It is by default optimized for scanning for Amazon Web Services (AWS) credentials, but can be customized to look for custom credential string patterns.

**Starter Kit:**
- [Git Hook](https://github.com/awslabs/git-secrets) to install locally on your machine

To leverage this template, make sure to do the following:
1. Navigate to the [git-secrets installation section](https://github.com/awslabs/git-secrets#id6), and follow the instructions per your platform
2. Run `git secrets --install` within your chosen repository
   1. You should received a confirmation such as the below:
   ```
    ✓ Installed commit-msg hook to .git/hooks/commit-msg
    ✓ Installed pre-commit hook to .git/hooks/pre-commit
    ✓ Installed prepare-commit-msg hook to .git/hooks/prepare-commit-msg
   ```
3. Register a [secrets/credentials provider](https://github.com/awslabs/git-secrets#id20) that helps the tool find specific types of credential patterns, e.g. AWS via `git secrets --register-aws` 
4. Automation should be set up to scan for new commits, but it's a good idea to scan the history of commits starting out: `git secrets --scan-history`
   1. If you receive no output, that means the tool found now problematic commits.

