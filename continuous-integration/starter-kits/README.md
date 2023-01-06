# Starter Kits

This page contains starter kit information, which represent templates, code and configuration to help you get started quickly with continuous integration (CI) best practices described in this overall guide. Please see categories and links below for details. 

## Build, Release and Publish Automation
This section contains links to sample actions, templates and configurations that demonstrate [CI systems](../reference-architectures/) in practice on various platforms using different development languages.

### Python Starter Kit
A complete, deployment-ready Python 3 application that's bundled into a reusable template repository for quick implementation.

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
> **Requirement**  
  Admin rights are necessary to set up `GitHub Secrets`.
3. Setup account credentials:
   1. [PyPi](https://pypi.org/account/register/) and [Test PyPi](https://test.pypi.org/account/register/)
      1. Navigate to `Account Settings` **->** `API tokens` and press the button `Add API Token`. Name your token `PYPI_API_TOKEN`, generate it and copy the value to use later for `GitHub Secrets`.
      2. Repeat this for both a [PyPi token](https://pypi.org/manage/account/token/) and [Test PyPi token](https://test.pypi.org/manage/account/token/). Remember to separately note both tokens for later use.
   2. [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets?tool=webui#creating-encrypted-secrets-for-a-repository)
      1. Select the `Settings` tab and navigate to `Secrets` **-->** `Actions` and press the button `New repository Secret`.
      2. Name your secret `PYPI_API_TOKEN` and paste the value from `Test PyPi`. (This step will be repeated later with the `PyPi` value after testing.)
> **Shortcut**  
  Already skilled with Python [Setuptools](https://setuptools.pypa.io/en/latest/userguide/index.html) build system? You may selectively apply files from the starter kit to your own project using details below. 
4. Choose a [unique name for your Python 3 module](https://peps.python.org/pep-0008/#package-and-module-names). The name shouldn't duplicate any of the [currently published modules in PyPi](https://pypi.org/search/?q=).
5. Move code into place
   1. **New project?** Rename the existing `slim_sample_project` directory to your unique module name. [Rename `hello_world.py`](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/hello_world.py) to reflect your application and start developing.
      1. Don't remove versioning system files ([`version.py`](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/version.py) and [`version_tooling.py`](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/version_tooling.py)) that support build tooling. 
      2. You'll have to [keep the local module import of `version_tooling`](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/hello_world.py#L6) to take advantage of build version automation.
      3. Consider [organizing code into smaller, encapsulated component files](https://martinfowler.com/bliki/SoftwareComponent.html) that may be imported from the `api` directory.
   2. **Existing code?** Move the directory containing your Python 3 code into the new project and rename it to match your unique module name. 
      1. Copy versioning system files ([`version.py`](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/version.py) and [`version_tooling.py`](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/version_tooling.py)) from the `slim_sample_project` that support build tooling.
      2. Add the [local module import of `version_tooling`](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/hello_world.py#L6) to your Python 3 [top-level file](https://docs.python.org/3/library/__main__.html#what-is-the-top-level-code-environment) or [entry-point script](https://setuptools.pypa.io/en/latest/userguide/entry_point.html#console-scripts).
> **Shortcut**  
  Lines requiring code updates are commented with the keyword `MODIFY`.  
> Documentation requiring updates are marked with the keyword `INSERT`.
6. Apply project settings and customizations
   1. Update `pyproject.toml` to update build system dependencies
      1. [Edit the `write_to` variable](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/pyproject.toml#L12) to point to the directory containing your Python 3 code.
   2. Update `setup.cfg` to specify build system configurations
      1. [Edit the metadata keywords](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/setup.cfg#L4) to set appropriate [keyword values](https://setuptools.pypa.io/en/latest/references/keywords.html) to apply to your project.
         1. Set `name` to match your unique module name. 
         2. Modify `console_scripts` to point at your entry-point:
            1. If your [module launches from a command-line](https://setuptools.pypa.io/en/latest/userguide/entry_point.html#entry-points), define an executable inside your module: `executable-name = my_package.module:function`.
            2. Set the value as empty if there is no entry-point.
         3. Update URLs for your project.
            1. Replace `NASA-AMMOS/slim-starterkit-python` with the **project/repo_name** for your cloned project.
         4. Update `author`, `author_email`, `description` and `keywords` to reflect your project details
   3. Update documentation to reflect your new project  
Instructions on what to update are included in documentation files.
      1. Update `CODE_OF_CONDUCT.md` by replacing the `INSERT` block with your contact method.
      2. Update `CONTRIBUTING.md` as possible by replacing the `INSERT` blocks with specific details about your project, including links to issue tracking, pull requests and any discussion forums. 
      3. Update `README.md` as possible with setup instructions, a runtime guide, repository data, FAQ links, module naming detail and any additional specific details about your project.
7. Build locally to test the configuration  
The application will build, install and deploy from a local command line when all configurations are properly set.
   1. [Install local tooling and requirements](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#required-local-tooling)
   2. [Clean and build](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#local-build-testing)
   3. Clean again when build completes successfully
> **Information**  
  To validate the module, we first test a release on the Test PyPi sandbox to ensure it builds and releases properly. The project publishes to Test PyPi _by default_ and a _minor configuration change is required_ to release at the official PyPi.
8. Test on GitHub
   1. Test PyPi
   2. Enable for PyPi

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

Starter Kit:
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

