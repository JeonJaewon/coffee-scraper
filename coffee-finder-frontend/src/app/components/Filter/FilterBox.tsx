'use client'

import { OriginSelect } from './OriginSelect'
import { SortOrderSelect } from './SortOrderSelect'

export const FilterBox = () => {
  return (
    <div className="flex gap-6 justify-end">
      <OriginSelect />
      <SortOrderSelect />
    </div>
  )
}
