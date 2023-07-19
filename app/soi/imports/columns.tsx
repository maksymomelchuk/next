import { ColumnDef } from '@tanstack/react-table'

import { ISoiImports } from '@/types/soi/soi-imports'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/Table/ColumnHeader'
import { EditableCell } from '@/components/Table/EditableCell'
import ExpandButton from '@/components/Table/ExpandButton'
import { RowActions } from '@/components/Table/RowActions'

export const columns: ColumnDef<ISoiImports>[] = [
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
    enableHiding: false,
    enableColumnFilter: false,
    meta: {
      width: 20,
    },
  },
  {
    accessorKey: 'file',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'file_version',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File version" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'modified_human',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified human" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'nena_version',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NENA version" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'size_human',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size human" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'status_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Id" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'total_records',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total records" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'total_valid_records',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total valid records" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'total_error_records',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total error records" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'modified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified" />
    ),
    cell: EditableCell,
    meta: {
      type: 'select',
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
      ],
    },
    enableColumnFilter: false,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <RowActions row={row} table={table} />,
    meta: {
      width: 20,
    },
  },
]
