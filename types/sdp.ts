import { z } from 'zod'

import { UserType } from '@/types/generalApiTypes'

const AddressProviderType = z.object({
  id: z.number(),
  data_provider_string: z.string(),
  provider_id: z.string(),
})

const OptionsType = z.object({
  cycle_counter: z.union([z.number(), z.null()]),
  file_format: z.union([z.string(), z.null()]),
  file_pattern: z.union([z.string(), z.null()]),
  private_switch: z.union([z.number(), z.null()]),
  require_header: z.union([z.number(), z.null()]),
  require_trailer: z.union([z.number(), z.null()]),
})

export const SdpOriginalType = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  enabled: z.number(),
  created_at: z.string(),
  adr_providers: z.array(AddressProviderType),
  options: OptionsType,
  updated_at: z.union([z.string(), z.null()]),
  users: z.array(UserType).optional(),
  total_files: z.number(),
  total_records: z.number(),
})

export const SdpArrayType = z.array(SdpOriginalType)

export interface ISdpOriginal extends z.infer<typeof SdpOriginalType> {}
