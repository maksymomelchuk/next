'use client'

import { preprocessSchema } from '@/utils/preprocessZodOptionalTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createLdb } from '@/api/ldb/ldb'
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

const ldbFormSchema = z.object({
  data_provider_string: z.string().min(2).max(127),
  provider_id: z.string().min(2).max(63),
  provider_id_series: preprocessSchema(z.string().min(2).max(63).optional()),
  contact_uri: preprocessSchema(z.string().min(2).max(127).optional()),
  type_of_provider: preprocessSchema(z.string().min(2).max(127).optional()),
  language: preprocessSchema(z.string().min(2).max(15).optional()),
})

interface LdbFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LdbForm: React.FC<LdbFormProps> = ({ setOpen }) => {
  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Create data
  const { mutate: createLdbQuery } = useMutation({
    mutationFn: createLdb,
    onSuccess: () => {
      queryClient.invalidateQueries(['ldb'])
      setOpen(false)
      toast({ variant: 'success', description: 'Successfully created' })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          toast({
            variant: 'error',
            description: 'The provider id has already been taken.',
          })
          console.log('error in creating LDB', error)
        }
      }
    },
  })

  const form = useForm<z.infer<typeof ldbFormSchema>>({
    resolver: zodResolver(ldbFormSchema),
    defaultValues: {
      data_provider_string: '',
      provider_id: '',
      provider_id_series: '',
      contact_uri: '',
      type_of_provider: '',
      language: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof ldbFormSchema>) => {
    console.log('values -->', values)
    createLdbQuery(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="data_provider_string"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Provider *</FormLabel>
              <FormControl>
                <Input placeholder="Data provider" {...field} />
              </FormControl>
              <FormDescription>Your data provider</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="provider_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provider Id *</FormLabel>
              <FormControl>
                <Input placeholder="Provider Id" {...field} />
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
                <Input placeholder="Provider Id Series" {...field} />
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
                <Input placeholder="Contacts" {...field} />
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
                <Input placeholder="type of provider" {...field} />
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
                <Input placeholder="EN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
