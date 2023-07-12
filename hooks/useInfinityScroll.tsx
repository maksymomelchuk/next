import React from 'react'
import { InfiniteData } from '@tanstack/react-query'

interface useInfinityScrollProps<T> {
  data: InfiniteData<T[]> | undefined
  isFetching: boolean
  fetchNextPage: () => void
  tableContainerRef: React.RefObject<HTMLDivElement>
}

const fetchSize = process.env.NEXT_PUBLIC_FETCH_SIZE

export const useInfinityScroll = <T,>({
  data,
  isFetching,
  fetchNextPage,
  tableContainerRef,
}: useInfinityScrollProps<T>) => {
  const lastPageData = data?.pages[data?.pages.length - 1]

  const haveDataToFetch = lastPageData?.length !== 0

  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data]
  )
  const [isFetchingData, setIsFetchingData] = React.useState(false)

  const fetchMoreOnBottomReached = React.useCallback(
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

  React.useEffect(() => {
    if (!isFetching) {
      // Reset the flag when isFetching becomes false
      setIsFetchingData(false)
    }
  }, [isFetching])

  React.useEffect(() => {
    if (!isFetchingData) {
      fetchMoreOnBottomReached(tableContainerRef.current)
    }
  }, [fetchMoreOnBottomReached, isFetchingData, tableContainerRef])

  return { flatData, fetchMoreOnBottomReached }
}
