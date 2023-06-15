import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ILdb } from '@/types/ldb'

export const useFetchAllLdb = () => {
  return useQuery({
    queryKey: ['ldb'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ILdb[]>('/ldb/adr-providers')
      console.log('All ldb:', data)
      return data
    },
  })
}

export const useFetchLdbById = (id: number) => {
  return useQuery({
    queryKey: ['ldb', 'id'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ILdb>(`/ldb/adr-providers/${id}`)
      console.log('Ldb by id:', data)
      return data
    },
  })
}
