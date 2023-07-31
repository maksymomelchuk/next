'use client'

import React from 'react'

import { useCheckPagePermission } from '@/hooks/useCheckPagePermission'

type SoiRecordsHistoryProps = {}

const SoiRecordsHistory: React.FC<SoiRecordsHistoryProps> = () => {
  // Hook to check if user has permission to access this page
  const havePermission = useCheckPagePermission('Soi@ListImports')

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>SOI Records History page</div>
    </section>
  )
}
export default SoiRecordsHistory
