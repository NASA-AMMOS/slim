# Reference Architectures

## Overview
These reference architectures are meant as a starting point for implementing SLIM practices. 
Each one correlates to a specific use case described in the SLIM use case diagram. Directories 
presented here are intended to reflect the organization nature of suggested use cases and are 
named correspondingly. Organization is segmented by use case section and then segmented by 
the development language used to implement the solution. Please feel free to implement, modify, 
and extend the samples presented to fit particular needs. 

## Examples
**compilation-release/java-maven** | A basic Java application build is presented here that uses 
the Maven build system with configuration tooling for a complete Jenkins-based Continuous 
Integration deployment. This setup also pushes to an artifact repository, such as JFrog Artifactory, 
based on setup configurations. 

There are two configured examples: _(These involve types of Maven configurations.)_
1. `multimodule`: An implementation of a multi-step modular Maven build that presents multiple related artifacts, e.g. `JAR`s, `WAR`s or other packaged build product.
2. `simple`: A single monolithic build of a single application that presents a single build artifact.

Both examples demonstrate the following concepts:
* Inheritance from remote dependencies stored in an artifact repository
* Continuous integration automation through _Jenkins_ pipelines
* Artifact publishing to a remote repository
* Build containerization via _Docker_ to manage predictable output

