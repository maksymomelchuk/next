'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  updateMsagRecordsById,
  useFetchAllMsagRecords,
} from '@/api/msag/msag-records'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useToast } from '@/components/ui/use-toast'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { msagRecordsSchema } from './validation-schema'

type MsagRecordsProps = {}

const MsagRecords: React.FC<MsagRecordsProps> = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Toast
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } =
    useFetchAllMsagRecords()

  // Update data
  const { mutateAsync: updateMsagRecordsQuery } = useMutation({
    mutationFn: updateMsagRecordsById,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['ldb', id])
      toast({ variant: 'success', description: 'Successfully changed' })
    },
  })

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
