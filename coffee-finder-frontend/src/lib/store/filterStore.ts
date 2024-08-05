import { create } from 'zustand'

export const SORT_ORDER_OPTIONS: Record<SortOrder, string> = {
  latest: '최신 상품순',
  priceAsc: '낮은 가격순',
  priceDesc: '높은 가격순',
}

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

export type SortOrder = 'latest' | 'priceAsc' | 'priceDesc'
export type OriginFilter = (typeof ORIGIN_FILTERS)[number]

type FilterState = {
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
  origin: OriginFilter
  setOrigin: (origin: OriginFilter) => void
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
  origin: '전체',
  setOrigin: (origin: OriginFilter) => set({ origin }),
  sortOrder: 'latest',
  setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),
}))
