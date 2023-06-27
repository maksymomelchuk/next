import { ChangeEvent, useEffect, useState } from 'react'
import { CellContext } from '@tanstack/react-table'

export const EditableCell = <T,>({
  getValue,
  row,
  column,
  table,
}: CellContext<T, unknown>) => {
  const initialValue = getValue() as string
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
