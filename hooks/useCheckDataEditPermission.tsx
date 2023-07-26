'use client'

import { useContext } from 'react'

import { AuthContext } from '@/api/auth/AuthContextProvider'

export const useCheckDataEditPermission = (requiredPermission: string) => {
  const { permissions } = useContext(AuthContext)

  return permissions?.includes(requiredPermission)
}
