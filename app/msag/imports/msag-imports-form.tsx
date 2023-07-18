'use client'

import { preprocessSchema } from '@/utils/preprocessZodOptionalTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createMsagImports } from '@/api/msag/msag-imports'
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
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
