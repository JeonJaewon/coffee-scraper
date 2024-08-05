import { create } from 'zustand'
import { ValueOfObject } from '../utils/types'

export const ORIGIN_FILTERS = {
  all: '전체',
  guatemala: '과테말라',
  ethiopia: '에티오피아',
  ecuador: '에콰도르',
  honduras: '온두라스',
  brazil: '브라질',
  peru: '페루',
  panama: '파나마',
  colombia: '콜롬비아',
  costaRica: '코스타리카',
  kenya: '케냐',
} as const satisfies Record<string, string>

export type OriginFilterValue = ValueOfObject<typeof ORIGIN_FILTERS>

type FilterState = {
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
  origin: OriginFilterValue
  setOrigin: (origin: OriginFilterValue) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
  origin: '전체',
  setOrigin: (origin: OriginFilterValue) => set({ origin }),
}))
