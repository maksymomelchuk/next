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
}

export const CustomTable: React.FC<CustomTableProps> = ({
  table,
  columnSearch,
}) => (
  <Table>
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
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
                    <div>
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
            (table.options.meta?.selectedRow[row.id] || row.getIsSelected()) &&
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
)
