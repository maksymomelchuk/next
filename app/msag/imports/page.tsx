'use client'

import React, { useRef, useState } from 'react'

import {
  fetchAllMsagImports,
  updateMsagImportsById,
} from '@/api/msag/msag-imports'
import { TableLayout } from '@/components/TableLayout/TableLayout'
import { useCheckPagePermission } from '@/hooks/useCheckPagePermission'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { useCreateSearchString } from '@/hooks/useCreateSearchString'

import { columns } from './columns'
import { msagImportsSchema } from './msag-imports-form'

type MsagImportsProps = {}

const MsagImportsPage: React.FC<MsagImportsProps> = () => {
  // Hook to check if user has permission to access this page
  const haveAccess = useCheckPagePermission('Msag@ListImports')

  const [openDialogue, setOpenDialogue] = useState(false)

  const searchString = useCreateSearchString('/msag/imports')

  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['/msag/imports', searchString],
    fetchAllMsagImports,
    haveAccess,
    searchString
  )
  // Update data
  const { mutateAsync: updateMsagImportsQuery } = useUpdateData(
    updateMsagImportsById,
    ['msag-imports']
  )

  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { flatData, fetchMoreOnBottomReached } = useInfinityScroll({
    data,
    isFetching,
    fetchNextPage,
    tableContainerRef,
  })

  const table = useTable(
    flatData,
    columns,
    updateMsagImportsQuery,
    msagImportsSchema
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
export default MsagImportsPage
