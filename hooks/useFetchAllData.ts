import { useInfiniteQuery } from '@tanstack/react-query'

const fetchSize = Number(process.env.NEXT_PUBLIC_FETCH_SIZE)

export const useFetchAll = <T>(
  queryKey: any[],
  fetchFunction: (
    fetchSize: number,
    start: number,
    searchString?: string
  ) => Promise<T>,
  enabled: boolean,
  searchString?: string
) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize

      const data = await fetchFunction(fetchSize, start, searchString)

      console.log(`Fetch ${JSON.stringify(queryKey)}`, data)

      return data
    },
    enabled,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })
}
