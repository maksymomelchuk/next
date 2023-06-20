import React, { ChangeEvent, useState } from 'react'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'

type GlobalFilterProps = {
  table: Table<any>
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ table }) => {
  const [filter, setFilter] = useState('')
  const { setGlobalFilter, resetGlobalFilter } = table

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
    setGlobalFilter(e.target.value)
  }

  const handleClick = () => {
    setFilter('')
    resetGlobalFilter()
  }

  return (
    <div className="flex gap-3">
      <Input
        className="w-64"
        value={filter}
        onChange={handleChange}
        placeholder="Global search"
      />
      {filter && (
        <Button variant="outline" onClick={handleClick}>
          Reset <Icons.closeMenu className="ml-2 h-5" />
        </Button>
      )}
    </div>
  )
}
export default GlobalFilter
