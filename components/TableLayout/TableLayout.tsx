import React, { ReactElement, useRef, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Search } from 'lucide-react'

import { LdbForm } from '@/app/ldb/ldb-form'

import { CustomTable } from '../Table'
import { DataTableViewOptions } from '../Table/ColumnVisibility'
import { CreateRowDialogue } from '../Table/CreateRowDialogue'
import { Export } from '../Table/Export'
import { GlobalFilter } from '../Table/GlobalFilter'
import { Button } from '../ui/button'

type TableLayoutProps<T> = {
  data: T[] | undefined
  table: Table<T>
  children: ReactElement
  openDialogue: boolean
  setOpenDialogue: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableLayout = <T,>({
  data,
  table,
  openDialogue,
  setOpenDialogue,
  children,
}: TableLayoutProps<T>) => {
  // Local state
  const [columnSearch, setColumnSearch] = useState(false)

  const componentRef = useRef(null)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="bg-background overflow-hidden rounded-[0.5rem] border shadow-xl">
        <div className="w-full overflow-x-auto p-8" ref={componentRef}>
          <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-between py-4 ">
              <GlobalFilter table={table} />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setColumnSearch(!columnSearch)}
                  className="flex gap-2"
                >
                  <Search className="w-4 " />
                  <span className="hidden lg:block">Column search</span>
                </Button>
                <DataTableViewOptions table={table} />
                <CreateRowDialogue
                  openDialogue={openDialogue}
                  setOpenDialogue={setOpenDialogue}
                >
                  {children}
                </CreateRowDialogue>
              </div>
            </div>
            <div className="rounded-md border">
              <CustomTable
                table={table}
                columnSearch={columnSearch}
                setColumnSearch={setColumnSearch}
              />
            </div>
          </div>
        </div>
        {data && (
          <div className="flex items-center justify-end gap-4 p-8">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <Export data={data} componentRef={componentRef} />
          </div>
        )}
      </div>
    </section>
  )
}
