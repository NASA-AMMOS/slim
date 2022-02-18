# SLIM

> _A shared resource for discussing, iterating and referencing best practices in software lifecycle process improvements for multi-mission space and ground software_

Software Lifecycle Improvement & Modernization (SLIM) is a project focused on collecting, developing, and disseminating best practices and process improvement strategies in the NASA multi-mission software development lifecycle ecosystems. SLIM represents both a community of contributors as well as a continually evolving repository for best practices documentation.

## Scope

There are three key areas within the software development lifecycle improvement space that SLIM focuses on providing best practice guidance for:

- Software Lifecycle Pipelines
  - Continuous integration (CI), continuous deployment (CD), continuous testing (CT) etc.
  - Ex: best practice architectures and starting kits for automated code coverage tests
- Information Sharing
  - Documentation design, on-boarding, training, etc.
  - Ex: consistent documentation templates for on-boarding new team members
  - Ex: best practices in documentation hosting architectures and tools
- Governance
  - Roles & responsibilities organization, etc.
  - Ex: best processes for triaging feature requests among team members
  
More details TBD.

## Process

Every financial fiscal quarter, SLIM convenes community members to solicit input on outstanding process improvement needs, including the respective needs' relative ranking in importance / criticality. A few needs are chosen to focus active contributor time upon - seeking to develop best practice documentation and starter kits for. 

More information on currently active needs being solicited from community members is available here: TBD

# Best Practice Guides

The following sections link to best practices resources developed by SLIM for process improvement needs solicited by the wider SLIM community.

The list is sorted alphabetically and is continually being added to.

## Documentation Hosting

Best practice documentation hosting solutions for:
* Choice of documentation hosting for user / devevelopment / administrative guides & specifications, including API references, forum discussions, etc. 
  * Ex. GH Pages, ReadTheDocs, GitBook, Wikis etc.
* Reference architecture for templating & auto-generation of documentation artifacts
* Instantiation of documentation hosts and examples

