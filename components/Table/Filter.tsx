import { Column, Table } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import debounce from 'lodash.debounce'

export const Filter = ({ column }: { column: Column<any, any> }) => {
  const columnFilterValue = column.getFilterValue()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    debounce((name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))

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
}
