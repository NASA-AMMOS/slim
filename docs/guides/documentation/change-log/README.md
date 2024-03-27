# Change Log

<pre align="center">A guide for setting up a log to document software changes in a human-centric format.</pre>

![changelog-screenshot-example](/img/changelog-screen.png)

*Example CHANGELOG.md template rendering*

## Introduction

**Background**: A change log is a vital tool for documenting significant changes in software over time in a format accessible to humans. It plays a critical role in conveying the evolution of software, including additions, deprecations, and removals. This guide outlines the best practices for maintaining a `CHANGELOG.md` file, complementing release pages and enhancing software distribution transparency.

**Use Cases**:
- Documenting software changes for easy understanding and tracking.
- Enhancing transparency in software development and release cycles.
- Storing the history of significant changes independent of code hosts like GitHub.com
---

## Prerequisites

* Familiarity with semantic versioning and release cycles.
* Basic knowledge of Markdown formatting.

---

## Quick Start

**[⬇️ Keep a Changelog](https://keepachangelog.com/en/1.0.0/#how)** ([see example](https://github.com/riverma/terraformly/blob/main/CHANGELOG.md))

Download a template for creating a human-readable change log for your software project.

---

## Step-by-Step Guide

1. **Team Agreement**: Discuss the importance of a change log with your team, emphasizing its value for transparency and communication.
2. **Creating the Change Log**:
   - Start a `CHANGELOG.md` in your repository.
   - See demo use of the templates like [Demo 1](https://github.com/riverma/terraformly/blob/main/CHANGELOG.md) or [Demo 2](https://github.com/olivierlacan/keep-a-changelog/blob/main/CHANGELOG.md) as a base.
   - Customize the file with your project's release information.
3. **Integrating with Project Documentation**:
   - Link to the `CHANGELOG.md` from your project’s `README.md` to enhance visibility.

---

## Frequently Asked Questions (FAQ)

- Q: Why is a `CHANGELOG.md` crucial even if there's a GitHub auto-generated release changes page?
- A: It ensures future-proof accessibility of change information, especially for users who may not have access to the project's release page or if the software has changed hands. Moreover, its meant to be feature-centric and designed for people to understand, rather than GitHub's commit-oriented change reports. 

---

## Credits 

**Authorship**:
- [Rishi Verma](https://github.com/riverma)

**Acknowledgements**:
* This guide draws from the ["Keep a Changelog"](https://keepachangelog.com) standard and examples from various open source projects.

---

## Feedback and Contributions

Feedback and contributions are encouraged to refine this guide. See our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
