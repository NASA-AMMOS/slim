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

**Starter Kit:**
- [Git Hook](https://github.com/awslabs/git-secrets) to install locally on your machine

To leverage this template, make sure to do the following:
1. Navigate to the [git-secrets installation section](https://github.com/awslabs/git-secrets#id6), and follow the instructions per your platform
2. Run `git secrets --install` within your chosen repository
   1. You should received a confirmation such as the below:
   ```
    ✓ Installed commit-msg hook to .git/hooks/commit-msg
    ✓ Installed pre-commit hook to .git/hooks/pre-commit
    ✓ Installed prepare-commit-msg hook to .git/hooks/prepare-commit-msg
   ```
3. Register a [secrets/credentials provider](https://github.com/awslabs/git-secrets#id20) that helps the tool find specific types of credential patterns, e.g. AWS via `git secrets --register-aws` 
4. Automation should be set up to scan for new commits, but it's a good idea to scan the history of commits starting out: `git secrets --scan-history`
   1. If you receive no output, that means the tool found now problematic commits.

## Continuous Integration

Continuous integration is the cross compilation of code from different sources on a central server 
to ensure code created across development efforts works together. 

### Jenkins Automation Server

Jenkins is a popular server that can be deployed to perform continuous integration, amongst other 
process automation tasks. It provides a platform to execute builds and any related tasks automatically. 
Jenkins provides numerous features to assist in build automation, including a plugin system that is 
widely used to enhance the platform.

#### Github Integration

Github commits and other changes can be monitored by Jenkins through the `Webhook` architecture. Setup
points Git repositories to specific Jenkins instances. 
[The process](https://dzone.com/articles/adding-a-github-webhook-in-your-jenkins-pipeline) requires 
administrator permissions to implement on a specific repo. 

#### Jenkins Pipelines

With a repository properly notifying a Jenkins server that is setup to accept Github Webhook pings, 
builds may be automated. Jobs are set up on a Jenkins server instance using one of several default 
build scenarios. Chiefly, the SLIM approach is to utilize build pipelines. Pipelines are small 
Groovy-based scripts that utilize Jenkins Domain Specific Language (DSL) to kick off synchronous 
tasks in a build process.

## Security Scanning

[SCRUB](https://github.com/nasa/scrub) is a flexible, conglomerated scanning engine for code quality 
and security concerns that was developed in-house. 


