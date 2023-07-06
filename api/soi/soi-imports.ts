import axiosInstance from '@/api/axiosInstance'
import { ISoiImports, SoiImportsArrayType } from '@/types/soi/soi-imports'

export const fetchAllSoiImports = async (fetchSize: number, start: number) => {
  const { data } = await axiosInstance.get(
    `/soi/imports?limit=${fetchSize}&offset=${start}&order_by=id`
  )
  const parsedData = SoiImportsArrayType.parse(data)

  return parsedData
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
