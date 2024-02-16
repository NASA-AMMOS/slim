---
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Continuous Testing

<pre align="center">Guidance and automation for implementing continuous testing for your project.</pre>

## Introduction

### Background 

Continuous testing (CT) is the practice of automatically and continuously testing code changes throughout the development process to identify and address issues *early*. The scope of continuous testing tests can include testing code modules, interaction between software components, security, user interfaces, etc. The purpose of this guide is to present a simplified approach to getting started with CT through a best-practice testing plan template and associated automation to quickly make a test plan a reality. The goal is to enable your project to identify and fix problems early, before they become major issues, leading to faster releases, improved software quality, and happier users.

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

- Establishing a continuous testing plan that coordinates your testing goals
- Automating as many of your tests as possible to run automatically
- Providing frequent test results and feedback for development teams
- Facilitating quicker releases
- Fostering a culture of continuous improvement in software development

---
## Quick Start

The fastest way to get started with Continuous Testing is to have a shared plan of approach for your team. We've created a template `TESTING.md` to help you communicate your testing architecture to existing and new team members to support implementation. Copy/paste our below template, fill it with your testing setup 

**[⬇️ Download our TESTING.md Template](TESTING)** (see [example](TESTING-example) of template in action)

---

## Step-by-Step Guide

This step-by-step guide walks you through establishing, writing, automating, and maintaining a continuous testing solution for your project.

### 1. Create a TESTING.md

We recommend creating a `TESTING.md` file that spells out the testing objectives and plans for your software in an easy-to-view location.  

This file will provide your development team (and other potential contributors) with:
1. A list of the types of tests you run against your software
2. Locations where your tests are defined
3. When and how your tests are run

The benefit of having the above in a single file is to help guide your testing journey as well as to add clarity for your development team on where and how your tests are written and run. 

To get you started, download our template to get started and place it at the root of your repository.

**[⬇️ Download our TESTING.md Template](TESTING)** (see [example](TESTING-example) of template in action)

#### 1.1 Types of Testing

Scroll to the "Types of Testing" section within your `TESTING.md` and begin checking off the types of testing your project intends to (or already does) implement from the provided list. Each type of testing serves a different purpose:

- Unit Tests check the smallest parts of an application, like functions or methods.
- System Tests help ensure different parts of your application work together as well as verify the final released application product meets expected standards like security constraints, performance needs, user interface needs, etc.

#### 1.2 Unit Testing

In this section you'll want to explain how unit tests are structured within your project, including where they are stored (e.g., /tests/unit), and how frequently they are run. Mention the unit testing framework you're using (e.g., Jest, NUnit), and provide guidelines or a link to best practices for writing unit tests. This section is important for ensuring that new contributors understand how to write and run unit tests in your project.

Include specifics about your testing setup in this template section as follows:

- `[INSERT PATH TO UNIT TEST FOLDER ON REVISION CONTROL]`: Specify the location of your unit tests, such as /tests/unit.
- `[INSERT TRIGGER OF WHAT KICKS OFF YOUR TESTS]`: Describe what initiates the unit tests, such as "upon every commit", "pull request creation", or "nightly builds".
- `[INSERT YOUR UNIT TESTING FRAMEWORK OF CHOICE]`: Mention the framework used for unit testing, e.g., "Jest for JavaScript", "JUnit for Java", and provide a link to the framework's documentation or getting started guide. Consult our [Testing Frameworks](testing-frameworks) guide for recommended frameworks to choose from. See [Write Your Tests](#2-write-your-tests) for more details. 


#### 1.3 System Tests

System Tests help verify your final application meets end-user needs in a finalized form. There are a couple of recommendations we have for performing system tests.

##### Integration Tests

In this section, we suggest you outline the process for integration testing, including the tools and frameworks used (e.g., Cypress, Postman). Specify where integration tests are located within the project repository and the trigger for these tests (e.g., merge requests, scheduled nightly builds). Integration testing ensures that combined parts of your application function together as expected, as well as interact with your users (other programs or people).

Include specifics about your testing setup in this template section as follows:

- `[INSERT PATH TO INTEGRATION TEST FOLDER ON REVISION CONTROL]`: Indicate where integration tests are stored within your repository, for example, /tests/system/integration.
- `[INSERT YOUR INTEGRATION TESTING FRAMEWORK OF CHOICE]`: Recommend the integration testing tool or framework, such as "Cypress for end-to-end tests", "Postman for API testing", and include a reference link. Consult our [Testing Frameworks](testing-frameworks) guide for recommended frameworks to choose from.


