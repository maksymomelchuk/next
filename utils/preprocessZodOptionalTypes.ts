import * as z from 'zod'
import { ZodOptional, ZodString } from 'zod'

export const preprocessSchema = (schema: ZodOptional<ZodString>) => {
  return z.preprocess((val) => {
    if (!val || typeof val !== 'string') return undefined
    return val === '' ? undefined : val
  }, schema)
}
