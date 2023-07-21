import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/slim/__docusaurus/debug',
    component: ComponentCreator('/slim/__docusaurus/debug', '0ff'),
    exact: true
  },
  {
    path: '/slim/__docusaurus/debug/config',
    component: ComponentCreator('/slim/__docusaurus/debug/config', '7dd'),
    exact: true
  },
  {
    path: '/slim/__docusaurus/debug/content',
    component: ComponentCreator('/slim/__docusaurus/debug/content', '120'),
    exact: true
  },
  {
    path: '/slim/__docusaurus/debug/globalData',
    component: ComponentCreator('/slim/__docusaurus/debug/globalData', 'a0f'),
    exact: true
  },
  {
    path: '/slim/__docusaurus/debug/metadata',
    component: ComponentCreator('/slim/__docusaurus/debug/metadata', 'a8e'),
    exact: true
  },
  {
    path: '/slim/__docusaurus/debug/registry',
    component: ComponentCreator('/slim/__docusaurus/debug/registry', '263'),
    exact: true
  },
  {
    path: '/slim/__docusaurus/debug/routes',
    component: ComponentCreator('/slim/__docusaurus/debug/routes', 'bb4'),
    exact: true
  },
  {
    path: '/slim/blog',
    component: ComponentCreator('/slim/blog', '69e'),
    exact: true
  },
  {
    path: '/slim/blog/archive',
    component: ComponentCreator('/slim/blog/archive', 'b1c'),
    exact: true
  },
  {
    path: '/slim/blog/first-blog-post',
    component: ComponentCreator('/slim/blog/first-blog-post', '64f'),
    exact: true
  },
  {
    path: '/slim/blog/long-blog-post',
    component: ComponentCreator('/slim/blog/long-blog-post', '32b'),
    exact: true
  },
  {
    path: '/slim/blog/mdx-blog-post',
    component: ComponentCreator('/slim/blog/mdx-blog-post', '42f'),
    exact: true
  },
  {
    path: '/slim/blog/tags',
    component: ComponentCreator('/slim/blog/tags', '94b'),
    exact: true
  },
  {
    path: '/slim/blog/tags/docusaurus',
    component: ComponentCreator('/slim/blog/tags/docusaurus', 'c76'),
    exact: true
  },
  {
    path: '/slim/blog/tags/facebook',
    component: ComponentCreator('/slim/blog/tags/facebook', 'dd6'),
    exact: true
  },
  {
    path: '/slim/blog/tags/hello',
    component: ComponentCreator('/slim/blog/tags/hello', '4d4'),
    exact: true
  },
  {
    path: '/slim/blog/tags/hola',
    component: ComponentCreator('/slim/blog/tags/hola', '783'),
    exact: true
  },
  {
    path: '/slim/blog/welcome',
    component: ComponentCreator('/slim/blog/welcome', '98f'),
    exact: true
  },
  {
    path: '/slim/markdown-page',
    component: ComponentCreator('/slim/markdown-page', '118'),
    exact: true
  },
  {
    path: '/slim/docs',
    component: ComponentCreator('/slim/docs', 'a19'),
    routes: [
      {
        path: '/slim/docs/about/',
        component: ComponentCreator('/slim/docs/about/', '8ab'),
        exact: true,
        sidebar: "aboutSidebar"
      },
      {
        path: '/slim/docs/about/CODE_OF_CONDUCT',
        component: ComponentCreator('/slim/docs/about/CODE_OF_CONDUCT', '194'),
        exact: true,
        sidebar: "aboutSidebar"
      },
      {
        path: '/slim/docs/about/GOVERNANCE',
        component: ComponentCreator('/slim/docs/about/GOVERNANCE', 'e72'),
        exact: true,
        sidebar: "aboutSidebar"
      },
      {
        path: '/slim/docs/category/documentation',
        component: ComponentCreator('/slim/docs/category/documentation', 'a19'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/category/governance',
        component: ComponentCreator('/slim/docs/category/governance', '2f5'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/category/software-lifecycle',
        component: ComponentCreator('/slim/docs/category/software-lifecycle', '72b'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/contribute/contributing/',
        component: ComponentCreator('/slim/docs/contribute/contributing/', '029'),
        exact: true,
        sidebar: "contributeSidebar"
      },
      {
        path: '/slim/docs/contribute/contributing/development-process',
        component: ComponentCreator('/slim/docs/contribute/contributing/development-process', 'd2a'),
        exact: true,
        sidebar: "contributeSidebar"
      },
      {
        path: '/slim/docs/contribute/contributing/introduction',
        component: ComponentCreator('/slim/docs/contribute/contributing/introduction', '56b'),
        exact: true,
        sidebar: "contributeSidebar"
      },
      {
        path: '/slim/docs/contribute/contributing/prereqs',
        component: ComponentCreator('/slim/docs/contribute/contributing/prereqs', '437'),
        exact: true,
        sidebar: "contributeSidebar"
      },
      {
        path: '/slim/docs/contribute/contributing/ways-to-contribute',
        component: ComponentCreator('/slim/docs/contribute/contributing/ways-to-contribute', 'bd1'),
        exact: true,
        sidebar: "contributeSidebar"
      },
      {
        path: '/slim/docs/contribute/submit-best-practice',
        component: ComponentCreator('/slim/docs/contribute/submit-best-practice', '129'),
        exact: true,
        sidebar: "contributeSidebar"
      },
      {
        path: '/slim/docs/guides/documentation/change-log/',
        component: ComponentCreator('/slim/docs/guides/documentation/change-log/', '961'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/documentation/documentation-hosts/',
        component: ComponentCreator('/slim/docs/guides/documentation/documentation-hosts/', '934'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/documentation/documentation-hosts/trade-study-hostingdocs-user',
        component: ComponentCreator('/slim/docs/guides/documentation/documentation-hosts/trade-study-hostingdocs-user', '2de'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/documentation/documentation-hosts/use-cases',
        component: ComponentCreator('/slim/docs/guides/documentation/documentation-hosts/use-cases', 'fce'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/documentation/readme/',
        component: ComponentCreator('/slim/docs/guides/documentation/readme/', '919'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/', '3c4'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/change-request-templates/',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/change-request-templates/', 'bba'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/change-request-templates/github/PULL_REQUEST_TEMPLATE',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/change-request-templates/github/PULL_REQUEST_TEMPLATE', '257'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/code-of-conduct/',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/code-of-conduct/', '0f4'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/contributing-guide/',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/contributing-guide/', '6ed'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/developer-certificate-origin/',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/developer-certificate-origin/', 'd6a'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/issue-templates/',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/issue-templates/', '081'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/issue-templates/github/bug_report',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/issue-templates/github/bug_report', '4e3'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/contributions/issue-templates/github/new_feature',
        component: ComponentCreator('/slim/docs/guides/governance/contributions/issue-templates/github/new_feature', 'bc8'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/governance-model/',
        component: ComponentCreator('/slim/docs/guides/governance/governance-model/', '277'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/governance/governance-model/GOVERNANCE',
        component: ComponentCreator('/slim/docs/guides/governance/governance-model/GOVERNANCE', 'e30'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/search',
        component: ComponentCreator('/slim/docs/guides/search', 'aa9'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/application-starter-kits/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/application-starter-kits/', '801'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/application-starter-kits/python-starter-kit/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/application-starter-kits/python-starter-kit/', 'd83'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/continuous-integration/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/continuous-integration/', 'f7d'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/continuous-integration/continuous-integration-frameworks/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/continuous-integration/continuous-integration-frameworks/', 'a92'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/continuous-integration/continuous-integration-frameworks/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/continuous-integration/continuous-integration-frameworks/', '4da'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/continuous-integration/reference-architecture/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/continuous-integration/reference-architecture/', '035'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/continuous-testing/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/continuous-testing/', '27d'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/continuous-testing/testing-frameworks',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/continuous-testing/testing-frameworks', 'fde'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/security/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/security/', '526'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/security/dependabot/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/security/dependabot/', 'be7'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/slim/docs/guides/software-lifecycle/security/secrets-detection/',
        component: ComponentCreator('/slim/docs/guides/software-lifecycle/security/secrets-detection/', '853'),
        exact: true,
        sidebar: "guidesSidebar"
      }
    ]
  },
  {
    path: '/slim/',
    component: ComponentCreator('/slim/', '17b'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
