import React from 'react'
import { InfiniteData } from '@tanstack/react-query'

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
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data]
  )
  const totalDBRowCount = 100
  const totalFetched = flatData.length
  const [isFetchingData, setIsFetchingData] = React.useState(false) // Flag to track if data is currently being fetched

  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        const result = scrollHeight - scrollTop - clientHeight

        if (result === 0) {
          return
        }

        if (result < 300 && !isFetchingData && totalFetched < totalDBRowCount) {
          setIsFetchingData(true) // Set the flag to indicate that data fetching is in progress
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetchingData, totalFetched, totalDBRowCount]
  )

  React.useEffect(() => {
    if (!isFetching) {
      setIsFetchingData(false) // Reset the flag when isFetching becomes false
    }
  }, [isFetching])

  React.useEffect(() => {
    if (!isFetchingData) {
      fetchMoreOnBottomReached(tableContainerRef.current)
    }
  }, [fetchMoreOnBottomReached, isFetchingData, tableContainerRef])

  return { flatData, fetchMoreOnBottomReached }
}
