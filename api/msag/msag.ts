import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'

export const useFetchAllMsag = () => {
  return useQuery({
    queryKey: ['msag'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/msag/imports')
      console.log('All msag:', data)
      return data
    },
  })
}

export const useFetchMsagById = (id: number) => {
  return useQuery({
    queryKey: ['msag', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/msag/imports/${id}`)
      console.log('Msag by id:', data)
      return data
    },
  })
}
