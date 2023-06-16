'use client'

import React, { useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useFetchAllSdp, useFetchSdpById } from '@/api/sdp/sdp'
import { ISdp } from '@/types/sdp'
import { useTable } from '@/hooks/useTable'
import { CustomTable } from '@/components/Table'

const Products = () => {
  const { data, isLoading } = useFetchAllSdp()

  const columnHelper = createColumnHelper<ISdp>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'id',
        enableColumnFilter: false,
        enableHiding: true,
      }),
      columnHelper.accessor('name', { header: 'Name' }),
      columnHelper.accessor('alias', { header: 'Alias' }),
      columnHelper.accessor('enabled', { header: 'Enabled' }),
    ],
    []
  )

  const table = useTable(data, columns)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <CustomTable table={table} />
    </section>
  )
}
export default Products
