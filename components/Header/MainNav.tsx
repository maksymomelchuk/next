import { useContext, useState } from 'react'
import Link from 'next/link'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import { AuthContext } from '@/api/auth/AuthContextProvider'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'

interface MainNavProps {
  items?: typeof siteConfig.mainNav
}

export const MainNav: React.FC<MainNavProps> = ({ items }) => {
  const [value, setValue] = useState('')

  const { userType, roles, permissions } = useContext(AuthContext)

  return items?.length ? (
    <nav>
      <NavigationMenu.Root value={value} onValueChange={setValue}>
        <NavigationMenu.List className="flex gap-4 font-medium">
          {items?.map((item) => {
            // If user is not root or admin, hide MSAG menu
            if (
              item.title === 'MSAG' &&
              !['root', 'admin'].includes(userType)
            ) {
              return null
            }
            // If user role is not in the list of roles, hide menu
            if (
              !roles?.includes(item?.permission) &&
              item.permission !== 'dashboard'
            ) {
              return null
            }

            return !item.collapsible ? (
              <NavigationMenu.Item key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center text-base  text-white hover:underline'
                  )}
                  onClick={() => setValue('')}
                >
                  {item.title}
                </Link>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={item.key}>
                <NavigationMenu.Trigger
                  className="hover:underline"
                  onPointerMove={(e) => e.preventDefault()}
                >
                  {item.title}
                </NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  <ul className="absolute rounded-lg bg-background p-3 text-foreground shadow-lg ">
                    {item.collapse?.map((subMenu) => {
                      // If submenu is separator, render separator
                      if (subMenu.title === 'separator') {
                        return (
                          <Separator className="my-1" key={subMenu.title} />
                        )
                      }
                      // Don't render menu item if user doesn't have permission
                      if (!permissions?.includes(subMenu.permission || '')) {
                        return null
                      }

                      return (
                        <li key={subMenu.key}>
                          <Link
                            href={subMenu.href || '/'}
                            className={cn(
                              'flex flex-col whitespace-nowrap p-3 hover:rounded-lg hover:bg-muted'
                            )}
                            onClick={() => setValue('')}
                          >
                            {subMenu.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            )
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </nav>
  ) : null
}
