'use client'

import React, { useMemo, useRef } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { CSVLink } from 'react-csv'
import { useReactToPrint } from 'react-to-print'

import { useFetchAllLdb } from '@/api/ldb/ldb'
import { ILdb } from '@/types/ldb'
import { useTable } from '@/hooks/useTable'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CustomTable } from '@/components/Table'
import { DataTableColumnHeader } from '@/components/Table/Column'
import { DataTableViewOptions } from '@/components/Table/ColumnVisibility'
import { EditAction } from '@/components/Table/EditAction'
import { EditableCell } from '@/components/Table/EditableCell'
import Export from '@/components/Table/Export'
import GlobalFilter from '@/components/Table/GlobalFilter'
import { Icons } from '@/components/icons'

type LdbPageProps = {}

const LdbPage: React.FC<LdbPageProps> = () => {
  const { data } = useFetchAllLdb()
  const componentRef = useRef(null)

  const columnHelper = createColumnHelper<ILdb>()

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }),
      columnHelper.accessor('id', {
        header: 'id',
        enableColumnFilter: false,
        enableHiding: true,
      }),
      columnHelper.accessor('data_provider_string', {
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Email
              {column.getIsSorted() === 'asc' ? (
                <Icons.arrowDown className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <Icons.arrowUp className="ml-2 h-4 w-4" />
              ) : (
                <Icons.sort className="ml-2 h-4 w-4" />
              )}
            </Button>
          )
        },
        cell: EditableCell,
        // meta: {
        //   type: 'text',
        // },
      }),
      columnHelper.accessor('provider_id', {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Provider ID" />
        ),
        enableGlobalFilter: true,
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
      <div className="bg-background overflow-hidden rounded-[0.5rem] border shadow-xl">
        <div className="w-full overflow-x-auto p-8" ref={componentRef}>
          <div className="w-full">
            <div className="flex items-center justify-between py-4">
              <GlobalFilter table={table} />
              <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
              <div className="w-full overflow-auto"></div>
              <CustomTable table={table} />
            </div>
          </div>
        </div>
        {data && (
          <Export table={table} data={data} componentRef={componentRef} />
        )}
      </div>
    </section>
  )
}
export default LdbPage
