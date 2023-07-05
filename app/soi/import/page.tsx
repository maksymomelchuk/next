'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  updateSoiImportsById,
  useFetchAllSoiImports,
} from '@/api/soi/soi-imports'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useToast } from '@/components/ui/use-toast'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { soiImportsSchema } from './validation-schema'

type SoiImportProps = {}

const SoiImport: React.FC<SoiImportProps> = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Toast
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAllSoiImports()

  // Update data
  const { mutateAsync: updateSoiImportsQuery } = useMutation({
    mutationFn: updateSoiImportsById,
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
