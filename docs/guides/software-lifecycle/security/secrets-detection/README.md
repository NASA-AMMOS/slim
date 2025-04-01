import CodeBlock from '@theme/CodeBlock';
import PreCommitConfigSource from '!!raw-loader!/assets/software-lifecycle/security/secrets-detection/pre-commit-config.yml';
import GitHubActionWorkflow from '!!raw-loader!/assets/software-lifecycle/security/secrets-detection/detect-secrets.yaml';

# Secrets Detection

<pre align="center">Guide to identify and automatically prevent leaking of sensitive information into your codebase.</pre>

![secrets-screenshot-example](/img/secrets-screen.png)

*Example secrets scanning rendering*

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
   
   ```bash
   pip install git+https://github.com/Yelp/detect-secrets.git
   ```
   
2. Execute a baseline scan:

   ```bash
   detect-secrets scan --all-files --exclude-files '\.secrets.*' --exclude-files '\.git.*' > .secrets.baseline
   ```

3. Review the `.secrets.baseline` file for any detected secrets via an audit:

   ```bash
   detect-secrets audit .secrets.baseline
   ```

**⬇️ [Secrets detection .pre-commit-config.yml](pathname:///assets/software-lifecycle/security/secrets-detection/pre-commit-config.yml)**

Download the file above to access the pre-commit configuration file, which includes an a scan for sensitive information upon Git pushes. This file should be placed within your local Git repository after installing the pre-commit framework.


Additional steps like whitelisting accepted values and false positives, establishing pre-commit hooks and/or enabling further automation are covered in detail below.

---

## Step-by-Step Guide

There are three recommended layers of protection we suggest you enable to ensure comprehensive security. Please see below sections for further details. 

### Layer 1: Full Scan and Audit (Client-side)
This layer directly scans the developer's local environment using the `detect-secrets` tool. After scanning, a baseline file containing detected secrets is generated. Developers can audit this file for detailed information on detected secrets.

#### Steps
1. **Installation**
   - Install [detect-secrets](https://github.com/Yelp/detect-secrets).
     ```bash
     pip install git+https://github.com/Yelp/detect-secrets.git
     ```

2. **Scanning**
   - Scan all local files from the current directory and output results to a baseline file. Note: add additional `--exclude-files` as needed using regular expression patterns.
     ```bash
     detect-secrets scan --all-files --exclude-files '\.secrets.*' --exclude-files '\.git.*' > .secrets.baseline
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
    <CodeBlock language="yaml">{PreCommitConfigSource}</CodeBlock>

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

  <CodeBlock language="yaml">{GitHubActionWorkflow}</CodeBlock>  

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
