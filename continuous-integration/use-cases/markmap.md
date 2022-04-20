* Continuous Integration
    * For Analysis and Testing
        * For verification, notification and assembly
            * [Git hooks](https://git-scm.com/docs/githooks)
            * [Github Actions](https://github.com/features/actions)
            * Build tooling (e.g. [Maven plugins](https://maven.apache.org/plugins/index.html), [SetupTools](https://github.com/pypa/setuptools), [Make](https://www.gnu.org/software/make/))
            * [Checksum hashing](https://en.wikipedia.org/wiki/Hash_function)
        * For credentialing
            * keystore ([Jenkins Credentials Binding Plugin](https://plugins.jenkins.io/credentials-binding/), et. al.) [&#x1F3C1; STARTER KIT](../starter-kits/#jenkins-project-setup-and-configuration)
            * [ssh](https://www.openssh.com/)
            * [oauth](https://oauth.net/)
        * For executing and reporting tests
            * [Jenkins plugins](https://plugins.jenkins.io/) [&#x1F3C1; STARTER KIT](../starter-kits/#jenkins-project-setup-and-configuration)
            * [TravisCI Build Addons](https://docs.travis-ci.com/user/addons/)
            * (Java) [Maven plugins](https://maven.apache.org/plugins/index.html) [&#x1F3C1; STARTER KIT](../starter-kits/#jenkins-project-setup-and-configuration)
            * (Python) [SetupTools](https://github.com/pypa/setuptools)
            * (C#) [NUnit](https://nunit.org/)
            * (C/C++) [Make](https://www.gnu.org/software/make/)/[Cmake](https://cmake.org/)
            * (Node.js) [npm-test](https://docs.npmjs.com/cli/v8/commands/npm-test)
            * (any) [Testrail Connector](https://github.jpl.nasa.gov/MIPL/testrail-connector)
    * For Compilation
        * For build integration and reporting
            * [Jenkins](https://www.jenkins.io/) [&#x1F3C1; STARTER KIT](../starter-kits/#jenkins-project-setup-and-configuration)
            * [TravisCI](https://travis-ci.org/)
        * For dependency management and packaging
            * (Java) [Maven](https://maven.apache.org/) [&#x1F3C1; STARTER KIT](../starter-kits/#jenkins-project-setup-and-configuration)
            * (Python) [SetupTools](https://github.com/pypa/setuptools)/[Pip](https://pip.pypa.io/en/stable/)
            * (C#) [NuGet](https://www.nuget.org/)
            * (C/C++) [Make](https://www.gnu.org/software/make/)/[Cmake](https://cmake.org/)
            * (Node.js) [npm](https://www.npmjs.com/)
            * (any) [Ant](https://ant.apache.org/)
    * For Orchestration
        * For deploying services
            * Using workflows
                * [Puppet](https://puppet.com/)
                * [Ansible](https://www.ansible.com/)
                * [Chef](https://www.chef.io/)
            * Using scripts
                * [Python](https://www.python.org/)
                * Platform scripting \[[shell](https://www.gnu.org/software/bash/manual/html_node/What-is-a-shell_003f.html), [Powershell](https://docs.microsoft.com/en-us/powershell/)\]
        * For cloud or datacenter deployments
            * [Terraform](https://www.terraform.io/)
            * [Kubernetes](https://kubernetes.io/)
            * [CloudFormation](https://aws.amazon.com/cloudformation/)
            * [SaltStack](https://github.com/saltstack/salt)
    * For Release Management
        * For packaging
            * [Docker](https://www.docker.com/)
            * Archiving ([tar](https://ss64.com/bash/tar.html), [zip](https://ss64.com/bash/zip.html), [gz](https://ss64.com/bash/gzip.html))
            * [RPM](https://rpm.org/)
            * [JAR](https://docs.oracle.com/javase/tutorial/deployment/jar/index.html), [WAR](https://en.wikipedia.org/wiki/WAR_(file_format))
        * For releasing software
            * [Jenkins](https://www.jenkins.io/) [&#x1F3C1; STARTER KIT](../starter-kits/#jenkins-project-setup-and-configuration)
            * [TravisCI](https://travis-ci.org/)
            * [Github Actions](https://github.com/features/actions)
        * For storing build artifacts
            * Using software repositories
                * [Artifactory](https://jfrog.com/artifactory/) [&#x1F3C1; STARTER KIT](../starter-kits/#jenkins-project-setup-and-configuration)
                * [Nexus](https://www.sonatype.com/products/repository-oss)
            * Using OSS repositories
                * (Java) [Maven Central](https://search.maven.org/)
                * (Python) [PyPi](https://pypi.org/)
                * (C#) [Nuget](https://www.nuget.org/)
                * (C/C++) [yum](http://yum.baseurl.org/), [dnf](https://rpm-software-management.github.io/)
                * (Node.js) [npm](https://www.npmjs.com/)
