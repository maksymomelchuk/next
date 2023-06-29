'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ILdb } from '@/types/ldb'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/Table/ColumnHeader'
import { EditableCell } from '@/components/Table/EditableCell'
import { RowActions } from '@/components/Table/RowActions'

export const columns: ColumnDef<ILdb>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      width: 10,
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: EditableCell,
    meta: {
      width: 20,
    },
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'data_provider_string',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Provider" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'provider_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider ID" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'provider_id_series',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider ID Series" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'type_of_provider',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type of Provider" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'language',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Language" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'contact_uri',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contacts" />
    ),
    cell: EditableCell,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <RowActions row={row} table={table} />,
    meta: {
      width: 20,
    },
  },
]
