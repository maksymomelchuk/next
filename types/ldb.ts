import { z } from 'zod'

export const LdbType = z.object({
  id: z.number(),
  created_at: z.string(),
  provider_id: z.string(),
  data_provider_string: z.string(),
  contact_uri: z.union([z.string(), z.null()]),
  language: z.union([z.string(), z.null()]),
  provider_id_series: z.union([z.string(), z.null()]),
  type_of_provider: z.union([z.string(), z.null()]),
  updated_at: z.union([z.string(), z.null()]),
})

export const LdbArrayType = z.array(LdbType)

export interface ILdb extends z.infer<typeof LdbType> {}
