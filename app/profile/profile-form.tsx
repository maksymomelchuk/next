'use client'

import { useContext, useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { AuthContext } from '@/api/auth/AuthContextProvider'
import { editUsersProfile } from '@/api/auth/auth'
import { createSdp } from '@/api/sdp/sdp'
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

export const sdpFormSchema = z.object({
  first_name: z.string().min(1).max(255),
  last_name: z.string().min(1).max(63),
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
      first_name: '',
      last_name: '',
      email: '',
    },
  })

  const reset = form.reset

  const handleSubmit = async (values: z.infer<typeof sdpFormSchema>) => {
    console.log('values -->', values)
    if (!profile) {
      return
    }

    editUsersProfileQuery(values)
  }

  return (
    profile && (
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
  )
}
