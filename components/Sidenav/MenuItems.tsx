import * as React from 'react'
import { useContext } from 'react'
import Link from 'next/link'

import { AuthContext } from '@/api/auth/AuthContextProvider'
import { NavItem } from '@/types/nav'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface MenuItemsProps {
  items?: NavItem[]
  toggleMenu: () => void
}

export const MenuItems: React.FC<MenuItemsProps> = ({ items, toggleMenu }) => {
  const { roles } = useContext(AuthContext)

  return (
    <div className="gap-6 md:gap-10">
      {items?.length ? (
        <nav className="flex flex-col  gap-6">
          {items?.map((item) =>
            roles?.includes(item.title.toLowerCase()) ? (
              !item.collapsible ? (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    'text-foreground flex items-center text-base font-medium hover:underline',
                    item.disabled && 'cursor-not-allowed opacity-80'
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
                    {item.collapse?.map((subMenu) => (
                      <AccordionContent className="ml-3" key={subMenu.key}>
                        <Link
                          href={subMenu.href}
                          className={cn(
                            "before:bg-foreground flex items-center text-base font-medium before:mr-2 before:block before:h-1 before:w-1 before:rounded-full before:content-['']",
                            item.disabled && 'cursor-not-allowed opacity-80'
                          )}
                          onClick={toggleMenu}
                        >
                          {subMenu.title}
                        </Link>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              )
            ) : null
          )}
        </nav>
      ) : null}
    </div>
  )
}
