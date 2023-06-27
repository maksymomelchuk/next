'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateLdbById, useFetchAllLdb } from '@/api/ldb/ldb'
import { useTable } from '@/hooks/useTable'
import { useToast } from '@/components/ui/use-toast'
import { TableLayout } from '@/components/TableLayout/TableLayout'
import { columns } from '@/app/ldb/columns'
import { LdbForm, ldbFormSchema } from '@/app/ldb/ldb-form'

type LdbPageProps = {}

const LdbPage: React.FC<LdbPageProps> = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Toast
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Fetch data
  const { data } = useFetchAllLdb()
  // Update data
  const { mutateAsync: updateLdbQuery } = useMutation({
    mutationFn: updateLdbById,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['ldb', id])
      toast({ variant: 'success', description: 'Successfully changed' })
    },
  })

  const table = useTable(data ?? [], columns, updateLdbQuery, ldbFormSchema)

  return (
    <TableLayout
      table={table}
      data={data}
      setOpenDialogue={setOpenDialogue}
      openDialogue={openDialogue}
    >
      <LdbForm setOpenDialogue={setOpenDialogue} />
    </TableLayout>
  )
}
export default LdbPage
