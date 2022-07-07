# Starter Kits

This page contains starter kit information, which represent templates, code and configuration to help 
you get started quickly with continuous integration best practices described in this overall guide. 
Please see categories and links below for details. 

## Automated Dependency Updates


## Continuous Integration with Compile, Release and Publish
**Technologies:** Build integration using [Maven](https://maven.apache.org/), 
[Github](https://github.com/), [Docker](https://www.docker.com/), [Jenkins](https://www.jenkins.io/) 
and [Artifactory](https://jfrog.com/artifactory) for a [Java](https://openjdk.org/) application. 

This section links to sample continuous integration projects for a Java application that 
demonstrate how a build server, such as Jenkins, is used to verify that code compiles together 
from different commits. It compiles projects in a pre-configured Docker container, and on success 
publishes binaries to an artifact repository, such as Artifactory. Although this example focuses on 
a Java-based project, it employs a generic [architectural paradigm](https://nasa-ammos.github.io/slim/continuous-integration/reference-architectures/) 
that translates to builds in other languages. 

**Prerequisites:** To leverage starter kits provided here, the following products may be 
installed, tested and accessible locally: (Note that installation will benefit greatly from testing 
and customization on local workstations.)
* Administrative access to a **Github** repository that is the build source.
* **Java** and **Maven** installed locally to test build conversions.
* **Docker Desktop** to test container executions
* Access to a **Jenkins** server, such as the enterprise CAE Jenkins at JPL.
* Access to an artifact repository, such as the enterprise CAE Artifactory at JPL.

For both examples described below, see the raw source which you can copy/paste into your own 
project to configure a working build system.

There are two configured examples: _(Maven setups supporting application designs)_
1. `simple`: A monolithic compile of a single application that produces a single build artifact.
2. `multimodule`: An multi-step build that compiles several modules and uses them as dependencies 
in subsequent steps -- each step may produce its own artifacts, e.g. `JAR`s, `WAR`s or 
other packaged build output. 

### Requirements
CI creates an ecosystem between products such that servers in compile, release and publishing 
phases handoff processing between steps. All implementations are predicated on the following 
configurations:
1. Setup an account on a Jenkins server to host the build, such as the enterprise CAE Jenkins server 
at JPL or another shared Jenkins host. 
2. [Setup Webhook notifications](https://github.blog/2014-02-11-webhooks-level-up/) pointing to the 
Jenkins instance with the URL of the server from the previous step that will host the build.
3. Setup an account on an Artifactory server to host built binaries, such as the enterprise CAE 
Artifactory server at JPL or another similar repository.
4. Setup authorization credentials to interconnect services.
   1. Setup [Github SSH Key Access](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh) 
   and record the key for later use.
   2. Create an [API Key in Artifactory](https://www.jfrog.com/confluence/display/JFROG/User+Profile#UserProfile-APIKey) 
   and record it for later use.
   3. Create a [Maven Settings File](https://www.jfrog.com/confluence/display/JFROG/Maven+Repository) 
   using the previously generated Artifactory API Key
5. [Configure Jenkins Global Credentials](https://www.jenkins.io/doc/book/using/using-credentials/#configuring-credentials) 
by creating an entry for each of the Github SSH key and Maven Settings File previously generated.

#### Base configs and alternatives
These examples rely on certain assumptions about underlying tools. For instance, a 
[Dockerfile](https://github.com/nasa-ammos/slim/blob/main/continuous-integration/starter-kits/compile-release-publish/java-maven/simple/.ci/Dockerfile.buildDeploy) 
referenced in one example presumes that Jenkins uses a certain UID and GID set up for a particular 
Jenkins server. These values may be changed based on any chosen target server. 

Also, this starter kit should be considered generally as a guided template that is flexible enough to 
be reprovisioned to work with any number of enterprise or publicly-available, hosted, open-source 
servers. For instance Github and Github Enterprise may be provisioned similarly for Webhooks, even 
when connecting to one of several public (or privately hosted) CI build servers. It's a specific example 
of [general architecture](https://nasa-ammos.github.io/slim/continuous-integration/reference-architectures/).

### Maven `simple` project

Starter Kit:
- [Maven Simple Project Root](https://github.com/nasa-ammos/slim/blob/main/continuous-integration/starter-kits/compile-release-publish/java-maven/simple/)

To leverage this example, make sure to do the following: (Of course, using earlier requirements.)
1. Check out the Git repository to convert into a new folder.
2. Copy the `simple` project layout onto the folder from item (1).  
3. Move source and configuration files into place per the [Maven Standard Directory Layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)
   1. Source and package structure should land in the `src/main/java` directory.
   2. Configurations should land in the `src/main/resources` directory.
   3. Unit tests should be moved into place similarly in the `src/test/...` directory tree.
4. Modify the POM to support the simple project. 
   1. **Set project-specific identification values from the following list.** These values uniquely 
   identify the project within the Maven ecosystem by associating 
   [Maven coordinates](https://maven.apache.org/guides/mini/guide-naming-conventions.html). [Configured 
   URLs to servers](https://maven.apache.org/scm/maven-scm-plugin/usage.html) hosting the 
   repository are also required. These values rely on the inheritance of a parent configuration. 
   **Note that values** for the `PARENT_ID` and `PARENT_VERSION` coordinates apply the JPL enterprise 
   Maven parent to the project. This will vary outside the Lab. 
   2. Search and replace values in the example [POM file](https://github.com/nasa-ammos/slim/blob/main/continuous-integration/starter-kits/compile-release-publish/java-maven/simple/pom.xml) 
using the values defined in (i). **See below list of example values.**
```
<!-- [INSERT NAME HERE] -->|AMMOS - IDS - SLIM - Sample Projects - Simple
<!-- [INSERT DESCRIPTION HERE] -->|Sample Projects -- Simple application
<!-- [INSERT PARENT_GROUP HERE] -->|gov.nasa.jpl.ammos.ids
<!-- [INSERT PARENT_ID HERE] -->|parent-mipl
<!-- [INSERT PARENT_VERSION HERE] -->|4.0.1
<!-- [INSERT GROUP HERE] -->|gov.nasa.ammos.ids.sample_projects
<!-- [INSERT ID HERE] -->|simple
<!-- [INSERT SCM_SSH HERE] -->|scm:git:ssh://git@github.com/NASA-AMMOS/slim.git
<!-- [INSERT SCM_URL HERE] -->|https://github.com/NASA-AMMOS/slim/tree/main
```
 
5. Modify the Jenkins pipeline script with credentials and relevant configurations. 
   1. Search and replace values in the example [Jenkinsfile](https://github.com/nasa-ammos/slim/blob/main/continuous-integration/starter-kits/compile-release-publish/java-maven/simple/.ci/Jenkinsfile-buildDeploy) 
   using the values defined in earlier configuration steps, including credential configuration 
   in requirements and other determined settings. **See below list of required values, remembering 
   that these are created during this configuration** 
```
/*-- [INSERT ID_OF_STORED_MAVEN_SETTINGS HERE] --*/
/*-- [INSERT ID_OF_STORED_SSH_KEY HERE] --*/
/*-- [INSERT URL_TO_GITHUB_SERVER HERE] --*/
/*-- [INSERT URL_TO_ORG HERE] --*/
```
6. Commit changes to the Git repository for testing. 
7. Create a [Jenkins Multibranch Pipeline Job](https://www.cloudbees.com/blog/jenkins-multibranch-pipeline-with-git-tutorial) 
configured to point at the Jenkinsfile at `.ci/Jenkinsfile-buildDeploy`
8. Test and debug using [Jenkins build logging](https://opensource.com/article/19/9/intro-building-cicd-pipelines-jenkins) 
that reports build progress. **Note: Click the build numbeer to view build logs.**

 
### Maven `multimodule` project
Note that this differs from the `simple` project by introducing ordered, modular builds, so 
one repo can build multiple modules. Configuration differences center around the creation of 
`modules`, or subprojects.

Starter Kit:
- [Maven Multimodule Project Root](https://github.com/nasa-ammos/slim/blob/main/continuous-integration/starter-kits/compile-release-publish/java-maven/multimodule/)

To leverage this project, make sure to do the following: (Of course, using earlier requirements.)
1. [Create a new Git repo](https://docs.github.com/en/get-started/quickstart/create-a-repo) for 
the multimodule job. This is an example that compiles source from one or more repositories to build 
a single project.
2. Check out one or more Git repositories to convert into the new project.
3. Copy the `multimodule` project layout onto the folder from item (1).  
4. Move source and configuration files into place per the [Maven Standard Directory Layout](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)
   1. Source and package structure should land in the `src/main/java` directory.
   2. Configurations should land in the `src/main/resources` directory.
   3. Unit tests should be moved into place similarly in the `src/test/...` directory tree.
5. Modify the POM to support the simple project. 
   1. **Set project-specific identification values from the following list.** These values uniquely 
   identify the project within the Maven ecosystem by associating 
   [Maven coordinates](https://maven.apache.org/guides/mini/guide-naming-conventions.html). [Configured 
   URLs to servers](https://maven.apache.org/scm/maven-scm-plugin/usage.html) hosting the 
   repository are also required. These values rely on the inheritance of a parent configuration. 
   **Note that values** for the `PARENT_ID` and `PARENT_VERSION` coordinates apply the JPL enterprise 
   Maven parent to the project. This will vary outside the Lab. 
   2. Search and replace values in the example [POM file](https://github.com/nasa-ammos/slim/blob/main/continuous-integration/starter-kits/compile-release-publish/java-maven/multimodule/pom.xml) 
using the values defined in (i). **See below list of example values.**
```
<!-- [INSERT NAME HERE] -->|AMMOS - IDS - SLIM - Sample Projects - Simple
<!-- [INSERT DESCRIPTION HERE] -->|Sample Projects -- Simple application
<!-- [INSERT PARENT_GROUP HERE] -->|gov.nasa.jpl.ammos.ids
<!-- [INSERT PARENT_ID HERE] -->|parent-mipl
<!-- [INSERT PARENT_VERSION HERE] -->|4.0.1
<!-- [INSERT GROUP HERE] -->|gov.nasa.ammos.ids.sample_projects
<!-- [INSERT ID HERE] -->|simple
<!-- [INSERT SCM_SSH HERE] -->|scm:git:ssh://git@github.com/NASA-AMMOS/slim.git
<!-- [INSERT SCM_URL HERE] -->|https://github.com/NASA-AMMOS/slim/tree/main
```
 
5. Modify the Jenkins pipeline script with credentials and relevant configurations. 
   1. Search and replace values in the example [Jenkinsfile](https://github.com/nasa-ammos/slim/blob/main/continuous-integration/starter-kits/compile-release-publish/java-maven/simple/.ci/Jenkinsfile-buildDeploy) 
   using the values defined in earlier configuration steps, including credential configuration 
   in requirements and other determined settings. **See below list of required values, remembering 
   that these are created during this configuration** 
```
/*-- [INSERT ID_OF_STORED_MAVEN_SETTINGS HERE] --*/
/*-- [INSERT ID_OF_STORED_SSH_KEY HERE] --*/
/*-- [INSERT URL_TO_GITHUB_SERVER HERE] --*/
/*-- [INSERT URL_TO_ORG HERE] --*/
```
6. Commit changes to the Git repository for testing. 
7. Create a [Jenkins Multibranch Pipeline Job](https://www.cloudbees.com/blog/jenkins-multibranch-pipeline-with-git-tutorial) 
configured to point at the Jenkinsfile at `.ci/Jenkinsfile-buildDeploy`
8. Test and debug using [Jenkins build logging](https://opensource.com/article/19/9/intro-building-cicd-pipelines-jenkins) 
that reports build progress. **Note: Click the build numbeer to view build logs.**


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


## Publishing a Python Project to PyPi

