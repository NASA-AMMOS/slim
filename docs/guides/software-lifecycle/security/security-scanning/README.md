# Security Scanning

<pre align="center">Guide to scanning code for security issues.</pre>

## Introduction

**Background**: Software security is critical in modern systems with application code at its root. Identifying and addressing vulnerabilities rapidly mitigates risk and limits the potential surface area of attacks. We recommend [NASA's SCRUB platform](https://github.com/nasa/scrub) to manage code scanning by identifying, orchestrating and aggregating security information. SCRUB's GitHub implementation wraps [CodeQL](https://codeql.github.com/) results into compact, curated reports that highlight security assessments and are suitable for ingestion by automated reporting tools. A small configuration is appended to an existing CodeQL configuration (`codeql-config.yml` file) that specifies security analyses and reporting properties.

**Use Cases**:
- Standardized security reports that enables rapid interchange of scanning tools.
   - Streamlining management of known security considerations during codebase audits.
- Discovering security risks in code, such as:
   - Improper input validation
   - Weak encryption
   - Use of dangerous library functions
   - Other issues that may be difficult to identify via unit testing.
- Scanning local client repositories to identify exploitable security risks.
- Implementing a reporting loop in continuous integration (CI) pipelines using GitHub Actions to catch unforeseen risks.

---

## Prerequisites
To get the most out of `SCRUB`, you'll need:

* Python 3 with the `pip` tool installed
* Static analysis tools installed and ready for use
   * CodeQL, SonarQube, and Pylint are some common examples
* (Optional) Familiarity with BASH and/or Python for potential customizations
* (Optional) A GitHub repository supporting GitHub Actions

---

## Step-by-Step Guide

SCRUB may be run locally or as a CI workflow action, such as in GitHub Actions. Please see below sections for further details.

### Client-side Scan and Analysis
The developer's local environment is scanned directly using the `SCRUB` tool. After scanning, a report containing detected security issues is generated. Developers can audit this report for detailed information on detected security concerns.

#### Steps
1. **Installation**
   - Install the release version of  [SCRUB](https://nasa.github.io/scrub/installation.html).
      ```bash
      pip3 install --upgrade --user nasa-scrub
      ```

2. **Configuration**
   - Create a `scrub.cfg` configuration file. This file must be populated with project specific configuration values, depending on the tool that is being used. More information can be found in the [SCRUB documentation](https://nasa.github.io/scrub/configuration.html).

      ``` bash
      scrub get-conf --output scrub.cfg
      ```

3. **Scanning**
   - For more information about running SCRUB, refer to the [user documentation](https://nasa.github.io/scrub/usage.html)

      ```bash
      scrub run
      ```

4. **Checking Results**
   - Review the `<tool>.scrub` file to audit any reported security issues:

      ```bash
      vi .scrub/<tool>.scrub
      ```

[View more on advanced SCRUB scan configuration](https://nasa.github.io/scrub/configuration-inputs.html)

> ℹ️ **Note**: Any confirmed security issues should be addressed and mitigated before pushing to remote repositories.

### GitHub.com Actions Analysis on Push and Pull Request

Code is scanned for security risks within the repository. It leverages [GitHub Action](https://github.com/features/actions). The scan is triggered during a push or pull request and any detected security vulnerabilities are reported while blocking merges or pushes to protected branches.

#### Steps
1. **Workflow Creation**
   - The first step is to create a `scrub.yaml` workflow file in the `.github/workflows` directory to define the GitHub action. Copy and paste the below to your new file while ensuring the correct branch of your codebase is referenced. For example, the following configuration scans for CodeQL security and quality checks for Python language code. Note: a version of the below is also available through the [SLIM Python Starter Kit](https://github.com/NASA-AMMOS/slim-starterkit-python/blob/main/.github/workflows/codeql.yml):
      - This workflow is based on the default CodeQL workflow file with three modifications:
         1. Under the *Initialize CodeQL* step, the `queries` entity has been added to enable all of the available security queries
         2. A new *Post-Process Output* step has been added to generate a CSV output file that may be easily ingested by other systems
         3. A new *Upload CodeQL Artifacts* step has been added to produce a set of archive files for each run

            ```yaml
            name: "SCRUB"
          
            on:
              push:
                branches: [main]
              pull_request:
                # The branches below must be a subset of the branches above
                branches: [main]
              schedule:
                # default branch on sundays at 5a UTC
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
                    # This implementations uses CodeQL, but SCRUB can leverage other scan tools.
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
                  # note that CodeQL 
                  with:
                    # optional config file for scan tool, in this case CodeQL
                    # config-file: ./.github/workflows/codeql/codeql-config.yml
                    languages: ${{ matrix.language }}
                    # If you wish to specify custom queries, you can do so here or in a config file.
                    # By default, queries listed here will override any specified in a config file.
                    # Prefix the list here with "+" to use these queries and those in the config file.
                    # queries: ./path/to/local/query, your-org/your-repo/queries@main
                    queries: security-and-quality, security-extended
          
                # ℹ️ Command-line programs to run using the OS shell.
                # 📚 https://git.io/JvXDl
          
                # ✏️ If the Autobuild fails above, remove it and uncomment the following three lines
                #    and modify them (or add more) to build your code if your project
                #    uses a compiled language
          
                # - run: |
                #    make bootstrap
                #    make release
          
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
          
          
                - name: Upload SCRUB Artifacts
                  uses: actions/upload-artifact@v4
                  with:
                    name: scrub-artifacts
                    path: ${{ env.RESULTS_DIR }}
                    if-no-files-found: error
                    overwrite: true
                    retention-days: 15
            ```

---

### Frequently Asked Questions (FAQ)

- Q: **If security concerns are detected in my code, what should I do?**

  A: Follow these steps:
     1. _Identify and Confirm:_ The first step is to confirm if the vulnerability is actually valid. Static analysis is not perfect and can sometimes generate false positives. Try to refrain from assessing severity and instead focus on determining the accuracy of the finding.
     2. _Assess Severity:_ After you have confirmed that the vulnerability is valid, now it's time to assess severity. This generally means answering two questions: "How difficult is this vulnerability to exploit?" and "What are the consequences if this vulnerability is exploited?" This is often a fairly nuanced discussion, but the overall goal is a thoughtful assessment of potential risks.
     3. _Mitigate:_ The next step is to decide what action is required. In an ideal world all security vulnerabilities would be addressed, but this is often not a reasonable expectation. Sometimes the risk posed by a vulnerability is low and the effort the rectify is high, so the risk is acceptable. Mitigations can take many forms and can range from accepting the risk (e.g. doing nothing) to fully rewriting modules to address the vulnerability.
     4. _Validate Scans:_ After a mitigation is in place, we need to confirm that the vulnerability has been closed. This can be done by rerunning the static analysis scan or implementing new unit test cases. Validation is completed
     5. _Commit:_ At this point you're ready to commit your code changes. Merge as you normally would. You may want to call out the security specific nature in your commit message to make users aware of the criticality.
     6. _Educate and Prevent:_ To avoid such instances in the future, educate your team on the importance of code security and potential risks. Consider adopting practices or tools that identify risks early in development cycles. You may also consider if it would be helpful to modify your project's coding standard to improve code quality.


- Q: **Where can I find more configurations and options for `SCRUB`?**

  A: Refer to the official documentation for [SCRUB](https://nasa.github.io/scrub).


---

## Credits

**Authorship**:
- [Lyle Barner](https://github.com/lylebarner)
- [John Engelke](http://github.com/ingyhere)

**Acknowledgements**:
- [Rishi Verma](http://github.com/riverma)

---

## Feedback and Contributions

We value your feedback and contributions. Enhance and expand this guide by referring to our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
