import React from 'react'
import { Table as TableProps, flexRender } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Filter } from '@/components/Table/Filter'

type CustomTableProps = {
  table: TableProps<any>
  columnSearch: boolean
  setColumnSearch: React.Dispatch<React.SetStateAction<boolean>>
  tableContainerRef: React.MutableRefObject<HTMLDivElement | null>
  fetchMoreOnBottomReached: (
    containerRefElement?: HTMLDivElement | null
  ) => void
}

export const CustomTable: React.FC<CustomTableProps> = ({
  table,
  columnSearch,
  fetchMoreOnBottomReached,
  tableContainerRef,
}) => {
  return (
    <div
      className="h-[400px] w-full overflow-y-auto"
      onScroll={(e) => {
        fetchMoreOnBottomReached(e.target as HTMLDivElement)
      }}
      ref={tableContainerRef}
    >
      <Table className="relative">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`${
                    header.id === 'id'
                      ? 'w-20'
                      : header.id === 'select'
                      ? 'w-10'
                      : header.id === 'actions'
                      ? 'w-20'
                      : undefined
                  } bg-muted sticky top-0 z-10`}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-col gap-3">
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'select-none flex'
                            : 'flex',
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                      {columnSearch && header.column.getCanFilter() ? (
                        <div
                          className={`${
                            columnSearch && header.column.getCanFilter()
                              ? ''
                              : 'hidden'
                          }`}
                        >
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={
                (table.options.meta?.selectedRow[row.id] ||
                  row.getIsSelected()) &&
                'selected'
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
