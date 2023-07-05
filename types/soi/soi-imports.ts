import { z } from 'zod'

export const SoiImportsType = z.object({
  id: z.number(),
  file_version: z.number(),
  size: z.number(),
  modified: z.number(),
  status_id: z.number(),
  total_records: z.number(),
  total_valid_records: z.number(),
  total_error_records: z.number(),
  parsed_at: z.number(),
  sdp_id: z.number(),
  nena_version: z.string(),
  file: z.string(),
  size_human: z.string(),
  modified_human: z.string(),
  header: z.array(z.any()),
  trailer: z.array(z.any()),
  error: z.array(z.any()),
  created_at: z.union([z.string(), z.null()]),
  updated_at: z.union([z.string(), z.null()]),
})

export const SoiImportsArrayType = z.array(SoiImportsType)

export interface ISoiImports extends z.infer<typeof SoiImportsType> {}
