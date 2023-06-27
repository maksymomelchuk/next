'use client'

import { SetStateAction } from 'react'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { Row, RowData, Table } from '@tanstack/react-table'
import axios, { AxiosResponse } from 'axios'

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

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    selectedRow: { [key: string]: boolean }
    setSelectedRow: React.Dispatch<SetStateAction<{ [key: string]: boolean }>>
    updateData: (rowIndex: number, columnId: string, value: string) => void
    saveData: (updatedRow: T) => void
    revertData: (rowIndex: number) => void
    validation: (index: number) => true | undefined
    updateFunction: UseMutateAsyncFunction<
      AxiosResponse<any, any>,
      unknown,
      {
        id: number
        data: T
      },
      unknown
    >
    data: T[]
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    type?: string
    options?: {
      label: string
      value: string
    }[]
  }
}

// interface table<T> extends Table<T> {
//   options: RequiredKeys<TableOptionsResolved<T>, 'state'> & {
//     meta?: TableMeta<T> & {
//       selectedRow: { [key: string]: boolean }
//       setSelectedRow: React.Dispatch<SetStateAction<{ [key: string]: boolean }>>
//       revertData: (rowIndex: number) => void
//       validation: (index: number) => boolean
//       data: T[]
//       updateFunction: UseMutateAsyncFunction<
//         AxiosResponse<any, any>,
//         unknown,
//         {
//           id: number
//           data: T
//         },
//         unknown
//       >
//       saveData: (updatedRow: T) => void
//     }
//   }
// }

interface RowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export const RowActions = <T,>({ row, table }: RowActionsProps<T>) => {
  const meta = table.options.meta

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
        onError: (error) => {
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
    meta?.setSelectedRow((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }))
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
              <Icons.dotsHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={handleEdit}>
              <Icons.edit className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <Icons.trash className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
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
  )
}
