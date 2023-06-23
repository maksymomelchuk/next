'use client'

import { SetStateAction } from 'react'
import {
  Row,
  Table,
  TableMeta,
  TableOptionsResolved,
} from '@tanstack/react-table'
import { MoreHorizontal, Pen, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Icons } from '../icons'

interface table<T> extends Table<T> {
  options: TableOptionsResolved<T> & {
    meta?: TableMeta<T> & {
      selectedRow: { [key: string]: boolean }
      setSelectedRow: React.Dispatch<SetStateAction<{ [key: string]: boolean }>>
      revertData: (rowIndex: number, toSave: boolean) => void
    }
  }
}

interface RowActionsProps<TData> {
  row: Row<TData>
  table: table<TData>
}

export const RowActions = <T,>({ row, table }: RowActionsProps<T>) => {
  const meta = table.options.meta

  const setSelectedRow = (action: 'edit' | 'cancel' | 'save') => {
    meta?.setSelectedRow((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }))

    meta?.revertData(row.index, action === 'save')
  }

  return (
    <div className="flex items-center">
      {!meta?.selectedRow[row.id] ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => setSelectedRow('edit')}>
              <Pen className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <Trash className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-1">
          <button onClick={() => setSelectedRow('cancel')}>
            <Icons.closeMenu className="h-5 w-5 text-red-400" />
          </button>{' '}
          <button onClick={() => setSelectedRow('save')}>
            <Icons.check className="h-5 w-5 text-green-400" />
          </button>
        </div>
      )}
    </div>
  )
}
