import { useInfiniteQuery } from '@tanstack/react-query'

import axiosInstance from '@/api/axiosInstance'
import { ISoiImports, SoiImportsArrayType } from '@/types/soi/soi-imports'

const fetchSize = Number(process.env.NEXT_PUBLIC_FETCH_SIZE)

export const useFetchAllSoiImports = () => {
  return useInfiniteQuery({
    queryKey: ['soi-imports'],
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      const { data } = await axiosInstance.get(
        `/soi/imports?limit=${fetchSize}&offset=${start}&order_by=id`
      )
      console.log('All soi imports:', data)

      const parsedData = SoiImportsArrayType.parse(data)
      return parsedData
    },
    getNextPageParam: (_lastGroup, groups) => groups.length,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })
}

export const updateSoiImportsById = async ({
  id,
  data,
}: {
  id: number
  data: ISoiImports
}) => {
  const res = await axiosInstance.put(`/soi/imports/${id}`, data)
  console.log('Data after updating soi imports', res)
  return res
}

// export const createMsagImports = async (data: Partial<ISoiImports>) => {
//   const res = await axiosInstance.post(`/msag/imports`, data)
//   console.log('Data after creating msag imports', res)
//   return res
// }
