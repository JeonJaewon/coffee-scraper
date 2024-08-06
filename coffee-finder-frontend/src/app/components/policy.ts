import { useFilterStore } from '@/lib/store/filterStore'
import { CoffeeItem } from 'coffee-scraper'
import { isUndefined } from 'es-toolkit'

export const useFilterCoffeeItems = (items?: CoffeeItem[]): CoffeeItem[] => {
  const { origin, searchKeyword, sortOrder } = useFilterStore((state) => state)

  if (isUndefined(items)) return []
  return items
    .filter((item) => {
      if (searchKeyword === '') return true
      return item.title.includes(searchKeyword)
    })
    .filter((item) => {
      if (origin === undefined) return true
      return item.title.includes(origin)
    })
    .sort((a, b) => {
      if (sortOrder === 'priceAsc') return a.price - b.price
      if (sortOrder === 'priceDesc') return b.price - a.price
      return 0
    })
}
