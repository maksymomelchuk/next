import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { IAuth } from '@/types/auth'

export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get<IAuth>('/account')
  return data
}

// export const useFetchAllUsers = () => {
//   return useQuery({
//     queryKey: ['users'],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get<IAuth[]>('/auth/users')
//       console.log('All users:', data)
//       return data
//     },
//   })
// }

// export const useFetchUserById = (id: number) => {
//   return useQuery({
//     queryKey: ['users', id],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get<IAuth>(`/auth/users/${id}`)
//       console.log('User by id:', data)
//       return data
//     },
//   })
// }

// export const useFetchUserPermissions = () => {
//   return useQuery({
//     queryKey: ['users'],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get('/auth/permissions')
//       console.log('User permissions:', data)
//       return data
//     },
//   })
// }
