import axiosInstance from '@/api/axiosInstance'
import { IAuth } from '@/types/auth'
import { IUser } from '@/types/generalApiTypes'

export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get<IAuth>('/account')
  return data
}

export const editUsersProfile = async (user: Omit<IUser, 'id'>) => {
  const { data } = await axiosInstance.put('/account/update', user)
  return data
}

export const changeUsersPassword = async (user: IUser) => {
  const { data } = await axiosInstance.put('/account/update', user)
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
