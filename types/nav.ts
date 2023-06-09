interface CollapseItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  collapsible?: boolean
  collapse?: CollapseItem[]
}
