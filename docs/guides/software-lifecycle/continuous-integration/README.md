# Continuous Integration

<pre align="center">A guide for implementing continuous integration in software projects.</pre>

## Introduction

**Background**: Continuous Integration (CI) is a critical practice in modern software development. This guide introduces a comprehensive approach to CI from analysis and testing to orchestration and release management. We focus on using a variety of tools like Git hooks, GitHub Actions, Jenkins and more to create a robust CI pipeline. By following this guide and combining these tools, developers can automate their build and testing processes, ensuring software is always ready for deployment.

**Use Cases**:
- Automating software integration, build and testing.
- Streamlining software release and deployment.
- Ensuring software quality and reliability through repeatable engineering processes.

---

## Prerequisites

* Basic knowledge of software development and version control systems.
* Familiarity with CI/CD concepts and practices.

---

## Quick Start

**[📔 CI Tools and Frameworks](continuous-integration-frameworks.md)**

Click the link above to explore various tools and systems for setting up and optimizing your CI pipeline.

**[📔 CI Reference Architectures](reference-architecture.md)**

Click the link above to explore the overall sample architecture for a continuous integration system.

---

## Step-by-Step Guide

1. **Explore CI Tools and Frameworks**:
   - Start with the [CI Tools and Frameworks](continuous-integration-frameworks.md) guide to explore a range of task-focused CI tools.
   - Review different categories, such as Analysis and Testing, Credentialing, and Execution and Reporting Tests.
   - Based on your use case, select appropriate tools, e.g. Git hooks, GitHub Actions, Jenkins, Maven plugins or SetupTools, that are are designed for the software and technologies used in your  product.

2. **Understand the Reference Architecture**:
   - Dive into the [CI Reference Architectures](reference-architecture.md) for an overview of the CI process and its components.
   - Understand the core concepts of the CI pipeline, which involves Developer systems, Continuous Integration services, Continuous Deployment platforms and other touchpoints.
   - Learn about the discrete process steps in a CI pipeline, such as Compile, Test, Package, Publish and Deploy (i.e. release or deliver), and how they contribute to building and releasing software.

3. **Combine Reference Architecture with Selected Tools**:
   - With the understanding of CI tools from **Step 1**, and the architectural insights from **Step 2**, begin mapping tools to specific roles in your CI pipeline.
   - For example:
     - Use Git hooks for code check-ins and GitHub Actions for automated build and testing processes. 
     - Utilize Jenkins or GitHub Actions for more complex workflows, like orchestrating builds across different environments or managing deployment strategies.
     - Implement credentialing tools like Jenkins Credentials Binding Plugin or OAuth for secure access to resources.
     - Ensure testing is thorough by integrating language-specific plugins or frameworks, such as Maven for Java or PyTest for Python, into your build process.
     - Use orchestration tools like Ansible for deployment, aligning them with your cloud infrastructure managed by Terraform or Kubernetes.
     - Package your application using Docker or appropriate tools, ensuring a streamlined process from development to deployment.
  - Update a copy of the reference architectural diagram with your selected tools. 

---

## Frequently Asked Questions (FAQ)

- Q: How do I choose the right CI tools for my project?
- A: Consider your project’s language, complexity and the specific needs of your deployment environment. Research and compare tools to find the best fit for your workflow.

- Q: What is the difference between Continuous Integration, Continuous Deployment and Continuous Delivery?
- A: These related concepts apply to different target stages of a comprehensive CI/CD process, but their definitions are often conflated. Each one of these stages determines the endpoint as builds progress in a given automation process.
   - _Continuous Integration_ (code compiles) tests whether code when merged from different developer systems can be compiled together on a control system, e.g. the CI server.
   - _Continuous Deployment_ (packages published) is the publishing of successfully compiled and packaged binaries to an artifact repository and/or local test servers.
   - _Continuous Delivery_ (packages released) extends deployment by pushing packaged binaries immediately to production services upon successful build, test and publishing.
  
---

## Credits 

**Authorship**:
- [John Engelke](https://www.github.com/jpl-jengelke)

**Acknowledgements**:
* This guide was inspired by the comprehensive tooling options available in the CI/CD ecosystem.

---

## Feedback and Contributions

Your feedback and contributions are vital to the continuous improvement of this guide. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/) for more information.
