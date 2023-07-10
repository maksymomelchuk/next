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

const StatisticsType = z.object({
  total_files: z.number(),
  total_records: z.number(),
})

export const SdpOriginalType = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  enabled: z.number(),
  created_at: z.string(),
  // created_by: UserType,
  adr_providers: z.array(AddressProviderType),
  options: OptionsType,
  // statistics: StatisticsType,
  updated_at: z.union([z.string(), z.null()]),
  // updated_by: z.union([UserType, z.null()]),
  users: z.array(UserType),
  total_files: z.number(),
  total_records: z.number(),
})

export const SdpTransformedType = SdpOriginalType.transform((sdp) => ({
  ...sdp,
  enabled: Boolean(sdp.enabled) ? 'Yes' : 'No',
}))

export const SdpArrayType = z.array(SdpTransformedType)

export interface ISdpOriginal extends z.infer<typeof SdpOriginalType> {}
export interface ISdpTransformed extends z.infer<typeof SdpTransformedType> {}
