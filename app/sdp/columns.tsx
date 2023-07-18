import { ColumnDef, createColumnHelper } from '@tanstack/react-table'

import { ISdpOriginal } from '@/types/sdp'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/Table/ColumnHeader'
import { EditableCell } from '@/components/Table/EditableCell'
import ExpandButton from '@/components/Table/ExpandButton'
import { RowActions } from '@/components/Table/RowActions'

const columnHelper = createColumnHelper<ISdpOriginal>()

export const columns = [
  columnHelper.display({
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
  }),
  columnHelper.display({
    id: 'expand',
    cell: ({ row }) =>
      row.getAllCells().length > row.getVisibleCells().length && (
        <ExpandButton row={row} />
      ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('id', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: EditableCell,
    enableHiding: false,
    enableColumnFilter: false,
    meta: {
      width: 20,
    },
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: EditableCell,
  }),
  columnHelper.accessor('alias', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alias" />
    ),
    cell: EditableCell,
  }),
  columnHelper.accessor('enabled', {
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
  }),

  // columnHelper.group({
  //   header: 'Options',
  //   columns: [
  //     columnHelper.accessor('options.cycle_counter', {
  //       header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="Cycle counter" />
  //       ),
  //       cell: EditableCell,
  //     }),
  //     columnHelper.accessor('options.file_format', {
  //       header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="File format" />
  //       ),
  //       cell: EditableCell,
  //     }),
  //     columnHelper.accessor('options.file_pattern', {
  //       header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="File pattern" />
  //       ),
  //       cell: EditableCell,
  //     }),
  //   ],
  // }),
  columnHelper.accessor('total_files', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total files" />
    ),
    cell: EditableCell,
  }),
  columnHelper.accessor('total_records', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total records" />
    ),
    cell: EditableCell,
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row, table }) => <RowActions row={row} table={table} />,
    meta: {
      width: 20,
    },
  }),
] as ColumnDef<ISdpOriginal>[]
