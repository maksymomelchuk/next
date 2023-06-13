interface CollapseItem {
  title: string
  href: string
  key: string
}

export interface NavItem {
  title: string
  href: string
  key: string
  disabled?: boolean
  external?: boolean
  collapsible?: boolean
  collapse?: CollapseItem[]
}
