'use client'

import { ORIGIN_FILTERS, OriginFilterValue, useFilterStore } from '@/lib/store/filterStore'
import { Select } from '@mantine/core'

export const FilterBox = () => {
  const origin = useFilterStore((state) => state.origin)
  const setOrigin = useFilterStore((state) => state.setOrigin)
  return (
    <div className="flex gap-6">
      <Select
        placeholder="재배지"
        value={origin}
        onChange={(value) => setOrigin(value as OriginFilterValue)}
        data={[...Object.entries(ORIGIN_FILTERS).map(([value, label]) => ({ value, label }))]}
        comboboxProps={{ zIndex: 10 }}
      />
      <Select
        defaultValue="latest"
        data={[
          { value: 'latest', label: '최신 상품순' },
          { value: 'priceAsc', label: '낮은 가격순' },
          { value: 'priceDesc', label: '높은 가격순' },
        ]}
        comboboxProps={{ zIndex: 10 }}
      />
    </div>
  )
}
