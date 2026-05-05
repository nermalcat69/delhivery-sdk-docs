import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Delhivery SDK",
  tagline: "TypeScript SDK for the Delhivery B2C API",
  favicon: "img/favicon.ico",

  url: process.env.DOCS_URL ?? "https://delhivery-sdk.pages.dev",
  baseUrl: "/",

  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          editUrl:
            "https://github.com/delhivery-sdk/delhivery-sdk/tree/main/apps/docs/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Delhivery SDK",
      logo: {
        alt: "Delhivery SDK",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/delhivery-sdk/delhivery-sdk",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.npmjs.com/package/delhivery-sdk",
          label: "npm",
          position: "right",
        },
        {
          href: "https://delhivery-sdk.pages.dev/llms.txt",
          label: "llms.txt",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Getting Started", to: "/" },
            { label: "API Reference", to: "/category/api-reference" },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Delhivery Developer Portal",
              href: "https://one.delhivery.com/developer-portal",
            },
            {
              label: "npm",
              href: "https://www.npmjs.com/package/delhivery-sdk",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/delhivery-sdk/delhivery-sdk",
            },
            {
              label: "Issues",
              href: "https://github.com/delhivery-sdk/delhivery-sdk/issues",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Delhivery SDK. Built with Docusaurus.`,
    },
    prism: {
      theme: {
        plain: { backgroundColor: "#1e1e2e", color: "#cdd6f4" },
        styles: [],
      },
      darkTheme: {
        plain: { backgroundColor: "#1e1e2e", color: "#cdd6f4" },
        styles: [],
      },
      additionalLanguages: ["bash", "typescript", "json"],
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;
