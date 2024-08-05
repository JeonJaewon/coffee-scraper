import { ORIGIN_FILTERS, OriginFilter, useFilterStore } from '@/lib/store/filterStore'
import { Select } from '@mantine/core'

export const OriginSelect = () => {
  const origin = useFilterStore((state) => state.origin)
  const setOrigin = useFilterStore((state) => state.setOrigin)

  return (
    <Select
      placeholder="재배지"
      value={origin}
      onChange={(value) => setOrigin(value as OriginFilter)}
      data={ORIGIN_FILTERS}
      comboboxProps={{ zIndex: 10 }}
    />
  )
}
