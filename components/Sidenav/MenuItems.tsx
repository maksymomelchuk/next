import * as React from 'react'
import { useContext } from 'react'
import Link from 'next/link'

import { AuthContext } from '@/api/auth/AuthContextProvider'
import { NavItem } from '@/types/nav'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Separator } from '../ui/separator'

interface MenuItemsProps {
  items?: typeof siteConfig.mainNav
  toggleMenu: () => void
}

export const MenuItems: React.FC<MenuItemsProps> = ({ items, toggleMenu }) => {
  const { userType, roles, permissions } = useContext(AuthContext)

  return (
    <div className="gap-6 md:gap-10">
      {items?.length ? (
        <nav className="flex flex-col  gap-6">
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
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'text-foreground flex items-center text-base font-medium hover:underline'
                )}
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ) : (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={item.key}
              >
                <AccordionItem
                  value="item-1"
                  className="text-foreground flex flex-col justify-center gap-2"
                >
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  {item.collapse?.map((subMenu) => {
                    // Don't render separator in sidebar
                    if (subMenu.title === 'separator') {
                      return null
                    }
                    // Don't render menu item if user doesn't have permission
                    if (!permissions?.includes(subMenu.permission || '')) {
                      return null
                    }

                    return (
                      <AccordionContent className="ml-3" key={subMenu.key}>
                        <Link
                          href={subMenu.href || '/'}
                          className={cn(
                            "before:bg-foreground flex items-center text-base font-medium before:mr-2 before:block before:h-1 before:w-1 before:rounded-full before:content-['']"
                          )}
                          onClick={toggleMenu}
                        >
                          {subMenu.title}
                        </Link>
                      </AccordionContent>
                    )
                  })}
                </AccordionItem>
              </Accordion>
            )
          })}
        </nav>
      ) : null}
    </div>
  )
}
