interface CollapseItem {
  title: string
  href: string
  key: string
  permission: string
}

export interface NavItem {
  title: string
  href: string
  key: string
  disabled?: boolean
  collapsible?: boolean
  collapse?: CollapseItem[]
  permission: string
}
