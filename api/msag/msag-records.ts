import { useInfiniteQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { IMsagRecords, MsagRecordsArrayType } from '@/types/msag/msag-records'

const fetchSize = Number(process.env.NEXT_PUBLIC_FETCH_SIZE)

export const useFetchAllMsagRecords = () => {
  return useInfiniteQuery({
    queryKey: ['msag-records'],
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      const { data } = await axiosInstance.get(
        `/msag/records?limit=${fetchSize}&offset=${start}&order_by=id`
      )
      console.log('All msag records:', data)

      const parsedData = MsagRecordsArrayType.parse(data)
      return parsedData
    },
    getNextPageParam: (_lastGroup, groups) => groups.length,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })
}

export const updateMsagRecordsById = async ({
  id,
  data,
}: {
  id: number
  data: IMsagRecords
}) => {
  const res = await axiosInstance.put(`/msag/records/${id}`, data)
  console.log('Data after updating msag imports', res)
  return res
}
