import { OriginFilterValue, useFilterStore } from '@/lib/store/filterStore'
import { Select } from '@mantine/core'

export const ORIGIN_FILTERS = [
  '전체',
  '과테말라',
  '에티오피아',
  '에콰도르',
  '온두라스',
  '브라질',
  '페루',
  '파나마',
  '콜롬비아',
  '코스타리카',
  '케냐',
] as const

export const OriginSelect = () => {
  const origin = useFilterStore((state) => state.origin)
  const setOrigin = useFilterStore((state) => state.setOrigin)

  return (
    <Select
      placeholder="재배지"
      value={origin}
      onChange={(value) => setOrigin(value as OriginFilterValue)}
      data={ORIGIN_FILTERS}
      comboboxProps={{ zIndex: 10 }}
    />
  )
}
