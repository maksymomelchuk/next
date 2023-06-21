'use client'

import React, { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateLdbById, useFetchAllLdb } from '@/api/ldb/ldb'
import { useTable } from '@/hooks/useTable'
import { useToast } from '@/components/ui/use-toast'
import { CustomTable } from '@/components/Table'
import { DataTableViewOptions } from '@/components/Table/ColumnVisibility'
import CreateRowDialogue from '@/components/Table/CreateRowDialogue'
import { Export } from '@/components/Table/Export'
import { GlobalFilter } from '@/components/Table/GlobalFilter'
import { columns } from '@/app/ldb/columns'

import { LdbForm } from './ldb-form'

type LdbPageProps = {}

const LdbPage: React.FC<LdbPageProps> = () => {
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Fetch data
  const { data } = useFetchAllLdb()
  // Update data
  const { mutate: updateLdbQuery } = useMutation({
    mutationFn: updateLdbById,
    onSuccess: () => {
      queryClient.invalidateQueries(['ldb'])
      toast({ variant: 'success', description: 'Successfully changed' })
    },
  })

  const componentRef = useRef(null)

  const table = useTable(data ?? [], columns, updateLdbQuery)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="bg-background overflow-hidden rounded-[0.5rem] border shadow-xl">
        <div className="w-full overflow-x-auto p-8" ref={componentRef}>
          <div className="w-full">
            <div className="flex items-center justify-between py-4">
              <GlobalFilter table={table} />
              <div className="flex items-center gap-2">
                <DataTableViewOptions table={table} />
                <CreateRowDialogue>
                  <LdbForm />
                </CreateRowDialogue>
              </div>
            </div>
            <div className="rounded-md border">
              <div className="w-full overflow-auto"></div>
              <CustomTable table={table} />
            </div>
          </div>
        </div>
        {data && (
          <div className="flex items-center justify-end gap-4 p-8">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <Export table={table} data={data} componentRef={componentRef} />
          </div>
        )}
      </div>
    </section>
  )
}
export default LdbPage
