'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ILdb } from '@/types/ldb'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/Table/ColumnHeader'
import { EditableCell } from '@/components/Table/EditableCell'
import ExpandButton from '@/components/Table/ExpandButton'
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
    size: 80,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'expand',
    cell: ({ row }) =>
      row.getAllCells().length > row.getVisibleCells().length && (
        <ExpandButton row={row} />
      ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: EditableCell,
    size: 80,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'data_provider_string',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Provider" />
    ),
    cell: EditableCell,
    size: 250,
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
    enableSorting: false,
  },
  {
    accessorKey: 'type_of_provider',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type of Provider" />
    ),
    cell: EditableCell,
    enableSorting: false,
  },
  {
    accessorKey: 'language',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Language" />
    ),
    cell: EditableCell,
    enableSorting: false,
  },
  {
    accessorKey: 'contact_uri',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contacts" />
    ),
    cell: EditableCell,
    size: 130,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <RowActions row={row} table={table} />,
    size: 80,
  },
]
