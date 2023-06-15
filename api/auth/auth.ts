import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { IAuth } from '@/types/auth'

export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IAuth[]>('/auth/users')
      console.log('file: auth.ts:11 ~ data:', data)
      console.log('All users:', data)
      return data
    },
  })
}

export const useFetchUserById = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IAuth>(`/auth/users/${id}`)
      console.log('User by id:', data)
      return data
    },
  })
}
