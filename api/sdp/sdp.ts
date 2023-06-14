import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ISdp } from '@/api/sdp/sdpTypes'

export const useFetchAllSDP = () => {
  return useQuery({
    queryKey: ['sdp'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ISdp>('/sdp')
      console.log('data:', data)
      return data
    },
  })
}
