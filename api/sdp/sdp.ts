import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import {
  ISdpOriginal,
  ISdpTransformed,
  SdpArrayType,
  SdpTransformedType,
} from '@/types/sdp'

export const useFetchAllSdp = () => {
  return useQuery({
    queryKey: ['sdp'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/sdp')
      console.log('All sdp:', data)
      const parsedData = SdpArrayType.parse(data)
      return parsedData
    },
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
  const res = await axiosInstance.put(`/sdp/${id}`, data)
  console.log('Data after updating sdp', res)
  return res
}

export const createSdp = async (data: Partial<ISdpOriginal>) => {
  const res = await axiosInstance.post(`/sdp`, data)
  console.log('Data after creating sdp', res)
  return res
}
