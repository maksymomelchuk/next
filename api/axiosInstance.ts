import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import refresh from './auth/refreshToken'

const realm = process.env.NEXT_PUBLIC_REALM!
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL
// Default config for the axios instance
const axiosParams = {
  baseURL,
  headers: {},
}

// Create axios instance with default params
export const axiosInstance: AxiosInstance = axios.create(axiosParams)
// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    )
  }
  return config
})
// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // TODO: handle refresh token flow
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 419 && !originalRequest._retry) {
      // if request failed - refresh token
      originalRequest._retry = true
      const oldToken = localStorage.getItem('refreshToken')

      if (oldToken) {
        const response: AxiosResponse<{
          access_token: string
          refresh_token: string
        }> = await refresh(oldToken)

        const newAccessToken = response.data.access_token
        const newRefreshToken = response.data.refresh_token

        localStorage.setItem('token', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      }
      return axiosInstance(originalRequest)
    } else if (
      error.config.url ===
      `${baseURL}/realms/${realm}/protocol/openid-connect/token`
    ) {
      // if token refreshing failed - logout
      // forceLogout()
    }
    return Promise.reject(error)
  }
)
export const setAuthHeader = (token: string) => {
  const bearer = token ? `Bearer ${token}` : ''
  axiosInstance.defaults.headers.common.Authorization = bearer
}
// TODO: clean things up
export const logApiError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // "error.request" is an instance of XMLHttpRequest
    // in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config)
}
// TODO: remove if interface would be extended
// eslint-disable-next-line
interface AppRequestConfig extends AxiosRequestConfig {
  // In case of need to extend AxiosRequestConfig
}
// Main api function
const api = (axiosClient: AxiosInstance) => {
  return {
    get: <T>(url: string, config?: AppRequestConfig) =>
      axiosClient.get<T>(url, config),
    delete: (url: string, config?: AppRequestConfig) =>
      axiosClient.delete(url, config),
    post: (url: string, body: any, config?: AppRequestConfig) =>
      axiosClient.post(url, body, config),
    patch: (url: string, body: any, config?: AppRequestConfig) =>
      axiosClient.patch(url, body, config),
    put: (url: string, body: any, config?: AppRequestConfig) =>
      axiosClient.put(url, body, config),
  }
}
export default api(axiosInstance)
