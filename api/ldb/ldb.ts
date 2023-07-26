import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ILdb, LdbArrayType, LdbType } from '@/types/ldb'
import { toast } from '@/components/ui/use-toast'

export const fetchAllLdb = async (
  fetchSize: number,
  start: number,
  searchString?: string
) => {
  // const searchParams = new URLSearchParams(searchString)
  // const dataProviderString = searchParams.get('data_provider_string')

  // if (dataProviderString && dataProviderString.length < 3) {
  //   toast({
  //     variant: 'error',
  //     title: 'Search string must be at least 3 characters long',
  //   })
  //   return
  // }

  // console.log('file: ldb.ts:13 ~ dataProviderString:', dataProviderString)
  const { data } = await axiosInstance.get(
    `/ldb/adr-providers${searchString}&limit=${fetchSize}&offset=${start}`
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
