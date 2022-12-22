# Starter Kits

This page contains starter kit information, which represent templates, code and configuration to help 
you get started quickly with continuous integration best practices described in this overall guide. 
Please see categories and links below for details. 

## [Python] Build, Release and Publish Automation
**Technologies:** Build automation using [GitHub](https://github.com/), [Docker](https://www.docker.com/), [GitHub Actions](https://github.com/features/actions) and [PyPi](https://pypi.org/) for a [Python](https://www.python.org/) application. 

This section describes a sample Python application that demonstrates publishing on release in a GitHub repository. It uses GitHub Actions to automatically kick off a build process that prepares release tooling, verifies code compiles, customizes compiled binaries and publishes compiled packages to the Python Package Index (PyPI) for public distribution. The process is configurable to execute against any Docker container or Python base-language release version.  

Although this example focuses on a Python-based project, it employs a generic [architectural paradigm](https://nasa-ammos.github.io/slim/continuous-integration/reference-architectures/) that translates to builds in other languages. 

### Modern build tooling
This example implements modern [Python Enhancement Proposals (PEP)](https://peps.python.org/pep-0001/#what-is-a-pep) for build standards that specify [declarative](https://en.wikipedia.org/wiki/Declarative_programming) instructions. Python build standards rapidly evolved over the past several years to simplify and decouple release strategies from code. This resulted in a system that supports tiered installations for both build and application dependencies. [PEP-517](https://peps.python.org/pep-0517/) and [PEP-518](https://peps.python.org/pep-0518/) describe a strategy of configurations with build-system agnostic command tooling (Python's `build` module) utilizing one or more TOML-based files starting with `pyproject.toml` in the project root. 

**Prerequisites:** To leverage this starter kit, the following products should be installed, tested and accessible locally: (Note that installation will benefit greatly from testing and customization on local workstations.)
* Administrative access to a **GitHub** repository that is the build source.
* **Python** and modules **setuptools**, **wheel** and **twine** installed locally to test build cycles.
* **Docker Desktop** to test container executions
* Access to the **[Python Package Index (PyPi)](https://pypi.org/)** and its development analog **[Test PyPi](https://test.pypi.org/)** to validate deployments.

The example presented here provides an implementation guide to set up a fully-functional application repository that automates a build, release and publish strategy. A sample repository structure with required code and tooling is available at [`slim-ci-starterkit-python`](https://github.com/NASA-AMMOS/slim-ci-starterkit-python). 

The configured example produces the following concrete results: 
* Two artifacts -- Python wheel and ZIP source distribution.
* Tagged build versions that correspond with release versions.
* Automatic changelog summaries based on commit history published on release.

### Requirements
CI creates an ecosystem between products such that systems in build, release and publishing 
phases handoff processing between steps. This implementation is predicated on the following 
configurations:
1. Setup an account on PyPi and a companion account on PyPi Test to host the release. 
   1. 

#### Base configs and alternatives




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

