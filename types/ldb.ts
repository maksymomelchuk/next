import { IUser } from '@/types/generalApiTypes'

export interface ILdb {
  contact_uri: string
  created_at: Date
  created_by: IUser
  data_provider_string: string
  id: number
  language: string
  provider_id: string
  provider_id_series: string
  type_of_provider: string
  updated_at: Date
  updated_by: IUser
}
