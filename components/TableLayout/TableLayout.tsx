import React, { ReactElement, useRef, useState } from 'react'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { CustomTable } from '@/components/Table'
import { DataTableViewOptions } from '@/components/Table/ColumnVisibility'
import { CreateRowDialogue } from '@/components/Table/CreateRowDialogue'
import { Export } from '@/components/Table/Export'
import { GlobalFilter } from '@/components/Table/GlobalFilter'
import { Icons } from '@/components/icons'

import { Skeleton } from '@/components/Skeleton/Skeleton'

type TableLayoutProps<T> = {
  data: T[] | undefined
  table: Table<T>
  children?: ReactElement
  openDialogue: boolean
  setOpenDialogue: React.Dispatch<React.SetStateAction<boolean>>
  fetchMoreOnBottomReached: (
    containerRefElement?: HTMLDivElement | null
  ) => void
  tableContainerRef: React.RefObject<HTMLDivElement>
  isLoading: boolean
}

export const TableLayout = <T,>({
  data,
  table,
  openDialogue,
  setOpenDialogue,
  children,
  fetchMoreOnBottomReached,
  tableContainerRef,
  isLoading,
}: TableLayoutProps<T>) => {
  const [columnSearch, setColumnSearch] = useState(false)

  const componentRef = useRef(null)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-xl">
        <div className="w-full overflow-x-auto p-8">
          <div className="w-full">
            <div className="flex flex-col items-center justify-between gap-2 py-4 sm:flex-row ">
              <GlobalFilter table={table} />
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setColumnSearch(!columnSearch)}
                  className="flex gap-2"
                >
                  <Icons.search className="w-4 " />
                  <span className="hidden lg:block">Column search</span>
                </Button>
                <DataTableViewOptions table={table} />
                {children && (
                  <CreateRowDialogue
                    openDialogue={openDialogue}
                    setOpenDialogue={setOpenDialogue}
                  >
                    {children}
                  </CreateRowDialogue>
                )}
              </div>
            </div>
            <div className="rounded-md border" ref={componentRef}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <CustomTable
                  table={table}
                  columnSearch={columnSearch}
                  setColumnSearch={setColumnSearch}
                  tableContainerRef={tableContainerRef}
                  fetchMoreOnBottomReached={fetchMoreOnBottomReached}
                />
              )}
            </div>
          </div>
        </div>
        {data && (
          <div className="flex items-center justify-end gap-4 p-8">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            {!isLoading && <Export data={data} componentRef={componentRef} />}
          </div>
        )}
      </div>
    </section>
  )
}
