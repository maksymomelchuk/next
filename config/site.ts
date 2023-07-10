export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Next.js',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  mainNav: [
    {
      title: 'Home',
      href: '/',
      key: 'home',
      exact: true,
      collapsible: false,
    },
    {
      title: 'SDP',
      href: '',
      key: 'sdp',
      exact: true,
      collapsible: true,
      collapse: [
        {
          title: 'SDP',
          href: '/sdp',
          key: 'sdp',
        },
        {
          title: 'SDP Profile',
          href: '/sdp/profile',
          key: 'sdp-profile',
        },
        {
          title: 'SDP NENA IDs',
          href: '/sdp/nena',
          key: 'sdp-nena',
        },
      ],
    },
    {
      title: 'SOI',
      href: '/soi',
      key: 'soi',
      exact: true,
      collapsible: true,
      collapse: [
        {
          title: 'SOI Import',
          href: '/soi/import',
          key: 'soi-import',
        },
        {
          title: 'SOI Statuses',
          href: '/soi/statuses',
          key: 'soi-statuses',
        },
        {
          title: 'SOI Records',
          href: '/soi/records',
          key: 'soi-records',
        },
        {
          title: 'SOI Records History',
          href: '/soi/records-history',
          key: 'soi-records-history',
        },
        {
          title: 'SOI Records Statuses',
          href: '/soi/records-statuses',
          key: 'soi-records-statuses',
        },
      ],
    },
    {
      title: 'LDB',
      href: '/ldb',
      key: 'ldb',
      exact: true,
      collapsible: false,
    },
    {
      title: 'MSAG',
      href: '/msag',
      key: 'msag',
      exact: true,
      collapsible: true,
      collapse: [
        {
          title: 'MSAG Records',
          href: '/msag/records',
          key: 'msag-records',
        },
        {
          title: 'MSAG Records History',
          href: '/msag/records-history',
          key: 'msag-records-history',
        },
        {
          title: 'MSAG Records Statuses',
          href: '/msag/records-statuses',
          key: 'msag-records-statuses',
        },
        {
          title: 'MSAG Import Statuses',
          href: '/msag/import-statuses',
          key: 'msag-import-statuses',
        },
        {
          title: 'MSAG Imports',
          href: '/msag/imports',
          key: 'msag-imports',
        },
      ],
    },
  ],
}
