# Submit a Best Practice Guide

## 1⃣️ Find or Make a Ticket

To create an issue for the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository:

1. Go to [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) on GitHub
2. Click on the "Issues" tab
3. Select "New issue" > appropriate template (e.g., "New Best Practice Guide", "Improve an Existing Best Practice Guide", or "New Process Improvement Need")
4. Enter a concise title and fill out the template
5. Add labels and screenshots as relevant
6. Review and click on "Submit new issue"
7. Engage in discussions on the ticket if needed

Follow GitHub best practices: be clear and concise.

## 2⃣️ Initialize a Draft Pull Request

To submit your solution to the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository follow the below steps. Note: we highly recommend iterating a draft pull request rather than issuing a pull request _after_ you've already written up a guide - the SLIM community can provide much better feedback as you iterate!

1. Fork [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim)
2. Clone your fork (`git clone https://github.com/YourUsername/slim.git`) on your local machine
3. Create a branch (`git checkout -b your-branch-name`)
4. Develop, iterate and commit your solution as it grows (see Step 3 below _Develop Your Contribution_)
5. Push to your fork (`git push origin your-branch-name`)
6. Within your fork, click the "Contribute" button, choose to submit a pull request and fill in details and reference any related issues. Consider keeping your a pull request a [draft pull request](https://github.blog/2019-02-14-introducing-draft-pull-requests/) while you iterate so the community knowns you're still working on the contribution. 
7. Address review feedback promptly and iterate as needed. Once your pull request is finalized, ensure it is no longer in "draft" mode. A SLIM collaborator and reviewer will help you finalize and get your contribution merged if possible. 
8. Keep your fork synchronized with the original repo using `git fetch upstream` and `git merge upstream/main`

## 3⃣️ Develop Your Contribution


When developing your contribution to the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository, consider the following sub-sections:

### Think about Automation

To make it easier for users to adopt your best practice solution, consider presenting it as templates, software automation, or starter kits. This approach allows users to quickly implement your best practice in production. By providing automated tools or templates, you can streamline the adoption process and increase the likelihood of successful implementation.

### Adhere to Folder Structure

To maintain organization and consistency within the repository, create a new folder for your best practice guide. Place this folder within the appropriate sub-folder in the `docs/guides` directory of the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository. Ensure that the folder structure aligns with the type of best practice you are developing, allowing users to easily locate and reference your guide.

For example, if you were to add a new best practice guide related to software-lifecycle security, you'd create a new folder called "my-security-guide" in the below directory:
```
docs/
├── about
├── contribute
└── guides
    ├── documentation
    ├── search.md
    └── software-lifecycle
        ├── application-starter-kits
        ├── continuous-integration
        ├── continuous-testing
        └── security
            ├── README.md
            ├── dependabot
            ├── secrets-detection
            └── my-security-guide
                └── README.md
                └── other-file.txt
                └── other-file.json
                └── other-file.jpg
```

### Use our Standard Guide Template

To maintain uniformity and ease of understanding, contributors are urged to utilize the below template when submitting their best practice guides. This structured format ensures clarity, beginning with a concise title and a one-liner description to capture the essence of the proposal. The Introduction sets the context, Prerequisites identify essential tools or knowledge, and the Step-by-Step Guide offers a methodical walkthrough, enhanced optionally with illustrative images. An FAQ section addresses potential queries, and appropriate credits acknowledge contributors and inspirations. This standard layout not only ensures that each guide retains consistency and comprehensibility, but it also facilitates smoother automation and integration within the SLIM ecosystem. 

Directions:
- Create a new Markdown file for your guide (sample below) and call it `README.md`. Its advised to create a new folder for your best practice, where you can include multiple files, templates, and miscellaneous files if needed. See the above "Adere to Folder Structure" section.
- Copy/paste the below template into the file
- Fill in the guide with your contents

```
# _Title Goes Here_

<pre align="center">One sentence description of your best practice solution.</pre>

## Introduction

**Background**: _A longer description of the problem you aim to solve and your solution. Talk about the background of why this is needed, what kind of benefits the user might enjoy, and any other background information that may be useful for the reader. Additionally, talk about the expected outcome the user can expect in implementing your solution._

**Use Cases**:
- _A list of the types of use cases where your process improvement solution will shine_
- _e.g. Making code repository README's consistent for internal and external contributors_
  
---

## Prerequisites
_List any software, hardware, or skills required to utilize the solution._

* Prerequisite 1
* Prerequisite 2
* ...

---

## Quick Start
**[Link to Process Improvement Solution (template/code sample/tool/etc.)](#)**

_A brief description of what the link provides, e.g., "Click the link above to access the full template for the README.md file."_

---

## Step-by-Step Guide

1. **Step 1**: _Brief description of the step._
![Optional Image for Step 1](imageURL_for_step1)

2. **Step 2**: _Brief description of the step._
![Optional Image for Step 2](imageURL_for_step2)

3. ...
   
---

## Frequently Asked Questions (FAQ)

- Q: Example question relevant to this guide
- A: Example answer to the question

---

## Credits 

**Authorship**:
- _List of contributing authors of this write-up who actually wrote words. Link to GitHub profiles if available, e.g. [Bugs Bunny](https://www.github.com/bbuny573429)_

**Acknowledgements**:
* Source/Organization 1 that inspired the solution or was adapted from 
* Source/Organization 2 that inspired the solution or was adapted from 
* ...
  
---

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this page. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/).
```

### Add Entry to the Registry

To document metadata about your best practice and have your best practice show up in our [search page](https://nasa-ammos.github.io/slim/docs/guides/search), add a JSON entry to the file `data/slim-registry.json` within the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository. Fill out the following fields in the example below:

```json
{
  "title": "README.md",
  "uri": "/docs/guides/documentation/readme",
  "category": "documentation",
  "description": "A template that can be used to help developers and users understand your repository's project code concisely and clearly.",
  "tags": [
    "documentation",
    "repository-setup",
    "project-template"
  ],
  "last-updated": "2023-04-27"
}
```

Customize the fields according to your best practice guide. This entry will serve as a reference for users and allow them to discover your contribution through the registry. Make sure to include relevant and accurate information to help users understand the purpose and benefits of your best practice guide.
