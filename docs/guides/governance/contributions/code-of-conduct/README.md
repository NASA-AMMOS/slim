# Code of Conduct

<pre align="center">A walkthrough on setting up a code-of-conduct policy for your project.</pre>

![code-of-conduct-screenshot-example](/img/code-of-conduct-screen.png)

*Example CODE_OF_CONDUCT.md template rendering*

## Introduction

**Background**: A Code of Conduct is important in setting the standards for interaction within a project team. It promotes a positive community environment, addressing unacceptable behaviors and providing mechanisms for conflict resolution. In this guide, we'll help you bootstrap your project with a recommended a Code of Conduct, notably the Contributor Covenant, which is widely recognized and adopted in open-source communities.

**Use Cases**:
- Establishing a respectful and inclusive team culture.
- Providing clear guidelines on acceptable behaviors and handling grievances.

---

## Prerequisites

* Understanding of community management and team dynamics.
* Familiarity with Markdown for editing documentation.

---

## Quick Start

**[⬇️ Contributor Covenant Template](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md)** ([see example](https://github.com/riverma/terraformly/blob/main/CODE_OF_CONDUCT.md))

Access the standard Contributor Covenant template for a robust Code of Conduct policy to use in your project.

**[⬇️ CODE_OF_COLLAB.md Template](https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/assets/governance/code-of-conduct/CODE_OF_COLLAB.md)**

Add a supplementary collaboration policy specifically designed for scientific research environments, addressing publication ethics, authorship, and research integrity.

**[✓️ CITATION.cff Template](#citation-file-template)**

Add a citation file to make your project properly citable in academic and research contexts.

---

## Step-by-Step Guide

1. **Team Consultation**: Discuss the adoption of the Contributor Covenant with your team, ensuring consensus.
2. **Setting Up the Document**:
   - Create a `CODE_OF_CONDUCT.md` file in your repository.
   - Copy the Contributor Covenant template into this file.
   - Replace `[INSERT CONTACT METHOD]` with appropriate contact details for reporting issues.
3. **Integrate into Your Project**:
   - Add the Contributor Covenant badge (![](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)) to your `README.md` for visibility and easy access.
    ```
    [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
    ```

---

## Code of Collaboration

In addition to the standard Contributor Covenant, you should consider adding a supplementary document: `CODE_OF_COLLAB.md`, which outlines expectations specific to scientific research collaboration.

### Step-by-Step Guide for Adding Code of Collaboration:

1. **Creating the Document**:
   - Create a `CODE_OF_COLLAB.md` file in the root of your repository.
   - Use the [template](https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/assets/governance/code-of-conduct/CODE_OF_COLLAB.md) as a starting point.
   - Customize the content to reflect your project's specific needs and context.

2. **Key Components to Include**:
   - Research integrity principles
   - Collaborative expectations
   - Authorship and publication guidelines
   - Open science commitments

3. **Integration with Your Project**:
   - Reference the `CODE_OF_COLLAB.md` in your `README.md`
   - Link to it from your `CODE_OF_CONDUCT.md` as a supplementary document

For scientific research collaboration, refer to [**CODE_OF_COLLAB.md**](https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/assets/governance/code-of-conduct/CODE_OF_COLLAB.md) to understand our **collaboration expectations** in the context of research, publication, and funding goals.

---

## Citation Guidance

Academic citation is a crucial aspect of scientific and research software projects. Making your project citable helps ensure that contributors receive appropriate credit when others build upon your work and enables tracking of your project's impact in the research community.

### Creating a CITATION.cff File

We recommend adding a `CITATION.cff` file to the root of your repository. This file follows the [Citation File Format](https://citation-file-format.github.io/) specification and provides structured metadata that can be automatically processed by citation management tools.

1. **Setting Up the Citation File**:
   - Create a `CITATION.cff` file in the root of your repository.
   - Use the [template](#citation-file-template), replacing placeholder values with your project details.
   - Include all significant contributors as authors.

2. **Integrate with Your Project**:
   - Add a citation section to your `README.md` with instructions on how to cite your work.
   - Consider connecting your repository to [Zenodo](https://zenodo.org/) to obtain a DOI.

### Citation File Template

<a id="citation-file-template"></a>

```yaml
# CITATION.cff - This file provides citation information for your project
cff-version: 1.2.0
message: "If you use this software, please cite it as below."
type: software
title: "Title of Your Software"
version: "1.0.0"
date-released: "YYYY-MM-DD"
abstract: "A brief abstract describing your software."
authors:
  - family-names: "Last Name"
    given-names: "First Name"
    affiliation: "Your Institution"
    orcid: "https://orcid.org/xxxx-xxxx-xxxx-xxxx"  # Optional
  - family-names: "David"
    given-names: "Cedric"
    affiliation: "NASA Jet Propulsion Laboratory"
    orcid: "https://orcid.org/0000-0002-0915-579X"  # Replace with actual ORCID if available
  - family-names: "Yun"
    given-names: "Kyongsik"
    affiliation: "NASA Jet Propulsion Laboratory"
    orcid: "https://orcid.org/0000-0002-1788-8502"  # Replace with actual ORCID if available
url: "https://github.com/username/repository"
repository-code: "https://github.com/username/repository"
license: "LICENSE-NAME"  # e.g., "Apache-2.0", "MIT", etc.
keywords:
  - "keyword1"
  - "keyword2"
  - "keyword3"
# For software related to published research, include the reference:
references:
  - type: "article"
    authors:
      - family-names: "Author Last"
        given-names: "Author First"
    title: "Title of the related publication"
    year: YYYY
    journal: "Journal Name"
    doi: "10.xxxx/xxxxx"  # If available
```

---

## Frequently Asked Questions (FAQ)

- Q: Why is a Code of Conduct important for projects?
- A: It establishes a standard for behavior, promoting a safe and inclusive environment for collaboration.


- Q: Can I customize the Contributor Convenant Code of Conduct template?
- A: Yes! Especially if your project is managed in a unique way.


- Q: What should be done if a team member violates the Code of Conduct?
- A: Violations should be reported to the designated contact person or team. The matter should be handled confidentially and in accordance with the guidelines set forth in the Code of Conduct.


- Q: How often should the Code of Conduct be reviewed or updated?
- A: Regularly reviewing and updating the Code of Conduct ensures it stays relevant and effective. It's advisable to reassess it annually or when significant changes occur within the project or community.

---

## Credits 

**Authorship**:
- [Rishi Verma](https://github.com/riverma)
- [Cedric David](https://github.com/c-h-david)
- [Kyongsik Yun](https://github.com/yunks128/)

**Acknowledgements**:
* Inspired by the [Contributor Covenant](https://www.contributor-covenant.org).

---

## Feedback and Contributions

Your feedback and contributions are welcome to enhance this guide. See our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).