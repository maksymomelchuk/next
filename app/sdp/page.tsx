'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchAllSdp } from '@/api/sdp/sdp'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { SdpForm } from './sdp-form'

const SdpPage = () => {
  // Fetch data
  const { data } = useQuery({
    queryKey: ['sdp'],
    queryFn: fetchAllSdp,
  })

  console.log('file: page.tsx:21 ~ SdpPage ~ data:', data)

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
              {data?.map((sdp, index) => (
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
            {data?.map((sdp, index) => (
              <TabsContent key={sdp.id} value={String(index)} className="grow">
                <div className="px-5">
                  <SdpForm data={sdp} />
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
