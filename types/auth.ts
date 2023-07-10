import { z } from 'zod'

export type PermissionsType = [
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

export type RolesType = ['Auth', 'Ldb', 'Msag', 'Sdp', 'Soi']

export const AuthType = z.object({
  created_at: z.string(),
  email: z.string().optional(),
  enabled: z.number(),
  first_name: z.string(),
  id: z.number(),
  last_name: z.string(),
  permissions: z.array(z.string()),
  roles: z.array(z.string()),
  type: z.string(),
  updated_at: z.string(),
})

export interface IAuth extends z.infer<typeof AuthType> {}
