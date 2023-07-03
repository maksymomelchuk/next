import React, { useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Table as TableProps, flexRender } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Filter } from '@/components/Table/Filter'

type CustomTableProps = {
  table: TableProps<any>
  columnSearch: boolean
  setColumnSearch: React.Dispatch<React.SetStateAction<boolean>>
  tableContainerRef: React.RefObject<HTMLDivElement>
  fetchMoreOnBottomReached: (
    containerRefElement?: HTMLDivElement | null
  ) => void
}

export const CustomTable: React.FC<CustomTableProps> = ({
  table,
  columnSearch,
  fetchMoreOnBottomReached,
  tableContainerRef,
}) => {
  const pathname = usePathname()

  useEffect(() => {
    const element = tableContainerRef.current

    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      // If table is overflowing horizontally, need to hide the last column
      if (element.offsetWidth < element.scrollWidth) {
        handleHide()
      } else {
        // If table is not overflowing horizontally and have enough space, need to show the last column

        // Check if all columns are visible, if so, no need to do anything
        if (table.getIsAllColumnsVisible()) {
          console.log('all columns visible', table.getIsAllColumnsVisible())
          return
        }

        const visibleColumns = table.getVisibleFlatColumns().length

        const nextColumn = table.getAllColumns()[visibleColumns - 1]

        const nextColumnWidth = nextColumn.getSize()

        if (table.getTotalSize() + nextColumnWidth <= element.offsetWidth) {
          console.log('need to show')
          console.log(nextColumn)
          nextColumn.toggleVisibility(true)
        }

        // ! This is a hacky solution, need to find a better way to do this
        // const visibleColumns = table.getVisibleFlatColumns()
        // console.log(
        //   'file: index.tsx:67 ~ resizeObserver ~ visibleColumns:',
        //   visibleColumns
        // )

        // const nextColumn = table.getAllColumns()[visibleColumns.length]
        // console.log(
        //   'file: index.tsx:73 ~ resizeObserver ~ nextColumn:',
        //   nextColumn
        // )

        // const nextColumnWidth = nextColumn.getSize()

        // const dataFromLocalStorage = JSON.parse(
        //   localStorage.getItem(pathname) ?? '{}'
        // )

        // if (table.getTotalSize() + nextColumnWidth <= element.offsetWidth) {
        //   // Check if data in local storage
        //   if (nextColumn.id in dataFromLocalStorage) {
        //     // If data in local storage, need to check if the column is visible
        //     if (dataFromLocalStorage[nextColumn.id]) {
        //       nextColumn.toggleVisibility(true)
        //     } else {
        //       // If data in local storage, but column is not visible, need to check next column
        //       console.log('data in local storage, but column is not visible')
        //     }
        //     console.log('data in local storage')
        //     // nextColumn.toggleVisibility(true)
        //   } else {
        //     // If no data in local storage, need to show the column
        //     console.log('no data in local storage, need to show')
        //     nextColumn.toggleVisibility(true)
        //   }
        // }
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const handleHide = useCallback(() => {
    table
      .getVisibleFlatColumns()
      [table.getVisibleFlatColumns().length - 2].toggleVisibility(false)
  }, [table])

  const element = tableContainerRef.current

  useEffect(() => {
    if (!element) {
      return
    }

    if (element.offsetWidth < element.scrollWidth) {
      handleHide()
    }
  }, [element, element?.offsetWidth, element?.scrollWidth, handleHide, table])

  return (
    <div
      className="h-[400px] w-full overflow-y-auto overflow-x-auto"
      onScroll={(e) => {
        fetchMoreOnBottomReached(e.target as HTMLDivElement)
      }}
      ref={tableContainerRef}
    >
      <Table className="relative">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`${
                    header.getSize() !== 150
                      ? `max-w-[${header.getSize()}px]`
                      : ''
                  } bg-muted sticky top-0 z-10`}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-col gap-3">
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'select-none flex'
                            : 'flex',
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                      {columnSearch && header.column.getCanFilter() ? (
                        <div
                          className={`${
                            columnSearch && header.column.getCanFilter()
                              ? ''
                              : 'hidden'
                          }`}
                        >
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={
                (table.options.meta?.selectedRow[row.id] ||
                  row.getIsSelected()) &&
                'selected'
              }
              onClick={() => {
                console.log('click', row.original.id)
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
