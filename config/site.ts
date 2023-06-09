export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
      exact: true,
      collapsible: false,
    },
    {
      title: "Products",
      href: "/products",
      exact: true,
      collapsible: false,
    },
    {
      title: "SDP",
      href: "/sdp",
      exact: true,
      collapsible: true,
      collapse: [
        {
          title: "SDP Profile",
          href: "/sdp/profile",
        },
        {
          title: "SDP NENA IDs",
          href: "/sdp/nena",
        },
      ],
    },
    {
      title: "SOI",
      href: "/soi",
      exact: true,
      collapsible: true,
      collapse: [
        {
          title: "SOI Import",
          href: "/sdp/import",
        },
        {
          title: "SOI Statuses",
          href: "/sdp/statuses",
        },
        {
          title: "SOI Record",
          href: "/sdp/record",
        },
        {
          title: "SOI Record History",
          href: "/sdp/history",
        },
      ],
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
