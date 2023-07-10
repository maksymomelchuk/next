import { z } from 'zod'

export const UserType = z.object({
  id: z.number(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
})

export interface IUser extends z.infer<typeof UserType> {}
