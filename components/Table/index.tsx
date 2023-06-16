import React from 'react'
import { Table, flexRender } from '@tanstack/react-table'

import { Filter } from '@/components/Table/Filter'

type CustomTableProps = {
  table: Table<any>
}

export const CustomTable: React.FC<CustomTableProps> = ({ table }) => (
  <table className="table-fixed border-collapse border">
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="border-b">
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="px-3 py-2 text-left">
              {header.isPlaceholder ? null : (
                <div className="flex flex-col gap-3">
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div className="">
                      <Filter column={header.column} table={table} />
                    </div>
                  ) : null}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="border-b">
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-3 py-2 text-left">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