See [here](https://nasa-ammos.github.io/slim/documentation-hosting/) for more details.

## Continuous Testing

See [here](https://nasa-ammos.github.io/slim/continuous-testing/) for more details.

# Contributions

Interested in getting involved with SLIM? The best way to get involved is to become a contributor. Below we talk about some of the types of contributions we welcome.

### Contributing A Best Practice Guide

Researching, sharing, and disseminating best practices is the bread-and-butter of the SLIM effort. We welcome folks who wish to (1) help provide best practice solutions for active / open needs (link TBD) as well as those who'd like to contribute best practice solutions for new needs that you may alraedy have great solutions for. Additionally, we welcome (2) iterative improvements for existing best practice solutions already shared on the SLIM repository.

Let's explore each of these sub categories for contributing best practices:

#### For Creating a New Best Practice Guide

The following is a checklist before you start work on developing new, best practice guide:
1. Check if there are Issue Ticket(s) documenting a need for a best practice solution, feel free to create a ticket if none exist for your contribution
2. Check the Forum for any conversations regarding the best practice need(s) to ensure you have any needed context. Feel free to reach out and ask the community for feedback if you have ideas you'd like to discuss
3. Fork the SLIM repository into your own GitHub account so that you can work independently and eventually propose a pull request back to the SLIM project
4. Run the GitHub Actions Workflow for generating a Best Practices directory tree for you to work within (DIRECTIONS TBD)

Once you have a tangible issue you're going to work against, you can begin the process to contribute your best practice. The process is not strictly about code development or documentation, rather, it is a multi-step process to ensure your best practice solution is going to meet a tangible community need. We want to help make sure your best practice solution is not only incorporated into SLIM, but actively used! Note, we recommend engaging with the SLIM community throughout the process, but if you've already created some best practice solutions you just want to document, then you can skip some of the community soliciting steps below and get feedback directly as you're developing your documentation. The following flowchart provides guidance on the best recommended process for developing and sharing a best practice solution.

##### Recommended Process for Contributing a Best Practice Solution to SLIM

<img width="1083" alt="Screen Shot 2022-02-17 at 5 28 35 PM" src="https://user-images.githubusercontent.com/3129134/154600161-f2c998ad-851b-46a2-9c8c-deaf6801b305.png">


##### Understanding the Recommended Process

To help you understand the recommended process diagrammed above, this section explains each component of the diagram:

- `USE CASES` - the first phase of work, focused on researching, documenting, and getting feedback on relevant use cases for a given process improvement need
  - `Research` - search the internet, read books, articles, and talk to folks to understand *which* scenarios and use cases may apply to the process improvement need. For example, if the need is something like *"Living documentation best practices for development lifecycle artifacts"* then some use cases could involve things like `Automated PyDoc documentation generation from code`, `User guide generation from static GitHub flavored Markdown`. Basically, consult the community and literature to get specific on the pressing use case scenarios for this need, and identify tools that may help support or satisfy this need.
  - `Diagramming` - here you'll want to *diagram* the research you've collected on scenario / use cases and tools in a format that SLIM community members can easily understand and comment on. The diagramming approach we're recommending with use cases is to create a *mind-map*. See the [Wikipedia article](https://en.wikipedia.org/wiki/Mind_map) on mind mapping for more information about the technique. To generate consistent mind map digrams, we're suggesting you use a tool called [MarkMap](https://github.com/gera2ld/markmap) both because it creates interactive mind-maps and because it support diagrams being version controlled and easily edited by multiple people. What you'll want to do is to edit the `/use-cases/markmap.md` document in your local directory with use case and tool information you've researched. Add parent nodes for use cases and leaf nodes for tools within the markdown file. The use cases should come first, and be broken down into categories that logically model the tree of use cases you've collected. You can be as limited or as comprehensive as you like with the use cases, the key is to make sure the use cases are readable. A suggestion is to prefix the parent / child node relationships in this file with English-language perpositions (e.g. In, From, To) for the use case information and the keyword "Using" for the tool information. For example, a parent-child relationship within your markdown file to help share best practices for documentation hosting could be:
    ```
    * Documentation Best Practices
        * For Hosting
            * Of Source-Controlled (Static) Content
                * With Markdown support
                    *   Using Jekyll / GitHub Pages
    ```
    Once you've documented your use cases and tools within the respective `markmap.md` file, you'll just need to add and commit your file to GitHub, where an automated GitHub Action (markmap) will auto-generate an equivalent `markmap.html` rendering of your markdown file and commit it to the same directory where you've stored the `markmap.md` file (inside the `use-cases` directory). 
  - `Feedback` - this is the step to take a pause in your development, and reach out to the SLIM community to get feedback on:
    - The coverage of use cases in your mindmap rendering (e.g. are you missing critical use cases?)
    - An assessment of *which* use case(s) are highest priority to the community. You'll use this to help provide some focus on the scope of reference architectures you should document for your use cases
- `REFERENCE ARCHITECTURES`
  - `Diagramming` - in this step, you'll want to review the feedback you've received from the SLIM community on your use case mindmaps, and select the highest priorty use cases to create an architectural reference diagram for. It's a little bit of an art at this point, but you'll want to keep the level of abstraction high enough that specific tool solutions can be interchanged but your diagram will still remain valid. The key idea here is to provide a reference architecture that's largely tool-agnostic, and can be used by SLIM community members easily to understand how a best practice solution data or process flow may look like. The recommended diagramming tool here is to leverage the [Mermaid](https://mermaid-js.github.io/mermaid/#/) markdown diagramming tool that has native GitHub integrations. This way, again, diagrams can be easily understood, version controlled, and edited by multiple people. We recommend you [this tutorial](https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/) to get started with this framework, and document your flow chart architecture diagram in `/reference-architectures/ref-archi-XYZ.md`. We also recommend you edit your mind-map markdown files to link to your reference architecture diagrams using hyperlinks. See Markmap [examples](https://markmap.js.org/repl) for hyperlinking.
  - `Feedback` - now is again the time to reach out to the SLIM community and get feedback on your new diagram. Specifically, its a good idea to get request feedback on whether the diagram makes sense and has large coverage over the use cases you're exploring, and also to gather feedback on the most important criteria for evaluating whether a given architecture (along with its tools of choice). You'll use these criteria to help document trade studies between tools of interest in the next step.
- `TRADE STUDIES` 
  - `Diagramming` - in this step, you'll want to do some research on important metric criteria by which to evaluate possible tools documented in your use case diagram and applicable to the architecture diagram you generated in previous steps. We recommend using markdown tables to create your trade studies, this way the documentation you write can be easily viewed, version controlled, and modified by multiple people. Add your diagrams to the `trade-studies/` folder within your best practices parent folder.
  - `Feedback` - again, it's a good idea to reach out to the SLIM community and gain feedback on your latest diagram
- `STARTER KITS`
  - `Feedback` - in this step, we ask you to reach out to the SLIM community for ideas and feedback on the most useful starter kits to create, reflecting use cases, architecture diagrams, and metric analyses that you've produced. Once you get feedback on a highly useful starter kit scenario, its time to start coding or configuring a sample starter kit
  - `Create` - here's where you'll want to spend some dedicated time to create a starter kit. A starter kit can be anything that helps SLIM community members initialize an instance of your architecture that uses tools you've evaluated and fulfills a use case you explored. For example, for our "Documentation Hosting" process improvement need, we may create a starter kit that takes the form of a GitHub Action Workflow automatically generating documentation sites from customized markdown static content on GitHub. It's always a good idea to make your starter kit as generic as possible, including using environment variables to allow SLIM community members to customize the starter kit easily. Add your starter kit scripts or configuration to the `starter-kits/` folder within your best practices paretn folder.
  - `Infusion` - in this final step, it's time to share your entire solution with the SLIM community and optionally aid community members with infusing your starter kit into their development workflow, or helping them understand any one of your diagrams produced. The best way to kickstart infusion is to propose a formal pull-request for your entire best practices folder (so that it can be incorporated in to the SLIM documentation site) and announce the development work you've down to the community.

#### For Adding Improvements to an Existing Best Practice Guide

TBD

## Version Control

TBD

## Issue Tracking

TBD

## Communication Resources

TBD

## Contribution Guidelines

TBD

# FAQ

TBD
