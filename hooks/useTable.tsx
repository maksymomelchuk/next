import { useEffect, useState } from 'react'
import { fuzzyFilter } from '@/utils/fuzzyFilter'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { AxiosResponse } from 'axios'
import { ZodSchema } from 'zod'

import { validate } from '@/utils/validation'

export const useTable = <T,>(
  fetchedData: T[],
  columns: ColumnDef<T>[],
  updateFunction: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    unknown,
    {
      id: number
      data: T
    },
    unknown
  >,
  schema: ZodSchema
) => {
  const [data, setData] = useState<any[]>([])
  const [originalData, setOriginalData] = useState<any[]>([])
  // Select row for editing
  const [selectedRow, setSelectedRow] = useState({})
  // Select row or multiple rows
  const [rowSelection, setRowSelection] = useState({})
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
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.adr_providers,
    manualFiltering: true,
    manualSorting: true,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
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

      revertData: (rowIndex: number) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? originalData[rowIndex] : row
          )
        )
      },

      saveData: (updatedRow: { id: number }) => {
        setOriginalData((old) =>
          old.map((row, index) => {
            if (index === updatedRow.id) {
              return updatedRow
            }
            return row
          })
        )
      },

      validation: (index: number) => validate(data[index], schema),

      data,
      updateFunction,
      selectedRow,
      setSelectedRow,
    },

    state: {
      globalFilter,
      rowSelection,
    },

    initialState: {
      columnVisibility: {
        // data_provider_string: false,
      },
    },
    // debugTable: true,
  })

  return table
}
