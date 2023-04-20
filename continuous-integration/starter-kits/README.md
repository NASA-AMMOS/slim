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
- [SLIM Starterkit Python](https://github.com/NASA-AMMOS/slim-starterkit-python)

To leverage this template, make sure to do the following:
1. Discuss with your development team continuous integration best practices and seek consensus on a workflow to build, publish and release software. 
2. Create a new repository by one of the following methods:
   1. [Creating a new repository using our repository template](https://github.com/NASA-AMMOS/slim-starterkit-python/generate) (GitHub only); or 
   2. [Cloning and manually editing our starter kit repository](https://github.com/NASA-AMMOS/slim-starterkit-python). 
> **Requirement**  
    • [Sandbox strategy](http://agiledata.org/essays/sandboxes.html): Two separate accounts must be created on **(1) Test PyPi** and **(2) PyPi**. We'll _name values identically_ and switch them later when everything works.  
    • Admin rights are necessary to set up `GitHub Secrets`.  
3. Setup account credentials:
   1. [Test PyPi](https://test.pypi.org/account/register/) website
      1. Navigate to `Account Settings` **->** `API tokens` and press the button `Add API Token`. Name your token `PYPI_API_TOKEN` and generate it.
      2. **Copy the value** and retain this [Test PyPi token](https://test.pypi.org/manage/account/token/) to use in `GitHub Secrets`.
   2. [PyPi](https://pypi.org/account/register/) website
      1. Navigate to `Account Settings` **->** `API tokens` and press the button `Add API Token`. Name your token `PYPI_API_TOKEN` and generate it.
      2. **Copy the value** and retain this [PyPi token](https://pypi.org/manage/account/token/) to use **later**.
   3. [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets?tool=webui#creating-encrypted-secrets-for-a-repository) (use the _Test PyPi token_ here initially) in your newly created repository
      1. In the repository, select the `Settings` tab and navigate to `Security`: `Secrets and variables` **-->** `Actions` and press the button `New repository secret`.
      2. Name your secret `PYPI_API_TOKEN` and paste the value from **Test PyPi**. (Later, this value will be replaced with the actual **PyPi** token to enable public release.)
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
   3. Update documentation to reflect details about your new project  
      1. Suggested updates for `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md` and `README.md` are marked by the keyword `INSERT` and explained in detail within markdown.
> **Alert**  
  Unique development configurations may adversely impact testing on local workstations. Testing should be conducted with a [supported python.org release](https://www.python.org/downloads/) or [virtual container as used on GitHub](https://hub.docker.com/_/python/) .
7. Build locally to test the configuration  
The application will build, install and deploy from a local command line when all configurations are properly set.
   1. [Install local tooling and requirements](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#required-local-tooling)
   2. [Clean and build](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#local-build-testing) and clean again after module builds successfully
> **Information**  
  To validate the module, we test on the Test PyPi sandbox _by default_. Then, to release on the official PyPi, a _minor configuration change is required_. __All previous steps must be complete.__
8. Build on GitHub  
A release kicks off a build and release process in GitHub Actions. 
   1. Test publication on Test PyPi
      1. Update the [version number in the `version.py` file](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/version.py).
      2. [Kick off a build by releasing your product using the same version.](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#automated-build-kickoff)
      3. When the product builds successfully, proceed to step **ii**. _Otherwise, revisit earlier steps and check for errors or other invalid settings._
   2. Release to PyPi (simple configuration changes point at the release server)
      1. Update `PYPI_API_TOKEN` to point at PyPi in [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets?tool=webui#creating-encrypted-secrets-for-a-repository) in your newly created repository 
         1. In the repository, select the `Settings` tab and navigate to `Security`: `Secrets and variables` **-->** `Actions`. 
         2. Recalling the PyPi token previously saved in step 3(ii): In `Repository secrets`, edit the `PYPI_API_TOKEN` and paste the saved PyPi token value to update it.
      2. Change the `python-publish.yml` configuration to remove Test PyPi coordinates
         1. Remove '`--repository testpypi`' from the one-line publish command to read: `twine upload --verbose dist/*.whl dist/*.zip` 
      3. Update the [version number in the `version.py` file](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/version.py).
      4. [Kick off a build by releasing your product using the same version.](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#automated-build-kickoff)

#### Deliverables
This starter kit produces several deliverables deployed for distribution:
* **GitHub**
  * [Release report with automatic changelog summaries based on commit history.](https://github.com/NASA-AMMOS/slim-starterkit-python/releases/latest)
  * [Tagged build versions corresponding to release versions.](https://github.com/NASA-AMMOS/slim-starterkit-python/tags)
  * Source distribution:
    * [Tarball](https://github.com/NASA-AMMOS/slim-starterkit-python/tags/)
    * [ZIP](https://github.com/NASA-AMMOS/slim-starterkit-python/tags/)
* **PyPi**
  * [Fully documented site with project links](https://test.pypi.org/project/slim-sample-project/) 
  * Source distribution (with release hashes):
    * [ZIP](https://test.pypi.org/project/slim-sample-project/#files)
  * Built Python 3 distribution:
    * [Python wheel](https://test.pypi.org/project/slim-sample-project/#files)


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

### Automated Checking for General Sensitive Information within Git
This tool help you get started with the detection of sensitive information across three layers of Git and GitHub repositories. This solution also provides customized plugins to support more types of secrets. Please see links below for details.

[Starter Kit](detect-secrets/README.md)
