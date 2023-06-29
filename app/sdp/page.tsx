'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateSdpById, useFetchAllSdp } from '@/api/sdp/sdp'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useToast } from '@/components/ui/use-toast'
import { TableLayout } from '@/components/TableLayout/TableLayout'
import { columns } from '@/app/sdp/columns'
import { SdpForm, sdpFormSchema } from '@/app/sdp/sdp-form'

const SdpPage = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Toast
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAllSdp()
  // Update data
  const { mutateAsync: updateSdpQuery } = useMutation({
    mutationFn: updateSdpById,
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

  const table = useTable(flatData, columns, updateSdpQuery, sdpFormSchema)

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
      <SdpForm setOpenDialogue={setOpenDialogue} />
    </TableLayout>
  )
}
export default SdpPage
