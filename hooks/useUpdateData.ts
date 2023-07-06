import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { toast } from '@/components/ui/use-toast'

type mutationFnType<T> = ({
  id,
  data,
}: {
  id: number
  data: T
}) => Promise<AxiosResponse>

export const useUpdateData = <T>(
  mutationFn: mutationFnType<T>,
  queryKey: any[]
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries([...queryKey, id])
      toast({ variant: 'success', description: 'Successfully changed' })
    },
  })
}
