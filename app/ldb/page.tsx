'use client'

import React, { useEffect, useState } from 'react'

import { fetchAllLdb, updateLdbById } from '@/api/ldb/ldb'
import { useCheckPagePermission } from '@/hooks/useCheckPagePermission'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { LdbForm, ldbFormSchema } from './ldb-form'
import { useCreateSearchString } from '@/hooks/useCreateSearchString'
import { useRouter } from 'next/navigation'
import { useCheckDataPermission } from '@/hooks/useCheckDataPermission'

type LdbPageProps = {}

const LdbPage: React.FC<LdbPageProps> = () => {
  const router = useRouter()
  // Hook to check if user has permission to access this page
  const haveAccess = useCheckPagePermission('Ldb@ListRecords')

  const { canCreate } = useCheckDataPermission('/ldb')

  const [openDialogue, setOpenDialogue] = useState(false)

  const searchString = useCreateSearchString('/ldb')

  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['/ldb', searchString],
    fetchAllLdb,
    haveAccess,
    searchString
  )

  // Update data
  const { mutateAsync: updateLdbQuery } = useUpdateData(updateLdbById, ['/ldb'])

  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { flatData, fetchMoreOnBottomReached } = useInfinityScroll({
    data,
    isFetching,
    fetchNextPage,
    tableContainerRef,
  })

  const table = useTable(flatData, columns, updateLdbQuery, ldbFormSchema)

  useEffect(() => {
    const localStorageData = localStorage.getItem('/ldb-sort')

    if (localStorageData) {
      const searchParams = new URLSearchParams(JSON.parse(localStorageData))

      router.push(`/ldb?${searchParams.toString()}`)
    } else {
      const defaultSortingData = { order_type: 'asc', order_by: 'id' }

      localStorage.setItem('/ldb-sort', JSON.stringify(defaultSortingData))

      router.push(`/ldb?order_by=id&order_type=asc`)
    }
  }, [])

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
      {canCreate ? <LdbForm setOpenDialogue={setOpenDialogue} /> : null}
    </TableLayout>
  )
}

export default LdbPage
