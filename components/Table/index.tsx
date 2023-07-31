import React, { useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { findNextColumnToShow } from '@/utils/findNextColumnToShow'
import { Table as TableProps, flexRender } from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'

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
        const nextColumn = findNextColumnToShow(pathname, table)

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

  const { rows } = table.getRowModel()

  //Virtualizing is optional, but might be necessary if we are going to potentially have hundreds or thousands of rows
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <div
      className="h-[400px] w-full overflow-auto"
      onScroll={(e) => {
        fetchMoreOnBottomReached(e.target as HTMLDivElement)
      }}
      ref={tableContainerRef}
    >
      <Table className="relative table">
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
                  } sticky top-0 z-10 bg-muted`}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex flex-col gap-3">
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'select-none flex justify-center'
                            : 'flex justify-center',
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
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="table-row-group">
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index]

            return (
              <React.Fragment key={row.id}>
                <TableRow
                  className={`${
                    pathname === '/sdp' && row.original.enabled === 'No'
                      ? 'strikethrough'
                      : ''
                  } table-row`}
                  key={row.id}
                  data-state={
                    (table.options.meta?.selectedRow[row.id] ||
                      row.getIsSelected()) &&
                    'selected'
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="table-cell" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {/* Expandable data in additional row*/}
                {row.getIsExpanded() && (
                  <TableRow
                    key={`${row.id}a`}
                    className="w-full bg-background p-4"
                  >
                    <TableCell colSpan={row.getVisibleCells().length}>
                      <ul className="inline-block pl-6">
                        {row.getAllCells().map((cell) => {
                          const visibleCells = row
                            .getVisibleCells()
                            .map((cell) => cell.column.id)

                          if (visibleCells.includes(cell.column.id)) {
                            return null
                          }

                          return (
                            <li className="p-2" key={cell.column.id + 'li'}>
                              <span className="inline-block font-semibold capitalize">
                                {cell.column.id}:
                              </span>
                              <span className="inline-block pl-2">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
