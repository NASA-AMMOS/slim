# Security Scanning

<pre align="center">Guide to code scanning for security issues.</pre>

## Introduction

**Background**: Software security is critical in modern systems with application code at its root. Identifying and addressing vulnerabilities rapidly mitigates risk and limits the potential surface area of attacks. We recommend [NASA's SCRUB platform](https://github.com/nasa/scrub) to manage code scanning by identifying, orchestrating and aggregating security information. SCRUB's GitHub implementation wraps [CodeQL](https://codeql.github.com/) results into compact, curated reports that highlight security assessments and are suitable for ingestion by automated reporting tools. A small configuration is appended to an existing CodeQL configuration (`codeql-config.yml` file) that specifies security analyses and reporting properties.  

**Use Cases**:
- Finding and mitigating security risks in code, such as:
  - unknown
- Scanning local client repositories to identify exploitable security risks.
- Implementing a reporting loop in continuous integration (CI) pipelines using GitHub Actions to catch unforeseen risks.
- Streamlining management of known security considerations during codebase audits.

---

## Prerequisites
To get the most out of `SCRUB`, you'll need:

* Python 3 with the `pip` tool installed.
* (Optional) Familiarity with BASH and/or Python for potential customizations.
* (Optional) A GitHub repository supporting GitHub Actions.

---

## Quick Start

1. Install SCRUB:

   ```bash
   pip install --upgrade nasa-scrub
   ```
   
2. Execute a baseline scan:

   ```bash
   scrub ...
   ```

3. Review the `foo` file to audit any reported security issues:

   ```bash
   vi ...
   ```

Additional steps such as customizing reports and/or enabling further automation are covered in detail below.

---

## Step-by-Step Guide

SCRUB may be run locally or as a CI workflow action, such as in GitHub Actions. Please see below sections for further details. 

### Table of Contents
- [Security Scanning](#security-scanning)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Step-by-Step Guide](#step-by-step-guide)
    - [Table of Contents](#table-of-contents)
    - [Client-side Scan and Audit](#client-side-scan-and-audit)
      - [Steps](#steps)
    - [GitHub.com Actions Analysis on Push and Pull Request](#githubcom-actions-analysis-on-push-and-pull-request)
      - [Steps](#steps-2)
    - [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
  - [Credits](#credits)
  - [Feedback and Contributions](#feedback-and-contributions)

### Client-side Scan and Audit
The developer's local environment is scanned directly using the `SCRUB` tool. After scanning, a report containing detected security issues is generated. Developers can audit this report for detailed information on detected security concerns.

#### Steps
1. **Installation**
   - Install the release version of  [SCRUB](https://nasa.github.io/scrub/installation.html).
     ```bash
     pip3 install --upgrade --user nasa-scrub
     ```

2. **Scanning**
   - Scan all local files from the current directory and output results to a baseline file.
     ```bash
     detect-secrets scan --all-files --disable-plugin AbsolutePathDetectorExperimental --exclude-files '\.secrets.*' --exclude-files '\.git*' > .secrets.baseline
     ```

3. **Checking Results**
   - View the results in the baseline file.
     ```bash
     ...
     ```

4. **Analysis**
   - Analyze results using the `audit` tool.
     ```bash
     ...
     ```

[View more on advanced SCRUB scan configuration](https://nasa.github.io/scrub/configuration-inputs.html)

> ℹ️ **Note**: Any confirmed security issues should be addressed and mitigated before pushing to remote repositories.

### GitHub.com Actions Analysis on Push and Pull Request

Code is scanned for security risks within the repository. It leverages [GitHub Action](https://github.com/features/actions). The scan is triggered during a push or pull request and any detected security vulnerabilities are reported while blocking merges or pushes to protected branches.

#### Steps
1. **Workflow Creation**
   - The first step is to create a `codeql.yaml` workflow file in the `.github/workflows` directory to define the GitHub action. Copy and paste the below while ensuring the correct branch of your codebase is referenced. For example (from the [Slim Python Starter Kit](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/.github/workflows/codeql.yml)):
  
```yaml
name: "CodeQL"

on:
  push:
    branches: [main, develop]
  pull_request:
    # The branches below must be a subset of the branches above
    branches: [develop]
  schedule:
    # default branch on sundays at 5a
    - cron: '0 5 * * 0'

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: write
      contents: read
      security-events: write

    strategy:
      fail-fast: false
      matrix:
        # CodeQL supports ['cpp', 'csharp', 'go', 'java', 'javascript', 'python', 'ruby']
        # Learn more about CodeQL language support at https://git.io/codeql-language-support
        language: ['python']

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    # Initializes the CodeQL tools for scanning.
    - name: Initialize CodeQL
      uses: github/codeql-action/init@v3
      with:
        #config-file: ./.github/workflows/codeql/codeql-config.yml
        languages: ${{ matrix.language }}
        queries: security-and-quality, security-extended
        # If you wish to specify custom queries, you can do so here or in a config file.
        # By default, queries listed here will override any specified in a config file.
        # Prefix the list here with "+" to use these queries and those in the config file.
        # queries: ./path/to/local/query, your-org/your-repo/queries@main

    # ℹ️ Command-line programs to run using the OS shell.
    # 📚 https://git.io/JvXDl

    # ✏️ If the Autobuild fails above, remove it and uncomment the following three lines
    #    and modify them (or add more) to build your code if your project
    #    uses a compiled language

    #- run: |
    #   make bootstrap
    #   make release

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v3
    
    - name: Post-Process Output
      run: |
        python3 -m pip install nasa-scrub

        results_dir=`realpath ${{ github.workspace }}/../results`
        sarif_files=`find $results_dir -name '*.sarif'`

        for sarif_file in $sarif_files
        do
          output_file="$results_dir/$(basename $sarif_file .sarif).scrub"

          python3 -m scrub.tools.parsers.translate_results $sarif_file $output_file ${{ github.workspace }} scrub
        done

        python3 -m scrub.tools.parsers.csv_parser $results_dir

        echo "RESULTS_DIR=$results_dir" >> $GITHUB_ENV
        
      
    - name: Upload CodeQL Artifacts
      uses: actions/upload-artifact@v4
      with:
        name: codeql-artifacts
        path: ${{ env.RESULTS_DIR }}
        if-no-files-found: error
        overwrite: true
        retention-days: 15
```
     > ℹ️  Explanation: The GitHub Action checks out code, installs necessary packages, checks for a baseline file, and scans the repository for secrets. If new secrets are detected, the build fails and provides guidance.

After setting this up, GitHub will run the workflow during pushes or pull requests. If any new secrets are detected, the status check will fail and the user will be notified in the pull request.

> ⚠️ Warning: The check ensures specific lines of code that may contain sensitive information are not disclosed publicly. In GitHub Action logs only a yes/no indication of sensitive information appears. However, the surface area exists for potential attackers to readily identify sensitive information. Monitor your pull requests actively to respond and always ensure your team actively uses [Layer 1](#layer-1-full-scan-and-audit-client-side) and [Layer 2](#layer-2-git-commit-scan-client-side) to mitigate issues in the first place.  

---

### Frequently Asked Questions (FAQ)

- Q: **If security concerns are detected in my code, what should I do?**

  A: Follow these steps:
  
    - _Identify and Confirm:_ 
    - _Mitigate:_ .
    - _Validate Scans:_ .
    - _Commit:_ .
    - _Educate and Prevent:_ To avoid such instances in the future, educate your team on the importance of code security and potential risks. Consider adopting practices or tools that identify risks early in development cycles.
   
- Q: **Where can I find more configurations and options for `SCRUB`?**
  
  A: Refer to the official documentation for [SCRUB](https://nasa.github.io/scrub).


---

## Credits 

**Authorship**:
- Lyle Barner [@lylebarner](https://github.com/lylebarner)
- John Engelke [@ingyhere](http://github.com/ingyhere)

**Acknowledgements**:
- [Rishi Verma](http://github.com/riverma)

---

## Feedback and Contributions

We value your feedback and contributions. Enhance and expand this guide by referring to our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
