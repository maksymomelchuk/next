'use client'

import { preprocessSchema } from '@/utils/preprocessZodOptionalTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createMsagImports } from '@/api/msag/msag'
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
import { useToast } from '@/components/ui/use-toast'

export const msagImportsSchema = z.object({
  size_human: z.string().min(2).max(127),
  // provider_id: z.string().min(2).max(63),
  // provider_id_series: preprocessSchema(z.string().min(2).max(63).optional()),
  // contact_uri: preprocessSchema(z.string().min(2).max(127).optional()),
  // type_of_provider: preprocessSchema(z.string().min(2).max(127).optional()),
  // language: preprocessSchema(z.string().min(2).max(15).optional()),
})

interface MsagImportsFormProps {
  setOpenDialogue: React.Dispatch<React.SetStateAction<boolean>>
}

export const MsagImportsForm: React.FC<MsagImportsFormProps> = ({
  setOpenDialogue,
}) => {
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Create data
  const { mutate: createMsagImportsQuery } = useMutation({
    mutationFn: createMsagImports,
    onSuccess: () => {
      queryClient.invalidateQueries(['ldb'])
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
      }
    },
  })

  const form = useForm<z.infer<typeof msagImportsSchema>>({
    resolver: zodResolver(msagImportsSchema),
    defaultValues: {
      size_human: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof msagImportsSchema>) => {
    console.log('values -->', values)
    createMsagImportsQuery(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="size_human"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size human *</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Size human" {...field} />
              </FormControl>
              <FormDescription>Your data provider</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="provider_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider Id *</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Provider Id"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your data provider Id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="provider_id_series"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider Id Series</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Provider Id Series"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your data provider Id series</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_uri"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contacts</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Contacts" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type_of_provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Provider</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="type of provider"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="EN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
