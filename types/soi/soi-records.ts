import { z } from 'zod'

const DateType = z.object({
  function_code: z.union([z.string(), z.null()]),
  npa: z.union([z.string(), z.null()]),
  calling_number: z.union([z.string(), z.null()]),
  house_number: z.union([z.string(), z.null()]),
  house_number_suffix: z.union([z.string(), z.null()]),
  prefix_directional: z.union([z.string(), z.null()]),
  street_name: z.union([z.string(), z.null()]),
  street_suffix: z.union([z.string(), z.null()]),
  post_directional: z.union([z.string(), z.null()]),
  community_name: z.union([z.string(), z.null()]),
  state: z.union([z.string(), z.null()]),
  county_id: z.union([z.string(), z.null()]),
  location: z.union([z.string(), z.null()]),
  zip_code: z.union([z.string(), z.null()]),
  zip_code_extension: z.union([z.string(), z.null()]),
  x_coordinate: z.union([z.string(), z.null()]),
  y_coordinate: z.union([z.string(), z.null()]),
  z_coordinate: z.union([z.string(), z.null()]),
  access_infrastructure_provider: z.union([z.string(), z.null()]),
  class_of_service: z.union([z.string(), z.null()]),
  type_of_service: z.union([z.string(), z.null()]),
  exchange: z.union([z.string(), z.null()]),
  esn: z.union([z.string(), z.null()]),
  main_npa: z.union([z.string(), z.null()]),
  main_number: z.union([z.string(), z.null()]),
  order_number: z.union([z.string(), z.null()]),
  extract_date: z.union([z.string(), z.null()]),
  expanded_extract_date: z.union([z.string(), z.null()]),
  customer_name: z.union([z.string(), z.null()]),
  customer_code: z.union([z.string(), z.null()]),
  source_id: z.union([z.string(), z.null()]),
  general_use: z.union([z.string(), z.null()]),
  comments: z.union([z.string(), z.null()]),
  cell_id: z.union([z.string(), z.null()]),
  sector_id: z.union([z.string(), z.null()]),
  tar_code: z.union([z.string(), z.null()]),
  reserved: z.union([z.string(), z.null()]),
  alt_number: z.union([z.string(), z.null()]),
  nena_reserved: z.union([z.string(), z.null()]),
  data_provider: z.union([z.string(), z.null()]),
  reserved_alt: z.union([z.string(), z.null()]),
})

const ErrorType = z.any()

export const SoiRecordsType = z.object({
  id: z.number(),
  nena_version: z.string(),
  data: DateType,
  import_id: z.number(),
  file_index: z.number(),
  status_id: z.number(),
  parsed_at: z.number(),
  error: ErrorType,
  created_at: z.string(),
  updated_at: z.string(),
})

export const SoiRecordsArrayType = z.array(SoiRecordsType)

export interface ISoiRecords extends z.infer<typeof SoiRecordsType> {}
