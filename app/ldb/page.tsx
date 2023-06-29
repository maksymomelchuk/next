'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateLdbById, useFetchAllLdb } from '@/api/ldb/ldb'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
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
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAllLdb()

  // Update data
  const { mutateAsync: updateLdbQuery } = useMutation({
    mutationFn: updateLdbById,
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

  const table = useTable(flatData, columns, updateLdbQuery, ldbFormSchema)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <TableLayout
      table={table}
      data={flatData}
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
