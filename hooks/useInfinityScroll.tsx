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
  // infinity scroll
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data]
  )

  const totalDBRowCount = 32
  // const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 32
  const totalFetched = flatData.length
  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        const result = scrollHeight - scrollTop - clientHeight

        if (result === 0) {
          return
        }

        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 100 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  )

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    if (!isFetching) {
      return
    }
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached, isFetching, tableContainerRef])
  //

  return { flatData, fetchMoreOnBottomReached }
}
