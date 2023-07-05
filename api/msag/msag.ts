import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { IMsagImports, MsagImportsArrayType } from '@/types/msag'

const fetchSize = Number(process.env.NEXT_PUBLIC_FETCH_SIZE)

export const useFetchAllMsagImports = () => {
  return useInfiniteQuery({
    queryKey: ['msag-imports'],
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      const { data } = await axiosInstance.get(
        `/msag/imports?limit=${fetchSize}&offset=${start}&order_by=id`
      )
      console.log('All msag imports:', data)

      const parsedData = MsagImportsArrayType.parse(data)
      return parsedData
    },
    getNextPageParam: (_lastGroup, groups) => groups.length,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })
}

export const updateMsagImportsById = async ({
  id,
  data,
}: {
  id: number
  data: IMsagImports
}) => {
  const res = await axiosInstance.put(`/sdp/${id}`, data)
  console.log('Data after updating msag imports', res)
  return res
}

export const createMsagImports = async (data: Partial<IMsagImports>) => {
  const res = await axiosInstance.post(`/msag/imports`, data)
  console.log('Data after creating msag imports', res)
  return res
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
