---
title: TESTING.md (Example)
sidebar_label: TESTING.md (Example)
---

# Jupiter3D Testing

## Introduction
This document provides an overview of the testing architecture for Jupiter3D. It encompasses continuous testing concepts such as testing across the software development lifecycle as well as automated execution of tests through automation.

---

## Testing Categories

The below list of test categories are included in our testing setup. Further details are provided below.

- [ ] Static Code Analysis
- [x] Unit Tests
- [x] Security Tests
- [ ] Build Tests
- [ ] Acceptance Tests
- [x] Integration Tests
- [x] Performance Tests
- [x] Usability Tests

### Unit Tests

#### Main Tests

- Location: `./tests/test_main.py`
- Purpose: To test our main script's functions and methods.
- Running Tests:
  - Manually:
    1. Navigate to the project root directory in the command line.
    2. Execute `pytest ./tests/test_main.py`.
    3. View Results: Results will appear in the command-line output or can be formatted into a report using the `pytest-html` plugin.
  - Automatically:
    - Frequency:
      - Triggered by code changes and commits to the `src/my_package/main.py` file on GitHub.
      - Runs during nightly builds with other unit tests.
    - Results Location: [GitHub Actions Unit Test Results](https://github.com/myorg/myrepo/actions/workflows/unit-tests.yml)
- Contributing:
  - Framework Used: [PyTest](https://docs.pytest.org/en/8.2.x/)
  - Tips:
    - Test every non-trivial function or method in your code
    - Test conditions including malformed arguments and null conditions

#### Models

- Location: `./tests/test_model_*.py`
- Purpose: To test our 3D model rendering code for integrity and functionality
- Run Tests:
  - Manually:
    1. Navigate to the project root directory in the command line.
    2. Execute `pytest ./tests/test_model_*.py`.
    3. View Results: Results will appear in the command-line output or can be formatted into a report using the `pytest-html` plugin.
  - Automatically:
    - Frequency:
      - Triggered by code changes and commits to the `src/my_package/test_model_*.py` file on GitHub.
      - Runs during nightly builds with other unit tests.
    - Location: [GitHub Actions Unit Test Results](https://github.com/myorg/myrepo/actions/workflows/unit-tests.yml)
  - Contributing:
    - Framework: [PyTest](https://docs.pytest.org/en/8.2.x/)
    - Tips:
      - Test each model for edge cases like anti-meridian lines or poles
  
### Security Tests

#### Dependabot
- Purpose: Ensure our software dependencies are being scanned for vulnerabilities using Dependabot
- Running Tests:
  - Automatically:
    - Frequency: Daily
    - Results Location: Security tab on repository's GitHub website 

### Integration Tests

#### Web App API
- Location: `[./tests/integration/web]`
- Purpose: Ensure Web UI software interacts smoothly with other software.
- Running Tests:
  - Manually:
    1. Install and configure Selenium WebDriver for your target browsers.
    2. Run `python ./tests/integration/web/test_suite.py`
    3. Review the test execution logs and screenshots captured during the test run.
  - Automatically:
    - Frequency:
      - Nightly builds
    - Results Location: [GitHub Actions Integration Test Results](https://github.com/myorg/myrepo/actions/workflows/integration-tests.yml)
- Contributing:
  - Framework Used: Selenium
  - Tips:
    - Test the interaction between software components and external APIs

### Performance Tests

#### Chaos Testing
- Location: `./tests/performance/chaos`
- Purpose: Ensure the software is robustly designed to scale and handle expected failures.
- Running Tests:
  - Manually:
    1. Navigate to `./tests/performance/chaos`.
    2. Execute the relevant test scripts for stress / chaos testing.
    3. View results in the output logs or generated reports.
  - Automatically:
    - Frequency:
      - Triggered by significant changes.
      - Quarterly stress tests.
    - Results Location: test deployment machine
- Contributing:
  - Framework Used: Chaos Monkey
  - Tips:
    - Consider testing both typical and peak usage scenarios.
    - Ensure that performance tests represent real-world conditions as closely as possible.
    - Validate resource utilization thresholds to identify bottlenecks proactively.

### User Interface (UI) Tests

#### UI User Experience
- Location: `./tests/ui`
- Purpose: Ensure that the software meets users' needs and expectations through robust UI design.
- Running Tests:
  - Manually:
    1. Navigate to `./tests/ui`.
    2. Execute the relevant UI test scripts.
    3. View results in the output logs or generated UI testing reports.
  - Automatically:
    - Frequency:
      - Prior to major updates and releases.
      - Quarterly user experience reviews.
    - Results Location: [GitHub Actions UI Test Results](https://github.com/myorg/myrepo/actions/workflows/ui-tests.yml)
- Contributing:
  - Framework Used: Selenium
  - Tips:
    - Ensure your tests validate compliance with [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/).
