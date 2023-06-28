import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ILdb, LdbArrayType, LdbType } from '@/types/ldb'

const fetchSize = 8

export const useFetchAllLdb = () => {
  return useInfiniteQuery({
    queryKey: ['ldb'],
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      const { data } = await axiosInstance.get(
        `/ldb/adr-providers?limit=${fetchSize}&offset=${start}&order_by=id`
      )
      console.log('All ldb:', data)
      const parsedData = LdbArrayType.parse(data)
      return parsedData
    },
    getNextPageParam: (_lastGroup, groups) => groups.length,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })
}

export const useFetchLdbById = (id: number) => {
  return useQuery({
    queryKey: ['ldb', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/ldb/adr-providers/${id}`)
      console.log('Ldb by id:', data)
      const parsedData = LdbType.parse(data)
      return parsedData
    },
  })
}

export const updateLdbById = async ({
  id,
  data,
}: {
  id: number
  data: ILdb
}) => {
  const res = await axiosInstance.put(`/ldb/adr-providers/${id}`, data)
  console.log('Data after updating ldb', res)
  return res
}

export const createLdb = async (data: Partial<ILdb>) => {
  const res = await axiosInstance.post(`/ldb/adr-providers`, data)
  console.log('Data after creating ldb', res)
  return res
}
