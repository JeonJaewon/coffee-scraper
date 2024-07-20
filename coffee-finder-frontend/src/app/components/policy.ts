import { useFilterStore } from '@/lib/store/filterStore'
import { CoffeeItem } from 'coffee-scraper'
import { isUndefined } from 'es-toolkit'

// TODO Add other filter logics like price or so
export const useFilterCoffeeItems = (items?: CoffeeItem[]): CoffeeItem[] => {
  const searchKeyword = useFilterStore((state) => state.searchKeyword)

  if (isUndefined(items)) return []

  const isSearchKeywordEmpty = searchKeyword === ''
  if (isSearchKeywordEmpty) return items

  return items.filter((item) => item.title.includes(searchKeyword))
}
