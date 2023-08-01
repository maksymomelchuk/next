'use client'

import { ColumnDef } from '@tanstack/react-table'

import { IMsagRecords } from '@/types/msag/msag-records'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/Table/ColumnHeader'
import { EditableCell } from '@/components/Table/EditableCell'
import ExpandButton from '@/components/Table/ExpandButton'
import { RowActions } from '@/components/Table/RowActions'

export const columns: ColumnDef<IMsagRecords>[] = [
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
    accessorKey: 'nena_version',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NENA version" />
    ),
    cell: EditableCell,
    size: 250,
    enableSorting: false,
  },
  {
    accessorKey: 'import_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Import Id" />
    ),
    cell: EditableCell,
    enableSorting: false,
  },
  {
    accessorKey: 'file_index',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File index" />
    ),
    cell: EditableCell,
    enableSorting: false,
  },
  {
    accessorKey: 'status_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Id" />
    ),
    cell: EditableCell,
    enableSorting: false,
  },
  {
    accessorKey: 'parsed_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parsed At" />
    ),
    cell: EditableCell,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <RowActions row={row} table={table} />,
    size: 80,
  },
]
