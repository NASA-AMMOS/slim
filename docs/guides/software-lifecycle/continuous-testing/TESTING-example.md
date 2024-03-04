---
title: TESTING.md (Example)
sidebar_label: TESTING.md (Example)
---

# Jupiter3D Testing

## Introduction
This document provides an overview of the testing architecture for Jupiter3D. It encompasses continuous testing concepts such as testing across the software development lifecycle as well as automated execution of tests through automation.

---

## Types of Testing

The below list of tests are included in our testing setup. Further details are provided below.

- [x] Unit Tests
- [x] System Tests
  - [x] Integration Tests
  - [x] Security Tests
  - [x] Performance Tests
  - [x] User Interfaces Tests

### Unit Tests

Our unit tests ensure code is tested at a function, method, or sub-module level.

**Location(s):**
- `./tests/unit`

**Testing Frequency:**
- Triggered by code changes and commits.
- Nightly builds.

#### Contributing Unit Tests

To contribute unit tests, we recommend:
- Leveraging the PyTest framework
  - [PyTest Usage Guide](https://docs.pytest.org/en/latest/getting-started.html)
- Ensuring your unit tests:
  - Test every non-trivial function or method in your code.
  - Test conditions including malformed arguments and null conditions.
  - Include tests for expected failures and edge cases.

### System Tests

Our system tests are intended to test the overall software application in an integrated form. System integration tests look for:
- Smooth integration of software components.
- Security.
- Performance.
- Requirements.
- User Interface (UI) and User Experience (UX).

#### Integration Tests

Our integration tests ensure software interacts with its environment as well as other software well.

**Location(s):**
- `./tests/system/integration`

**Testing Frequency:**
- Triggered by major code changes and commits.
- Weekly builds.

##### Contributing Integration Tests

To contribute integration tests, we recommend:
- Leveraging the Selenium framework for web UIs
  - [Selenium Documentation](https://www.selenium.dev/documentation/en/)
- Ensuring your integration tests:
  - Simulate real-world user scenarios and workflows.
  - Test the interaction between software components and external APIs.

#### Security Tests

Our security tests ensure our software is the least vulnerable it can be to potential threats.

**Security Testing Frameworks(s):**
- OWASP ZAP for dynamic analysis.
- GitHub.com Dependabot for automated dependency and security scanning.

**Testing Frequency:**
- Triggered by code changes and commits.
- Bi-weekly automated scans.

##### Adhering to Security Best Practices

To adhere to security best practices, we recommend:
- Regularly using GitHub Dependabot to check for vulnerabilities in dependencies.
- Ensuring your code does not expose one of the [OWASP Top 10 Vulnerabilities](https://owasp.org/www-project-top-ten/).

#### Performance Tests

Our performance tests ensure our software is robustly designed to scale and deal with expected surges in resource utilization.

**Location(s):**
- `./tests/system/performance`

**Testing Frequency:**
- Triggered by significant changes.
- Monthly stress tests.

##### Contributing Performance Tests

To contribute performance tests, we recommend:
- Leveraging Apache JMeter for load and stress testing.
- Using Chaos Monkey for simulating system failures and resilience testing.
- Ensuring your performance tests cover scenarios such as out of memory, disk errors, and surges in user interaction.

#### User Interface (UI) Tests

Our User Interface (UI) tests ensure our software meets users' needs and expectations.

**Location(s):**
- `./tests/system/ui`

**Testing Frequency:**
- Prior to major updates and releases.
- Quarterly user experience reviews.

##### Contributing UI Tests

To contribute UI tests, we recommend:
- Utilizing tools like Selenium for automated UI testing.
- Ensuring your tests validate compliance with [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/).
- Conducting user experience testing sessions to gather feedback on the software's usability and accessibility.
