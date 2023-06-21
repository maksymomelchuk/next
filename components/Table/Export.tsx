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

export const Export: React.FC<ExportProps> = ({
  table,
  data,
  componentRef,
}) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <>
      <CSVLink data={data}>
        <Button variant="outline">Export to CSV</Button>
      </CSVLink>
      <Button variant="outline" onClick={handlePrint}>
        Print in PDF
      </Button>
    </>
  )
}
