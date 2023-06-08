import { useContext } from "react"
import Link from "next/link"
import { AuthContext } from "@/api/auth/AuthContextProvider"
import { AlignJustify } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

interface SiteHeaderProps {
  toggleMenu: () => void
  showMenu: boolean
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  toggleMenu,
  showMenu,
}) => {
  const authContext = useContext(AuthContext)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-accent text-white">
      <div className="container flex items-center space-x-4 py-4 sm:justify-between sm:space-x-0 lg:py-8">
        <MainNav items={siteConfig.mainNav} showMenu={showMenu} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <h1>Welcome {authContext.username || "Guest"}!</h1>
              <Button variant="outline" onClick={authContext.logout}>
                Logout
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={toggleMenu}
              className="lg:hidden"
            >
              <AlignJustify />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
