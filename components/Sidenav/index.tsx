import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/img/linx.png'

import { siteConfig } from '@/config/site'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { MenuItems } from '@/components/SideNav/MenuItems'

interface SidenavProps {
  showMenu: boolean
  toggleMenu: () => void
}

export const SideNav: React.FC<SidenavProps> = ({ showMenu, toggleMenu }) => {
  const handleEscapeKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      toggleMenu()
    }
  }

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('keydown', handleEscapeKeyPress)
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress)
    }
  }, [showMenu])

  return (
    <Sheet open={showMenu}>
      <SheetContent
        position="left"
        size="sm"
        toggleMenu={toggleMenu}
        className="bg-background"
      >
        <SheetHeader>
          <Link href="/" className="flex items-center gap-2  space-x-2">
            <Image alt="logo" src={logo} className="w-12" priority={false} />
            <p className="text-foreground font-semibold">Dashboard</p>
          </Link>
        </SheetHeader>
        <Separator className="my-4" />
        <MenuItems items={siteConfig.mainNav} toggleMenu={toggleMenu} />
        <Separator className="my-4" />
      </SheetContent>
    </Sheet>
  )
}
