import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface MenuItemsProps {
  items?: NavItem[]
  toggleMenu: () => void
}

export function MenuItems({ items, toggleMenu }: MenuItemsProps) {
  return (
    <div className="gap-6 md:gap-10">
      {items?.length ? (
        <nav className="flex flex-col  gap-6">
          {items?.map((item, index) =>
            !item.collapsible ? (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-base font-medium text-white hover:underline",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="flex flex-col justify-center gap-2"
                >
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  {item.collapse?.map((subMenu, index) => (
                    <AccordionContent className="ml-3 ">
                      <Link
                        key={index}
                        href={subMenu.href}
                        className={cn(
                          "flex items-center text-base font-medium text-white before:mr-2 before:block before:h-1 before:w-1 before:rounded-full before:bg-white before:content-['']",
                          item.disabled && "cursor-not-allowed opacity-80"
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
          )}
        </nav>
      ) : null}
    </div>
  )
}
