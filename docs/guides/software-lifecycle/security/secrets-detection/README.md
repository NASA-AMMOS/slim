# Detecting Secrets with detect-secrets

<pre align="center">Best practice approach to identify and prevent leaking of sensitive information in your codebase.</pre>

## Introduction

**Background**: In the age of open source collaboration and rapid software deployment, sensitive information like API keys, passwords, or tokens may inadvertently be committed into repositories. Such slip-ups can pose significant security risks. We champion the use of [detect-secrets](https://github.com/Yelp/detect-secrets) to mitigate these risks. It stands out due to its extensible Python plugin system, enabling tailored detection suited to diverse types of secrets. Designed with efficiency in mind, it's primed for use in continuous integration pipelines, ensuring a swift scan of current project states without delving into the entire git history. Its unique "baseline file" approach, leveraging `.secrets.baseline`, streamlines the management of legitimate secrets and reduces false positives. This guarantees a seamless integration process even in established projects.

**Use Cases**:
- Scanning local client repositories for exposed sensitive information _before_ making them public.
- Preventing secrets from being committed to a local repository using pre-commit hooks.
- Implementing a safety net in continuous integration (CI) pipelines using GitHub Actions to catch inadvertent secret commits.
- Streamlining the management of known secrets and false positives during codebase audits.

---

## Prerequisites
To get the most out of `detect-secrets`, you'll need:

* Familiarity with Python for potential custom plugin development.
* Access rights to the repository to set up scanning mechanisms.
* An understanding of your project's dependencies and structure to tailor the scanning appropriately.

---



## Quick Start

1. Install slim-detect-secrets: `pip install git+https://github.com/NASA-AMMOS/slim-detect-secrets.git@exp`.
2. Execute a baseline scan: `detect-secrets scan ./ --all-files --disable-plugin AbsolutePathDetectorExperimental --exclude-files '.secrets.*' --exclude-files '.git*' > .secrets.baseline`.
3. Review the `.secrets.baseline` file for any detected secrets.


---

## Step-by-Step Guide

There are three recommended layers of protection we suggest you enable to ensure maximum security. Please see the below sections for details. 

### Table of Contents
1. [Layer 1: Full Scan and Audit (Client-side)](#layer-1-full-scan-and-audit-client-side)
2. [Layer 2: Git Commit Scan (Client-side)](#layer-2-git-commit-scan-client-side)
3. [Layer 3: Server-side Push to GitHub.com](#layer-3-server-side-push-to-githubcom)

### Full Scan and Audit (Client-side)
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
     detect-secrets scan ./ --all-files --disable-plugin AbsolutePathDetectorExperimental --exclude-files '.secrets.*' --exclude-files '.git*' > .secrets.baseline
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

> **Note**: If you've marked any secrets as true positives, make sure to remove all references to these secrets and rerun a full scan.

### Layer 2: Git Commit Scan (Client-side)
This layer is a pre-commit hook in the local environment that scans changes when a developer tries to commit. If new secrets are detected, the commit is blocked.

#### Steps
1. **Installation**
   - Install [pre-commit](https://pre-commit.com/#install).
     ```bash
     pip install pre-commit
     ```

2. **Configuration**
   - Create a `.pre-commit-config.yaml` configuration file.
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
                - '.git*'
                - '--exclude-files'
                - '.secrets.*' 
     ```

3. **Hook Installation**
   - Install the pre-commit hook.
     ```bash
     pre-commit install
     ```

4. **Committing Changes**
   - Commit changes. If new secrets are detected, the commit will be blocked.

> **Note**: The pre-commit hook does not automatically update the `.secrets.baseline` file. Update it by re-running the scan command.

### Layer 3: Server-side Push to GitHub.com
This layer scans server-side pre-commits using [GitHub Action](https://github.com/features/actions). The scan is triggered during a push or pull request. Any detected new secrets are reported, and a status check on GitHub prevents merges or pushes to protected branches.

#### Steps
1. **Workflow Creation**
   - Create a `detect-secrets.yaml` workflow file in the `.github/workflows` directory.
     ```yaml
      name: Secret Detection Workflow
      on:
        push:
          branches:
            - main
        pull_request:
          branches:
            - main

      jobs:
        secret-detection:
          runs-on: ubuntu-latest
          steps:
            - name: Checkout code
              uses: actions/checkout@v2

            - name: Install necessary packages
              run: |
                # This is the experimental version of slim-detect-secrets.
                # It will be updated to the official Yelp/detect-secrets version once the customized plugins are merged.
                # For more information about slim/detect-secrets, check the following:
                # 1. https://github.com/NASA-AMMOS/slim-detect-secrets/tree/exp
                # 2. https://github.com/NASA-AMMOS/slim/blob/d20ee6134a0dc0e0dab11d2d2570e358ef7e4550/continuous-testing/starter-kits/README.md#detect-secrets
                pip install git+https://github.com/NASA-AMMOS/slim-detect-secrets.git@exp
                # This library is used for JSON operations.
                pip install jq
                
            - name: Create an initial .secrets.baseline if .secrets.baseline does not exist
              run: |
                if [ ! -f .secrets.baseline ]; then
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

            - name: Scan repository for secrets
              run: |
                echo "✅ Scanning repository for new secrets"
                
                # backup the list of known secrets
                cp .secrets.baseline .secrets.new
                echo "✅ Created backup of known secrets"

                # find the secrets in the repository
                detect-secrets scan --disable-plugin AbsolutePathDetectorExperimental --baseline .secrets.new --exclude-files '.secrets.*' --exclude-files '.git*'
                echo "✅ Scanned repository for secrets"
                    
                # if there is any difference between the known and newly detected secrets, break the build
                # Function to compare secrets without listing them
                compare_secrets() { diff <(jq -r '.results | keys[] as $key | "\($key),\(.[$key] | .[] | .hashed_secret)"' "$1" | sort) <(jq -r '.results | keys[] as $key | "\($key),\(.[$key] | .[] | .hashed_secret)"' "$2" | sort) >/dev/null; }
                echo "✅ Run comparison against baseline secrets file"
              
                # Check if there's any difference between the known and newly detected secrets
                if ! compare_secrets .secrets.baseline .secrets.new; then
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
                  echo "✅ No new secrets detected"
                fi
     ```

2. **Workflow Explanation**
   - The GitHub Action checks out code, installs necessary packages, checks for a baseline file, and scans the repository for secrets. If new secrets are detected, the build fails and provides guidance.

After setting this up, GitHub will run the workflow during pushes or pull requests.

> **Note**: If any new secrets are detected, the status check will fail.

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
   
- Q: **Does detect-secrets scan the entire git history?**
  
  A: No, it's designed to scan the current state of a project for efficiency.

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

---

## Feedback and Contributions

We value your feedback and contributions. Enhance and expand this guide by referring to our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
