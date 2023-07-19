import { z } from 'zod'

export const soiImportsSchema = z.object({
  size_human: z.string().min(2).max(127),
})
