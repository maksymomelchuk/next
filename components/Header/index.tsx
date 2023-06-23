import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Header/Logo'
import { MainNav } from '@/components/Header/MainNav'
import { UserInfo } from '@/components/Header/UserInfo'
import { Icons } from '@/components/icons'
import { ThemeToggle } from '@/components/theme-toggle'

interface HeaderProps {
  toggleMenu: () => void
  showMenu: boolean
}

export const Header: React.FC<HeaderProps> = ({ toggleMenu, showMenu }) => {
  return (
    <header className="bg-accent sticky top-0 z-40 w-full border-b text-white">
      <div className="container flex items-center space-x-4 py-4 sm:justify-between sm:space-x-0 lg:py-8">
        <div className="hidden items-center gap-6 md:gap-10 lg:flex">
          <Logo />
          <MainNav items={siteConfig.mainNav} />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <UserInfo />
            <Button
              variant="ghostThemeToggle"
              onClick={toggleMenu}
              className="lg:hidden"
            >
              <Icons.burgerMenu
                className={cn('rotate-0 scale-100 transition-all', {
                  '-rotate-90 scale-0': showMenu,
                })}
              />
              <Icons.closeMenu
                className={cn('absolute rotate-90 scale-0 transition-all', {
                  'rotate-0 scale-100': showMenu,
                })}
              />
              <span className="sr-only">Toggle burger menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
