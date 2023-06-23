'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateSdpById, useFetchAllSdp } from '@/api/sdp/sdp'
import { useTable } from '@/hooks/useTable'
import { useToast } from '@/components/ui/use-toast'
import { TableLayout } from '@/components/TableLayout/TableLayout'
import { columns } from '@/app/sdp/columns'
import { SdpForm } from '@/app/sdp/sdp-form'

const SdpPage = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Toast
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Fetch data
  const { data } = useFetchAllSdp()
  // Update data
  const { mutate: updateSdpQuery } = useMutation({
    mutationFn: updateSdpById,
    onSuccess: () => {
      queryClient.invalidateQueries(['sdp'])
      toast({ variant: 'success', description: 'Successfully changed' })
    },
  })

  const table = useTable(data ?? [], columns, updateSdpQuery)

  return (
    <TableLayout
      table={table}
      data={data}
      setOpenDialogue={setOpenDialogue}
      openDialogue={openDialogue}
    >
      <SdpForm setOpenDialogue={setOpenDialogue} />
    </TableLayout>
  )
}
export default SdpPage
