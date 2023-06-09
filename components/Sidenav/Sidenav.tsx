import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/img/Logo-NGA-White.png"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { MenuItems } from "@/components/Sidenav/MenuItems"

interface SidenavProps {
  showMenu: boolean
  toggleMenu: () => void
}

export const Sidenav: React.FC<SidenavProps> = ({ showMenu, toggleMenu }) => {
  const handleEscapeKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      toggleMenu()
    }
  }

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("keydown", handleEscapeKeyPress)
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress)
    }
  }, [showMenu])

  return (
    <Sheet open={showMenu}>
      <SheetContent position="left" size="sm" toggleMenu={toggleMenu}>
        <SheetHeader>
          <Link href="/" className="flex items-center gap-2  space-x-2">
            <Image alt="logo" src={logo} className="w-12" />
            <p className="font-semibold">LINX Dashboard</p>
          </Link>
        </SheetHeader>
        <Separator className="my-4" />
        <MenuItems items={siteConfig.mainNav} toggleMenu={toggleMenu} />
        {/* <SheetFooter>
          <Button onClick={toggleMenu}>Save changes</Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
