---
title: TESTING.md (Template)
sidebar_label: TESTING.md (Template)
position: 1
---

```markdown
# [INSERT PROJECT NAME HERE] Testing

## Introduction
This document provides an overview of the testing architecture for [INSERT PROJECT NAME HERE]. It encompasses continuous testing concepts such as testing across the software development lifecycle as well as automated execution of tests through automation. 

---

## Types of Testing

The below list of tests are included in our testing setup. Further details are provided below.

- [ ] Unit Tests
- [ ] System Tests
  - [ ] Integration Tests
  - [ ] Security Tests
  - [ ] Performance Tests
  - [ ] User Interfaces Tests

### Unit Tests

Our unit tests ensure code is tested at a function, method, or sub-module level. 

View existing to add new tests to:

**Location(s):**
- [INSERT PATH TO UNIT TEST FOLDER ON REVISION CONTROL]
- [INSERT PATH TO UNIT TEST FOLDER ON REVISION CONTROL]
- ...

View or modify the testing schedule per:

**Testing Frequency:**
- [INSERT TRIGGER OF WHAT KICKS OFF YOUR TESTS, E.G. CODE CHANGES, COMMITS, ETC.]
- [INSERT TIMING OF WHEN YOUR TESTS KICK OFF, E.G. NIGHTLY, EVERY WEEK, ETC.]

#### Contributing Unit Tests

To contribute unit tests, we recommend:
- Leveraging the [INSERT YOUR UNIT TESTING FRAMEWORK OF CHOICE] framework
  - [INSERT/LINK TO DIRECTIONS FOR USING UNIT TESTING FRAMEWORK]
- Ensuring your unit tests:
  - Test every non-trivial function or method in your code
  - Test conditions including malformed arguments and null conditions
  - [INSERT OTHER CONDITIONS YOU THINK ARE IMPORTANT]

### System Tests

Our system tests are intended to test the overall software application in an integrated form. System integration tests look for:
- Smooth integration of software components
- Security
- Performance
- Requirements
- User Interface (UI) and User Experience (UX)

#### Integration Tests

Our integration tests ensure software interacts with its environment as well as other software well.

View existing to add new tests to:

**Location(s):**
- [INSERT PATH TO INTEGRATION TEST FOLDER ON REVISION CONTROL]
- [INSERT PATH TO INTEGRATION TEST FOLDER ON REVISION CONTROL]
- ...

View or modify the testing schedule per:

**Testing Frequency:**
- [INSERT TRIGGER OF WHAT KICKS OFF YOUR TESTS, E.G. CODE CHANGES, COMMITS, ETC.]
- [INSERT TIMING OF WHEN YOUR TESTS KICK OFF, E.G. NIGHTLY, EVERY WEEK, ETC.]

##### Contributing Integration Tests

To contribute integration tests, we recommend:
- Leveraging the [INSERT YOUR INTEGRATION TESTING FRAMEWORK OF CHOICE] framework
  - [INSERT/LINK TO DIRECTIONS FOR USING INTEGRATION TESTING FRAMEWORK]
- Ensuring your integration tests:
  - Integration (build) your software from components to a whole
  - Test the interaction between software components

#### Security Tests

Our security tests ensure our software is the least vulnerable it can be to potential threats.

We leverage the following frameworks for security tests:

**Security Testing Frameworks(s):**
- [INSERT NAME AND LINK TO SECURITY FRAMEWORK]
- [INSERT NAME AND LINK TO SECURITY FRAMEWORK]
- ...

View or modify the testing schedule per:

**Testing Frequency:**
- [INSERT TRIGGER OF WHAT KICKS OFF YOUR TESTS, E.G. CODE CHANGES, COMMITS, ETC.]
- [INSERT TIMING OF WHEN YOUR TESTS KICK OFF, E.G. NIGHTLY, EVERY WEEK, ETC.]

##### Adhering to Security Best Practices

To adhere to security best practices, we recommend:
- Leveraging the [INSERT YOUR DEVELOPER-ORIENTED SECURITY TESTING FRAMEWORK OF CHOICE] framework
  - [INSERT/LINK TO DIRECTIONS FOR USING SECURITY TESTING FRAMEWORK]
- Ensuring your code follows security best practices by:
  - Ensuring your code does not expose one of the Open Worldwide Application Security Project [(OWASP) Top 10 Vulnerabilities](https://owasp.org/www-project-top-ten/)
  - Has the latest references to external dependencies and libraries

#### Performance Tests

Our performance tests ensure our software is robustly designed to scale and deal with expected surges in resource utilization.

View existing to add new tests to:

**Location(s):**
- [INSERT PATH TO PERFORMANCE TEST FOLDER ON REVISION CONTROL]
- [INSERT PATH TO PERFORMANCE TEST FOLDER ON REVISION CONTROL]
- ...

View or modify the testing schedule per:

**Testing Frequency:**
- [INSERT TRIGGER OF WHAT KICKS OFF YOUR TESTS, E.G. CODE CHANGES, COMMITS, ETC.]
- [INSERT TIMING OF WHEN YOUR TESTS KICK OFF, E.G. EVERY WEEK, MONTHLY, ETC.]

##### Contributing Performance Tests

To contribute performance tests, we recommend:
- Leveraging the [INSERT YOUR PERFORMANCE TESTING FRAMEWORK OF CHOICE] framework
  - [INSERT/LINK TO DIRECTIONS FOR USING PERFORMANCE TESTING FRAMEWORK]
- Ensuring your performance tests:
  - Scale to 2X of your expected user utilization or resource utilization of demand
  - Test for failure conditions such as:
     - Out of memory, disk errors
     - Loss of underlying compute capacity errors (i.e. shutdown, reboots)
     - Surges in user interaction requests or external automated requests

#### User Interface (UI) Tests

Our User Interface (UI) tests ensure our software adheres to users' needs.

View existing to add new tests to:

**Location(s):**
- [INSERT PATH TO UI TEST FOLDER ON REVISION CONTROL]
- [INSERT PATH TO UI TEST FOLDER ON REVISION CONTROL]
- ...

View or modify the testing schedule per:

**Testing Frequency:**
- [INSERT TIMING OF WHEN YOUR TESTS KICK OFF, E.G. QUARTERLY, UPON RELEASE CANDIDATES, ETC.]

##### Contributing UI Tests

To contribute UI tests, we recommend:
- Leveraging the [INSERT YOUR UI TESTING FRAMEWORK OF CHOICE] framework
  - [INSERT/LINK TO DIRECTIONS FOR USING UI TESTING FRAMEWORK]
- Ensuring your UI/UX tests:
  - Test user interfaces such as command-lines, APIs, and graphical user interfaces (GUIs)
  - Test compliance against user interface policies like [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/)
```