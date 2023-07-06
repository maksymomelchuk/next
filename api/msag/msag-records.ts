import axiosInstance from '@/api/axiosInstance'
import { IMsagRecords, MsagRecordsArrayType } from '@/types/msag/msag-records'

export const fetchAllMsagRecords = async (fetchSize: number, start: number) => {
  const { data } = await axiosInstance.get(
    `/msag/records?limit=${fetchSize}&offset=${start}&order_by=id`
  )
  const parsedData = MsagRecordsArrayType.parse(data)

  return parsedData
}

export const updateMsagRecordsById = async ({
  id,
  data,
}: {
  id: number
  data: IMsagRecords
}) => {
  const res = await axiosInstance.put(`/msag/records/${id}`, data)
  console.log('Data after updating msag imports', res)
  return res
}
