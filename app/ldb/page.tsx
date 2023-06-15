'use client'

import React, { useMemo } from 'react'
import { createColumnHelper, flexRender } from '@tanstack/react-table'

import { useFetchAllLdb } from '@/api/ldb/ldb'
import { ILdb } from '@/types/ldb'
import { useTable } from '@/hooks/useTable'
import { EditAction } from '@/components/Table/EditAction'
import { EditableCell } from '@/components/Table/EditableCell'

type LdbPageProps = {}

const LdbPage: React.FC<LdbPageProps> = () => {
  const { data } = useFetchAllLdb()

  const columnHelper = createColumnHelper<ILdb>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: 'id' }),
      columnHelper.accessor('data_provider_string', {
        header: 'Data provider',
        cell: EditableCell,
        // meta: {
        //   type: 'text',
        // },
      }),
      columnHelper.accessor('provider_id', {
        header: 'Provider ID',
        cell: EditableCell,
      }),
      columnHelper.accessor('provider_id_series', {
        header: 'Provider ID Series',
        cell: EditableCell,
      }),
      columnHelper.accessor('type_of_provider', {
        header: 'Type of Provider',
        cell: EditableCell,
      }),
      columnHelper.accessor('language', {
        header: 'Language',
        cell: EditableCell,
        meta: {
          type: 'select',
          options: [
            { value: 'EN', label: 'EN' },
            { value: 'UA', label: 'UA' },
          ],
        },
      }),
      columnHelper.accessor('contact_uri', {
        header: 'Contact',
        cell: EditableCell,
      }),
      columnHelper.display({
        id: 'edit',
        cell: EditAction,
      }),
    ],
    []
  )

  const table = useTable(data, columns)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>LDB page</div>
      <table className="border-collapse border ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
    </section>
  )
}
export default LdbPage
