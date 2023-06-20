import React from 'react'
import { Table } from '@tanstack/react-table'
import { CSVLink } from 'react-csv'
import { useReactToPrint } from 'react-to-print'

import { Button } from '../ui/button'

type ExportProps = {
  table: Table<any>
  data: any
  componentRef: any
}

const Export: React.FC<ExportProps> = ({ table, data, componentRef }) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <div className="flex justify-end gap-4 p-8">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <CSVLink data={data}>
        <Button variant="outline">Export to CSV</Button>
      </CSVLink>
      <Button variant="outline" onClick={handlePrint}>
        Print in PDF
      </Button>
    </div>
  )
}
export default Export
