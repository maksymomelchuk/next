'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createSdp } from '@/api/sdp/sdp'
import { ISdpOriginal } from '@/types/sdp'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'

export const sdpFormSchema = z.object({
  name: z.string().min(1).max(255),
  alias: z.string().min(1).max(63),
  enabled: z.boolean(),
  adr_providers: z.array(
    z.object({
      id: z.number(),
      data_provider_string: z.string(),
      provider_id: z.string(),
      checked: z.boolean().optional(),
    })
  ),
})

interface SdpFormProps {
  data: ISdpOriginal
}

export const SdpForm: React.FC<SdpFormProps> = ({ data }) => {
  const adrProviders = data.adr_providers.map((provider) => ({
    ...provider,
    checked: true,
  }))
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Create data
  const { mutate: createSdpQuery } = useMutation({
    mutationFn: createSdp,
    onSuccess: () => {
      queryClient.invalidateQueries(['sdp'])
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
      enabled: Boolean(data.enabled),
      adr_providers: data.adr_providers,
    },
  })

  const handleSubmit = (values: z.infer<typeof sdpFormSchema>) => {
    console.log('values -->', values)

    const dataToSend = {
      ...values,
      enabled: Number(values.enabled),
      adr_providers: values.adr_providers
        .filter((provider) => provider.checked)
        .map((provider) => {
          delete provider.checked
          return provider
        }),
    }
    console.log(
      'file: sdp-form-test.tsx:106 ~ handleSubmit ~ dataToSend:',
      dataToSend
    )

    // createSdpQuery({ ...values, enabled: values.enabled === 'yes' ? 1 : 0 })
  }

  console.log('here validation errors -->', form.formState.errors)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Name"
                  className="lg:max-w-[80%]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your official recognizable company name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem className="mt-8">
              <FormLabel>Alias</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Alias"
                  className="lg:max-w-[80%]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Alias refers to a shortcut application use such as SFTP folder.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {adrProviders.length > 0 && (
          <div>
            <p className="mb-5 mt-8 text-sm font-medium leading-none">
              NENA Provider IDs
            </p>
            <div className="grid lg:max-w-[60%] grid-cols-3 gap-8">
              {adrProviders.map((provider, index) => {
                return (
                  <FormField
                    key={provider.id}
                    defaultValue={provider}
                    control={form.control}
                    name={`adr_providers.${index}`}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={provider.id}
                          className="mt-2 flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              onCheckedChange={(checked) => {
                                return field.onChange({
                                  ...field.value,
                                  checked: Boolean(checked),
                                })
                              }}
                              defaultChecked
                            />
                          </FormControl>
                          <FormLabel className="flex w-full  gap-3 text-sm font-normal">
                            <p>{provider.provider_id}</p>
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                )
              })}
            </div>
          </div>
        )}
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="mt-12 flex items-center gap-2">
                  <Switch
                    id="enabled"
                    defaultChecked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="m-0 space-y-0">Enabled</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button type="submit" className="mt-24">
          Save changes
        </Button>
      </form>
    </Form>
  )
}
