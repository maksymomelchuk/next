import { Table } from '@tanstack/react-table'

export const findNextColumnToShow = <T>(pathname: string, table: Table<T>) => {
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
