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
          return
        }

        // Find next column to show
        const nextColumn = findNextColumnToShow()

        // If there is no next column, no need to do anything
        if (!nextColumn) {
          return
        }

        // If there is a next column, check if it fits in the table
        if (
          table.getTotalSize() + nextColumn.getSize() <=
          element.offsetWidth
        ) {
          nextColumn.toggleVisibility(true)
        }
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

  const findNextColumnToShow = () => {
    // State of columns from local storage
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem(pathname) ?? '{}'
    )

    const allColumns = table.getAllColumns()

    // Loop over all columns except the first and last one (select and actions)
    for (let i = 1; i < allColumns.length - 1; i++) {
      // If column is visible, skip it
      if (allColumns[i].getIsVisible()) {
        continue
      }
      // If column is not visible and it's id is in local storage and it's value is false, skip it
      if (
        allColumns[i].id in dataFromLocalStorage &&
        !dataFromLocalStorage[allColumns[i].id]
      ) {
        continue
      }
      // Return in all other cases
      return allColumns[i]
    }
    return null
  }

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
          {table.getRowModel().rows.map((row) => {
            console.log(row.getAllCells())
            console.log(row.getVisibleCells())

            return (
              <TableRow
                key={row.id}
                data-state={
                  (table.options.meta?.selectedRow[row.id] ||
                    row.getIsSelected()) &&
                  'selected'
                }
              >
                {row.getAllCells().length === row.getVisibleCells().length &&
                  row
                    .getVisibleCells()
                    .map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
