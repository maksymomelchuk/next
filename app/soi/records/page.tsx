'use client'

import React, { useState } from 'react'

import { fetchAllSoiRecords, updateSoiRecordsById } from '@/api/soi/soi-records'
import { TableLayout } from '@/components/TableLayout/TableLayout'
import { useCheckPagePermission } from '@/hooks/useCheckPagePermission'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { useCreateSearchString } from '@/hooks/useCreateSearchString'

import { columns } from './columns'
import { soiRecordsSchema } from './validation-schema'

type SoiRecordsProps = {}

const SoiRecords: React.FC<SoiRecordsProps> = () => {
  // Hook to check if user has permission to access this page
  const haveAccess = useCheckPagePermission('Soi@ListRecords')

  const [openDialogue, setOpenDialogue] = useState(false)

  const searchString = useCreateSearchString('/soi/records')

  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['/soi/records', searchString],
    fetchAllSoiRecords,
    haveAccess,
    searchString
  )

  // Update data
  const { mutateAsync: updateSoiRecordsQuery } = useUpdateData(
    updateSoiRecordsById,
    ['/soi/records']
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
    updateSoiRecordsQuery,
    soiRecordsSchema
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
export default SoiRecords
