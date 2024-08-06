import { ORIGIN_FILTERS, OriginFilter, useFilterStore } from '@/lib/store/filterStore'
import { Select } from '@mantine/core'

export const OriginSelect = () => {
  const { origin, setOrigin, clearOrigin } = useFilterStore((state) => state)

  return (
    <Select
      placeholder="재배지"
      value={origin}
      onChange={(value) => setOrigin(value as OriginFilter)}
      onClear={clearOrigin}
      data={ORIGIN_FILTERS}
      comboboxProps={{ zIndex: 10 }}
      clearable
    />
  )
}
