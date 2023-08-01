import axiosInstance from '@/api/axiosInstance'
import { ISoiImports, SoiImportsArrayType } from '@/types/soi/soi-imports'

export const fetchAllSoiImports = async (
  fetchSize: number,
  start: number,
  searchString?: string
) => {
  const { data } = await axiosInstance.get(
    `/soi/imports${searchString}&limit=${fetchSize}&offset=${start}`
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
