import { z } from 'zod'

export const UserType = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
})

export interface IUser extends z.infer<typeof UserType> {}
