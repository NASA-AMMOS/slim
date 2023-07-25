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