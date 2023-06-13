import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/img/Logo-NGA-White.png"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="hidden items-center gap-6 md:gap-10 lg:flex">
      <Link href="/" className="flex items-center space-x-2">
        <Image alt="logo" src={logo} className="w-16" />
      </Link>
      {items?.length ? (
        <nav className="">
          <NavigationMenu.Root>
            <NavigationMenu.List className="flex gap-3 font-medium">
              {items?.map((item) =>
                !item.collapsible ? (
                  <NavigationMenu.Item key={item.key}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center text-base  text-white hover:underline",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenu.Item>
                ) : (
                  <NavigationMenu.Item key={item.key}>
                    <NavigationMenu.Trigger className="hover:underline">
                      {item.title}
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <ul className="text-foreground bg-background absolute rounded-lg p-3 shadow-lg ">
                        {item.collapse?.map((subMenu) => (
                          <li className="" key={subMenu.key}>
                            <Link
                              href={subMenu.href}
                              className={cn(
                                "hover:bg-border flex flex-col whitespace-nowrap p-3 hover:rounded-lg",
                                item.disabled && "cursor-not-allowed opacity-80"
                              )}
                            >
                              {subMenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                )
              )}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </nav>
      ) : null}
    </div>
  )
}
