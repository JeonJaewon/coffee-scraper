import { SortOrder, useFilterStore } from '@/lib/store/filterStore'
import { Select } from '@mantine/core'

const SORT_ORDER_OPTIONS: Record<SortOrder, string> = {
  latest: '최신 상품순',
  priceAsc: '낮은 가격순',
  priceDesc: '높은 가격순',
}

export const SortOrderSelect = () => {
  const sortOrder = useFilterStore((state) => state.sortOrder)
  const setSortOrder = useFilterStore((state) => state.setSortOrder)

  return (
    <Select
      defaultValue="latest"
      value={sortOrder}
      onChange={(value) => setSortOrder(value as SortOrder)}
      data={Object.entries(SORT_ORDER_OPTIONS).map(([value, label]) => ({ value, label }))}
      comboboxProps={{ zIndex: 10 }}
    />
  )
}
