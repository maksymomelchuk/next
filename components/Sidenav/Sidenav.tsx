import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

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
          <SheetTitle className="text-white">Edit profile</SheetTitle>
          <SheetDescription className="text-white">
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="">FIRST</div>
          <div className="">SECOND</div>
        </div>
        <SheetFooter>
          <Button onClick={toggleMenu}>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
