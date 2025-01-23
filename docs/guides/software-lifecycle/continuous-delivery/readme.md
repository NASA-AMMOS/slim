---
title: Continuous Delivery
description: A streamlined guide to setting up a robust continuous delivery pipeline, automating releases, and maintaining best practices.
---

# Continuous Delivery

<pre align="center">A streamlined guide to setting up a robust continuous delivery pipeline, automating releases, and maintaining best practices.</pre>

<!--
![continuous-delivery-representative-image](/img/continuous-delivery-image.png)
-->

## Introduction

### Background 

Continuous Delivery (CD) is the practice of automatically preparing code changes for production release, extending Continuous Integration (CI) to ensure that every validated change is always production-ready. This guide presents a simplified, practical approach to implementing CD through standardized repository selections, naming conventions, and automation.

### Approach

Adopt a clear, four-step plan to implement Continuous Delivery effectively:
1. **Choose repositories**.
2. **Adopt standardized naming conventions**.
3. **Automate publishing**.
4. **Maintain the delivery pipeline**.

```mermaid
graph TD
    Repository[Choose Repositories] --> Naming[Adopt Naming <br/>Conventions] --> Automate[Automate Publishing]
    Automate --> Maintain[Maintain Pipeline]
    Maintain --> Repository
```

### Key Use Cases

- Auto-publishing built artifacts to package managers.
- Standardizing naming conventions across repositories.
- Versioning releases using semantic versioning.
- Distributing test data automatically.
- Automating container image publication.
- Enabling infrastructure-as-code deployment.

## Quick Start

The most important step in setting up continuous delivery is choosing the right repositories and implementing proper naming conventions.

**Key Concepts to Get Started:**

**[⬇️ Choose a Package Repository](#package-repositories)** based on your artifact type:
- PyPI for Python packages
- Maven Central for Java
- NPM Registry for NodeJS
- ECR (Amazon Elastic Container Registry)/DockerHub for Containers

**📝 Implement [Standardized Naming Conventions](#naming-conventions):**
- `nasa-[project-org]-[module-name]` for Python
- `gov.nasa.[project-org].[module-name]` for Java
- `@nasa-[project-org]/[module-name]` for NodeJS

**🚀 Set up [Automated Publishing](#automated-publishing)** using GitHub Actions

## Step-by-Step Guide

### 1. Select Package Repositories

Choose appropriate repositories based on your artifact type:

#### 1.1 Code Packages

##### Python Packages
- **Repository**: PyPI
- **Size Limit**: 60MB
- **Cost**: Free
- **Best For**: Python libraries and tools
- **Setup Steps**:
  1. Create account on PyPI
  2. Set up project with `setup.py` or `pyproject.toml`
  3. Configure automated publishing

##### Java Packages
- **Repository**: Maven Central
- **Size Limit**: No specific limit
- **Cost**: Free
- **Best For**: Java libraries and frameworks
- **Setup Steps**:
  1. Create Sonatype account
  2. Configure Maven settings
  3. Set up GPG signing

##### NodeJS Packages
- **Repository**: NPM Registry
- **Size Limit**: No specific limit
- **Cost**: Free
- **Best For**: JavaScript/TypeScript packages
- **Setup Steps**:
  1. Create NPM account
  2. Configure package.json
  3. Set up automated publishing

#### 1.2 Container Images

##### Public Containers
- **Repository**: GitHub Packages/GitLab Registry
- **Best For**: Open source projects
- **Limitations**: Higher latency for runtime

##### Private Containers
- **Repository**: Amazon ECR
- **Best For**: Production deployments
- **Features**: Low-latency pulls, private repos

#### 1.3 Test Data

##### Small Datasets (<2GB)
- **Repository**: GitHub/GitLab Releases
- **Naming**: `[project-org]-[project-module]-test-dataset`
- **Best For**: Unit test data, small samples

##### Medium Datasets (2GB-100GB)
- **Repository**: Amazon S3
- **Features**: Pre-signed URLs, bandwidth control
- **Best For**: Integration test data

##### Large Datasets (>100GB)
- **Repository**: EOSDIS DAAC (Earth data) or PDS (Planetary data)
- **Best For**: Mission data, large-scale testing

### 2. Implement Naming Conventions

#### 2.1 Package Naming
Follow standard naming conventions for each repository type:

```mermaid
graph TD
    A[Package Type] --> B{Language?}
    B -->|Python| C[nasa-project-module]
    B -->|Java| D[gov.nasa.project.module]
    B -->|NodeJS| E[_at_nasa-project/module]
```

#### 2.2 Version Naming
Use semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features, backward compatible
- PATCH: Bug fixes

### 3. Automate Publishing

#### 3.1 GitHub Actions Workflow

```yaml
name: Publish Package

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up environment
        uses: actions/setup-python@v3
        with:
          python-version: '3.x'
      - name: Build and publish
        env:
          TWINE_USERNAME: ${{ secrets.PYPI_USERNAME }}
          TWINE_PASSWORD: ${{ secrets.PYPI_PASSWORD }}
        run: |
          python -m pip install build twine
          python -m build
          python -m twine upload dist/*
```

#### 3.2 Automated Testing Integration

```mermaid
graph TD
    A[Code Change] --> B[Run Tests]
    B --> C{Tests Pass?}
    C -->|Yes| D[Build Artifact]
    C -->|No| E[Fix Issues]
    D --> F[Publish to Repository]
```

### 4. Maintain Delivery Pipeline

Regular maintenance tasks:
1. Update repository credentials
2. Monitor publishing success rates
3. Verify artifact integrity
4. Review and update workflows
5. Clean up old artifacts

### 5. GitHub Actions Workflow Example for PyPI Project Continuous Delivery
Create a `.github/workflows/pypi-cd.yml` file in your GitHub repository with the following [content](pypi-cd-template.yml):

```yaml
name: Continuous Delivery for PyPI Project

on:
  push:
    branches:
      - main  # Trigger on push to the 'main' branch
    tags:
      - 'v*.*.*'  # Trigger on tags matching semantic versioning (v1.0.0)

jobs:
  # Job to set up the environment, install dependencies, and publish to PyPI
  publish-to-pypi:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v3
      with:
        python-version: '3.x'  # Use a specific Python version, e.g., '3.8', '3.9', etc.

    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install build twine  # Required for building and publishing to PyPI

    - name: Build the package
      run: |
        python -m build  # This creates the distribution files under the 'dist' directory

    - name: Publish package to PyPI
      env:
        TWINE_USERNAME: ${{ secrets.PYPI_USERNAME }}  # Store PyPI credentials as GitHub secrets
        TWINE_PASSWORD: ${{ secrets.PYPI_PASSWORD }}
      run: |
        python -m twine upload dist/*  # Uploads the package to PyPI
```

## Frequently Asked Questions (FAQ)

**Q: How do I handle dependencies between packages?**

A: Use semantic versioning and dependency ranges to manage package relationships.

**Q: What about handling sensitive data in artifacts?**

A: Use private repositories and encrypted secrets in CI/CD pipelines.

**Q: How often should artifacts be published?**

A: Publish on every tagged release for stable versions, and optionally for development versions.

**Q: How to manage large binary artifacts?**

A: Use specialized repositories like Amazon S3 for large artifacts and reference them in package metadata.

## Credits

**Authorship**:
- [Kyongsik Yun](https://github.com/yunks128)

**Acknowledgements**:
- Thanks to the SLIM team for providing guidance

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this page. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
