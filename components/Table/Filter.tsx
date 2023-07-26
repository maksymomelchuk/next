import { Column, Table } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from '../ui/use-toast'
import debounce from 'lodash.debounce'

export const Filter = ({
  column,
  table,
}: {
  column: Column<any, any>
  table: Table<any>
}) => {
  // const firstValue = table
  //   .getPreFilteredRowModel()
  //   .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    debounce((name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))

      if (name === 'data_provider_string') {
        if (value.length < 3) {
          toast({
            variant: 'error',
            title: 'Data provider must be at least 3 characters long',
          })
          params.delete(name)
          router.push(`${pathname}?${params.toString()}`)
          return
        }
      }

      if (!value) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      router.push(`${pathname}?${params.toString()}`)

      return params.toString()
    }, 500),
    [pathname, router, searchParams]
  )

  return (
    <Input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => {
        createQueryString(column.id, e.target.value.trim())
        column.setFilterValue(e.target.value)
      }}
      placeholder={`Search...`}
      className="h-8"
    />
  )
  // typeof firstValue === 'number' ? (
  //   <div className="flex space-x-2">
  //     <Input
  //       type="number"
  //       value={(columnFilterValue as [number, number])?.[0] ?? ''}
  //       onChange={(e) =>
  //         column.setFilterValue((old: [number, number]) => [
  //           e.target.value,
  //           old?.[1],
  //         ])
  //       }
  //       placeholder={`Min`}
  //       className="w-full rounded border shadow"
  //     />
  //     <Input
  //       type="number"
  //       value={(columnFilterValue as [number, number])?.[1] ?? ''}
  //       onChange={(e) =>
  //         column.setFilterValue((old: [number, number]) => [
  //           old?.[0],
  //           e.target.value,
  //         ])
  //       }
  //       placeholder={`Max`}
  //       className="w-full rounded border shadow"
  //     />
  //   </div>
  // ) : (
  //   <Input
  //     type="text"
  //     value={(columnFilterValue ?? '') as string}
  //     onChange={(e) => {
  //       createQueryString(column.id, e.target.value.trim())
  //       column.setFilterValue(e.target.value)
  //     }}
  //     placeholder={`Search...`}
  //     className="h-8"
  //   />
  // )
}
