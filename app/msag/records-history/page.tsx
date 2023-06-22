'use client'

import React from 'react'

import { useFetchAllMsagRecordsHistory } from '@/api/msag/msag'

type MsagRecordsHistoryProps = {}

const MsagRecordsHistory: React.FC<MsagRecordsHistoryProps> = () => {
  const { data } = useFetchAllMsagRecordsHistory()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>MSAG Records History page</div>
      <div>{JSON.stringify(data)}</div>
    </section>
  )
}
export default MsagRecordsHistory
