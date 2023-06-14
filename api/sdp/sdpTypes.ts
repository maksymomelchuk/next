interface IAdressProvider {
  id: number
  data_provider_string: string
  provider_id: string
}

interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
}

interface IOptions {
  cycle_counter: number
  file_format: string
  file_pattern: null | string
  private_switch: number
  require_header: number
  require_trailer: number
}

interface IStatistics {
  total_files: number
  total_records: number
}

export interface ISdp {
  adr_providers: IAdressProvider[]
  alias: string
  created_at: Date
  updated_at: Date
  enabled: number
  id: number
  name: string
  options: IOptions
  statistics: IStatistics
  created_by: IUser
  updated_by: IUser
  users: IUser[]
}
