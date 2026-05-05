import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "doc",
      id: "index",
      label: "Getting Started",
    },
    {
      type: "doc",
      id: "installation",
      label: "Installation",
    },
    {
      type: "doc",
      id: "authentication",
      label: "Authentication",
    },
    {
      type: "category",
      label: "API Reference",
      collapsed: false,
      items: [
        "api/serviceability",
        "api/orders",
        "api/tracking",
        "api/shipping",
        "api/warehouses",
        "api/ndr",
        "api/documents",
        "api/webhooks",
      ],
    },
    {
      type: "category",
      label: "Guides",
      items: [
        "guides/create-first-order",
        "guides/cod-orders",
        "guides/bulk-operations",
        "guides/error-handling",
        "guides/webhooks-setup",
      ],
    },
    {
      type: "doc",
      id: "faq",
      label: "FAQ",
    },
    {
      type: "doc",
      id: "changelog",
      label: "Changelog",
    },
  ],
};

export default sidebars;
