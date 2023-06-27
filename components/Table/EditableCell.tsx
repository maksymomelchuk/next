import { ChangeEvent, useEffect, useState } from 'react'
import {
  CellContext,
  Column,
  ColumnDef,
  Row,
  Table,
  TableOptionsResolved,
} from '@tanstack/react-table'

// interface table<T> extends Table<T> {
//   options: TableOptionsResolved<T> & {
//     meta?: {
//       updateData: (rowIndex: number, columnId: string, value: string) => void
//       revertData: (rowIndex: number, toSave: boolean) => void
//       selectedRow: { [key: string]: boolean }
//     }
//   }
// }

// interface column<T> extends Column<T> {
//   columnDef: ColumnDef<T> & {
//     meta: {
//       type: string
//       options: any[]
//     }
//   }
// }

// interface EditableCellProps<T> {
//   row: Row<T>
//   column: column<T>
//   table: table<T>
//   getValue: () => any
// }

export const EditableCell = <T,>({
  getValue,
  row,
  column,
  table,
}: CellContext<T, unknown>) => {
  const initialValue = getValue()
  const columnMeta = column.columnDef.meta
  const tableMeta = table.options.meta
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value)
  }

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    tableMeta?.updateData(row.index, column.id, e.target.value)
  }

  if (tableMeta?.selectedRow[row.id]) {
    return columnMeta?.type === 'select' ? (
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value === null ? undefined : value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || 'text'}
      />
    )
  }
  return <span>{value}</span>
}
