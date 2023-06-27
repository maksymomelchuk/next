import { ZodSchema, z } from 'zod'

import { toast } from '@/components/ui/use-toast'

export const validate = <T,>(data: T, schema: ZodSchema) => {
  try {
    const result = schema.parse(data)
    if (result) {
      return true
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues)
      const description = error.issues.map(
        (issue, index) =>
          `${index + 1}. ${JSON.stringify(issue.path)} - ${issue.message}`
      )
      toast({ variant: 'error', description })
    }
  }
}
