import { SORT_ORDER_OPTIONS, SortOrder, useFilterStore } from '@/lib/store/filterStore'
import { Select } from '@mantine/core'

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
