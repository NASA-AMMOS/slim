---
sidebar_position: 1
---

# About

> _A shared resource for discussing, iterating and referencing best practices in software lifecycle process improvements for multi-mission space and ground software_

[📖 View our Infographic (PDF)](SLIM-Infographic.pdf)

Software Lifecycle Improvement & Modernization (SLIM) is a project focused on collecting, developing, and disseminating best practices and process improvement strategies in NASA multi-mission software development lifecycle ecosystems. SLIM represents both a community of contributors as well as a continually evolving repository for best practices documentation.

## Our Focus

There are three key areas within the software development lifecycle improvement space that SLIM focuses on providing best practice guidance for:

![SLIM-scope](/img/scope.png)

## Our Process

### 1. Ask Our Community

We reach out to community member projects, and solicit input on outstanding process improvement needs, including the respective needs' relative ranking in importance / criticality. A few needs are chosen to focus active contributor time upon - seeking to develop best practice guides, including items such as use case lists, trade-studies, reference architectures and starter kits. That being said, any external contributors are free to propose best practice guides to our project at any time in the form of a contribution. See our /slim/docs/contribute/submit-best-practice for more details.  

You can see our current prioritized list of community-ranked best practice development ideas in our [planning board](https://github.com/orgs/NASA-AMMOS/projects/3).

### 2. Develop Standards & Best Practices

We use a technique we like to call "standards-as-code", which basically means that we develop best practices that are _patchable_ to existing or new community member project codebases or are _deployable_ to their infrastructure. Therefore, we target providing best practices in a way that is most easily can be infused into existing SLIM community member projects. This way, we are actually able to scale out our best practice dissemination widely to many projects at once. For best practices that are not patchable to repositories, we ask our contributors to develop automation that can be run as a script or set of commands - and deploy these to SLIM community members through issue-tickets.

![SLIM-dev-process](/img/standards-as-code.png)

More information on our development process for best practice guides can be found in our [Contributing Guide](docs/contribute/contributing/development-process).

### 3. Publish Best Practices

As mentioned above, we operate under a "standards-as-code" philosophy, which means that newly developed standards and best practices are directly infused into member projects through pull requests or issue tickets. This hands-on approach ensures that improvements are easily infusable into the SLIM community member repositories.

To see the current adoption status and how these practices are being integrated into various SLIM community member projects, check out our leaderboard pages:

- [NASA AMMOS Best Practice Leaderboard](https://github.com/NASA-AMMOS/slim-leaderboard/blob/main/examples/slim-ammos-leaderboard.md)
- [Unity SDS Best Practice Leaderboard](https://github.com/NASA-AMMOS/slim-leaderboard/blob/main/examples/slim-unity-leaderboard.md)

## Our Community Members

What does it mean to be a community member of SLIM? The following ideas apply to community member projects:
- Has a representative (a point-of-contact) who interfaces with the SLIM effort
- Openness and willingness to infuse SLIM best practices 
- Prioritizes contributing back to the SLIM project with best practice guides

The following list of public projects are currently SLIM community members:

<ul>
        <li>
            <a href="https://github.com/nasa-ammos/" rel="NASA AMMOS">
                NASA AMMOS
            </a>
            <ul>
                <li>Point of Contact: <a href="https://github.com/PaulMRamirez">@PaulMRamirez</a></li>
            </ul>
        </li>
        <li>
            <a href="https://github.com/unity-sds/" rel="Unity SDS">
                Unity SDS
            </a>
            <ul>
                <li>Point of Contact: <a href="https://github.com/mike-gangl">@mike-gangl</a></li>
            </ul>
        </li>
        <li>
            <a href="https://github.com/hysds/" rel="HySDS">
                HySDS
            </a>
            <ul>
                <li>Point of Contact: <a href="https://github.com/hookhua">@hookhua</a></li>
            </ul>
        </li>
</ul>

## How To Get Involved

SLIM best practice guides and recommendations are open source, which means you have the freedom to use our work (in accordance with our [LICENSE](https://nasa-ammos.github.io/slim/LICENSE)) as well as contribute and help shape our future work. We're excited to welcome new contributors and users.

Some ways you can get involved with SLIM:

### Use Our Guides

The fastest way to start using SLIM process improvement solutions is to take a look at our best practice guides, specifically our *starter kits*. Starter kits provide plug-and-play solutions to process improvement needs. To complement our starter kits, take a look at *use cases* to understand the context of the starter kit solutions, *trade studies* to understand tool / solution trade-offs, and *reference architectures* to understand how tool / solutions interact in an actual working environment. 

We recommend creating pull-requests using our starter kits against your own repositories. Reach out to our [contributor communication channels](docs/contribute/contributing/know-before-contribute.md#communication-channels) for questions if you're unsure how to create pull requests. An excellent tool to automate the infusion of starter kits in your repositories (especially if you have many) is to use a tool like [multi-gitter](https://github.com/lindell/multi-gitter) if you're using Git to create pull-requests. 

Finally, if you use any of our guides - please consider adding the following badge to your `README.md`: 
[![SLIM](https://img.shields.io/badge/Best%20Practices%20from-SLIM-blue)](https://nasa-ammos.github.io/slim/)

### Contribute to Our Guides

We'd be delighted to see your contribution! Please see our [Contributing Guide](docs/contribute/contributing) on details for how to contribute. We accept many non-code contributions as well, so feel free to think creatively. 

### Join Our Community of Projects

Interested in becoming a part of the SLIM community? We welcome new project members who are keen on improving software lifecycle processes within their projects. Joining is simple:

1. **Publicly: Start a Discussion**: Head over to our [discussion forum](https://github.com/NASA-AMMOS/slim/discussions/new/choose) and file a new thread expressing your interest in joining SLIM. This is a great way to introduce your project and outline how you think SLIM could benefit you.

2. **Privately: Contact Us**: You can directly contact [@riverma](https://github.com/riverma) or the [@slim-steering](https://github.com/orgs/NASA-AMMOS/teams/slim-steering) group on GitHub to express your desire to join. We'll have a chat, and try to identify which repositories in your project make sense for best practice infusion as well as identify a point-of-contact.

Becoming a part of SLIM means not just receiving updates regarding our best practices and standards, but also receiving pull-requests and issue tickets that help streamline SLIM best practices more easily to your project (at no cost!). 

### Spread the Word

The more people & projects using, contributing, and maintaining SLIM, the more robust and long-term this effort will last. 

You can help by:

#### Socializing on GitHub

[⭐ Star our Repo](https://github.com/nasa-ammos/slim)

[👀 Watch our Repo](https://github.com/nasa-ammos/slim)

[😀 Discuss our Repo](https://github.com/nasa-ammos/slim)

#### Website

Share our website (https://nasa-ammos.github.io/slim) with your friends and colleagues
