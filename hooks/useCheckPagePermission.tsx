'use client'

import { useContext, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

import { AuthContext } from '@/api/auth/AuthContextProvider'
import { toast } from '@/components/ui/use-toast'

const useCheckPagePermission = (requiredPermission: string) => {
  const [havePermission, setHavePermission] = useState(false)
  const { permissions } = useContext(AuthContext)

  useEffect(() => {
    if (permissions) {
      if (permissions.includes(requiredPermission)) {
        setHavePermission(true)
      } else {
        toast({
          variant: 'error',
          description: 'You do not have permission to access this page.',
        })
        redirect('/')
      }
    }
  }, [permissions, requiredPermission])

  return havePermission
}
export default useCheckPagePermission
