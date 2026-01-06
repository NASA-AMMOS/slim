# [INSERT PROJECT NAME] Project Governance

This governance model aims to create an open source community that encourages transparency, contributions, and collaboration, but maintains sound technical and quality standards. Our goal is to build a community comprised of members across the [INSERT PROJECT DOMAIN] community and beyond, including from private organizations, universities, government organizations, and international organizations. 

The project follows a fairly liberal contribution model where people and/or organizations who do the most work will have the most influence on project direction. Roles determine decision making influence, and governing committees (e.g. technical steering, project steering) are set up to ensure the project's direction is in-line with requirements / goals while supporting flexibility for future growth and membership. Technical decision making will primarily be made through a "[consensus-seeking](https://en.wikipedia.org/wiki/Consensus-seeking_decision-making)" approach within the respective governing committees. 

## Roles

| Role               | Restricted To      | Description                                                                                                                                                                           | Read/Clone | Propose Pull Request | Comment in Tickets / Discussions | Review | Commit | Technical & Project Decisions |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------- | -------------------------------- | ------ | ------ | ----------------- |
| Contributor        | None               | Anyone providing input to the project, including: code, issues, documentation, graphics, etc.                                                                                         | ✅         | ✅                   | ✅                               | ❌     | ❌     | ❌                |
| Committer          | Contributor        | Subset of contributors granted write access to one or more of the project repositories upon selection by the Steering Committee                                                       | ✅         | ✅                   | ✅                               | ✅     | ✅     | ❌                |
| Steering Committee | Committer          | Members with decision-making authority on technical, strategic, and organizational matters. They have admin privileges and are responsible for the overall governance of the project. | ✅         | ✅                   | ✅                               | ✅     | ✅     | ✅                |
| Product Manager    | Steering Committee | Overall manager of the project with final authority over all key decisions when consensus cannot be reached                                                                           | ✅         | ✅                   | ✅                               | ✅     | ✅     | ✅                |

### Contributor

Contributors include anyone that provides input to the project. This includes code, issues, documentation, graphics, designs, or anything else that tangibly improves the project. We encourage you to start contributing right away by joining our [Discussions]([INSERT LINK TO DISCUSSION BOARD OR MAILING LIST(S)]) or submitting an [Issue]([INSERT LINK TO ISSUE TRACKING SYSTEM]). 

### Committer

Subset of contributors who have been given write access to one or more project repositories. Both contributors and committers can propose changes to the project via pull requests, but only committers can formally review and approve (merge) these requests. Any contributor who has made a non-trivial contribution should be onboarded as a committer in a timely manner.

If you are planning on making a substantial contribution to the project or feel as though you should be given write access to a repository, please send a request to https://github.com/riverma/

#### List of Committers
- [INSERT MEMBER NAME] ([username1]([INSERT LINK TO USERNAME]), [INSERT ORG ASSOCIATION]
- [INSERT MEMBER NAME] ([username1]([INSERT LINK TO USERNAME]), [INSERT ORG ASSOCIATION]

### Steering Committee

The Steering Committee is responsible for the overall governance of the project. This includes:

- Technical direction and guidance
- Committee governance and process
- Contribution policy
- Conduct guidelines
- Maintaining the list of committers

#### Steering Committee Members
- [INSERT MEMBER NAME] ([username1]([INSERT LINK TO USERNAME]), [INSERT ORG ASSOCIATION]
- [INSERT MEMBER NAME] ([username1]([INSERT LINK TO USERNAME]), [INSERT ORG ASSOCIATION]

<details>
<summary>Emeriti</summary>
#### SC Emeriti
<!-- - [INSERT MEMBER NAME] ([username1]([INSERT LINK TO USERNAME]), [INSERT ORG ASSOCIATION] -->
</details>

#### Decision Making Process

Any community member can create an issue or comment asking the Steering Committee to review something. Prior to implementing a substantial contribution, the design of that contribution should be reviewed by at least one member of the Steering Committee. If consensus-seeking fails during the review of a pull request or in design discussions, the issue will be addressed by the Steering Committee to make a determination on direction. Committee members will meet regularly and will keep track of decisions made when consensus was not met.

The Steering Committee can nominate new members at any time. Candidates for membership tend to be committers who have shown great dedication to the project and/or experts in a particular domain or project component. Committee members are expected to be active contributors or members who have made significant contributions within the past 12 months.

### Product Manager

Overall manager of the project with final authority over all key decisions when consensus cannot be reached within the Steering Committee. The product manager is often chosen at the onset of project initiation and can be reassigned by the Steering Committee (with institutional approval, if applicable).

# Acknowledgements

Much of this governance model was adapted from other notable open source projects including [node.js](https://github.com/nodejs/node/blob/main/GOVERNANCE.md), [OpenSSL](https://www.openssl.org/policies/omc-bylaws.html), [PostgresQL](https://www.postgresql.org/developer/), and [OpenMCT](https://github.com/nasa/openmct/blob/master/CONTRIBUTING.md). We would like to thank those projects for setting the foundation upon which this model was built.