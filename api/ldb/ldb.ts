import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ILdb, LdbArrayType, LdbType } from '@/types/ldb'

export const fetchAllLdb = async (
  fetchSize: number,
  start: number,
  order_by: string,
  order_type: string
) => {
  const { data } = await axiosInstance.get(
    `/ldb/adr-providers?limit=${fetchSize}&offset=${start}&order_by=${order_by}&order_type=${order_type}`
  )
  const parsedData = LdbArrayType.parse(data)

  return parsedData
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
