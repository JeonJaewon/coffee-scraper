'use client'

import { ORIGIN_FILTERS, OriginFilter, useFilterStore } from '@/lib/store/filterStore'
import { Select } from '@mantine/core'
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
