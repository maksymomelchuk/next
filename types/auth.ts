type Permissions = [
  'Auth@CreateUser',
  'Auth@ListUsers',
  'Auth@UpdateUser',
  'Auth@UpdateUserEnabled',
  'Auth@UpdateUserPassword',
  'Auth@UpdateUserRolesPermissions',
  'Ldb@CreateAdrProvider',
  'Ldb@CreateRecord',
  'Ldb@DeleteAdrProvider',
  'Ldb@DeleteRecord',
  'Ldb@ListAdrProviders',
  'Ldb@ListRecords',
  'Ldb@UpdateAdrProvider',
  'Ldb@UpdateRecord',
  'Msag@CreateRecord',
  'Msag@DeleteRecord',
  'Msag@ListImports',
  'Msag@ListRecords',
  'Msag@ListRecordsHistory',
  'Msag@UpdateRecord',
  'Msag@UploadFile',
  'Sdp@CreateSdp',
  'Sdp@ListSdps',
  'Sdp@UpdateSdp',
  'Sdp@UpdateSdpUsers',
  'Soi@CreateRecord',
  'Soi@DeleteRecord',
  'Soi@ListImports',
  'Soi@ListRecords',
  'Soi@ListRecordsHistory',
  'Soi@UpdateRecord',
  'Soi@UploadFile'
]

type Roles = ['Auth', 'Ldb', 'Msag', 'Sdp', 'Soi']

export interface IAuth {
  created_at: Date
  email: string
  enabled: number
  first_name: string
  id: number
  last_name: string
  permissions: Partial<Permissions>
  roles: Partial<Roles>
  type: string
  updated_at: Date
}
