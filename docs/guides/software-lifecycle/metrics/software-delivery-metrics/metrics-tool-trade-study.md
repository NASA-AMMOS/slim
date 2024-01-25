# DORA Metrics Tracking Tools Trade Study

## Table of Contents

- [DORA Metrics Tracking Tools Trade Study](#dora-metrics-tracking-tools-trade-study)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Objective](#objective)
  - [Scope](#scope)
  - [Methodology](#methodology)
  - [Open-Source Tools Under Consideration](#open-source-tools-under-consideration)
  - [Evaluation Criteria](#evaluation-criteria)
  - [Tool Evaluation Matrix](#tool-evaluation-matrix)
  - [Analysis](#analysis)
    - [Apache DevLake](#apache-devlake)
    - [ThoughtWorks Metrik](#thoughtworks-metrik)
    - [FourKeys](#fourkeys)
  - [Conclusion](#conclusion)
  - [Recommendations](#recommendations)

## Introduction

This README outlines a trade study conducted to compare various free and open-source tools for tracking DevOps Research and Assessment (DORA) metrics.

## Objective

The primary objective of this trade study is to assess and compare different free and open-source DORA metrics tracking tools.

## Scope

This trade study will focus on comparing a selection of popular free and open-source DORA metrics tracking tools.

## Methodology

1. Selection of Open-Source Tools: A list of relevant free and open-source DORA metrics tracking tools was compiled based on popularity, community recommendations, and industry recognition.

2. Evaluation Criteria: A set of criteria was established to assess the open-source tools. These criteria will be detailed in the "Evaluation Criteria" section.

3. Assessment: Each open-source tool was tested and evaluated against the defined criteria. This involved installing and configuring the tools, exploring their functionality, and assessing their performance.

4. Documentation and Review: A comprehensive review of the open-source tools were documented, including their strengths, weaknesses, and notable features.

5. Analysis: The findings and insights from the assessment were analyzed to make informed recommendations.

## Open-Source Tools Under Consideration

The following free and open-source DORA metrics tracking tools were evaluated in this study:

| Tool Name                                                     | Description                                                                                                                                                                                                                 |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Apache DevLake](https://github.com/apache/incubator-devlake) | Apache DevLake is an open-source dev data platform that ingests, analyzes, and visualizes the fragmented data from DevOps tools to extract insights for engineering excellence, developer experience, and community growth. |
| [ThoughtWorks Metrik](https://github.com/thoughtworks/metrik) | For development teams who want to measure their software delivery and operational (SDO) performance, this is a tool that helps them collect data from CD pipelines and visualize the key metrics in a friendly format.      |
| [FourKeys](https://github.com/dora-team/fourkeys)             | Platform for monitoring the four key software delivery metrics of software delivery                                                                                                                                         |

## Evaluation Criteria

For the evaluation of DORA metrics tracking tools, we will consider the following criteria:

1. **Ease of Installation and Configuration**: How long does it take to set up the tool? 1(longest) - 5(fastest)

2. **Integration with Other Tools**: How well does the open-source tool integrate GitHub, Jenkins, JIRA, etc.? 1(poor integration) - 5(excellent integration)

3. **Community and Support**: What is the level of community and vendor support available for the open-source tool? 1(little support) - 5(fully supported)

4. **Customization and Extensibility**: To what extent can the open-source tool be customized and extended to fit specific requirements like tracking metrics for product usage and community engagement? 1(no customization) - 2(fully customizable)

## Tool Evaluation Matrix

| Tool Name           | Ease of Installation and Configuration | Integration with Other Tools | Community and Support | Customization and Extensibility | Total Score |
| ------------------- | -------------------------------------- | ---------------------------- | --------------------- | ------------------------------- | ----------- |
| Apache DevLake      | 5                                      | 5                            | 5                     | 5                               | 20          |
| ThoughtWorks Metrik | 3                                      | 4                            | 2                     | 3                               | 12          |
| FourKeys            | 2                                      | 3                            | 3                     | 2                               | 10          |

## Analysis

In the analysis section, we will delve into the key findings and observations from the evaluation of the DORA metrics tracking tools

### Apache DevLake

**Ease of Installation and Configuration**: Apache DevLake scored the highest in this category, indicating that it is relatively straightforward to set up and configure.

**Integration with Other Tools**: It excels in integrating with other tools, including GitHub, Jenkins, and JIRA, which demonstrates its ability to seamlessly fit into existing DevOps ecosystems.

**Community and Support**: Apache DevLake boasts strong community and vendor support.

**Customization and Extensibility**: Apache DevLake provides extensive customization options. This allows for customizable metrics tracking.

### ThoughtWorks Metrik

**Ease of Installation and Configuration**: While not the fastest to set up, ThoughtWorks Metrik offers a reasonable installation and configuration process.

**Integration with Other Tools**: It offers decent integration capabilities with other tools, which can be enhanced to improve its compatibility with a wider range of DevOps tools.

**Community and Support**: ThoughtWorks Metrik's community and vendor support are relatively modest, and this may pose challenges for teams seeking robust support options.

**Customization and Extensibility**: This tool provides some room for customization but is not as flexible as Apache DevLake in this regard.

### FourKeys

**Ease of Installation and Configuration**: FourKeys falls behind in terms of installation and configuration, which might require additional time and effort.

**Integration with Other Tools**: It offers moderate integration with other tools, and there is room for improvement to enhance its compatibility further.

**Community and Support**: FourKeys has a decent level of community and vendor support but may not be as well-supported as Apache DevLake.

**Customization and Extensibility**: It provides a moderate level of customization and extensibility, making it a suitable choice for teams with relatively standard requirements.

## Conclusion

Apache DevLake stands out as a strong candidate, particularly for easy installation, robust integration, strong support, and high customization potential. ThoughtWorks Metrik offers a reasonable alternative with a balanced set of features, though it may require additional effort for integration and has more limited support. FourKeys, while a viable option, may need improvement in installation configuration and integration aspects.

## Recommendations

Based on the evaluation results, we offer the following recommendations:

1. Teams seeking a comprehensive DORA metrics tracking tool with strong integration capabilities, support, and customization potential should consider Apache DevLake as their top choice.

2. ThoughtWorks Metrik can be a suitable option for teams with moderate requirements and a willingness to invest additional effort in integration and customization.

3. FourKeys may be a suitable choice for teams with more basic requirements and a preference for moderate installation and configuration complexity.
