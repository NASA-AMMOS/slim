// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SLIM',
  tagline: 'Software Lifecycle Improvement & Modernization (SLIM)',
  favicon: 'img/slim-favicon.ico',


  // Set the production url of your site here
  url: 'https://nasa-ammos.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/slim/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nasa-ammos', // Usually your GitHub org/user name.
  projectName: 'slim', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          sidebarCollapsed: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      // Replace with your project's social card
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
            sidebarId: 'contributeSidebar',
            position: 'left',
            label: 'Contribute',
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
                label: 'Contribute',
                to: '/docs/contribute/CONTRIBUTING',
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
        disableSwitch: true
      },
    }),

    markdown: {
      mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
};

module.exports = config;
