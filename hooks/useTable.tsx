import React, { useState } from 'react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

type useTableProps = {}

export const useTable = ({ fetchedData, columns, setTable }) => {
  console.log('file: useTable.tsx:7 ~ columns:', columns)
  console.log('file: useTable.tsx:7 ~ fetchedData:', fetchedData)
  const [data, setData] = useState(fetchedData)
  const [originalData, setOriginalData] = useState(fetchedData)
  const [selectedRow, setSelectedRow] = useState({})

  if (!fetchedData) {
    setTable(null)
    return
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      selectedRow,
      setSelectedRow,
      revertData: (rowIndex, revert) => {
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
      updateData: (rowIndex, columnId, value) => {
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
    },
  })

  setTable(table)
}
