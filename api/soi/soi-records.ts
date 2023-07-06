import axiosInstance from '@/api/axiosInstance'
import { ISoiRecords, SoiRecordsArrayType } from '@/types/soi/soi-records'

export const fetchAllSoiRecords = async (fetchSize: number, start: number) => {
  const { data } = await axiosInstance.get(
    `/soi/records?limit=${fetchSize}&offset=${start}&order_by=id`
  )
  const parsedData = SoiRecordsArrayType.parse(data)

  return parsedData
}

export const updateSoiRecordsById = async ({
  id,
  data,
}: {
  id: number
  data: ISoiRecords
}) => {
  const res = await axiosInstance.put(`/soi/records/${id}`, data)
  console.log('Data after updating soi imports', res)
  return res
}
