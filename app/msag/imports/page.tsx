'use client'

import React, { useState } from 'react'

import {
  fetchAllMsagImports,
  updateMsagImportsById,
} from '@/api/msag/msag-imports'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { msagImportsSchema } from './msag-imports-form'

type MsagImportsProps = {}

const MsagImportsPage: React.FC<MsagImportsProps> = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['msag-imports'],
    fetchAllMsagImports
  )
  // Update data
  const { mutateAsync: updateMsagImportsQuery } = useUpdateData(
    updateMsagImportsById,
    ['msag-imports']
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
