import { useContext, useState } from 'react'
import Link from 'next/link'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import { AuthContext } from '@/api/auth/AuthContextProvider'
import { NavItem } from '@/types/nav'
import { cn } from '@/lib/utils'

interface MainNavProps {
  items?: NavItem[]
}

export const MainNav: React.FC<MainNavProps> = ({ items }) => {
  const [value, setValue] = useState('')

  const { roles } = useContext(AuthContext)

  return items?.length ? (
    <nav>
      <NavigationMenu.Root value={value} onValueChange={setValue}>
        <NavigationMenu.List className="flex gap-4 font-medium">
          {items?.map((item) =>
            roles?.includes(item.title.toLowerCase()) ? (
              !item.collapsible ? (
                <NavigationMenu.Item key={item.key}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center text-base  text-white hover:underline',
                      item.disabled && 'cursor-not-allowed opacity-80'
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
                    <ul className="text-foreground bg-background absolute rounded-lg p-3 shadow-lg ">
                      {item.collapse?.map((subMenu) => (
                        <li className="" key={subMenu.key}>
                          <Link
                            href={subMenu.href}
                            className={cn(
                              'hover:bg-muted flex flex-col whitespace-nowrap p-3 hover:rounded-lg',
                              item.disabled && 'cursor-not-allowed opacity-80'
                            )}
                            onClick={() => setValue('')}
                          >
                            {subMenu.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            ) : null
          )}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </nav>
  ) : null
}
