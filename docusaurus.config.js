// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SLIM',
  tagline: 'Software Lifecycle Improvement & Modernization (SLIM)',
  favicon: '/img/favicon.ico',

  // Set the production url of your site here
  url: 'https://nasa-ammos.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/slim/',

  // GitHub pages deployment config.
  organizationName: 'nasa-ammos',
  projectName: 'slim',

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/nasa-ammos/slim/tree/main/',
          sidebarCollapsed: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/nasa-ammos/slim/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'SLIM',
        logo: {
          alt: 'Software Lifecycle Improvement & Modernization (SLIM)',
          src: 'img/nasa-jpl.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'guidesSidebar',
            position: 'left',
            label: 'Guides',
          },
          {
            type: 'docSidebar',
            sidebarId: 'toolsSidebar',
            position: 'left',
            label: 'Tools',
          },
          {
            type: 'docSidebar',
            sidebarId: 'contributeSidebar',
            position: 'left',
            label: 'Contribute',
          },
          {
            type: 'docSidebar',
            sidebarId: 'joinSidebar',
            position: 'left',
            label: 'Join',
          },
          {
            type: 'docSidebar',
            sidebarId: 'aboutSidebar',
            position: 'left',
            label: 'About',
          },
          {
            href: 'https://github.com/nasa-ammos/slim',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Guides',
                to: '/docs/guides/search',
              },
              {
                label: 'Tools',
                to: '/docs/tools',
              },
              {
                label: 'Contribute',
                to: '/docs/contribute/CONTRIBUTING',
              },
              {
                label: 'Join',
                to: '/docs/join/',
              },
              {
                label: 'About',
                to: '/docs/about',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/NASA-AMMOS/slim/discussions',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nasa-ammos/slim',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} California Institute of Technology ("Caltech"). U.S. Government sponsorship acknowledged. Contents licensed under Apache License Version 2.0.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        disableSwitch: false,
        defaultMode: 'dark',
        respectPrefersColorScheme: false
      },
    }),

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: [
              '/continuous-testing/starter-kits', // without baseUrl
              '/slim/continuous-testing/starter-kits', // with baseUrl
            ],
            to: '/docs/guides/software-lifecycle/security/secrets-detection/',
          },
        ],
      },
    ],
  ],

  scripts: [
    {
      src: '/js/redirect-handler.js',
      async: true,
    },
  ],
};

module.exports = config;
