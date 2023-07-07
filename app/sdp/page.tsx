'use client'

import React, { useContext, useState } from 'react'

import AuthContextProvider, {
  AuthContext,
} from '@/api/auth/AuthContextProvider'
import { fetchAllSdp, updateSdpById } from '@/api/sdp/sdp'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { SdpForm, sdpFormSchema } from './sdp-form'

const SdpPage = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['sdp'],
    fetchAllSdp
  )
  // Update data
  const { mutateAsync: updateSdpQuery } = useUpdateData(updateSdpById, ['sdp'])

  //
  // const { hasRole, isAuthenticated } = useContext(AuthContext)
  // console.log('file: page.tsx:30 ~ SdpPage ~ isAuthenticated:', isAuthenticated)
  // const role = hasRole('offline_access')
  // console.log('file: page.tsx:31 ~ SdpPage ~ role:', role)
  //

  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { flatData, fetchMoreOnBottomReached } = useInfinityScroll({
    data,
    isFetching,
    fetchNextPage,
    tableContainerRef,
  })

  const table = useTable(flatData, columns, updateSdpQuery, sdpFormSchema)

  return (
    <TableLayout
      table={table}
      data={flatData}
      isLoading={isLoading}
      setOpenDialogue={setOpenDialogue}
      openDialogue={openDialogue}
      fetchMoreOnBottomReached={fetchMoreOnBottomReached}
      tableContainerRef={tableContainerRef}
    >
      <SdpForm setOpenDialogue={setOpenDialogue} />
    </TableLayout>
  )
}
export default SdpPage
