'use client'

import React, { useMemo, useRef } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { CSVLink } from 'react-csv'
import { useReactToPrint } from 'react-to-print'

import { useFetchAllLdb } from '@/api/ldb/ldb'
import { ILdb } from '@/types/ldb'
import { useTable } from '@/hooks/useTable'
import { Button } from '@/components/ui/button'
import { CustomTable } from '@/components/Table'
import { EditAction } from '@/components/Table/EditAction'
import { EditableCell } from '@/components/Table/EditableCell'

type LdbPageProps = {}

const LdbPage: React.FC<LdbPageProps> = () => {
  const { data } = useFetchAllLdb()
  const componentRef = useRef(null)

  const columnHelper = createColumnHelper<ILdb>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'id',
        enableColumnFilter: false,
        enableHiding: true,
      }),
      columnHelper.accessor('data_provider_string', {
        header: 'Data provider',
        cell: EditableCell,
        // meta: {
        //   type: 'text',
        // },
      }),
      columnHelper.accessor('provider_id', {
        header: 'Provider ID',
        cell: EditableCell,
      }),
      columnHelper.accessor('provider_id_series', {
        header: 'Provider ID Series',
        cell: EditableCell,
      }),
      columnHelper.accessor('type_of_provider', {
        header: 'Type of Provider',
        cell: EditableCell,
      }),
      columnHelper.accessor('language', {
        header: 'Language',
        cell: EditableCell,
        meta: {
          type: 'select',
          options: [
            { value: 'EN', label: 'EN' },
            { value: 'UA', label: 'UA' },
          ],
        },
      }),
      columnHelper.accessor('contact_uri', {
        header: 'Contact',
        cell: EditableCell,
      }),
      columnHelper.display({
        id: 'edit',
        cell: EditAction,
      }),
    ],
    []
  )

  const table = useTable(data, columns)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>LDB page</div>
      <div className="w-full overflow-x-auto" ref={componentRef}>
        <CustomTable table={table} />
      </div>
      {data && (
        <div className="flex justify-end gap-4">
          <CSVLink data={data}>
            <Button>Export to CSV</Button>
          </CSVLink>
          <Button onClick={handlePrint}>Print in PDF</Button>
        </div>
      )}
    </section>
  )
}
export default LdbPage
