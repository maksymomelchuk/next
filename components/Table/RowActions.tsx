'use client'

import { Row, Table } from '@tanstack/react-table'
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Icons } from '../icons'
import { EditAction } from './EditAction'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export const DataTableRowActions = <T,>({
  row,
  table,
}: DataTableRowActionsProps<T>) => {
  const meta = table.options.meta

  const setSelectedRow = (action?: string) => {
    meta?.setSelectedRow((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }))

    meta?.revertData(row.index, action === 'cancel')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {meta?.selectedRow[row.id] ? (
          <>
            <DropdownMenuItem onClick={() => setSelectedRow()}>
              <Icons.check className="mr-2 h-3.5 w-3.5 text-green-500" />
              Save
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedRow('cancel')}>
              <Icons.closeMenu className="mr-2 h-3.5 w-3.5 text-accent" />
              Cancel
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => setSelectedRow()}>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
