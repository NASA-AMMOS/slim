// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

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

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
            sidebarId: 'contributeSidebar',
            position: 'left',
            label: 'Contribute',
          },
          {
            type: 'docSidebar',
            sidebarId: 'faqSidebar',
            position: 'left',
            label: 'FAQ',
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
                label: 'Contribute',
                to: '/docs/contribute/contributing/',
              },
              {
                label: 'FAQ',
                to: '/docs/faq',
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
            to: '/', // Redirect to marketplace hub
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
