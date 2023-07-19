import React, { useContext, useState } from 'react'
import Link from 'next/link'

import { AuthContext } from '@/api/auth/AuthContextProvider'
import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const UserInfo: React.FC = () => {
  const authContext = useContext(AuthContext)
  const [openUsersMenu, setOpenUsersMenu] = useState(false)
  const [openSettingsMenu, setOpenSettingsMenu] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu open={openUsersMenu} onOpenChange={setOpenUsersMenu}>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          {authContext.firstName || 'Guest'}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
          <DropdownMenuItem
            className="p-0"
            onClick={() => setOpenUsersMenu(false)}
          >
            <Link
              href="/profile"
              className="w-full rounded-sm px-2 py-1.5 text-sm"
            >
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto w-full justify-start px-2 py-1.5 font-normal"
              >
                Logout
              </Button>
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
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu open={openSettingsMenu} onOpenChange={setOpenSettingsMenu}>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          Settings
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
          <DropdownMenuItem
            className="p-0"
            onClick={() => setOpenSettingsMenu(false)}
          >
            <Link href="/sdp" className="w-full rounded-sm px-2 py-1.5 text-sm">
              Manage SPDs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-0"
            onClick={() => setOpenSettingsMenu(false)}
          >
            <Link
              href="/sdp/nena"
              className="w-full rounded-sm px-2 py-1.5 text-sm"
            >
              NENA Provider IDs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="p-0"
            onClick={() => setOpenSettingsMenu(false)}
          >
            <Link
              href="/sdp/profile"
              className="w-full rounded-sm px-2 py-1.5 text-sm"
            >
              Users
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
