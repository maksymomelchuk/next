'use client'

import React, { useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useFetchAllUsers, useFetchUserById } from '@/api/auth/auth'
import { useFetchAllLdb, useFetchLdbById } from '@/api/ldb/ldb'
import { useFetchAllSdp, useFetchSdpById } from '@/api/sdp/sdp'
import { ISdp } from '@/types/sdp'

const Products = () => {
  const { data, isLoading } = useFetchAllSdp()
  const { data: dataById } = useFetchSdpById(1)

  const columnHelper = createColumnHelper<ISdp>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: 'id' }),
      columnHelper.accessor('name', { header: 'Name' }),
      columnHelper.accessor('alias', { header: 'Alias' }),
      columnHelper.accessor('enabled', { header: 'Enabled' }),
    ],
    []
  )

  const tableInstance = useReactTable({
    columns,
    data: Array.isArray(data) ? data : [],
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {/* <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
      <span>{JSON.stringify(data)}</span>
    </section>
  )
}
export default Products
