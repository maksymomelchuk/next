'use client'

import React, { useState } from 'react'

import { fetchAllLdb, updateLdbById } from '@/api/ldb/ldb'
import useCheckPagePermission from '@/hooks/useCheckPagePermission'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { LdbForm, ldbFormSchema } from './ldb-form'

type LdbPageProps = {}

const LdbPage: React.FC<LdbPageProps> = () => {
  // Hook to check if user has permission to access this page
  const havePermission = useCheckPagePermission('Ldb@ListRecords')

  const [openDialogue, setOpenDialogue] = useState(false)

  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['ldb'],
    fetchAllLdb,
    havePermission
  )

  // Update data
  const { mutateAsync: updateLdbQuery } = useUpdateData(updateLdbById, ['ldb'])

  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { flatData, fetchMoreOnBottomReached } = useInfinityScroll({
    data,
    isFetching,
    fetchNextPage,
    tableContainerRef,
  })

  const table = useTable(flatData, columns, updateLdbQuery, ldbFormSchema)

  return (
    <TableLayout
      table={table}
      data={flatData}
      isLoading={isLoading}
      setOpenDialogue={setOpenDialogue}
      openDialogue={openDialogue}
      fetchMoreOnBottomReached={fetchMoreOnBottomReached}
      tableContainerRef={tableContainerRef}
    >
      <LdbForm setOpenDialogue={setOpenDialogue} />
    </TableLayout>
  )
}

export default LdbPage
