import { z } from 'zod'

const DateType = z.object({
  prefix_directional: z.string(),
  street_name: z.string(),
  street_suffix: z.string(),
  post_directional: z.string(),
  low_range: z.string(),
  high_range: z.string(),
  community_name: z.string(),
  postal_community_name: z.string(),
  state: z.string(),
  odd_even: z.string(),
  esn: z.string(),
  psap_id: z.string(),
  county_id: z.string(),
  exchange: z.string(),
  tar_code: z.string(),
  completion_date: z.union([z.string(), z.null()]),
  extract_date: z.union([z.string(), z.null()]),
  expanded_extract_date: z.union([z.string(), z.null()]),
  control_office: z.string(),
  reserved: z.union([z.string(), z.null()]),
  general_use_1: z.string(),
  general_use_2: z.string(),
  function_of_change: z.string(),
})

export const MsagRecordsType = z.object({
  id: z.number(),
  nena_version: z.string(),
  data: DateType,
  import_id: z.number(),
  file_index: z.number(),
  status_id: z.number(),
  parsed_at: z.number(),
  error: z.array(z.any()),
  created_at: z.string(),
  updated_at: z.string(),
})

export const MsagRecordsArrayType = z.array(MsagRecordsType)

export interface IMsagRecords extends z.infer<typeof MsagRecordsType> {}
