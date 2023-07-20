import { useInfiniteQuery } from '@tanstack/react-query'

const fetchSize = Number(process.env.NEXT_PUBLIC_FETCH_SIZE)

export const useFetchAll = <T>(
  queryKey: any[],
  fetchFunction: (
    fetchSize: number,
    start: number,
    order_by: string,
    order_type: string
  ) => Promise<T>,
  enabled: boolean
) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize

      const defaultSortingData = { sorting: 'asc', sort_by: 'id' }

      const { sorting, sort_by } = JSON.parse(
        localStorage.getItem(`/${queryKey[0]}-sort`) ??
          JSON.stringify(defaultSortingData)
      )

      const data = await fetchFunction(fetchSize, start, sort_by, sorting)

      console.log(`Fetch ${JSON.stringify(queryKey)}`, data)

      return data
    },
    enabled,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })
}
