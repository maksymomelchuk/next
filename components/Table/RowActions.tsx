'use client'

import { Row, Table } from '@tanstack/react-table'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icons'
import { usePathname } from 'next/navigation'
import { useCheckDataPermission } from '@/hooks/useCheckDataPermission'

interface RowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export const RowActions = <T,>({ row, table }: RowActionsProps<T>) => {
  const pathname = usePathname()
  const meta = table.options.meta

  const { canUpdate, canDelete } = useCheckDataPermission(pathname)

  const handleSave = async () => {
    // Check validation
    if (!meta?.validation(row.index)) {
      console.log('VALIDATION FAILED')
      return
    }

    const updatedRow = meta?.data[row.index]
    // Trying to update
    await meta?.updateFunction(
      { id: updatedRow.id, data: updatedRow },
      {
        // If update successful
        onSuccess: () => {
          console.log('SUCCESS')
          meta?.saveData(updatedRow)
          changeSelectedRowStatus()
        },
        // If error occur
        onError: (error: any) => {
          if (axios.isAxiosError(error)) {
            toast({
              variant: 'error',
              description: JSON.stringify(error.response?.data),
            })
          }
          return
        },
      }
    )
  }

  const handleCancel = () => {
    meta?.revertData(row.index)
    changeSelectedRowStatus()
  }

  const handleEdit = () => {
    changeSelectedRowStatus()
  }

  const changeSelectedRowStatus = () => {
    meta?.setSelectedRow((old: { [key: string]: boolean }) => ({
      ...old,
      [row.id]: !old[row.id],
    }))
  }

  return canUpdate || canDelete ? (
    <div className="flex items-center">
      {!meta?.selectedRow[row.id] ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <Icons.dotsHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {canUpdate && (
              <DropdownMenuItem onClick={handleEdit}>
                <Icons.edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Edit
              </DropdownMenuItem>
            )}
            {canUpdate && canDelete && <DropdownMenuSeparator />}
            {canDelete && (
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <Icons.trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-1">
          <button onClick={handleCancel}>
            <Icons.closeMenu className="h-5 w-5 text-red-400" />
          </button>{' '}
          <button onClick={handleSave}>
            <Icons.check className="h-5 w-5 text-green-400" />
          </button>
        </div>
      )}
    </div>
  ) : null
}
