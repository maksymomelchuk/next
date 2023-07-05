import { useInfiniteQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ISoiRecords, SoiRecordsArrayType } from '@/types/soi/soi-records'

const fetchSize = Number(process.env.NEXT_PUBLIC_FETCH_SIZE)

export const useFetchAllSoiRecords = () => {
  return useInfiniteQuery({
    queryKey: ['soi-records'],
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      const { data } = await axiosInstance.get(
        `/soi/records?limit=${fetchSize}&offset=${start}&order_by=id`
      )
      console.log('All soi records:', data)

      const parsedData = SoiRecordsArrayType.parse(data)
      return parsedData
    },
    getNextPageParam: (_lastGroup, groups) => groups.length,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })
}

export const updateSoiRecordsById = async ({
  id,
  data,
}: {
  id: number
  data: ISoiRecords
}) => {
  const res = await axiosInstance.put(`/soi/records/${id}`, data)
  console.log('Data after updating soi imports', res)
  return res
}
