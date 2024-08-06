import { create } from 'zustand'

export const SORT_ORDER_OPTIONS: Record<SortOrder, string> = {
  latest: '최신 상품순',
  priceAsc: '낮은 가격순',
  priceDesc: '높은 가격순',
}

export const ORIGIN_FILTERS = [
  '과테말라',
  '브라질',
  '에콰도르',
  '에티오피아',
  '온두라스',
  '코스타리카',
  '콜롬비아',
  '케냐',
  '파나마',
  '페루',
] as const

export type SortOrder = 'latest' | 'priceAsc' | 'priceDesc'
export type OriginFilter = (typeof ORIGIN_FILTERS)[number]

type FilterState = {
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
  origin?: OriginFilter
  setOrigin: (origin: OriginFilter) => void
  clearOrigin: () => void
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
  setOrigin: (origin: OriginFilter) => set({ origin }),
  clearOrigin: () => set({ origin: undefined }),
  sortOrder: 'latest',
  setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),
}))
