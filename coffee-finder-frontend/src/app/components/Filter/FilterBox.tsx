'use client'

import { OriginSelect } from './OriginSelect'
import { SortOrderSelect } from './SortOrderSelect'

export const FilterBox = () => {
  return (
    <div className="flex gap-6">
      <OriginSelect />
      <SortOrderSelect />
    </div>
  )
}
