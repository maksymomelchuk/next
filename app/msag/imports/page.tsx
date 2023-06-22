'use client'

import React from 'react'

import { useFetchAllMsagImports } from '@/api/msag/msag'

type MsagImportsProps = {}

const MsagImports: React.FC<MsagImportsProps> = () => {
  const { data } = useFetchAllMsagImports()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>MSAG Imports page</div>
      <div>{JSON.stringify(data)}</div>
    </section>
  )
}
export default MsagImports
