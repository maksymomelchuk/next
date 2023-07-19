import { useContext, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

import { AuthContext } from '@/api/auth/AuthContextProvider'

const useCheckPagePermission = (requiredPermission: string) => {
  const [havePermission, setHavePermission] = useState(false)
  const { permissions } = useContext(AuthContext)

  useEffect(() => {
    if (permissions) {
      if (permissions.includes(requiredPermission)) {
        setHavePermission(true)
      } else {
        redirect('/')
      }
    }
  }, [permissions])

  return havePermission
}
export default useCheckPagePermission
