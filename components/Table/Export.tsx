'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { CSVLink } from 'react-csv'
import { useReactToPrint } from 'react-to-print'

import { Button } from '../ui/button'

const DynamicCSVLink = dynamic(
  () => import('react-csv').then((module) => module.CSVLink),
  {
    ssr: false, // Prevents the component from being rendered on the server
  }
)

type ExportProps = {
  data: any
  componentRef: any
}

export const Export: React.FC<ExportProps> = ({ data, componentRef }) => {
  const router = usePathname().split('/').splice(1)?.join('-')

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <>
      <DynamicCSVLink data={data} filename={`${router}.csv`}>
        <Button variant="outline">Export to CSV</Button>
      </DynamicCSVLink>
      <Button variant="outline" onClick={handlePrint}>
        Print in PDF
      </Button>
    </>
  )
}
