# Submit a Best Practice Guide

## 1⃣️ Find or Make a Ticket

To create a GitHub ticket for the repository [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim), follow these steps:

1. **Navigate to the repository**: Visit the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository on GitHub.

2. **Go to the "Issues" tab**: Click on the "Issues" tab located near the top of the repository page.

3. **Click on "New issue"**: On the right-hand side, click on the green "New issue" button.

4. **Choose a template**: Select the appropriate template for your ticket from the available options: "Best Practice Need" or "Website Issue." Choose the template that best fits the issue you want to report.

5. **Provide a title**: Enter a descriptive and concise title for your ticket that summarizes the issue.

6. **Fill out the template**: Carefully fill out the sections within the chosen template. Provide as much relevant information as possible to help others understand the issue and provide appropriate assistance.

7. **Add labels (if applicable)**: Apply relevant labels to your ticket to categorize it. For example, you might use labels like "bug," "enhancement," or "help wanted" to provide further context to your issue.

8. **Attach screenshots (if necessary)**: If visual information is relevant to your issue, attach screenshots or images that help illustrate the problem. Click on "Attach files" to add the necessary files.

9. **Preview and submit**: Review your ticket to ensure all information is accurate and complete. Once you are satisfied, click on "Submit new issue" to create your ticket.

10. **Engage with the community**: Stay engaged with the ticket by responding to any follow-up questions or discussions from other contributors. This helps to clarify details and collaborate effectively.

Remember to follow best practices when creating a GitHub ticket, such as providing clear and concise information, including relevant details, and maintaining a respectful and collaborative tone throughout the process.

## 2⃣️ Develop Your Contribution


When developing your contribution to the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository, consider the following sub-sections:

### Think about Automation

To make it easier for users to adopt your best practice solution, consider presenting it as templates, software automation, or starter kits. This approach allows users to quickly implement your best practice in production. By providing automated tools or templates, you can streamline the adoption process and increase the likelihood of successful implementation.

### Adhere to Folder Structure

To maintain organization and consistency within the repository, create a new folder for your best practice guide. Place this folder within the appropriate sub-folder in the `docs/guides` directory of the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository. Ensure that the folder structure aligns with the type of best practice you are developing, allowing users to easily locate and reference your guide.

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

To document metadata about your best practice, add a JSON entry to the file `data/slim-registry.json` within the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository. Fill out the following fields in the example below:

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

## 3⃣️ Make a Pull Request

To contribute your solution to the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository, follow these best practices for creating a pull request:

1. **Fork the repository**: Start by forking the [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository to your GitHub account. This creates a copy of the repository under your control.

2. **Clone the repository**: Clone your forked repository to your local development environment using the Git command `git clone https://github.com/YourUsername/slim.git`. Replace `YourUsername` with your actual GitHub username.

3. **Create a new branch**: Before making any changes, create a new branch for your contribution using a descriptive and meaningful name. This helps in organizing and tracking your changes. Use the Git command `git checkout -b your-branch-name`.

4. **Develop your solution**: Implement your best practice solution, following the guidelines and best practices discussed earlier. Make sure to commit your changes regularly and provide clear commit messages that describe the purpose of each commit.

5. **Push changes to your fork**: Once you have completed your solution, push the changes to your forked repository using the Git command `git push origin your-branch-name`.

6. **Submit a pull request**: Go to the original [NASA-AMMOS/slim](https://github.com/NASA-AMMOS/slim) repository on GitHub. Click on the "Pull requests" tab and then click on the green "New pull request" button. Select your branch and provide a descriptive title and detailed description of your contribution. Be sure to reference any related issues, if applicable.

7. **Review and address feedback**: After submitting your pull request, the repository maintainers and other contributors may review your changes and provide feedback. Be responsive to their comments and address any requested changes or improvements promptly. Engaging in constructive discussions can help improve the quality of your contribution.

8. **Keep your fork up to date**: While your pull request is under review, keep your forked repository up to date with the original repository. This ensures that your changes remain compatible with the latest updates in the main repository. Use the Git commands `git fetch upstream` and `git merge upstream/main` to update your local repository and then push the changes to your fork.

Following these best practices helps maintain a collaborative and efficient contribution process. By adhering to these guidelines, you increase the likelihood of having your pull request accepted and integrated into the main repository.
