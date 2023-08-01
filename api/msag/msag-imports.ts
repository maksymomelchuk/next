import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { IMsagImports, MsagImportsArrayType } from '@/types/msag/msag-imports'

export const fetchAllMsagImports = async (
  fetchSize: number,
  start: number,
  searchString?: string
) => {
  const { data } = await axiosInstance.get(
    `/msag/imports${searchString}&limit=${fetchSize}&offset=${start}`
  )
  const parsedData = MsagImportsArrayType.parse(data)

  return parsedData
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
