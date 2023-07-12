import React, { useContext } from 'react'
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const UserInfo: React.FC = () => {
  const authContext = useContext(AuthContext)

  return (
    <div className="flex items-center gap-2">
      <h1>Welcome {authContext.firstName || 'Guest'}!</h1>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: 'outlineNav' }))}
        >
          User
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
          <DropdownMenuLabel>User Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full py-1.5 px-2 justify-start h-auto"
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
    </div>
  )
}
