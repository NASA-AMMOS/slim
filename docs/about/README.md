---
sidebar_position: 1
---

# About

> _A shared resource for discussing, iterating and referencing best practices in software lifecycle process improvements for multi-mission space and ground software_

[📖 View our Infographic (PDF)](SLIM-Infographic.pdf)

Software Lifecycle Improvement & Modernization (SLIM) is a project focused on collecting, developing, and disseminating best practices and process improvement strategies in NASA multi-mission software development lifecycle ecosystems. SLIM represents both a community of contributors as well as a continually evolving repository for best practices documentation.

SLIM best practice guides and recommendations are all open source, which means you have the freedom to use our work (in accordance with our permissive [LICENSE](https://nasa-ammos.github.io/slim/LICENSE)) as well as contribute and help shape our future work. We're excited to welcome new contributors and users.

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