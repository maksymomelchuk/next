'use client'

import { useContext } from 'react'

import { AuthContext } from '@/api/auth/AuthContextProvider'

export const useCheckDataPermission = (pathname: string) => {
  const { permissions } = useContext(AuthContext)

  let canCreate
  let canUpdate
  let canDelete
  let canUploadFile

  if (pathname === '/ldb') {
    canCreate = permissions?.includes('Ldb@CreateRecord')
    canUpdate = permissions?.includes('Ldb@UpdateRecord')
    canDelete = permissions?.includes('Ldb@DeleteRecord')
  } else if (pathname === '/sdp') {
    canCreate = permissions?.includes('Sdp@CreateSdp')
    canUpdate = permissions?.includes('Sdp@UpdateSdp')
  } else if (pathname === '/msag/imports' || pathname === '/msag/records') {
    canUpdate = permissions?.includes('Msag@UpdateRecord')
    canDelete = permissions?.includes('Msag@DeleteRecord')
    canCreate = permissions?.includes('Msag@CreateRecord')
    canUploadFile = permissions?.includes('Msag@UploadFile')
  } else if (pathname === '/soi/imports' || pathname === '/soi/records') {
    canUpdate = permissions?.includes('Soi@UpdateRecord')
    canDelete = permissions?.includes('Soi@DeleteRecord')
    canCreate = permissions?.includes('Soi@CreateRecord')
    canUploadFile = permissions?.includes('Soi@UploadFile')
  }

  return { canCreate, canUpdate, canDelete, canUploadFile }
}
