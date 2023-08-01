'use client'

import React, { useState } from 'react'

import { fetchAllSoiImports, updateSoiImportsById } from '@/api/soi/soi-imports'
import { useCheckPagePermission } from '@/hooks/useCheckPagePermission'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { soiImportsSchema } from './validation-schema'
import { useCreateSearchString } from '@/hooks/useCreateSearchString'

type SoiImportProps = {}

const SoiImport: React.FC<SoiImportProps> = () => {
  // Hook to check if user has permission to access this page
  const havePermission = useCheckPagePermission('Soi@ListRecordsHistory')

  const [openDialogue, setOpenDialogue] = useState(false)

  const searchString = useCreateSearchString('/soi/imports')

  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['/soi/imports', searchString],
    fetchAllSoiImports,
    havePermission,
    searchString
  )

  // Update data
  const { mutateAsync: updateSoiImportsQuery } = useUpdateData(
    updateSoiImportsById,
    ['/soi/imports']
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
    updateSoiImportsQuery,
    soiImportsSchema
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
export default SoiImport
