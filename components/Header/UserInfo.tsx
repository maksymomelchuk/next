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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const UserInfo: React.FC = () => {
  const authContext = useContext(AuthContext)

  return (
    <div className="flex items-center gap-2">
      <h1>Welcome </h1>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: 'outlineNav' }))}
        >
          {authContext.firstName || 'Guest'}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
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
