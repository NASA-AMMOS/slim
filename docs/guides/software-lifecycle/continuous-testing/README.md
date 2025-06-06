---
title: Continuous Testing
description: A comprehensive guide to continuous testing in software development.
sidebar_label: Continuous Testing
---

<!--
import CodeBlock from '@theme/CodeBlock';
import PreCommitConfigSource from '!!raw-loader!/assets/software-lifecycle/continuous-testing/pre-commit-config.yaml';
-->

<pre align="center">A comprehensive guide to developing a continuous testing plan, implementation, and automation approach for your project using AI tools.</pre>

![continuous-testing-representative-image](/img/continuous-testing-image.png)


## Introduction

### Background 

Continuous testing (CT) is the practice of automatically and continuously testing code changes throughout the development process to identify and address issues *early*. The scope of CT includes testing code modules, interaction between software components, security, and user interfaces. Implementing CT is often difficult and time-consuming - we, therefore, recommend a simplified approach to get started with CT through a template and by using artificial intelligence tools like large-language models to make a test plan a reality quickly. The goal is to enable your project to identify and fix problems early, before they become major issues, leading to faster releases, improved software quality, and happier users.

### Approach

Our recommendation is to follow a 4-step plan for continuous testing: (1) document your test approach, (2) write your tests, (3) automate your tests, and (4) maintain your tests.

The below diagram illustrates the 4-step approach.

```mermaid
graph TD
    TestPlan[Write/edit a TESTING.md plan] --> Implement[Write/edit your tests] --> Automate[Automate/schedule tests]
    Automate --> Iterate[Change Code]
    Iterate --> Implement
```

### Use Cases

- Using artificial intelligence tools like large-language models (LLMs) to speed up test writing
- Establishing a continuous testing plan that coordinates your testing goals
- Automating as many of your tests as possible to run automatically
- Providing frequent test results and feedback for development teams
- Facilitating quicker releases
- Fostering a culture of continuous improvement in software development

---
## Quick Start

