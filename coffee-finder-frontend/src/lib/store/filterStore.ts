import { create } from 'zustand'

type FilterState = {
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword: string) => set({ searchKeyword: keyword }),
}))
