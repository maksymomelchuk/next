'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { changeUsersPassword } from '@/api/auth/auth'
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

export const changePasswordFormSchema = z
  .object({
    password: z.string().min(8).max(63),
    password_confirmation: z.string().min(8).max(63),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  })

export const ChangePasswordForm: React.FC = () => {
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  })

  const handleSubmit = async (
    values: z.infer<typeof changePasswordFormSchema>
  ) => {
    console.log('values -->', values)

    await changeUsersPassword(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-8 rounded-md border p-5 shadow-xl"
      >
        <div className="flex h-full flex-col justify-between space-y-8">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password *</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password *</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="self-start">
            Change
          </Button>
        </div>
      </form>
    </Form>
  )
}
