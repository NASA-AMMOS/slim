# Python Starter Kit

<pre align="center">A deployment-ready Python 3 application template for quick, standards-based project setup.</pre>

## Introduction

**Background**: The Python Starter Kit serves as a comprehensive template for Python 3 applications to streamline development processes. It exemplifies an integrated approach to build, release and publish using GitHub's CI/CD automation. By leveraging modern Python tooling, the kit simplifies the process of compiling, tagging, releasing and publishing to the Python Package Index (PyPi). It adheres to PEP 517/518 standards with TOML-based configurations to ensure a modern, declarative programming approach.

**Use Cases**:
- Streamlining Python project setup and configuration.
- Facilitating the build and release process of Python packages to PyPi.
- Update build and release tooling to modern standards using PEP [517](https://peps.python.org/pep-0517/)/[518](https://peps.python.org/pep-0518/) compliant tooling with declarative [TOML-based](https://toml.io/en/) configurations in a `pyproject.toml` file.

---

## Prerequisites

* GitHub account with repository creation rights.
* Familiarity with Python, Docker and GitHub Actions.
* Access to PyPi for package publishing.

---

## Quick Start

**[SLIM Starterkit Python](https://github.com/NASA-AMMOS/slim-starterkit-python)**

Click the link above to access the starter kit and begin setting up your project using Python best practices. Select GitHub's "Use this template" feature to leverage the template repository. 

---

## Step-by-Step Guide

1. **Team Consensus**: Discuss and agree on continuous integration best practices with your development team. Establish a workflow for building, publishing and releasing software.

2. **Create a Repository**:
   - Use our [repository template](https://github.com/NASA-AMMOS/slim-starterkit-python/generate) for a quick start.
   - Alternatively, [clone and manually edit our starter kit](https://github.com/NASA-AMMOS/slim-starterkit-python).

3. **Setup Account Credentials**:
   - Register to create accounts on [Test PyPi](https://test.pypi.org/account/register/) and [PyPi](https://pypi.org/account/register/). You'll use one account for testing and one for deployments of your artifact.
   - [Generate API tokens](https://pypi.org/help/#apitoken) on PyPI for your accounts. Name your tokens `PYPI_API_TOKEN` and copy their value for the next step below.
   - Configure these tokens in your repository's [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets?tool=webui#creating-encrypted-secrets-for-a-repository).

4. **Choose a Unique Python 3 Module Name**: Ensure it's distinct from [existing PyPi modules](https://pypi.org/search/?q=).

5. **Move Code into Place**:
   - Rename `slim_sample_project` to your module name.
   - For existing projects, integrate your Python 3 code into the new project structure underneath the module-name directory.
   > **Shortcut**  
   Lines requiring code updates are commented with the keyword `MODIFY`.  
   > Documentation requiring updates are marked with the keyword `INSERT`.

6. **Apply Project Settings**:
   - Update `pyproject.toml` to update build system dependencies
      - [Edit the `write_to` variable](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/pyproject.toml#L12) to point to the directory containing your Python 3 code.
   - Update `setup.cfg` to specify build system configurations
      - [Edit the metadata keywords](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/setup.cfg#L4) to set appropriate [keyword values](https://setuptools.pypa.io/en/latest/references/keywords.html) to apply to your project.
         1. Set `name` to match your unique module name. 
         2. Modify `console_scripts` to point at your entry-point:
            1. If your [module launches from a command-line](https://setuptools.pypa.io/en/latest/userguide/entry_point.html#entry-points), define an executable inside your module: `executable-name = my_package.module:function`.
            2. Set the value as empty if there is no entry-point.
         3. Update URLs for your project.
            1. Replace `NASA-AMMOS/slim-starterkit-python` with the **project/repo_name** for your cloned project (or refactoring on an existing repo).
         4. Update `author`, `author_email`, `description` and `keywords` to reflect your project details

7. **Build Locally**: The application will build, install and deploy from a local command line when all configurations are properly set.
   - [Install local tooling and requirements](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#required-local-tooling)
   - [Clean and build](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#local-build-testing) and clean again after module builds successfully
> **Information**  
  To validate deployment, we publish the module to the Test PyPi sandbox _by default_. To publish on the official PyPi, a _minor configuration change is required_. __All previous steps must be complete and the application must build successfully.__

8. **Build on GitHub**:
A release kicks off a build and release process in GitHub Actions. 
   - Test publication on Test PyPi
      1. Update the [version number in the `version.py` file](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/version.py).
      2. [Kick off a build by releasing your product using the same version.](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#automated-build-kickoff)
      3. When the product builds successfully, proceed to the next section, **Release to PyPi**. _Otherwise, revisit earlier steps and check for errors or other invalid settings._
   - Release to PyPi (simple configuration changes point at the release server)
      1. Update `PYPI_API_TOKEN` to point at PyPi in [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets?tool=webui#creating-encrypted-secrets-for-a-repository) in your newly created repository 
         1. In the repository, select the `Settings` tab and navigate to `Security`: `Secrets and variables` **-->** `Actions`. 
         2. Recalling the PyPi token previously saved in **Setup Account Credentials** (step 3 above): Edit the `PYPI_API_TOKEN` in `Repository secrets` to the saved PyPi token value for PyPi. (In other words, replace the test token with the regular, non-test PyPi token.)
      2. Change the `python-publish.yml` configuration to remove Test PyPi coordinates
         1. Remove '`--repository testpypi`' from the one-line publish command to read: `twine upload --verbose dist/*.whl dist/*.zip` 
      3. Update the [version number in the `version.py` file](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/slim_sample_project/version.py).
      4. [Kick off a build by tagging and releasing your product using the same version number.](https://github.com/NASA-AMMOS/slim-starterkit-python/tree/main#automated-build-kickoff)

---

## Additional Files
This starter kit produces several deliverables deployed for distribution:
* **GitHub**
  * [Release report with automatic changelog summaries based on commit history.](https://github.com/NASA-AMMOS/slim-starterkit-python/releases/latest)
  * [Tagged build versions corresponding to release versions.](https://github.com/NASA-AMMOS/slim-starterkit-python/tags)
  * Source distribution:
    * [Tarball](https://github.com/NASA-AMMOS/slim-starterkit-python/tags/)
    * [ZIP](https://github.com/NASA-AMMOS/slim-starterkit-python/tags/)
* **PyPi**
  * [Fully documented site with project links](https://test.pypi.org/project/slim-sample-project/) 
  * Completely built Python 3 distributions:
    * [Compressed ZIP source code with release hashes](https://test.pypi.org/project/slim-sample-project/#files)
    * [Python wheel](https://test.pypi.org/project/slim-sample-project/#files)

---

## Frequently Asked Questions (FAQ)

- Q: What tooling is necessary to use the starter kit?
- A: [Python 3 version 3.9 or greater](https://www.python.org/downloads/) must be installed with a working [package manager (`pip`)](https://pip.pypa.io/en/stable/installation/). As well, you'll need the latest versions of `pip`, `build`, `setuptools`, `twine` and `wheel`.
  ```
  python3 --version  # must report Python >3.9.x
  pip3 install --upgrade pip
  pip3 install --upgrade build setuptools setuptools_scm twine wheel
  ```

- Q: How do I choose a unique module name for PyPi?
- A: Research existing modules on PyPi and select a name that is not already in use. Consider using a creative and/or descriptive name relevant to your project.

---

## Credits 

**Authorship**:
- [John Engelke](https://github.com/jpl-jengelke)

**Acknowledgements**:
* Inspiration and practices from modern Python tooling and GitHub CI/CD workflows.

---

## Feedback and Contributions

We welcome feedback and contributions to improve this guide. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
