---
sidebar_position: 1
---

# Submit a Best Practice Guide

Are you interested in submitting a best practice guide to the SLIM project? You've come to the right place!

Below, we outline the important steps involved - including things like making a ticket, making your contribution, and reviewing / disseminating it. 

See [Our Process](/slim/docs/about/#our-process) for a high-level overview of how SLIM best practice guides are developed. We use the open source contribution model to ideate, develop, review, and disseminate best practice guides and standards. 

## 1⃣️ Find or Make a Ticket

The first step in making a contribution to SLIM is to make or select a ticket. This is important so that you don't inadvertently duplicate work that's already done / being done and help communicate your idea with the community. Also, not every best practice solution is appropriate for SLIM; therefore, its always a good idea to talk to the community first before you make a pull request. 

To create an issue for the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository:

1. Go to [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) on GitHub
2. Click on the "Issues" tab
3. Select "New issue" > appropriate template (e.g., "New Best Practice Guide", "Improve an Existing Best Practice Guide", or "New Process Improvement Need")
   - NOTE: the "New Process Improvement Need" ticket type is intended for documenting needs only, rather than solution ideas.
4. Enter a concise title and fill out the template
5. Add labels and screenshots as relevant
6. Review and click on "Submit new issue"
7. Engage in discussions on the ticket if needed

Follow GitHub best practices: be clear and concise.

## 2⃣️ Initialize a Draft Pull Request

To submit your solution to the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository follow the below steps. Note: we highly recommend iterating a draft pull request rather than issuing a pull request _after_ you've already written up a guide - the SLIM community can provide much better feedback as you iterate! We also recommend making a fork for the SLIM repository to ensure you can demo your guide easily from your own GitHub account when the guide is ready. 

1. Fork [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim)
2. Clone your fork (`git clone https://github.com/YourUsername/slim.git`) on your local machine
3. Use the `main` branch on your fork - this allows you to host a copy of, and demo the SLIM website at `https://<your-username>.github.io/slim`
4. Develop, iterate and commit your solution as it grows (see Step 3 below _Develop Your Contribution_)
5. Within your fork, click the "Contribute" button, choose to submit a pull request and fill in details and reference any related issues. Consider keeping your a pull request a [draft pull request](https://github.blog/2019-02-14-introducing-draft-pull-requests/) while you iterate so the community knowns you're still working on the contribution. 
6. Address review feedback promptly and iterate as needed. Once your pull request is finalized, ensure it is no longer in "draft" mode. A SLIM collaborator and reviewer will help you finalize and get your contribution merged if possible. 
7. Keep your fork synchronized with the original repo using `git fetch upstream` and `git merge upstream/main`

## 3⃣️ Develop Your Contribution


When developing your contribution to the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository, consider the following sub-sections:

### Think about Automation

To make it easier for users to adopt your best practice solution, consider presenting it as templates, software automation, or starter kits. This approach allows users to quickly implement your best practice in production. By providing automated tools or templates, you can streamline the adoption process and increase the likelihood of successful implementation.

Read more about our automation philosophy in [Develop Standards & Best Practices](/slim/docs/about/#2-develop-standards--best-practices). 

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

## 4⃣️ Get Feedback For Your Contribution

Once you've created a contribution you're happy about, it's important to gather feedback from the SLIM community. This will help ensure that your contribution aligns with the project's standards and meets the community's needs.

First ensure your pull-request is ready for review:

1. Ensure your contribution is viewable via `https://<your-username>.github.io/slim`. You may need to visit your Settings page for the repository and the "Pages" sub-section to configure GitHub Pages hosting. This should be automatically set up for you, but if you need help troubleshooting please visit [Docusaurus' Deploying to GitHub Pages](https://docusaurus.io/docs/deployment#deploying-to-github-pages). 
2. Within your fork (created in step 2 above) on GitHub.com, click the "Contribute" button. Choose to submit a pull request and fill in details and reference any related issues. Provide a link to the live, demo website guide page on your fork!

It's now important to request feedback from the community. To request feedback, you can do the following:

- **SLIM Reviewers**: Tag `@slim-community` or `@slim-committers` in your pull request for feedback for faster responses.
- **Slack/E-mail/Discussions**: Post a message in the Slack channels, over e-mail, or other mediums. Use the provided template below as a guide for your message. Don't forget to include a link to your pull request or issue for easy reference.

    ```plaintext
    As part of the Software Lifecycle Improvement & Modernization (SLIM) project, we’ve recently created a pull request (PR) introducing best practices for [INSERT GUIDE NAME HERE]. The goal is to [INSERT BRIEF GOAL HERE].

    **Purpose of this Message:**
    I'm reaching out to you all to get your thoughts on [INSERT GUIDE NAME HERE] for the SLIM project.
    The goal for the guide is to [INSERT BRIEF GOAL STATEMENT HERE].

    **Proposal Details:**
    Pull Request: [INSERT PULL REQUEST URL HERE]
    Live Demo Here: [INSERT URL TO YOUR LIVE DEMO OF THE PROPOSED GUIDE (USUALLY ON YOUR GITHUB FORK)]
    
    **Your Input Matters:**
    Your comments and insights would be extremely valuable. Please consider adding a comment to the PR about your thoughts!
    Thank you in advance for your support and feedback!
    ```

Feedback from the community is crucial for the refinement of your contribution and ensures its successful integration into the SLIM project.

## 5⃣️ Merge Your Contribution

The final step in the contribution process involves the review and potential merging of your pull request by SLIM committers and reviewers. This process includes:

1. **Review by SLIM Committers and Reviewers**: Your pull request will be thoroughly reviewed by the project's committers and reviewers. They will provide feedback, suggest improvements, or approve the changes.

2. **Iterate as Required**: Based on the feedback, you may need to make further adjustments to your contribution. Promptly addressing these suggestions is crucial for the progression of your pull request.

3. **Final Decision**: Once your pull request meets all the criteria and standards of the SLIM project, the committers will decide to merge your contribution into the main branch. Alternatively, they might request additional changes if needed.

This process ensures that every contribution is in line with the project's goals, standards, and quality expectations, contributing to the overall excellence and reliability of the SLIM project.
