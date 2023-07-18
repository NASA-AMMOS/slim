import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '004'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '8e3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a93'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c59'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '1e3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'fe2'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '274'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'e0e'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '70c'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', 'aee'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '4c8'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', 'fba'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '7a3'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', 'f89'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', 'e45'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '71d'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '235'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '088'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '1b4'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'c79'),
    routes: [
      {
        path: '/docs/about/',
        component: ComponentCreator('/docs/about/', 'fbe'),
        exact: true,
        sidebar: "aboutSidebar"
      },
      {
        path: '/docs/about/CODE_OF_CONDUCT',
        component: ComponentCreator('/docs/about/CODE_OF_CONDUCT', '35e'),
        exact: true,
        sidebar: "aboutSidebar"
      },
      {
        path: '/docs/about/GOVERNANCE',
        component: ComponentCreator('/docs/about/GOVERNANCE', '209'),
        exact: true,
        sidebar: "aboutSidebar"
      },
      {
        path: '/docs/category/documentation',
        component: ComponentCreator('/docs/category/documentation', '3ae'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/category/governance',
        component: ComponentCreator('/docs/category/governance', 'e27'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/category/software-lifecycle',
        component: ComponentCreator('/docs/category/software-lifecycle', '2fd'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/contribute/CONTRIBUTING',
        component: ComponentCreator('/docs/contribute/CONTRIBUTING', '120'),
        exact: true,
        sidebar: "contributeSidebar"
      },
      {
        path: '/docs/contribute/submit-best-practice',
        component: ComponentCreator('/docs/contribute/submit-best-practice', '2b3'),
        exact: true,
        sidebar: "contributeSidebar"
      },
      {
        path: '/docs/guides/documentation/change-log/',
        component: ComponentCreator('/docs/guides/documentation/change-log/', '655'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/documentation/documention-hosts/',
        component: ComponentCreator('/docs/guides/documentation/documention-hosts/', '3ef'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/documentation/documention-hosts/trade-study-hostingdocs-user',
        component: ComponentCreator('/docs/guides/documentation/documention-hosts/trade-study-hostingdocs-user', 'a59'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/documentation/documention-hosts/use-cases',
        component: ComponentCreator('/docs/guides/documentation/documention-hosts/use-cases', 'fb4'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/documentation/readme/',
        component: ComponentCreator('/docs/guides/documentation/readme/', 'aed'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/',
        component: ComponentCreator('/docs/guides/governance/contributions/', 'cd7'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/change-request-templates/',
        component: ComponentCreator('/docs/guides/governance/contributions/change-request-templates/', 'bb7'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/change-request-templates/github/PULL_REQUEST_TEMPLATE',
        component: ComponentCreator('/docs/guides/governance/contributions/change-request-templates/github/PULL_REQUEST_TEMPLATE', '298'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/code-of-conduct/',
        component: ComponentCreator('/docs/guides/governance/contributions/code-of-conduct/', 'ff0'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/contributing-guide/',
        component: ComponentCreator('/docs/guides/governance/contributions/contributing-guide/', '89e'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/contributing-guide/CONTRIBUTING',
        component: ComponentCreator('/docs/guides/governance/contributions/contributing-guide/CONTRIBUTING', '471'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/developer-certificate-origin/',
        component: ComponentCreator('/docs/guides/governance/contributions/developer-certificate-origin/', '88e'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/issue-templates/',
        component: ComponentCreator('/docs/guides/governance/contributions/issue-templates/', 'bb0'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/issue-templates/github/bug_report',
        component: ComponentCreator('/docs/guides/governance/contributions/issue-templates/github/bug_report', 'fac'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/contributions/issue-templates/github/new_feature',
        component: ComponentCreator('/docs/guides/governance/contributions/issue-templates/github/new_feature', 'cf5'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/governance-model/',
        component: ComponentCreator('/docs/guides/governance/governance-model/', 'bbf'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/governance/governance-model/GOVERNANCE',
        component: ComponentCreator('/docs/guides/governance/governance-model/GOVERNANCE', 'c2c'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/search',
        component: ComponentCreator('/docs/guides/search', '0de'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/application-starter-kits/',
        component: ComponentCreator('/docs/guides/software-lifecycle/application-starter-kits/', '716'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/application-starter-kits/python-starter-kit/',
        component: ComponentCreator('/docs/guides/software-lifecycle/application-starter-kits/python-starter-kit/', '8de'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/continuous-integration/',
        component: ComponentCreator('/docs/guides/software-lifecycle/continuous-integration/', '7dd'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/continuous-integration/continuous-integration-frameworks/',
        component: ComponentCreator('/docs/guides/software-lifecycle/continuous-integration/continuous-integration-frameworks/', 'a57'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/continuous-integration/continuous-integration-frameworks/',
        component: ComponentCreator('/docs/guides/software-lifecycle/continuous-integration/continuous-integration-frameworks/', '39f'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/continuous-integration/reference-architecture/',
        component: ComponentCreator('/docs/guides/software-lifecycle/continuous-integration/reference-architecture/', 'fd2'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/continuous-testing/',
        component: ComponentCreator('/docs/guides/software-lifecycle/continuous-testing/', 'a02'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/continuous-testing/testing-frameworks',
        component: ComponentCreator('/docs/guides/software-lifecycle/continuous-testing/testing-frameworks', 'a3c'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/security/',
        component: ComponentCreator('/docs/guides/software-lifecycle/security/', 'bbe'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/security/dependabot/',
        component: ComponentCreator('/docs/guides/software-lifecycle/security/dependabot/', '634'),
        exact: true,
        sidebar: "guidesSidebar"
      },
      {
        path: '/docs/guides/software-lifecycle/security/secrets-detection/',
        component: ComponentCreator('/docs/guides/software-lifecycle/security/secrets-detection/', 'edb'),
        exact: true,
        sidebar: "guidesSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '14b'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
