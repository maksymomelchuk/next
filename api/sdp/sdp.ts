import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ISdpOriginal, SdpOriginalType } from '@/types/sdp'

export const fetchAllSdp = async () => {
  const { data } = await axiosInstance.get<ISdpOriginal[]>(
    `/sdp?order_by=id&order_type=asc`
  )

  const parsedData = data.map((sdp) => SdpOriginalType.parse(sdp))

  return parsedData
}

export const useFetchSdpById = (id: number) => {
  return useQuery({
    queryKey: ['sdp', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/sdp/${id}`)
      console.log('Sdp by id:', data)
      const parsedData = SdpOriginalType.parse(data)
      return parsedData
    },
  })
}

export const updateSdpById = async ({
  id,
  data,
}: {
  id: number
  data: ISdpOriginal
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
