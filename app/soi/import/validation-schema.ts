import { z } from 'zod'

export const soiImportsSchema = z.object({
  size_human: z.string().min(2).max(127),
  // provider_id: z.string().min(2).max(63),
  // provider_id_series: preprocessSchema(z.string().min(2).max(63).optional()),
  // contact_uri: preprocessSchema(z.string().min(2).max(127).optional()),
  // type_of_provider: preprocessSchema(z.string().min(2).max(127).optional()),
  // language: preprocessSchema(z.string().min(2).max(15).optional()),
})
