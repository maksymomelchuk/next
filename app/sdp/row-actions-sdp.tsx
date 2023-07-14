'use client'

import { useState } from 'react'
import { Row, Table } from '@tanstack/react-table'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icons'
import { SdpFormTest } from '@/app/sdp/sdp-form-test'

interface RowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export const RowActionsSdp = <T,>({ row, table }: RowActionsProps<T>) => {
  const [openDialogue, setOpenDialogue] = useState(false)

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
            <DropdownMenuItem
              onClick={() => {
                setOpenDialogue(true)
                console.log({ row })
              }}
            >
              <Icons.options className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              Details
            </DropdownMenuItem>
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
      <Dialog onOpenChange={setOpenDialogue} open={openDialogue}>
        <DialogContent className="min-w-[calc(100%-50px)]">
          <DialogHeader>
            <DialogTitle>Please, fill all necessary information</DialogTitle>
            <DialogDescription>
              Make changes to your data here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <SdpFormTest setOpenDialogue={setOpenDialogue} row={row} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
