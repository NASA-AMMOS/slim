# Secrets Detection

<pre align="center">Guide to identify and automatically prevent leaking of sensitive information into your codebase.</pre>

## Introduction

**Background**: Sensitive information like API keys, passwords or tokens may be inadvertently committed to your repository. Such slip-ups can pose significant security risks. We recommend not only recurring scans for sensitive information, but proactively preventing sensitive information from getting infused. To support these goals, we recommend a tool called [detect-secrets](https://github.com/Yelp/detect-secrets) that mitigates these risks. It scans for common sensitive information categories like passwords and other high-entropy values that contain sensitive data. It also provides a plugin system to support additional customization. It's fast for use in continuous integration pipelines and quickly executes on local-developer machines. It uses a "baseline file" approach, leveraging `.secrets.baseline`, that streamlines management of legitimate secrets and reduces false positives. This helps both new and established projects detect and prevent secrets from entering the code base.

**Use Cases**:
- Finding and preventing commits of sensitive information such as:
  - Username / passwords
  - High entropy strings
  - IP addresses
  - E-mail addresses
  - AWS sensitive information
- Scanning local client repositories for exposed sensitive information _before_ making them public.
- Preventing secrets from being committed to a local repository using pre-commit hooks.
- Implementing a safety net in continuous integration (CI) pipelines using GitHub Actions to catch inadvertent secret commits.
- Streamlining the management of known secrets and false positives during codebase audits.

---

## Prerequisites
To get the most out of `detect-secrets`, you'll need:

* Python 3 with the `pip` tool installed.
* (Optional) Familiarity with Python for potential custom plugin development.
* (Optional) A GitHub repository supporting GitHub Actions.

---

## Quick Start

1. Install slim-detect-secrets:
  
  > ℹ️ **Note:** the SLIM project has customized the Detect Secrets tool to identify additional sensitive keywords such as IP addresses, file paths, and AWS information. These additions are currently [under review](https://github.com/Yelp/detect-secrets/pulls/perryzjc) by the detect-secrets team for merge into the tool's `main` codebase. Until then we recommend using our SLIM fork as described below. 
   
   ```bash
   pip install git+https://github.com/NASA-AMMOS/slim-detect-secrets.git@exp
   ```
   
2. Execute a baseline scan:

   ```bash
   detect-secrets scan --all-files --disable-plugin AbsolutePathDetectorExperimental --exclude-files '\.secrets.*' --exclude-files '\.git*' > .secrets.baseline
   ```

3. Review the `.secrets.baseline` file for any detected secrets via an audit:

   ```bash
   detect-secrets audit .secrets.baseline
   ```

Additional steps like whitelisting accepted values and false positives, establishing pre-commit hooks and/or enabling further automation are covered in detail below.

---

## Step-by-Step Guide

There are three recommended layers of protection we suggest you enable to ensure comprehensive security. Please see below sections for further details. 

### Table of Contents
- [Secrets Detection](#secrets-detection)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Step-by-Step Guide](#step-by-step-guide)
    - [Table of Contents](#table-of-contents)
    - [Layer 1: Full Scan and Audit (Client-side)](#layer-1-full-scan-and-audit-client-side)
      - [Steps](#steps)
    - [Layer 2: Git Commit Scan (Client-side)](#layer-2-git-commit-scan-client-side)
      - [Steps](#steps-1)
    - [Layer 3: Server-side Push to GitHub.com](#layer-3-server-side-push-to-githubcom)
      - [Steps](#steps-2)
    - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
  - [Credits](#credits)
  - [Feedback and Contributions](#feedback-and-contributions)

### Layer 1: Full Scan and Audit (Client-side)
This layer directly scans the developer's local environment using the `detect-secrets` tool. After scanning, a baseline file containing detected secrets is generated. Developers can audit this file for detailed information on detected secrets.

#### Steps
1. **Installation**
   - Install the experimental version of [slim-detect-secrets](https://github.com/NASA-AMMOS/slim-detect-secrets/tree/exp).
     ```bash
     pip install git+https://github.com/NASA-AMMOS/slim-detect-secrets.git@exp
     ```

2. **Scanning**
   - Scan all local files from the current directory and output results to a baseline file.
     ```bash
     detect-secrets scan --all-files --disable-plugin AbsolutePathDetectorExperimental --exclude-files '\.secrets.*' --exclude-files '\.git*' > .secrets.baseline
     ```

3. **Checking Results**
   - View the results in the baseline file.
     ```bash
     cat .secrets.baseline
     ```

4. **Analysis**
   - Analyze results using the `audit` tool.
     ```bash
     detect-secrets audit .secrets.baseline
     ```

[View more on Auditing Secrets in Baseline](https://github.com/Yelp/detect-secrets#auditing-secrets-in-baseline)

> ℹ️ **Note**: If you've marked any secrets as true positives, make sure to remove all references to these secrets and rerun a full scan.

### Layer 2: Git Commit Scan (Client-side)
This layer represents a prevention mechanism in the local developer environment that scans changes when a developer tries to commit and if new secrets are detected, the commit is blocked.

To support this strategy, we recommend the installation of another third party tool called [pre-commit](https://pre-commit.com/#install), which is integral in allowing specialized plugins to run during the local developer's commit phase of using Git. It allows detect-secrets to prevent commits that are flagged with sensitive information.

#### Steps
1. **Installation**

   - Install [pre-commit](https://pre-commit.com/#install).
  
     ```bash
     pip install pre-commit
     ```

2. **Configuration**
   - Create a `.pre-commit-config.yaml` configuration file with the below contents.
  
    ```yaml
      repos:
        - repo: https://github.com/NASA-AMMOS/slim-detect-secrets
          # using commit id for now, will change to tag when official version is released
          rev: 91e097ad4559ae6ab785c883dc5ed989202c7fbe
          hooks:
            - id: detect-secrets
              args:
                - '--baseline'
                - '.secrets.baseline'
                - '--exclude-files'
                - '\.git*'
                - '--exclude-files'
                - '\.secrets.*' 
     ```

3. **Hook Installation**
   - Install the pre-commit hook into your local environment, ensuring the hook gets invoked during local git commits.
  
     ```bash
     pre-commit install
     ```

4. **Committing Changes**
   - Commit changes. If new secrets are detected, the commit will be blocked.

>   ℹ️ **Note**: The pre-commit hook does not automatically update the `.secrets.baseline` file. Update it by re-running the scan command.

### Layer 3: Server-side Push to GitHub.com

This strategy provides a final layer of protection by scanning server-side commits for sensitive information during pull request creation. It leverages the [pre-commit](https://pre-commit.com/#install) tool and [GitHub Action](https://github.com/features/actions). The scan is triggered during a push or pull request and any detected new secrets are reported while blocking merges or pushes to protected branches.

#### Steps
1. **Workflow Creation**
   - The first step is to create a `detect-secrets.yaml` workflow file in the `.github/workflows` directory to define the GitHub action. Copy and paste the below while ensuring the correct branch of your codebase is referenced. For example (from the [Slim Python Starter Kit](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/.github/workflows/secrets-detection.yml)):
  
```yaml
name: "Secret Detection"
on:
  push:
    branches: [main, develop]
  pull_request:
    # The branches below must be a subset of the branches above
    branches: [develop]

jobs:
  secret-detection:
    name: Secret-Detection
    runs-on: ubuntu-latest
    permissions:
      actions: write
      contents: read
      security-events: write
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: Upgrade tooling
      run: |
        python3 -m pip install --upgrade pip
        pip install --upgrade git+https://github.com/NASA-AMMOS/slim-detect-secrets.git@exp
        pip install --upgrade jq
    - name: Create baseline config
      run: |
        if [ ! -f .secrets.baseline ] ; 
        then
            # This generated baseline file will only be temporarily available on the GitHub side and will not appear in the user's local files.
            # Scanning an empty folder to generate an initial .secrets.baseline without secrets in the results.
            echo "⚠️ No existing .secrets.baseline file detected. Creating a new blank baseline file."
            mkdir empty-dir
            detect-secrets scan empty-dir > .secrets.baseline
            echo "✅ Blank .secrets.baseline file created successfully."
            rm -r empty-dir
        else
            echo "✅ Existing .secrets.baseline file detected. No new baseline file will be created."
        fi
    - name: Scan
      run: |
        # scripts scan repository for new secrets
        # backup list of known secrets
        cp -pr .secrets.baseline .secrets.new
        # find secrets in the repository
        detect-secrets scan --disable-plugin AbsolutePathDetectorExperimental --baseline .secrets.new \
            --exclude-files '\.secrets..*' \
            --exclude-files '\.git.*' \
            --exclude-files '\.mypy_cache' \
            --exclude-files '\.pytest_cache' \
            --exclude-files '\.tox' \
            --exclude-files '\.venv' \
            --exclude-files 'venv' \
            --exclude-files 'dist' \
            --exclude-files 'build' \
            --exclude-files '.*\.egg-info'
        # break build when new secrets discovered
        # function compares baseline/new secrets w/o listing results -- success(0) when new secret found
        compare_secrets() { diff <(jq -r '.results | keys[] as $key | "\($key),\(.[$key] | .[] | .hashed_secret)"' "${1}" | sort) <(jq -r '.results | keys[] as $key | "\($key),\(.[$key] | .[] | .hashed_secret)"' "${2}" | sort) | grep -q '>' ; }
        # test baseline versus new secret files
        if compare_secrets .secrets.baseline .secrets.new; 
        then
            echo "⚠️ Attention Required! ⚠️" >&2
            echo "New secrets have been detected in your recent commit. Due to security concerns, we cannot display detailed information here and we cannot proceed until this issue is resolved." >&2
            echo "" >&2
            echo "Please follow the steps below on your local machine to reveal and handle the secrets:" >&2
            echo "" >&2
            echo "1️⃣ Run the 'detect-secrets' tool on your local machine. This tool will identify and clean up the secrets. You can find detailed instructions at this link: https://nasa-ammos.github.io/slim/continuous-testing/starter-kits/#detect-secrets" >&2
            echo "" >&2
            echo "2️⃣ After cleaning up the secrets, commit your changes and re-push your update to the repository." >&2
            echo "" >&2
            echo "Your efforts to maintain the security of our codebase are greatly appreciated!" >&2
            exit 1
        else
            echo "🟢 Secrets tests PASSED! 🟢" >&1
            echo "No new secrets were detected in comparison to any baseline configurations."  >&1
            exit 0
        fi 
```
     > ℹ️  Explanation: The GitHub Action checks out code, installs necessary packages, checks for a baseline file, and scans the repository for secrets. If new secrets are detected, the build fails and provides guidance.

After setting this up, GitHub will run the workflow during pushes or pull requests. If any new secrets are detected, the status check will fail and the user will be notified in the pull request.

> ⚠️ Warning: The check ensures specific lines of code that may contain sensitive information are not disclosed publicly. In GitHub Action logs only a yes/no indication of sensitive information appears. However, the surface area exists for potential attackers to readily identify sensitive information. Monitor your pull requests actively to respond and always ensure your team actively uses [Layer 1](#layer-1-full-scan-and-audit-client-side) and [Layer 2](#layer-2-git-commit-scan-client-side) to mitigate issues in the first place.  

---

### Frequently Asked Questions (FAQ)

- Q: **If secrets are detected in my code, what should I do?**

  A: Follow these steps:
  
    - _Identify and Confirm:_ Review the identified secrets in the `.secrets.baseline` or any other report generated. Ensure that they are indeed secrets and not false positives.
    - _Removal:_ Remove or replace all references to the detected secrets from your codebase. Ensure that no trace of the secret remains in the code, comments, or commit history. If you want to ignore the secret as a false positive during a pre-commit scan, you can follow directions [here](https://github.com/Yelp/detect-secrets#inline-allowlisting-1). 
    - _Rotation:_ If the detected secret was an API key, password, or any other form of authentication, consider it compromised. Rotate the secret immediately, i.e., generate a new secret/key and update it wherever required.
    - _Rerun Scans:_ After you've made the necessary changes, run the `detect-secrets` tool again to ensure no secrets remain.
    - _Commit Safely:_ When you're sure all secrets have been removed, you can safely commit your changes. Remember, the Git commit scan (Layer 2) and the server-side push scan (Layer 3) will provide additional layers of checks.
    - _Educate and Prevent:_ To avoid such instances in the future, educate your team on the importance of not committing secrets and the potential risks associated with it. Consider adopting practices or tools that prevent the accidental inclusion of secrets in your codebase.
   
- Q: **Does detect-secrets scan the entire Git history?**
  
  A: No, it's designed to scan the current state of a project for efficiency.

- Q: **How are commits containing secrets removed permanently from Git history?**

  A: The process of scrubbing errant commits and their content involves a destructive rewrite of repository commit history. Backups are essential and changes must be handled with precision and caution. One solution is to start a new repository from scratch with only the latest cleaned code, thereby negating the need to change existing repository content. Solutions involving more entropy include Git filter commands or well-known cleaning applications, such as [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/). Because of the risks involved in mutating repository history and content, such changes _always_ must be handled with backups, expertise and extreme care.

- Q: **Where can I find more configurations and options for detect-secrets?**
  
  A: Refer to the official documentation for [detect-secrets](https://github.com/Yelp/detect-secrets) and [pre-commit](https://pre-commit.com/).


---

## Credits 

**Authorship**:
- Jingchao Zhong [@perryzjc](https://github.com/perryzjc)
- Rishi Verma [@riverma](https://github.com/riverma)
- John Engelke [@jpl-jengelke](http://github.com/jpl-jengelke)

**Acknowledgements**:
- [Yelp's detect-secrets maintainers](https://github.com/Yelp/detect-secrets)
- [@nutjob4life](https://github.com/nutjob4life) for detect-secrets usage tips

---

## Feedback and Contributions

We value your feedback and contributions. Enhance and expand this guide by referring to our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