##### Security Tests

Security testing is important for identifying vulnerabilities in your application early. In this section, recommend tools and frameworks for security testing, such as OWASP ZAP for dynamic analysis or GitHub.com Dependabot for dependency scanning. Explain how and when security tests are run, and provide guidance on adhering to security best practices, such as avoiding OWASP Top 10 Vulnerabilities - which can ensure your development team is aware of how to design for minimum vulnerability risks. 

Include specifics about your testing setup in this template section as follows:

- `[INSERT NAME AND LINK TO SECURITY FRAMEWORK]`: Suggest security testing tools or services, for instance, "OWASP ZAP for web applications", "GitHub.com Dependabot for dependency scanning", and provide their official documentation or homepage links. Consult our [Testing Frameworks](testing-frameworks) guide for recommended frameworks to choose from.
- `[INSERT TRIGGER OF WHAT KICKS OFF YOUR TESTS]`: Define when security tests are performed, like "before merging to the main branch", "weekly automated scans".

##### Performance Tests

In this section, discuss the importance of performance testing and recommend tools (e.g., Apache JMeter, Chaos Monkey for simulating failures). Describe where performance tests are located, what triggers them (e.g., before release candidates, monthly), and the goals (e.g., handling 2X expected user load). Performance testing ensures your application can handle expected and peak loads.

Include specifics about your testing setup in this template section as follows:

- `[INSERT PATH TO PERFORMANCE TEST FOLDER ON REVISION CONTROL]`: Specify the directory for performance tests, such as /tests/system/performance.
- `[INSERT YOUR INTEGRATION TESTING FRAMEWORK OF CHOICE]`: Indicate the performance testing tool or framework, plus an additional tool for simulating failures, e.g., "Apache JMeter for load testing", "Chaos Monkey for resilience testing", along with links to their guides or documentation. Consult our [Testing Frameworks](testing-frameworks) guide for recommended frameworks to choose from.

##### User Interface (UI) Tests

In this section, you'll detail the UI testing process, including how these tests ensure compliance with user interaction needs. Mention the framework used for UI testing (e.g., Selenium). Provide information on the location of UI tests within the project repository and the testing schedule.

Include specifics about your testing setup in this template section as follows:

- `[INSERT PATH TO UI TEST FOLDER ON REVISION CONTROL]`: Direct where UI tests can be found in your project, for instance, /tests/system/ui.
- `[INSERT YOUR INTEGRATION TESTING FRAMEWORK OF CHOICE]`: Mention the framework or tool used for V&V testing, such as "TestRail for test management", and provide a link to how to use it within your project. Consult our [Testing Frameworks](testing-frameworks) guide for recommended frameworks to choose from.

### 2. Write Your Tests

