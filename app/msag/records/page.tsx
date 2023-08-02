'use client'

import React, { useState } from 'react'

import {
  fetchAllMsagRecords,
  updateMsagRecordsById,
} from '@/api/msag/msag-records'
import { TableLayout } from '@/components/TableLayout/TableLayout'
import { useCheckPagePermission } from '@/hooks/useCheckPagePermission'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { useCreateSearchString } from '@/hooks/useCreateSearchString'

import { columns } from './columns'
import { msagRecordsSchema } from './validation-schema'

type MsagRecordsProps = {}

const MsagRecords: React.FC<MsagRecordsProps> = () => {
  // Hook to check if user has permission to access this page
  const haveAccess = useCheckPagePermission('Msag@ListRecords')

  const [openDialogue, setOpenDialogue] = useState(false)

  const searchString = useCreateSearchString('/msag/records')

  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['/msag/records', searchString],
    fetchAllMsagRecords,
    haveAccess,
    searchString
  )

  // Update data
  const { mutateAsync: updateMsagRecordsQuery } = useUpdateData(
    updateMsagRecordsById,
    ['msag-records']
  )

  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { flatData, fetchMoreOnBottomReached } = useInfinityScroll({
    data,
    isFetching,
    fetchNextPage,
    tableContainerRef,
  })

  const table = useTable(
    flatData,
    columns,
    updateMsagRecordsQuery,
    msagRecordsSchema
  )

  return (
    <TableLayout
      table={table}
      data={flatData}
      isLoading={isLoading}
      setOpenDialogue={setOpenDialogue}
      openDialogue={openDialogue}
      fetchMoreOnBottomReached={fetchMoreOnBottomReached}
      tableContainerRef={tableContainerRef}
    />
  )
}
export default MsagRecords
