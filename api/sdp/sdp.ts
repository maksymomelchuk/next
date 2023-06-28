import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import {
  ISdpOriginal,
  ISdpTransformed,
  SdpArrayType,
  SdpTransformedType,
} from '@/types/sdp'

const fetchSize = Number(process.env.NEXT_PUBLIC_FETCH_SIZE)

export const useFetchAllSdp = () => {
  return useInfiniteQuery({
    queryKey: ['sdp'],
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      const { data } = await axiosInstance.get(
        `/sdp?limit=${fetchSize}&offset=${start}&order_by=id`
      )
      console.log('All sdp:', data)
      const parsedData = SdpArrayType.parse(data)
      return parsedData
    },
    getNextPageParam: (_lastGroup, groups) => groups.length,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })
}

export const useFetchSdpById = (id: number) => {
  return useQuery({
    queryKey: ['sdp', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/sdp/${id}`)
      console.log('Sdp by id:', data)
      const parsedData = SdpTransformedType.parse(data)
      return parsedData
    },
  })
}

export const updateSdpById = async ({
  id,
  data,
}: {
  id: number
  data: ISdpTransformed
}) => {
  const dataToSend = {
    ...data,
    enabled: 'Yes' ? 1 : 0,
  }
  const res = await axiosInstance.put(`/sdp/${id}`, dataToSend)
  console.log('Data after updating sdp', res)
  return res
}

export const createSdp = async (data: Partial<ISdpOriginal>) => {
  const res = await axiosInstance.post(`/sdp`, data)
  console.log('Data after creating sdp', res)
  return res
}
