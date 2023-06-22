import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'

export const useFetchAllMsagImports = () => {
  return useQuery({
    queryKey: ['msag-imports'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/msag/imports')
      console.log('All msag imports:', data)
      return data
    },
  })
}

export const useFetchAllMsagRecords = () => {
  return useQuery({
    queryKey: ['msag-records'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/msag/records')
      console.log('All msag records:', data)
      return data
    },
  })
}

export const useFetchAllMsagRecordsHistory = () => {
  return useQuery({
    queryKey: ['msag-records-history'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/msag/records/history')
      console.log('All msag records history:', data)
      return data
    },
  })
}
