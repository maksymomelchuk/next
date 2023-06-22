'use client'

import React from 'react'

import { useFetchAllMsagRecords } from '@/api/msag/msag'

type MsagRecordsProps = {}

const MsagRecords: React.FC<MsagRecordsProps> = () => {
  const { data } = useFetchAllMsagRecords()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>MSAG Records page</div>
      <div>{JSON.stringify(data)}</div>
    </section>
  )
}
export default MsagRecords
