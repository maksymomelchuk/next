import { z } from 'zod'

const ErrorType = z.object({
  version: z.string(),
})

export const MsagImportsType = z.object({
  created_at: z.string(),
  error: z.union([ErrorType, z.array(z.any())]),
  file: z.string(),
  file_version: z.number(),
  header: z.array(z.any()),
  id: z.number(),
  modified: z.number(),
  modified_human: z.string(),
  nena_version: z.string(),
  parsed_at: z.union([z.number(), z.null()]),
  size: z.number(),
  size_human: z.string(),
  status_id: z.number(),
  total_error_records: z.number(),
  total_records: z.number(),
  total_valid_records: z.number(),
  trailer: z.array(z.any()),
  updated_at: z.union([z.string(), z.null()]),
})

export const MsagImportsArrayType = z.array(MsagImportsType)

export interface IMsagImports extends z.infer<typeof MsagImportsType> {}
