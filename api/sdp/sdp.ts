import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ISdpOriginal, ISdpTransformed, SdpTransformedType } from '@/types/sdp'

export const fetchAllSdp = async (fetchSize: number, start: number) => {
  const { data } = await axiosInstance.get<ISdpOriginal[]>(
    `/sdp?limit=${fetchSize}&offset=${start}&order_by=id`
  )
  console.log('file: sdp.ts:8 ~ fetchAllSdp ~ data:', data)

  const parsedData = data.map((sdp) => SdpTransformedType.parse(sdp))

  return parsedData
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
    enabled: data.enabled === 'Yes' ? 1 : 0,
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
