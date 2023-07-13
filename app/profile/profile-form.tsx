'use client'

import { useContext, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { AuthContext } from '@/api/auth/AuthContextProvider'
import { editUsersProfile } from '@/api/auth/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export const editUserFormSchema = z.object({
  first_name: z.string().min(1).max(127),
  last_name: z.string().min(1).max(127),
  email: z.string().email(),
})

export const ProfileForm: React.FC = () => {
  const { profile } = useContext(AuthContext)

  useEffect(() => {
    if (profile) {
      reset(profile)
    }
  }, [profile])

  const { toast } = useToast()
  // Query client
  const queryClient = useQueryClient()
  // Create data
  const { mutate: editUsersProfileQuery } = useMutation({
    mutationFn: editUsersProfile,
    onSuccess: () => {
      console.log('SUCCESS')
      queryClient.invalidateQueries(['profile'])
      toast({ variant: 'success', description: 'Successfully changed' })
    },
    onError: (error) => {
      console.log({ error })
    },
  })

  const form = useForm<z.infer<typeof editUserFormSchema>>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
  })

  const reset = form.reset

  const handleSubmit = async (values: z.infer<typeof editUserFormSchema>) => {
    console.log('values -->', values)

    editUsersProfileQuery(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-8 rounded-md border p-5 shadow-xl"
      >
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name *</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name *</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
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
