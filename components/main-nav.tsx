import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/img/Logo-NGA-White.png"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
  showMenu: boolean
}

export function MainNav({ items, showMenu }: MainNavProps) {
  return (
    <div className=" hidden  gap-6 md:gap-10 lg:flex">
      <Link href="/" className="flex items-center space-x-2">
        <Image alt="logo" src={logo} className="w-16" />
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-base font-medium text-white ",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