Writing unit tests for large software applications with numerous components can be time-consuming. We initially tested Pynguin, a popular automatic test code generation tool. However, it is in its early stage, and we found it not ready for practical use. Recent studies have shown promise in using LLM-based tools for test code generation. According to a study (https://arxiv.org/pdf/2305.00418.pdf), these models can automatically cover a significant percentage of test methods (~85%). 

Our recommendation is to use large language models (e.g., llama2) to quickly and automatically generate an initial test code and update as needed as described below: 

1. **Download and Install:**
   - [OLLAMA](https://github.com/ollama/ollama)
   - Ollama is a streamlined tool for running open-source LLMs locally. 

3. **Invoke LLM and Generate Test Code:**
   ```bash
   ollama run llama2 "$(cat ~/app_pack_generator/docker.py)" write a unit test code
   ```
   
4. **Fix Errors and Add Missing Edge Cases:**
   - Review the generated code, fix errors, and include any missing edge cases.

5. **Update Prompt and Obtain Revised Test Code:**
   - If needed, iterate on the prompt and obtain the revised test code. Go back to step 2 if necessary.

#### 2.1 Recommended Prompts for Auto-generated Unit Tests

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
  

### 3. Automate Your Tests

Our recommendation is to automate as many of your tests as possible. For tests that can't be automated, we suggest scheduling specific times for personnel to run manual tests.

#### 3.1 Unit Test Automation

Please consult our [Testing Frameworks guide](testing-frameworks) for a choice of unit testing tools we recommend. Once selected, we recommend automating the execution of your unit tests in both of the following ways:

1. Execute unit tests locally on your developers' machines upon local Git commits
2. Execute unit tests upon Git pushes to given Git branches on your version control system (VCS) - hosted on GitHub.com or alternate

This idea is represented in the following diagram:

```mermaid
graph TD
    subgraph Developers' Machines
        A[Local Git Commit] -->|Run Unit Tests| B{Tests Passed?}
        B -->|Yes| C[Locally Committed]
        B -->|No| D[Fix Code]
    end

    subgraph VCS[Version Control System e.g. GitHub]
        E[Git Push to Specific Branch] -->|Run Unit Tests| F{Tests Passed?}
        F -->|Yes| G[Accept Pull Request]
        F -->|No| H[Review Code Changes]
    end
```

To make the above automation a reality, we recommend using [pre-commit](https://pre-commit.com/), a framework that manages and maintains multi-language pre-commit hooks that can be used on the client side as well as the server (VCS) side. Here's how to set it up:

##### Developers' Machines

- **Step 1:** Install `pre-commit` on your local machine. If you are using Python, you can install it via pip:

  ```bash
  pip install pre-commit

- **Step 2:** Create a .pre-commit-config.yaml file at the root of your repository with the configuration for your Python unit tests using PyTest. Here's an example template you can start with:

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
   This configuration uses Terraform's built-in fmt command to format Terraform configuration files. While not a direct unit test, it's a common practice to ensure code quality and consistency in HCL-based projects.

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

   Now, every time you commit changes, your unit tests will run automatically on the specified (pattern-matching) files you've staged for commit.

##### Version Control System

For automated execution of unit tests upon Git pushes using a VCS, we recommend using GitHub Actions or a configuration for Jenkins:

To invoke a `.pre-commit-config.yml` configuration from GitHub Actions or Jenkins for automated execution of unit tests upon Git pushes, follow these detailed directions:

###### GitHub Actions

To execute the pre-commit hooks defined in your `.pre-commit-config.yml` as part of a GitHub Actions workflow, you will create a workflow file in your repository that triggers on push events. Here’s how to set it up:

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


#### 3.2 System Test Automation

To aid in the automation of system tests, we suggest doing the following:

1. Have a schedule for running system tests (e.g. nightly, weekly)
2. Ensure software is built and published to repositories:
   - Stand-alone components of your software should be independently released, built, or packaged to be published on public repositories
   - (Optional) a final, single build of an integrated software consisting of multiple components is built, packaged, and published to a public repository
3. Pull built or packaged artifacts from repositories and deploy software release (components or single package) to a virtualized environment
4. Test the deployed release against a set of specified system tests

The diagram below illustrates this concept:

```mermaid
graph TD
    subgraph SoftwareDevelopment[Software Components]
        Code[Code Development]
        UnitTests{Unit Tests Success?}
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

    Code --> UnitTests
    UnitTests -->|Yes| BuildComponents
    UnitTests -->|No| Code
    BuildComponents --> PublishArtifacts
    SingleIntegratedBuild -->|Yes| BuildIntegratedSoftware
    PublishArtifacts --> BuildIntegratedSoftware
    BuildIntegratedSoftware --> PublishIntegratedArtifact
    PullArtifacts --> DeployRelease
    DeployRelease --> IntegrationTests
    PublishArtifacts --> TestDeployment
    PublishIntegratedArtifact --> TestDeployment
```

##### Types of System Tests

You should outline the types of system tests you plan to implement in your `TESTING.md` file. We suggest the following types of tests to include:
- Testing for integration
  - Interaction between software components
  - Interaction with external services, provided files, exchange of messages, etc.
- Testing for security
  - See existing [SLIM security best practices](/slim/docs/category/security) as part of your software development workflow.
- Testing for performance and load
- Testing user interfaces for gaps and compliance against policies

##### Integration Tests Automation

TBD - automation to help script tests

##### Security Tests Automation

To aid in security testing automation, we recommend two steps:
1. Add security testing to your developers' local coding environment via pre-commit (see [Unit Test Automation](#31-unit-test-automation) section above)
2. Enable existing [SLIM security best practices](/slim/docs/category/security) as part of your software development workflow.

##### Performance Tests Automation

TBD - automation to help script tests

##### User Interface Tests Automation

TBD - automation to help script tests

### 4. Maintain Your Tests
   
TBD - automation to help ensure test architecture is adhered to and updated when needed 

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
* Thank you to John Engelke for insightful comments and feedback, which contributed to the enhancement of this work.
  
---

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this page. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
