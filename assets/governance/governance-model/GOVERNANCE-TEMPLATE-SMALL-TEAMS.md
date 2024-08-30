---
title: Governance Model (Small Teams)
sidebar_label: For Small Teams
---

````markdown
# [INSERT PROJECT NAME] Project Governance

This governance model aims to create an open source community that encourages transparency, contributions, and collaboration, but maintains sound technical and quality standards. Our goal is to build a community comprised of members across the [INSERT PROJECT DOMAIN] community and beyond, including from private organizations, universities, government organizations, and international organizations. 

The project follows a fairly liberal contribution model where people and/or organizations who do the most work will have the most influence on project direction. Roles determine decision making influence, and governing committees (e.g. technical steering, project steering) are set up to ensure the project's direction is in-line with requirements / goals while supporting flexibility for future growth and membership. Technical decision making will primarily be made through a "[consensus-seeking](https://en.wikipedia.org/wiki/Consensus-seeking_decision-making)" approach within the respective governing committees. 

## Roles

| Role            | Restricted To | Description                                                                                                                                       | Read/Clone | Propose Pull Request | Comment in Tickets / Discussions | Review | Commit | Technical & Project Decisions |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------- | -------------------------------- | ------ | ------ | ----------------------------- |
| Contributor     | None          | Anyone providing input to the project, including: code, issues, documentation, graphics, etc.                                                     | ✅         | ✅                   | ✅                               | ❌     | ❌     | ❌                            |
| Committer       | Contributor   | Subset of contributors granted write access to one or more of the project repositories. Responsible for reviewing and approving proposed changes. | ✅         | ✅                   | ✅                               | ✅     | ✅     | ❌                            |
| Product Manager | Committer     | Overall manager of the project with final authority over all key decisions when consensus cannot be reached among contributors.                   | ✅         | ✅                   | ✅                               | ✅     | ✅     | ✅                            |

### Contributor

Contributors include anyone that provides input to the project. This includes code, issues, documentation, graphics, designs, or anything else that tangibly improves the project. We encourage you to start contributing right away by joining our [Discussions]([INSERT LINK TO DISCUSSION BOARD OR MAILING LIST(S)]) or submitting an [Issue]([INSERT LINK TO ISSUE TRACKING SYSTEM]). 

### Committer

Subset of contributors who have been given write access to one or more project repositories. Both contributors and committers can propose changes to the project via pull requests, but only committers can formally review and approve (merge) these requests. Any contributor who has made a non-trivial contribution should be onboarded as a committer in a timely manner.

If you are planning on making a substantial contribution to the project or feel as though you should be given write access to a repository, please send a request to https://github.com/riverma/

#### List of Committers
- [INSERT MEMBER NAME] ([username1]([INSERT LINK TO USERNAME]), [INSERT ORG ASSOCIATION]
- [INSERT MEMBER NAME] ([username1]([INSERT LINK TO USERNAME]), [INSERT ORG ASSOCIATION]

### Product Manager

Overall manager of the project with final authority over all key decisions when consensus cannot be reached among committers. The product manager is often chosen at the onset of project initiation and can be reassigned with stakeholder approval.

# Acknowledgements

Much of this governance model was adapted from other notable open source projects including [node.js](https://github.com/nodejs/node/blob/main/GOVERNANCE.md), [OpenSSL](https://www.openssl.org/policies/omc-bylaws.html), [PostgresQL](https://www.postgresql.org/developer/), and [OpenMCT](https://github.com/nasa/openmct/blob/master/CONTRIBUTING.md). We would like to thank those projects for setting the foundation upon which this model was built.
````