'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateMsagImportsById, useFetchAllMsagImports } from '@/api/msag/msag'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useToast } from '@/components/ui/use-toast'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { MsagImportsForm, msagImportsSchema } from './msag-imports-form'

type MsagImportsProps = {}

const MsagImportsPage: React.FC<MsagImportsProps> = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Toast
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } =
    useFetchAllMsagImports()
  // Update data
  const { mutateAsync: updateMsagImportsQuery } = useMutation({
    mutationFn: updateMsagImportsById,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['sdp', id])
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
    >
      <MsagImportsForm setOpenDialogue={setOpenDialogue} />
    </TableLayout>
  )
}
export default MsagImportsPage
