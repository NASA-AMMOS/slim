# Starter Kits

This page contains starter kit information, which represent templates, code and configuration to help you get started quickly with documentation best practices described in this overall guide. Please see categories and links below for details. 

## README

This section contains links to sample `README.md` templates that can be used to help developers and users understand your repository concisely and clearly. For each readme template provided below, see the `Markdown` version for the raw template which you can copy/paste into your own `README.md`, and see the `Demo` for a working example of the template in action.

### Software Project Template

This template is meant for general software projects `README.md` files, including both interpreted as well as compiled language code. 

Starter Kit:
- [Markdown](https://github.com/nasa-ammos/slim/blob/main/documentation/starter-kits/READMEs/README-sw-proj-template.md) of template
- [Demo](https://github.com/riverma/terraformly/blob/main/README.md) of template

To leverage this template, make sure to do the following:
1. Talk with your team about leveraging this template, and seek wide agreement before you adopt
2. Copy the template text, and place in a file within your repository called `README.md` 
3. Search and replace the `[INSERT ...` text within the file with specifics for your project
4. Add a link to the `CONTRIBUTING.md` to your `README.md` file within the `Contributing` section

This starter kit template was developed by evaluating best `README.md` practices in the following organizations:
- NASA-AMMOS
- ReactJS 
- VueJS
- Apache Kafka

## Code of Conduct

The code of conduct is typically a document that provides guidance to a project team on *how* the team members should interact with each other. It identifies behaviors that are helpful for building a better development community, provides contact information for addressing grievances (should they arise), and finally lists key responses that team leadership should / will take for dealing with unexpected behavior. Below are some examples to expedite the incorporation of a code of conduct.

### Contributor Covenant Template

This is a community-developed code of conduct that has been [adopted by many open source projects](https://www.contributor-covenant.org/adopters/). It provides a fairly standard code of conduct that (1) explicitly identifies problematic behavior that's deemed unacceptable in team interactions, (2) who to contact if problematic behavior is identified, and (3) tiers of how team leadership can respond. 

Starter Kit:
- [Markdown](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) of template
- [Demo](https://github.com/riverma/terraformly/blob/main/CODE_OF_CONDUCT.md) of template and [demo](https://github.com/riverma/terraformly) of badge
- [Webpage](https://www.contributor-covenant.org) for more information

To leverage this template, make sure to do the following:
1. Talk with your team about leveraging this template, and seek wide agreement before you adopt
2. Copy the template text, and place in a file within your repository called `CODE_OF_CONDUCT.md` 
3. Search and replace the `[INSERT CONTACT METHOD]` text within the file with a person, private e-mail list, or other form of contact for grievances to be addressed to
4. Add the contributor covenant badge (![](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)) to your `README.md` file (example below)
```
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
```

## Contributing Guides

A contribution guide is an important document directed at *new contributors* to your project - to help them in understanding what and how they may contribute. It can be used to outline expected requirements prior to contributions (i.e. acceptance of licensing terms, signing off on any developer agreements required) as well as to ensure the quality of contributions are in-line with expected project norms. If a developer asks how to contribute, please point them to this guide. This guide also itemizes essential ingredients necessary for a successful patch submission.

We provide a sample contribution guide template below, but please keep in mind to:
- Modify and adapt to your project as needed. You may not need all features of the template guide. 
- Replace all instances of `[INSERT ...]` within the template with your project's specific environment.

### Contributing Guide Template

This template covers the following contributions areas:
- Prerequisites to contributing
- Development process
- Ways to contribute: issues, code, documentation, media and questions, among other types of contributions

Starter Kit:
- [Markdown](https://github.com/nasa-ammos/slim/blob/main/documentation/starter-kits/CONTRIBUTING/CONTRIBUTING.md) of template
- [Demo](https://github.com/riverma/terraformly/blob/main/CONTRIBUTING.md) of template

To leverage this template, make sure to do the following:
1. Talk with your team about leveraging this template, and seek wide agreement before you adopt
2. Copy the template text, and place in a file within your repository called `CONTRIBUTING.md` 
3. Search and replace the `[INSERT ...` text within the file with specifics for your project
4. Add a link to the `CONTRIBUTING.md` to your `README.md` file within the `Contributing` section

This template was influenced by the following sources:
- [Open Source Guide](https://opensource.guide/how-to-contribute/)
- [Facebook React Contribution Guide](https://reactjs.org/docs/how-to-contribute.html)
- [NASA-AMMOS Repositories](https://github.com/NASA-AMMOS)
- [Kubernetes Contributors Guide](https://github.com/kubernetes/community/tree/master/contributors/guide)
- [SciKit Learn Contributors Guide](https://scikit-learn.org/dev/developers/contributing.html)
- [Django Contributors Guide](https://docs.djangoproject.com/en/dev/internals/contributing)

## Change Log

A change log provides a *human readable* list of significant changes, additions, deprecations, removals for software over time. It is meant to be able to be read by *people*. Change logs should be documented within a file called `CHANGELOG.md` and be updated per key release. See [semantic release](https://semver.org) for guidance on releasing cycles and versioning of your software. 

⚠️ A `CHANGELOG.md` can replicate wording from a releases page (e.g. GitHub Releases), but should not be left out *in place of* a releases page. Down-stream inheritors of your software may not have access to your releases page, and will expect a `CHANGELOG.md` to be present as part of your software distribution.

### Keep a Changelog

This change log standard seeks to provide a template for *human readable* change logs, among other key guidance on the change logging process.

Starter Kit:
- [Guidance](https://keepachangelog.com/en/1.0.0/#how)
- [Demo 1](https://github.com/riverma/terraformly/blob/main/CHANGELOG.md)
- [Demo 2](https://github.com/olivierlacan/keep-a-changelog/blob/main/CHANGELOG.md)
- [Webpage](https://keepachangelog.com/en/1.0.0/)

To leverage this template, make sure to do the following:
1. Talk with your team about leveraging this template, and seek wide agreement before you adopt
2. Copy the demo `CHANGELOG.md` above, and place in a file within your repository called `CHANGELOG.md` 
3. Edit the `CHANGELOG.md` file with your specific release information. If you have many historic releases prior to the creation of this file, mark the latest release as the first entry, and commit to updating this for future releases as the happen.
4. Add an entry to your `README.md` under the `Changelog` section to point to your `CHANGELOG.md` file.

## Issue Templates

Issue tickets help development teams keep the language of bug, feature, and other types of issues readable and consistent. Templates appear whenever a person submits a new issue, and helps guide that person in providing the key information that gives developers context for a given issue.

### GitHub Issues (Markdown)

GitHub issue markdown templates provide pre-filled structure, in markdown format, for people to enter issue information. Please see the [documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates) on GitHub templates for more details.

Starter Kits:
- [Bug Report](https://github.com/nasa-ammos/slim/blob/main/documentation/starter-kits/ISSUE_TEMPLATES/github/bug_report.md)
- [New Feature](https://github.com/nasa-ammos/slim/blob/main/documentation/starter-kits/ISSUE_TEMPLATES/github/new_feature.md)


To leverage these template, make sure to do the following:
1. Talk with your team about leveraging this template, and seek wide agreement before you adopt
2. Create a new folder within your GitHub repository with the following path: `.github/ISSUE_TEMPLATE`
3. Copy the Bug Report and New Feature template files above into the following paths:
   1. `.github/ISSUE_TEMPLATE/bug_report.md`
   2. `.github/ISSUE_TEMPLATE/new_feature.md`
4. Commit the above two files to the `main` branch
5. Navigate to your issues tab within GitHub, and you should see options to use your new templates appear

### GitHub Issues (Forms)

GitHub issue forms are a method to provide a _form like_ experience when filling out a new issue ticket. Please see the [documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#creating-issue-forms) on GitHub forms for more details.

⚠️ NOTE: GitHub issue forms are currently in beta. When using a third-party issue tracking system like ZenHub, the templates will not be usable in that system. 

Starter Kits:
- [Bug Report](https://github.com/nasa-ammos/slim/blob/main/documentation/starter-kits/ISSUE_TEMPLATES/github/bug_report.yml)
- [New Feature](https://github.com/nasa-ammos/slim/blob/main/documentation/starter-kits/ISSUE_TEMPLATES/github/new_feature.yml)


To leverage these template, make sure to do the following:
1. Talk with your team about leveraging this template, and seek wide agreement before you adopt
2. Create a new folder within your GitHub repository with the following path: `.github/ISSUE_TEMPLATE`
3. Copy the Bug Report and New Feature template files above into the following paths:
   1. `.github/ISSUE_TEMPLATE/bug_report.yml`
   2. `.github/ISSUE_TEMPLATE/new_feature.yml`
4. Commit the above two files to the `main` branch
5. Navigate to your issues tab within GitHub, and you should see options to use your new templates appear

## Pull Request Templates

Pull requests are the currency for how contributions are made to projects. Having a pre-filled out pull request template offers guidance to your potential developers on how to contribute to your project.

### GitHub Pull Request Template (General)

GitHub provides a mechanism to automatically display a template whenever a potential contributor proposes a pull request to your repository. Please see the [documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository) on GitHub for details. 

Starter Kits:
- [Pull Request Template](https://github.com/nasa-ammos/slim/blob/main/documentation/starter-kits/ISSUE_TEMPLATES/github/PULL_REQUEST_TEMPLATE.md)

To leverage this template, make sure to do the following:
1. Talk with your team about leveraging this template, and seek wide agreement before you adopt
2. Create a new folder within your GitHub repository with the following path: `.github/`
3. Copy the Pull Request Template template file above into the following path:
   1. `.github/PULL_REQUEST_TEMPLATE.md`
4. Commit the above file to the `main` branch
5. Whenever you propose a new pull request, your new templates should appear in the text box