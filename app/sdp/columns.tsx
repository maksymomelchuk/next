import { ColumnDef } from '@tanstack/react-table'

import { ISdpTransformed } from '@/types/sdp'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/Table/ColumnHeader'
import { EditableCell } from '@/components/Table/EditableCell'
import { RowActions } from '@/components/Table/RowActions'

export const columns: ColumnDef<ISdpTransformed>[] = [
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
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'alias',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alias" />
    ),
    cell: EditableCell,
  },
  {
    accessorKey: 'enabled',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Enabled" />
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
  },
]
