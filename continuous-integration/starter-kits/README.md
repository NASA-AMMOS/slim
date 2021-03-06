# Starter Kits

This page contains starter kit information, which represent templates, code and configuration to help you get started quickly with continuous integration best practices described in this overall guide. Please see categories and links below for details. 

## Patch Integrity

This section contains links to sample actions, templates, and configuration for ensuring the basic integrity of patches.

### GitHub Actions

#### Developer Certificate of Origin (DCO)

This GitHub Action provides an automated check for ensuring developers have a "signed-off" commit when contributing to a given GitHub repository. 

Starter Kit:
- [GitHub App](https://github.com/apps/dco) to install onto your GitHub repo

To leverage this template, make sure to do the following:
1. Talk with your team about leveraging this GitHub action, and seek wide agreement before you adopt
2. Log into GitHub.com
3. Click the above GitHub App starter kit link
4. Click "Install" in the top-right hand corner of the page
5. Follow the prompts to select the organizations and repositories you'd like to install this app
6. Verify the installation by navigating to your given repository's "Settings" page, and confirming the app appears in the "Integrations -> Applications" left-hand menu

### Git Hooks

#### git-secrets

This tool helps prevent unauthorized sensitive secrets and credentials from being committed to a Git repository. It scans commits and looks for regular patterns of credential information, and through the mechanism of a client-side [Git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks), it alerts the developer to any unintended commits. Further, it also supports the ability to scan a repository's history of commits for any unauthorized commit activity. It is by default optimized for scanning for Amazon Web Services (AWS) credentials, but can be customized to look for custom credential string patterns.

Starter Kit:
- [Git Hook](https://github.com/awslabs/git-secrets) to install locally on your machine

To leverage this template, make sure to do the following:
1. Navigate to the [git-secrets installation section](https://github.com/awslabs/git-secrets#id6), and follow the instructions per your platform
2. Run `git secrets --install` within your chosen repository
   1. You should received a confirmation such as the below:
   ```
    ??? Installed commit-msg hook to .git/hooks/commit-msg
    ??? Installed pre-commit hook to .git/hooks/pre-commit
    ??? Installed prepare-commit-msg hook to .git/hooks/prepare-commit-msg
   ```
3. Register a [secrets/credentials provider](https://github.com/awslabs/git-secrets#id20) that helps the tool find specific types of credential patterns, e.g. AWS via `git secrets --register-aws` 
4. Automation should be set up to scan for new commits, but it's a good idea to scan the history of commits starting out: `git secrets --scan-history`
   1. If you receive no output, that means the tool found now problematic commits.