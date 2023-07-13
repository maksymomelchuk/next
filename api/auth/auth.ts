import axiosInstance from '@/api/axiosInstance'
import { IAuth } from '@/types/auth'
import { IUser } from '@/types/generalApiTypes'

export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get<IAuth>('/account')
  return data
}

export const editUsersProfile = async (user: Omit<IUser, 'id'>) => {
  const { data } = await axiosInstance.put('/account/update', user)
  return data
}

export const changeUsersPassword = async (passwords: {
  password: string
  password_confirmation: string
}) => {
  const { data } = await axiosInstance.put(
    '/account/update-password',
    passwords
  )
  return data
}
