import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type useCreateSearchStringProps = {}

export const useCreateSearchString = (queryKey: string) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  let searchString = ''

  if (!searchParams.has('order_by')) {
    const defaultSortingData = { order_type: 'asc', order_by: 'id' }

    const { order_type, order_by } = JSON.parse(
      localStorage.getItem(`${queryKey}-sort`) ??
        JSON.stringify(defaultSortingData)
    )
    searchString = `?${searchParams.toString()}order_by=${order_by}&order_type=${order_type}`
  } else {
    searchString = `?${searchParams.toString()}`
  }

  useEffect(() => {
    router.push(`${queryKey}${searchString}`)
  }, [])

  return searchString
}
