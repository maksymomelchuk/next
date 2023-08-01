'use client'

import { useCallback, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const localStorageState = JSON.parse(
    localStorage.getItem(`${pathname}-sort`) ?? '{}'
  )

  const createQueryString = useCallback(
    (data: { order_by: string; order_type: string }) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))

      const oldOrderBy = searchParams.get('order_by')

      if (oldOrderBy && oldOrderBy !== data['order_by']) {
        params.delete('order_type')
        params.delete('order_by')
      }

      params.set('order_by', data['order_by'])
      params.set('order_type', data['order_type'])

      router.push(`${pathname}?${params.toString()}`)

      return params.toString()
    },
    [pathname, router, searchParams]
  )

  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem(pathname) ?? '{}')

    if (ls[column.id] === false) {
      column.toggleVisibility(false)
    }
  }, [])

  return column.getCanSort() ? (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-3 h-14 hover:bg-white/70 data-[state=open]:bg-secondary"
          >
            <span>{title}</span>
            {localStorageState.order_by === column.id ? (
              localStorageState.order_type === 'asc' ? (
                <Icons.asc className="ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
              ) : (
                <Icons.desc className="ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
              )
            ) : (
              <Icons.sort className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              const sortState = column.id === localStorageState.order_by

              const data = {
                order_type: !sortState
                  ? 'asc'
                  : localStorageState.order_type === 'asc'
                  ? 'desc'
                  : 'asc',
                order_by: column.id,
              }

              createQueryString(data)

              localStorage.setItem(`${pathname}-sort`, JSON.stringify(data))
            }}
          >
            <Icons.sort className=" mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Sort
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={!column.getCanHide()}
            onClick={() => {
              const ls = JSON.parse(localStorage.getItem(pathname) ?? '{}')
              const updatedLs = { ...ls, [column.id]: false }
              localStorage.setItem(pathname, JSON.stringify(updatedLs))
              column.toggleVisibility(false)
            }}
          >
            <Icons.hide className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-3 h-14 px-1 hover:bg-white/70 data-[state=open]:bg-secondary"
          >
            <span>{title}</span>
            <Icons.dotsHorizontal className="ml-2 h-4 w-4 rotate-90" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            disabled={!column.getCanHide()}
            onClick={() => {
              const ls = JSON.parse(localStorage.getItem(pathname) ?? '{}')
              const updatedLs = { ...ls, [column.id]: false }
              localStorage.setItem(pathname, JSON.stringify(updatedLs))
              column.toggleVisibility(false)
            }}
          >
            <Icons.hide className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
