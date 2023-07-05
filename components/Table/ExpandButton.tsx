import React from 'react'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

type ExpandButtonProps<T> = {
  row: Row<T>
}

const ExpandButton = <T,>({ row }: ExpandButtonProps<T>) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-auto border-none p-2"
      onClick={() => row.toggleExpanded()}
    >
      {row.getIsExpanded() ? (
        <Icons.minusCircle className="h-4 w-4 rounded-full bg-red-500 text-white" />
      ) : (
        <Icons.plusCircle className="h-4 w-4 rounded-full bg-green-500 text-white" />
      )}
    </Button>
  )
}
export default ExpandButton
