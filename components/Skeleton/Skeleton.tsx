import React from 'react'

import { Icons } from '../icons'

export const Skeleton = () => {
  return (
    <div
      role="status"
      className="w-full animate-pulse space-y-6  p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-between gap-10">
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex items-center">
          <Icons.dotsHorizontal className="w-4" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-10">
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex items-center">
          <Icons.dotsHorizontal className="w-4" />
        </div>
      </div>
      {/* Middle */}
      <div className="flex items-center justify-between gap-10">
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex items-center">
          <Icons.dotsHorizontal className="w-4" />
        </div>
      </div>
      {/* Middle */}
      <div className="flex items-center justify-between gap-10">
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex items-center">
          <Icons.dotsHorizontal className="w-4" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-10">
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex items-center">
          <Icons.dotsHorizontal className="w-4" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
