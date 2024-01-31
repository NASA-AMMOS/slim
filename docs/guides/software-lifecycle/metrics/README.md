# Metrics Guide

<p align="center">A Comprehensive Guide for Setting up and Configuring Metrics Tracking</p>

## Introduction

This guide provides step-by-step instructions for installing and configuring [Apache DevLake](https://devlake.apache.org/) to collect and analyze software metrics. It aims to simplify the installation process and make metrics tracking efficient for developers, especially those new to metrics collection.

**Use Cases**:

- Collecting and analyzing [DORA metrics](https://devlake.apache.org/docs/DORA/) along with many others for your project.
- Creating a visual dashboard to view metrics from multiple sources (e.g., GitHub, JIRA) in one place.
- Streamlining the setup and configuration of Apache DevLake through a _single-command_ setup step.
- Gain insight into organizational and project performance for software development and the overall software lifecycle.

---

## Prerequisites

- Familiarity with [Docker](https://docs.docker.com/engine/install/)
- A familiarity with validated software metrics is not required for this tool but it is recommended

---

## Quick Start

We've created a 1-step command to quickly deploy DevLake on one of your servers (or locally for testing). Follow the guidance below:

**Run the Setup Script (_Ensure Docker is running on your system before running this command_):**

- This script follows the steps listed [here](https://devlake.apache.org/docs/GettingStarted/DockerComposeSetup).

-- TODO -- Add a proper link to the script without the commit hash

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/ddalton-jpl/slim/issue-117/docs/guides/software-lifecycle/metrics/metrics-starter-kit/install_devlake.sh)"
```

**Why We Chose This Tool:**

- [Trade Study Documentation](https://github.com/NASA-AMMOS/slim/issues/117#issuecomment-1802302091)

---

## Step-by-Step Configuration Guide

1. **Setup a Project:** Follow [this tutorial](https://devlake.apache.org/docs/Configuration/Tutorial/) to set up a project on DevLake.

---

## Frequently Asked Questions (FAQ)

- **Q:** How do I customize the DevLake Quick Start script for more functionality?
- **A:** If you have already provided DevLake with a data source, you can further configure your dashboard by following [this guide](https://devlake.apache.org/docs/Configuration/Dashboards/GrafanaUserGuide). Use simple queries to gather the information you need.

---

## Credits

**Authorship**:

- Dillon Dalton [ddalton-jpl](https://github.com/ddalton-jpl)

---

## Feedback and Contributions

We value your feedback and welcome contributions to improve this guide. Please see our [contribution guidelines](https://link-to-contribution-guidelines).

---

**Acknowledgements**:

- The [NISAR](https://nisar.jpl.nasa.gov/) and [SWOT](https://swot.jpl.nasa.gov/) missions.