Although there are many steps in setting up a continuous testing architecture, the most important step is to document a shared plan of approach for your team. 
- **If you already have continuous testing enabled for your project**: we recommend documenting your plan for internal and external team members' benefit within a `TESTING.md`. This will help you communicate your testing architecture so that team members can contribute easily to improve code through additional tests and automation. Copy/paste our below template and fill it in with your testing setup. Further steps are detailed in the (#step-by-step) guide section, which we encourage you to follow to make test writing and automation more efficient.  
- **If you are brand new to continuous testing**: we recommend starting with our (#step-by-step) guide to set up an efficient continuous testing plan for your project. 
Key Concepts to Get Started with:

**[⬇️ Download and setup a TESTING.md test plan](pathname:///assets/software-lifecycle/continuous-testing/TESTING.md)** (see [example](TESTING-example) of template in action)

**[⬇️ Download our .pre-commit-config.yaml](pathname:///assets/software-lifecycle/continuous-testing/pre-commit-config.yaml)** for a standard code styling, formatting and linting checker

**📝 Generate unit tests automatically using a Large Language Model (LLM), such as [codellama](https://ollama.com/library/codellama) via [ollama](https://ollama.com)** (see [example](#21-example-writing-unit-tests-using-downloadable-open-source-code-generation-models) of unit test script generation)

**🤖 Generate system tests automatically using an LLM, such as [codellama](https://ollama.com/library/codellama) via [ollama](https://ollama.com) and [Robot Framework](https://github.com/robotframework/QuickStartGuide/blob/master/QuickStart.rst)** (see [example](#22-example-writing-system-tests-using-downloadable-open-source-code-generation-models-and-behavior-driven-development-frameworks) of system test script generation)

**🚀 Tie continuous testing scripts all together with a [continuous integration pipeline](/docs/guides/software-lifecycle/continuous-integration)**


---

## Step-by-Step Guide

This step-by-step guide will help you establish, write, automate, and maintain a continuous testing solution for your project.

### 1. Create a TESTING.md

We recommend creating a `TESTING.md` file that outlines the testing objectives and plans for your software in an easy-to-find location. This file will provide your development team and contributors with:

1. A list of the types of tests you run against your software.
2. Locations where your tests are defined.
3. When and how your tests are run.
4. How to contribute/modify tests.

Having this information in a single file helps guide your testing journey and adds clarity for your team. 

**[⬇️ Download our TESTING.md Template](pathname:///assets/software-lifecycle/continuous-testing/TESTING.md)** (see [example](TESTING-example) of template in action)

#### 1.1 Testing Categories

Scroll to the "Testing Categories" section within your `TESTING.md` file and check off the testing categories relevant to your project from the provided list. You can also add your own if needed. Here are some common testing categories:

- **Static Code Analysis:** Checks code for syntax, style, vulnerabilities, and bugs.
- **Unit Tests:** Tests functions or components to verify that they perform as intended.
- **Security Tests:** Identifies potential security vulnerabilities.
- **Build Tests:** Checks if the code builds into binaries or packages successfully.
- **Acceptance Tests:** Validates against end-user and stakeholder requirements.

Once you've identified the testing categories important to your project, write a description for each using the provided template section. Be sure to include:

1. The purpose of that testing category.
2. The location where the tests are stored.
3. How the tests are triggered.
4. The framework used for testing.
5. Best practices or guidelines for contributing to that testing category.

#### 1.2 Example: Unit Testing

In the "Unit Testing" section, explain how unit tests are structured, where they're stored, and how frequently they run. Include the testing framework used and best practices for writing unit tests. For example:

- **Location:** `/tests/unit`
- **Purpose:** Verify that individual functions or components work as intended.
- **Running Tests:**
  - **Manually:**
    1. Navigate to the `/tests/unit` directory.
    2. Run the relevant unit testing command (e.g., `npm test` for JavaScript).
    3. Review results in the terminal or generated reports.
  - **Automatically:**
    - **Frequency:** Upon every commit or pull request.
    - **Results Location:** [GitHub Actions Unit Tests Workflow](#)
- **Framework Used:** Jest for JavaScript.
- **Tips:** Focus on core functions and methods, use mocks for dependencies, and handle edge cases.

#### 1.3 Example: Performance Testing

In the "Performance Testing" section, detail how you ensure your application can handle expected and peak loads. For example:

- **Location:** `/tests/performance`
- **Purpose:** Validate that the application meets performance goals under load.
- **Running Tests:**
  - **Manually:**
    1. Navigate to the `/tests/performance` directory.
    2. Run the performance testing tool command (e.g., `jmeter -n -t test.jmx`).
    3. Review generated reports for analysis.
  - **Automatically:**
    - **Frequency:** Monthly stress tests or before release candidates.
    - **Results Location:** deployment test server's `/var/log/myapp/performance-tests.log
- **Framework Used:** Apache JMeter.
- **Tips:** Simulate peak load scenarios, monitor resource usage, and use tools like Chaos Monkey for resilience testing.

### 2. Write Your Tests

We recommend using [Testing Frameworks](testing-frameworks#for-code-development) when writing your tests to automate, organize, and analyze your testing efforts effectively. You can write your test code from scratch, but another way to write it is using large language models (LLMs), and specifically our recommended [Test Code Generation Frameworks](testing-frameworks#for-test-code-generation). 

Recent studies show that large language models (LLMs) can generate test code covering up to 85% of scenarios (source: [study](https://arxiv.org/pdf/2305.00418.pdf)). Open-source LLM tools like [codellama](https://ollama.com/library/codellama) can create initial test code, which developers can refine. Running these models locally addresses data privacy concerns. For the latest advancements, refer to the [code model ranking](https://huggingface.co/spaces/bigcode/bigcode-models-leaderboard).

Here's our recommended approach to deciding the right model for you to use (see our full list of [recommended code generation models](testing-frameworks#for-test-code-generation)):

Is your code open source and permissively licensed?
- Yes: We recommend high-performance cloud-based LLM models (see our [recommended cloud-based models](testing-frameworks/#cloud-based-models))
- No: We recommend using locally-run LLM models (e.g., [codellama](https://ollama.com/library/codellama)) for sensitive data, such as those provided by the [Ollama](https://ollama.com/) tool, to protect your code from dissemination. (⚠️ These models may not perform as well as cloud-based bigger models, such as `GPT-4`. We recommend asking the LLM to generate a simple test template for you to fill out.) 


#### 2.1 Example: Writing Unit Tests using Downloadable, Open Source Code Generation Models
For unit tests, please follow the steps below: 

1. **Download and Install OLLAMA:**
   - [OLLAMA](https://ollama.com): A streamlined tool for running various LLMs, like `llama3` and `codellama`, locally. Follow the steps to install this tool locally. 

2. **Invoke LLM and Generate Test Code:**
   - Example script: 
   ```python
   # calculator.py
   class Calculator:
      def add(self, a, b):
         return a + b

      def subtract(self, a, b):
         return a - b
   ```

   - Example LLM code generation command: 
   ```bash
   ollama run codellama "$(cat calculator.py) from the above code, write a unit test for the functions add and subtract. do not explain the code. only provide the unit test script. Add inline comments in your tests to clarify the purpose of each test. These comments should include details on the function being tested, the test type (e.g., bug fix, change request, requirements validation, anomaly reports), and any relevant context."
   ```

   - The given bash script above utilizes the ollama command to execute the codellama tool, passing it the content of the file dswx_s1_validator.py as an argument within double quotes. This content is retrieved using the cat command. The purpose of this script is to run the codellama tool on the code provided in dswx_s1_validator.py and generate a unit test specifically for the get_burst_id function within that code.
   - We recommend adding inline comments in your tests to clarify the purpose, including details on the function being tested, the test type (e.g., bug fix, change request), and relevant context.

   - Output looks like this:
   ```python
    import unittest
    from calculator import add, subtract
    
    class TestCalculator(unittest.TestCase):
        def test_add(self):
            """
            Test the add function to ensure it correctly adds two numbers.
            Test Type: Requirements Validation
            """
            self.assertEqual(add(2, 3), 5)
    
        def test_subtract(self):
            """
            Test the subtract function to ensure it correctly subtracts two 
    numbers.
            Test Type: Requirements Validation
            """
            self.assertEqual(subtract(5, 2), 3)
   ```
   - Codellama is one example of a model available in the library. You can explore other models at [Ollama's library](https://ollama.com/library).

3. **Review and Refine Generated Code:**
  - Developers should review the generated code, fix errors, and add any missing edge cases.

4. **Iterate as Needed:**
  - If necessary, update the prompt and obtain a revised test code. Repeat the process until satisfactory.

**Disclaimer:** While LLMs can generate approximately 80% of test code automatically, developers must verify and refine the remaining 20% to ensure comprehensive test coverage.

The following are suggested LLM prompts to use with automated generation. 
  - Example Prompts for Auto-generated Unit Tests: 
    - **Basic Functionality Testing:**
      "Generate unit tests for a function/method that performs basic arithmetic operations (addition, subtraction, multiplication, division)."
    - **Handling Edge Cases:**
      "Create tests for a function that handles edge cases, such as zero division, boundary values, and unexpected input types."
    - **String Manipulation:**
      "Generate unit tests for a function that involves string manipulation, including tests for string concatenation, slicing, and length calculations."
    - **List/Array Operations:**
      "Create tests for functions that operate on lists/arrays, covering scenarios like element addition, removal, and list comprehensions."
    - **Exception Handling:**
      "Generate unit tests to ensure proper exception handling in functions that may encounter errors. Include tests for both expected and unexpected exceptions."
    - **Example Generated Unit Test:**
    ```python
    % ollama run codellama "Generate unit tests for a function/method that performs basic arithmetic operations (addition, subtraction, multiplication, division)"
    
    import unittest
    
    class TestArithmeticOperations(unittest.TestCase):
        def test_addition(self):
            result = add(2, 3)
            self.assertEqual(result, 5)
    
        def test_subtraction(self):
            result = subtract(5, 3)
            self.assertEqual(result, 2)
    
        def test_multiplication(self):
            result = multiply(4, 6)
            self.assertEqual(result, 24)
    
        def test_division(self):
            result = divide(10, 5)
            self.assertEqual(result, 2)
    
    if __name__ == "__main__":
        unittest.main()
    ```

#### 2.2 Example: Writing System Tests using Downloadable, Open Source Code Generation Models and Behavior-Driven Development Frameworks

System-level tests that involve interaction with external software or files can be complicated to test. Please refer to our [System Testing section within our Testing Frameworks Guide](testing-frameworks#for-system-testing) for recommended system testing tools that leverage behavior-driven development (BDD) philosophies. One such example, [**Robot Framework**](https://github.com/robotframework/QuickStartGuide/blob/master/QuickStart.rst), is demoed below in collaboration with Large-Language Models. Specifically, using LLMs to auto-generate Robot Framework pseudocode can help streamline the process of creating integration test cases. Complicated system testing scenarios can be simplified and written automatically using LLMs. Here's an example:

1. **Generating Robot Framework Pseudocode with LLM**:
    - Use Codellama to generate test case pseudocode in Robot Framework syntax.
        ```
        % ollama run codellama "Generate a Robot Framework script to perform MFA (Multi-Factor Authentication) login. The script should navigate to the login page, fill in the username and password fields, generate a TOTP code using the provided secret, enter the TOTP code, click the 'Sign in' button, and verify that the login was successful by checking the welcome message."
        ```
        ```robot
        *** Settings ***
        Documentation    Example test suite
        Library          SeleniumLibrary
        *** Test Cases ***
        Valid Login
            Open Browser    https://dummy-website.com    chrome
            Input Text      username_field    valid_username
            Input Text      password_field    valid_password
            Click Button    login_button
            Page Should Contain    Welcome, User!
        
        Invalid Login
            Open Browser    https://dummy-website.com    chrome
            Input Text      username_field    invalid_username
            Input Text      password_field    invalid_password
            Click Button    login_button
            Page Should Contain    Invalid credentials
        ```

2. **Direct Revision and Enhancement**:
    - Revise the Robot Framework pseudocode as needed:
        - Add additional steps.
        - Include assertions for edge cases.
        - Incorporate custom keywords or libraries.

3. **Test Execution**:
    - Run the tests locally or integrate them into your CI pipeline.

By combining LLM's natural language capabilities with Robot Framework's structured format, you can efficiently create and adapt  test cases.

Here is an example to generate a Robot Framework script for MFA (Multi-Factor Authentication) login with the following steps:

1. Navigate to the login page.
2. Fill in the username and password.
3. Generate a TOTP (Time-Based One-Time Password).
4. Fill in the TOTP code field.
5. Click the "Sign in" button.
6. Verify that the login was successful.

Here's a simple prompt to generate the script:

"Generate a Robot Framework script to perform MFA (Multi-Factor Authentication) login. The script should navigate to the login page, fill in the username and password fields, generate a TOTP code using the provided secret, enter the TOTP code, click the 'Sign in' button, and verify that the login was successful by checking the welcome message."

Here's the LLM output Robot Framework script:

```robot
*** Settings ***
Library    Browser
Library    totp.py
Suite Setup    New Browser    browser=${BROWSER}    headless=${HEADLESS}
Test Setup    New Context
Test Teardown    Close Context
Suite Teardown    Close Browser

*** Variables ***
${BROWSER}    chromium
${HEADLESS}    False

*** Test Cases ***
MFA Login Test
    Open Browser    https://example.com/login    ${BROWSER}
    Input Text    id=username    your_username
    Input Text    id=password    your_password
    ${totp}    Generate TOTP    your_totp_secret
    Input Text    id=totpcode    ${totp}
    Click Button    id=signin_button
    Wait Until Page Contains Element    xpath=//h1[text()='Welcome!']
```

Here's the test output:

```
% robot --pythonpath . tests
==============================================================================
Tests                                                                         
==============================================================================
Tests.Mfa Login                                                               
==============================================================================
Login with MFA                                                        | PASS |
------------------------------------------------------------------------------
Tests.Mfa Login                                                       | PASS |
1 test, 1 passed, 0 failed
==============================================================================
Tests                                                                 | PASS |
1 test, 1 passed, 0 failed
==============================================================================
Output:  MFA_Login/output.xml
Log:     MFA_Login/log.html
Report:  MFA_Login/report.html
```

The quality of the generated test code can be compared with the example provided by Robot Framework [here](https://docs.robotframework.org/docs/examples/mfa_login). The website name that you are testing needs to be updated, but other than that, it was perfect! 


### 3. Automate Your Tests

Our recommendation is to automate as many of your tests as possible using [pre-commit](https://pre-commit.com/), a framework that manages and maintains multi-language pre-commit hooks that can be used on the client side as well as the server (VCS) side. 

#### 3.1 Static Test Automation
We recommend setting up a static test using [`.pre-commit-config.yaml`](pathname:///assets/software-lifecycle/continuous-testing/pre-commit-config.yaml). 

#### 3.2 Component Test Automation

Component tests refer to tests for your immediate code base, code file, or something that does not require system-level interaction. Please consult our [Testing Frameworks guide](testing-frameworks) for a choice of testing tools we recommend. Once selected, we recommend automating the execution of your tests in both of the following ways:

1. Execute tests locally on your developers' machines upon local Git commits
2. Execute tests upon Git pushes to given Git branches on your version control system (VCS) - hosted on GitHub.com or alternate

This idea is represented in the following diagram:

```mermaid
graph TD
    subgraph Developers' Machines
        A[Local Git Commit] -->|Run Component Tests| B{Tests Passed?}
        B -->|Yes| C[Locally Committed]
        B -->|No| D[Fix Code]
    end

    subgraph VCS[Version Control System e.g. GitHub]
        E[Git Push to Specific Branch] -->|Run Component Tests| F{Tests Passed?}
        F -->|Yes| G[Accept Pull Request]
        F -->|No| H[Review Code Changes]
    end
```

we recommend using [pre-commit](https://pre-commit.com/). Here's how to set it up:

##### Developers' Machines

- **Step 1:** Install `pre-commit` on your local machine. If you are using Python, you can install it via pip:

  ```bash
  pip install pre-commit

- **Step 2:** Create a .pre-commit-config.yaml file at the root of your repository with the configuration for your Python component tests using PyTest. Here's an example template you can start with:

   **Python**

   ```
   repos:
   - repo: local
      hooks:
         - id: pytest
            name: PyTest
            entry: pytest
            language: system
            files: '\.py$'
            stages: [commit]
   ```
  This configuration assumes that you have PyTest installed and set up for your project. The files regex \ .py$ ensures that the pre-commit hook only runs on Python files.

   **HCL (HashiCorp Configuration Language)**

   ```
   repos:
   - repo: local
   hooks:
      - id: terraform_fmt
        name: Terraform Format
        entry: terraform fmt -check
        language: system
        files: '\.tf$'
        stages: [commit]
   ```
   This configuration uses Terraform's built-in fmt command to format Terraform configuration files. While not a direct component test, it's a common practice to ensure code quality and consistency in HCL-based projects.

   **JavaScript**

   ```
   repos:
   - repo: local
   hooks:
      - id: jest
        name: Jest
        entry: npm run test
        language: system
        files: '\.(js|jsx)$'
        stages: [commit]
   ```

   This setup assumes you are using Jest for testing your JavaScript projects. The npm run test command should be configured in your package.json to execute Jest tests. If using TypeScript, replace the line `files: '\.(js|jsx)$'` with `files: '\.(ts|tsx)$'`.

   **Jupyter Notebook**

   ```
   repos:
   - repo: local
   hooks:
      - id: nbtest
        name: Notebook Test
        entry: jupyter nbconvert --to notebook --execute --inplace
        language: system
        files: '\.ipynb$'
        stages: [commit]
   ```

   This configuration uses Jupyter's nbconvert tool to execute notebooks as a form of testing. It's a basic approach to running tests in Jupyter Notebooks and might need additional tooling or scripts for more comprehensive testing scenarios.

- **Step 3:** Install the pre-commit hook into your Git repository:

   ```
   pre-commit install
   ```

   Now, every time you commit changes, your component tests will run automatically on the specified (pattern-matching) files you've staged for commit.

##### Version Control System

For automated execution of component tests upon Git pushes using a VCS, we recommend using GitHub Actions or a configuration for Jenkins:

To invoke a `.pre-commit-config.yml` configuration from GitHub Actions or Jenkins for automated execution of unit tests upon Git pushes, follow these detailed directions:

###### GitHub Actions

To execute the pre-commit hooks defined in your `.pre-commit-config.yml` as part of a GitHub Actions workflow, you will create a workflow file in your repository that triggers push events. Here’s how to set it up:

1. **Create a Workflow File:** Navigate to the `.github/workflows` directory in your repository. If it doesn't exist, create it.
   
2. **Define the Workflow:** Create a new file named `pre-commit-action.yml` (or another name of your choosing) in the workflows directory. Add the following content to this file:

   ```yaml
   name: Pre-commit Hooks

   on: [push]

   jobs:
     run-hooks:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Set up Python
           uses: actions/setup-python@v2
           with:
             python-version: '3.8'
         - name: Install pre-commit
           run: pip install pre-commit
         - name: Run pre-commit hooks
           run: pre-commit run --all-files

This workflow checks out the code, sets up Python, installs pre-commit, and then runs all the pre-commit hooks defined in .pre-commit-config.yml against all files in the repository. Adjust the python-version and setup steps according to your project's needs.

Commit and Push: Commit the workflow file to your repository and push it to GitHub. The workflow will automatically trigger on the next push to your repository.

###### Jenkins

To run the pre-commit hooks as part of a Jenkins build, you'll need to configure a Jenkins job that checks out your repository and executes the pre-commit hooks. Here's how to do it:

1. **Install Pre-commit on Jenkins:** Ensure that pre-commit and any language-specific runtime (like Python, Node.js) are installed on your Jenkins server or within the build environment that will run your job.
2. **Create a New Jenkins Job:** In Jenkins, create a new job by selecting "New Item," then choose "Freestyle project," and give it a name.
3. **Configure Source Code Management:** Under the "Source Code Management" tab, select "Git" and fill in the repository URL and credentials if necessary.
4. **Add Build Step to Execute Shell:** In the "Build" section, add a build step that executes shell commands. Add the following commands:

   ```
   #!/bin/bash
   # Install pre-commit if not already installed; optional based on your setup
   pip install pre-commit

   # Run pre-commit hooks
   pre-commit run --all-files
   ```
5. **Save and Run the Job:** After configuring the job, save it and run it manually to verify that the pre-commit hooks are executed as expected.
6. **Triggering the Job:** You can configure the job to be triggered on each push to your repository by using Jenkins webhooks or polling SCM, depending on your preference and setup.


#### 3.3 System Test Automation

System tests refer to tests that require interaction between multiple components. Not every project has this complexity. To aid in the automation of system tests, we suggest doing the following:

1. Have a schedule for running system tests (e.g., nightly, weekly)
2. Ensure software is built and published to repositories:
   - Stand-alone components of your software should be independently released, built, or packaged to be published on public repositories
   - (Optional) a final, single build of an integrated software consisting of multiple components is built, packaged, and published to a public repository
3. Pull built or packaged artifacts from repositories and deploy software release (components or single package) to a virtualized environment
4. Test the deployed release against a set of specified system tests

The diagram below illustrates this concept (Continuous Testing parts are highlighted in blue):

```mermaid
graph TD
    subgraph SoftwareDevelopment[Software Components]
        Code[Code Development]
        ComponentTests{Component Tests Success?}
        BuildComponents[Build Stand-alone Components]
        PublishArtifacts[(Publish Artifacts to Repositories)]
    end
    subgraph IntegratedSoftware[Integrated Software]
        SingleIntegratedBuild{Single Integrated Build?}
        BuildIntegratedSoftware[Build Integrated Software]
        PublishIntegratedArtifact[(Publish Integrated Artifact to Repository)]
    end

    subgraph TestDeployment[Testing & Deployment, e.g. nightly / weekly]
        PullArtifacts[Pull Artifacts]
        DeployRelease[Deploy Software Release]
        IntegrationTests[Test Against System Tests]
    end

    Code --> ComponentTests
    style ComponentTests fill:#4169E1
    ComponentTests -->|Yes| BuildComponents
    ComponentTests -->|No| Code
    BuildComponents --> PublishArtifacts
    SingleIntegratedBuild -->|Yes| BuildIntegratedSoftware
    style SingleIntegratedBuild fill:#4169E1
    PublishArtifacts --> BuildIntegratedSoftware
    BuildIntegratedSoftware --> PublishIntegratedArtifact
    PullArtifacts --> DeployRelease
    DeployRelease --> IntegrationTests
    PublishArtifacts --> TestDeployment
    PublishIntegratedArtifact --> TestDeployment
```

**Types of System Tests**

You should outline the types of system tests you plan to implement in your `TESTING.md` file. We suggest the following types of tests to include:
- Testing for integration
  - Interaction between software components
  - Interaction with external services, provided files, exchange of messages, etc.
- Testing for security
  - See existing [SLIM security best practices](/slim/docs/category/security) as part of your software development workflow.
- Testing for performance and load
- Testing user interfaces for gaps and compliance against policies

##### Example: Integration Test Automation

We recommend the following steps: 
1. For more information about applying integration testing, take a look at the following external [guide](https://microsoft.github.io/code-with-engineering-playbook/automated-testing/integration-testing/) from Microsoft Engineering Fundamentals.
2. Follow the process of above [diagram](#33-system-test-automation) for integration test automation.
3. Integrate your integration tests into a [Continuous Integration (CI) pipeline](/docs/guides/software-lifecycle/continuous-integration), which will allow for the automatic execution of tests upon code changes. 


##### Example: Security Test Automation

To aid in security testing automation, we recommend two steps:
1. Add security testing to your developers' local coding environment via pre-commit (see [Static Test Automation](#31-static-test-automation) section above)
2. Enable existing [SLIM security best practices](/slim/docs/category/security) as part of your software development workflow.

##### Example: Performance Test Automation

We recommend the following steps for performance test automation:
1. Take a look at the following external [guide](https://microsoft.github.io/code-with-engineering-playbook/automated-testing/performance-testing/) from Microsoft Engineering Fundamentals for more information about applying performance testing.
2. Refer to the [Testing Frameworks](testing-frameworks#for-performance-testing) page for performance test tools and frameworks.
3. Integrate performance tests into your Continuous Integration and Continuous Delivery (CI/CD) pipeline to enable regular and automated execution of performance tests as part of the software delivery process.

##### Example: User Interface Test Automation

We recommend the following steps for user interface test automation: 
1. Take a look at the following external [guide](https://microsoft.github.io/code-with-engineering-playbook/automated-testing/ui-testing/) from Microsoft Engineering Fundamentals for more information about applying user interface testing.
2. Refer to the [Testing Frameworks](testing-frameworks#for-user-interfaces-uis) page for user interface test tools and frameworks.
3. Set up a CI pipeline to automatically trigger UI test execution upon code changes or at scheduled intervals.


### 4. Maintain Your Tests

Your tests should be updated, at minimum, upon the following events: 
1. Whenever **code changes** occur (e.g., new features, bug fixes, refactoring), revisit related tests.
2. **Upgrading libraries, frameworks, or testing tools** may necessitate adjustments to existing tests.
3. As your **application data evolves**, ensure test data remains relevant.
4. Periodic [code coverage](testing-frameworks) analysis identifies **underused or obsolete tests**.

This is the list of items to be maintained:
1. [TESTING.md](pathname:///assets/software-lifecycle/continuous-testing/TESTING.md)
2. [Component tests](#32-component-test-automation)
3. [System tests](#33-system-test-automation)
4. [Test automation](#3-automate-your-tests)

---

## Frequently Asked Questions (FAQ)

**Q: How does continuous testing address usability and user interface testing?**

A: We acknowledge the importance of usability and UI testing and are actively exploring ways to integrate them seamlessly into our continuous testing model.

**Q: Is it necessary to implement all recommended tools, considering resource constraints?**

A: We understand the challenges, and thus, we're developing a common subset of tools for all projects, prioritizing their importance for more feasible implementation.

**Q: Are certain projects not mature enough for specific tools?**

A: Yes, we recognize project maturity levels vary. We recommend waiting until your project reaches an appropriate stage, especially for tools like integration testing.

**Q: What phases are prioritized in the continuous testing guidelines?**

A: Security, verification and validation, and integration testing are considered essential phases and will be prioritized in our guidelines.

**Q: How does licensing factor into the tool selection process, even for open-source tools?**

A: Licensing is crucial, and we are actively exploring strategies to address licensing concerns, ensuring compliance even with open-source tools.

**Q: Is continuous testing a one-time implementation, or can it be an iterative process?**

A: We emphasize iterative implementation for continuous testing success, understanding that refining the process takes time.

---

## Credits 

**Authorship**:
- [Kyongsik Yun](https://github.com/yunks128)
- [Rishi Verma](https://github.com/riverma)

**Acknowledgements**:
* We are grateful to John Engelke and Dillon Dalton for their insightful comments and feedback, which have greatly improved this work.
* We also appreciate Drew Meyers and Luca Cinquini for providing exemplary best practices for various tests and pre-commit hooks.
  
---

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this page. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
