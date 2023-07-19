export type SiteConfig = typeof siteConfig

export const siteConfig = {
  mainNav: [
    {
      title: 'DASHBOARD',
      href: '/',
      key: 'home',
      permission: 'dashboard',
      exact: true,
      collapsible: false,
    },
    {
      title: 'LDB',
      href: '/ldb',
      key: 'ldb',
      permission: 'ldb',
      exact: true,
      collapsible: false,
    },
    {
      title: 'MSAG',
      href: '/msag',
      key: 'msag',
      permission: 'msag',
      exact: true,
      collapsible: true,
      collapse: [
        {
          title: 'MSAG Imports',
          href: '/msag/imports',
          key: 'msag-imports',
          permission: 'Msag@ListImports',
        },
        {
          title: 'MSAG Records',
          href: '/msag/records',
          key: 'msag-records',
          permission: 'Msag@ListRecords',
        },
        {
          title: 'separator',
        },
        {
          title: 'MSAG Records History',
          href: '/msag/records-history',
          key: 'msag-records-history',
          permission: 'Msag@ListRecordsHistory',
        },
      ],
    },
    {
      title: 'SOI',
      href: '/soi',
      key: 'soi',
      permission: 'soi',
      exact: true,
      collapsible: true,
      collapse: [
        {
          title: 'SOI Imports',
          href: '/soi/imports',
          key: 'soi-import',
          permission: 'Soi@ListImports',
        },
        {
          title: 'SOI Records',
          href: '/soi/records',
          key: 'soi-records',
          permission: 'Soi@ListRecords',
        },
        {
          title: 'separator',
        },
        {
          title: 'SOI Records History',
          href: '/soi/records-history',
          key: 'soi-records-history',
          permission: 'Soi@ListRecordsHistory',
        },
      ],
    },
  ],
}
