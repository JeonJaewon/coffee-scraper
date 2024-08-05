import { ORIGIN_FILTERS } from '@/app/components/Filter/OriginSelect'
import { create } from 'zustand'

export type OriginFilterValue = (typeof ORIGIN_FILTERS)[number]

export type SortOrder = 'latest' | 'priceAsc' | 'priceDesc'

type FilterState = {
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
  origin: OriginFilterValue
  setOrigin: (origin: OriginFilterValue) => void
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
  origin: '전체',
  setOrigin: (origin: OriginFilterValue) => set({ origin }),
  sortOrder: 'latest',
  setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),
}))
