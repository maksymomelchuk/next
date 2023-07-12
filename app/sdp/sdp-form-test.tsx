'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createSdp } from '@/api/sdp/sdp'
import { ISdpTransformed } from '@/types/sdp'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

export const sdpFormSchema = z.object({
  name: z.string().min(1).max(255),
  alias: z.string().min(1).max(63),
  enabled: z.string(),
  adr_providers: z.array(
    z.object({
      id: z.number(),
      data_provider_string: z.string(),
      provider_id: z.string(),
    })
  ),
})

interface SdpFormProps {
  setOpenDialogue: React.Dispatch<React.SetStateAction<boolean>>
  row: Row<any>
}

export const SdpFormTest: React.FC<SdpFormProps> = ({
  setOpenDialogue,
  row,
}) => {
  const data = row.original as ISdpTransformed
  console.log('file: sdp-form-test.tsx:48 ~ data:', data)
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Create data
  const { mutate: createSdpQuery } = useMutation({
    mutationFn: createSdp,
    onSuccess: () => {
      queryClient.invalidateQueries(['sdp'])
      setOpenDialogue(false)
      toast({ variant: 'success', description: 'Successfully created' })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          toast({
            variant: 'error',
            description: JSON.stringify(error.response.data),
          })
          console.log('error in creating LDB', error)
        }
        console.error(error)
      }
    },
  })

  const form = useForm<z.infer<typeof sdpFormSchema>>({
    resolver: zodResolver(sdpFormSchema),
    defaultValues: {
      name: data.name,
      alias: data.alias,
    },
  })

  const handleSubmit = (values: z.infer<typeof sdpFormSchema>) => {
    console.log('values -->', values)
    createSdpQuery({ ...values, enabled: values.enabled === 'yes' ? 1 : 0 })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Name" {...field} />
              </FormControl>
              {/* <FormDescription>name</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alias *</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Alias" {...field} />
              </FormControl>
              {/* <FormDescription>Your data alias</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enabled"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Enabled</FormLabel>
              <Select
                onValueChange={onChange}
                defaultValue={data.enabled.toLowerCase()}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Enabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col gap-4"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>ADR Providers</AccordionTrigger>
            <AccordionContent>
              {data.adr_providers.map((provider, index) => {
                console.log({ provider })
                return (
                  <div className="flex justify-between gap-5 mt-3">
                    <div>{`Data Provider ${index + 1}`}</div>
                    <FormField
                      defaultValue={provider.data_provider_string}
                      control={form.control}
                      name={`adr_providers.${index}.data_provider_string`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Provider String *</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder="Data Provider String"
                              {...field}
                            />
                          </FormControl>
                          {/* <FormDescription>Your data alias</FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      defaultValue={provider.provider_id}
                      control={form.control}
                      name={`adr_providers.${index}.provider_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Provider Id *</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder="Data Provider String"
                              {...field}
                            />
                          </FormControl>
                          {/* <FormDescription>Your data alias</FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Options</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Users</AccordionTrigger>
            <AccordionContent>
              Yes. Its animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
