import React, { useContext } from 'react'

import { AuthContext } from '@/api/auth/AuthContextProvider'
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
import { Button } from '@/components/ui/button'

export const UserInfo: React.FC = () => {
  const authContext = useContext(AuthContext)

  return (
    <div className="flex items-center gap-2">
      <h1>Welcome {authContext.username || 'Guest'}!</h1>
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
  )
}
