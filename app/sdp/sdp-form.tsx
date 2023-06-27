'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createSdp } from '@/api/sdp/sdp'
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
})

interface SdpFormProps {
  setOpenDialogue: React.Dispatch<React.SetStateAction<boolean>>
}

export const SdpForm: React.FC<SdpFormProps> = ({ setOpenDialogue }) => {
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
      name: '',
      alias: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof sdpFormSchema>) => {
    console.log('values -->', values)
    createSdpQuery({ ...values, enabled: 'yes' ? 1 : 0 })
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
              <FormDescription>name</FormDescription>
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
              <FormDescription>Your data alias</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enabled"
          render={({ field: { onChange } }) => (
            <Select onValueChange={onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Enabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
