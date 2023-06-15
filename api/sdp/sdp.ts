import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ISdp } from '@/types/sdp'

export const useFetchAllSdp = () => {
  return useQuery({
    queryKey: ['sdp'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ISdp[]>('/sdp')
      console.log('All sdp:', data)
      return data
    },
  })
}

export const useFetchSdpById = (id: number) => {
  return useQuery({
    queryKey: ['sdp', 'id'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ISdp>(`/sdp/${id}`)
      console.log('Sdp by id:', data)
      return data
    },
  })
}
