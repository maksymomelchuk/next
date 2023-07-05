'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  updateSoiRecordsById,
  useFetchAllSoiRecords,
} from '@/api/soi/soi-records'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useToast } from '@/components/ui/use-toast'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { soiRecordsSchema } from './validation-schema'

type SoiRecordsProps = {}

const SoiRecords: React.FC<SoiRecordsProps> = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Toast
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAllSoiRecords()

  // Update data
  const { mutateAsync: updateSoiRecordsQuery } = useMutation({
    mutationFn: updateSoiRecordsById,
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
