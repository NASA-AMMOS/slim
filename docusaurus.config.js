// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "GenAI Marketplace",
  tagline:
    "AI-powered skills, agents, and MCP servers for GenAI development at JPL",
  favicon: "/img/favicon.ico",

  // Set the production url of your site here
  url: "https://github.jpl.nasa.gov",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/pages/GenAI/genai-marketplace/",

  // GitHub pages deployment config.
  organizationName: "GenAI",
  projectName: "genai-marketplace",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.jpl.nasa.gov/GenAI/genai-marketplace/tree/main/",
          sidebarCollapsed: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.jpl.nasa.gov/GenAI/genai-marketplace/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "GenAI Marketplace",
        logo: {
          alt: "GenAI Marketplace - Jet Propulsion Laboratory",
          src: "img/genai-logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "contributeSidebar",
            position: "left",
            label: "Contribute",
          },
          {
            type: "docSidebar",
            sidebarId: "faqSidebar",
            position: "left",
            label: "FAQ",
          },
          {
            type: "docSidebar",
            sidebarId: "aboutSidebar",
            position: "left",
            label: "About",
          },
          {
            href: "https://github.jpl.nasa.gov/GenAI/genai-marketplace",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Resources",
            items: [
              {
                label: "Contribute",
                to: "/docs/contribute/contributing/",
              },
              {
                label: "FAQ",
                to: "/docs/faq",
              },
              {
                label: "About",
                to: "/docs/about",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub Discussions",
                href: "https://github.jpl.nasa.gov/GenAI/genai-marketplace/discussions",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.jpl.nasa.gov/GenAI/genai-marketplace",
              },
            ],
          },
        ],
        copyright: `GenAI Marketplace - Jet Propulsion Laboratory | Based on <a href="https://nasa-ammos.github.io/slim/" style="color: cyan;">SLIM</a><br/>Copyright © ${new Date().getFullYear()} California Institute of Technology ("Caltech"). U.S. Government sponsorship acknowledged.<br/>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        disableSwitch: false,
        defaultMode: "dark",
        respectPrefersColorScheme: false,
      },
    }),

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: [
              "/continuous-testing/starter-kits", // without baseUrl
              "/slim/continuous-testing/starter-kits", // with baseUrl
            ],
            to: "/", // Redirect to marketplace hub
          },
        ],
      },
    ],
  ],

  scripts: [
    {
      src: "/js/redirect-handler.js",
      async: true,
    },
  ],

  // Custom fields for SLIM configuration
  customFields: {
    // Enhanced branding configuration for easy customization
    brandingConfig: {
      // Visual Assets
      logoPath: "/img/genai-logo.png",

      // Hero Section Control
      hero: {
        showCornerFeatures: false, // Toggle corner features display
        cornerFeatures: [
          {
            position: "top-left",
            icon: "ai-centric.png",
            text: "AI-powered automation for instant best practice infusion",
            enabled: true,
          },
          {
            position: "bottom-left",
            icon: "community.svg",
            text: "Made by the community for the community",
            enabled: true,
          },
          {
            position: "top-right",
            icon: "iterative.svg",
            text: "Internal JPL resource for GenAI development",
            enabled: true,
          },
          {
            position: "bottom-right",
            icon: "scope.svg",
            text: "Skills, agents, and MCP servers for GenAI governance and development",
            enabled: true,
          },
        ],
        customTagline: null, // Override global tagline specifically for hero
      },

      // Marketplace Control
      marketplace: {
        showEmptyState: true, // Show friendly message when marketplace is empty
        // Note: External registries are handled by slimConfig.registries
      },
    },

    slimConfig: {
      localRegistrySources: [
        {
          type: "marketplace-json",
          path: "./.claude-plugin/marketplace.json",
          enabled: true,
        },
        // Future: Support for other types and URLs
      ],
      registries: [
        "./static/data/registry.json", // Local registry (generated from marketplace.json)
        "https://nasa-ammos.github.io/slim/data/registry.json", // External SLIM registry
      ],
    },
  },
};

module.exports = config;
