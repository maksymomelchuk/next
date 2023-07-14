'use client'

import React, { useState } from 'react'

import { fetchAllSdp, updateSdpById } from '@/api/sdp/sdp'
import { useFetchAll } from '@/hooks/useFetchAllData'
import { useInfinityScroll } from '@/hooks/useInfinityScroll'
import { useTable } from '@/hooks/useTable'
import { useUpdateData } from '@/hooks/useUpdateData'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TableLayout } from '@/components/TableLayout/TableLayout'

import { columns } from './columns'
import { SdpForm, sdpFormSchema } from './sdp-form'
import { SdpFormTest } from './sdp-form-test'

const SdpPage = () => {
  const [openDialogue, setOpenDialogue] = useState(false)
  // Fetch data
  const { data, isFetching, fetchNextPage, isLoading } = useFetchAll(
    ['sdp'],
    fetchAllSdp
  )
  // Update data
  const { mutateAsync: updateSdpQuery } = useUpdateData(updateSdpById, ['sdp'])

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
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="bg-background overflow-hidden rounded-[0.5rem] border shadow-xl">
        <div className="p-5">
          <h1 className="text-2xl font-bold">SDP</h1>
          <p className="text-ring dark:text-foreground/80 mt-3">
            Manage your subscriber data providers
          </p>
          <Separator className="my-5" />

          <Tabs
            defaultValue="0"
            className="flex flex-col md:flex-row"
            orientation="vertical"
          >
            <TabsList className="grid h-full min-w-[300px] grid-cols-1 gap-3 bg-inherit">
              {flatData.map((sdp, index) => (
                <TabsTrigger
                  key={sdp.id}
                  value={String(index)}
                  className="data-[state=active]:bg-muted text-foreground justify-start text-base"
                >
                  {sdp.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <Separator className="my-5 md:hidden" />
            {flatData.map((sdp, index) => (
              <TabsContent
                key={sdp.id}
                value={String(index)}
                className="flex-grow"
              >
                <div className="px-5">
                  <SdpFormTest row={sdp} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
export default SdpPage
