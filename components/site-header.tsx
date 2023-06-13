import { useContext } from "react"
import { AuthContext } from "@/api/auth/AuthContextProvider"
import { AlignJustify, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
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
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <h1>Welcome {authContext.username || "Guest"}!</h1>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outlineNav">Logout</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="text-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={authContext.logout}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Button
              variant="ghostNav"
              onClick={toggleMenu}
              className="lg:hidden"
            >
              {!showMenu ? <AlignJustify /> : <X />}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
