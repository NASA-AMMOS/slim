---
title: Continuous Integration Frameworks
sidebar_label: Continuous Integration Frameworks
---


* Continuous Integration
    * For Analysis and Testing
        * For verification, notification and assembly
            * Using [Git hooks](https://git-scm.com/docs/githooks)
            * Using [Github Actions](https://github.com/features/actions)
            * Implementing build tooling (e.g. [Maven plugins](https://maven.apache.org/plugins/index.html), [SetupTools](https://github.com/pypa/setuptools), [Make](https://www.gnu.org/software/make/))
            * Using [Checksum hashing](https://en.wikipedia.org/wiki/Hash_function)
        * For credentialing
            * Implementing keystore [Jenkins Credentials Binding Plugin](https://plugins.jenkins.io/credentials-binding/)
            * Using [ssh](https://www.openssh.com/)
            * Using [oauth](https://oauth.net/)
        * For executing and reporting tests
            * Using [Jenkins plugins](https://plugins.jenkins.io/)
            * Using [TravisCI Build Addons](https://docs.travis-ci.com/user/addons/)
            * Using (Java) [Maven plugins](https://maven.apache.org/plugins/index.html)
            * Using (Python) [SetupTools](https://github.com/pypa/setuptools)
            * Using (C#) [NUnit](https://nunit.org/)
            * Using (C/C++) [Make](https://www.gnu.org/software/make/)/[Cmake](https://cmake.org/)
            * Using (Node.js) [npm-test](https://docs.npmjs.com/cli/v8/commands/npm-test)
            * Using (any) [Testrail Connector](https://github.jpl.nasa.gov/MIPL/testrail-connector)
    * For Compilation
        * For build integration and reporting
            * Using [Jenkins](https://www.jenkins.io/)
            * Using [TravisCI](https://travis-ci.org/)
        * For dependency management and packaging
            * Using (Java) [Maven](https://maven.apache.org/)
            * Using (Python) [SetupTools](https://github.com/pypa/setuptools)/[Pip](https://pip.pypa.io/en/stable/)
            * Using (C#) [NuGet](https://www.nuget.org/)
            * Using (C/C++) [Make](https://www.gnu.org/software/make/)/[Cmake](https://cmake.org/)
            * Using (Node.js) [npm](https://www.npmjs.com/)
            * Using (any) [Ant](https://ant.apache.org/)
    * For Orchestration
        * For deploying services
            * Using workflows
                * Using [Puppet](https://puppet.com/)
                * Using [Ansible](https://www.ansible.com/)
                * Using [Chef](https://www.chef.io/)
            * Using scripts
                * Using [Python](https://www.python.org/)
                * Implementing platform scripting \[[shell](https://www.gnu.org/software/bash/manual/html_node/What-is-a-shell_003f.html), [Powershell](https://docs.microsoft.com/en-us/powershell/)\]
        * For cloud or datacenter deployments
            * Using [Terraform](https://www.terraform.io/)
            * Using [Kubernetes](https://kubernetes.io/)
            * Using [CloudFormation](https://aws.amazon.com/cloudformation/)
            * Using [SaltStack](https://github.com/saltstack/salt)
    * For Release Management
        * For packaging
            * Using [Docker](https://www.docker.com/)
            * Implementing archiving ([tar](https://ss64.com/bash/tar.html), [zip](https://ss64.com/bash/zip.html), [gz](https://ss64.com/bash/gzip.html))
            * Using [RPM](https://rpm.org/)
            * Using [JAR](https://docs.oracle.com/javase/tutorial/deployment/jar/index.html), [WAR](https://en.wikipedia.org/wiki/WAR_(file_format))
        * For releasing software
            * Using [Jenkins](https://www.jenkins.io/) ()
            * Using [TravisCI](https://travis-ci.org/)
            * Using [Github Actions](https://github.com/features/actions)
        * For storing build artifacts
            * Using software repositories
                * Using [Artifactory](https://jfrog.com/artifactory/)
                * Using [Nexus](https://www.sonatype.com/products/repository-oss)
            * Using OSS repositories
                * Using (Java) [Maven Central](https://search.maven.org/)
                * Using (Python) [PyPi](https://pypi.org/)
                * Using (C#) [Nuget](https://www.nuget.org/)
                * Using (C/C++) [yum](http://yum.baseurl.org/), [dnf](https://rpm-software-management.github.io/)
                * Using (Node.js) [npm](https://www.npmjs.com/)
