import { useCallback, useEffect, useMemo, useState } from 'react'
import { InfiniteData } from '@tanstack/react-query'

import { toast } from '@/components/ui/use-toast'

interface useInfinityScrollProps<T> {
  data: InfiniteData<T[]> | undefined
  isFetching: boolean
  fetchNextPage: () => void
  tableContainerRef: React.RefObject<HTMLDivElement>
}

export const useInfinityScroll = <T,>({
  data,
  isFetching,
  fetchNextPage,
  tableContainerRef,
}: useInfinityScrollProps<T>) => {
  const lastPageData = data?.pages[data?.pages.length - 1]

  const haveDataToFetch = lastPageData?.length !== 0

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data]
  )
  const [isFetchingData, setIsFetchingData] = useState(false)

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        const result = scrollHeight - scrollTop - clientHeight

        if (result === 0) {
          return
        }

        if (result < 300 && !isFetchingData && haveDataToFetch) {
          // Set the flag to indicate that data fetching is in progress
          setIsFetchingData(true)
          fetchNextPage()
        }
      }
    },
    [isFetchingData, haveDataToFetch, fetchNextPage]
  )

  useEffect(() => {
    if (!isFetching) {
      // Reset the flag when isFetching becomes false
      setIsFetchingData(false)
    }
  }, [isFetching])

  useEffect(() => {
    if (!isFetchingData) {
      fetchMoreOnBottomReached(tableContainerRef.current)
    }
  }, [fetchMoreOnBottomReached, isFetchingData, tableContainerRef])

  useEffect(() => {
    if (!haveDataToFetch) {
      toast({ variant: 'default', description: 'No more data to show' })
    }
  }, [haveDataToFetch])

  return { flatData, fetchMoreOnBottomReached }
}
