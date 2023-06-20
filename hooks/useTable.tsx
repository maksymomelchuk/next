import { useEffect, useState } from 'react'
import { fuzzyFilter } from '@/utils/fuzzyFilter'
import {
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

export const useTable = (fetchedData, columns) => {
  const [data, setData] = useState<any[]>([])
  const [originalData, setOriginalData] = useState<any[]>([])
  const [selectedRow, setSelectedRow] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData)
      setOriginalData(fetchedData)
    }
  }, [fetchedData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    meta: {
      updateData: (rowIndex: number, columnId: number, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          )
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          )
        }
      },
      selectedRow,
      setSelectedRow,
    },
    state: {
      sorting,
      globalFilter,
    },
  })

  return table
}
