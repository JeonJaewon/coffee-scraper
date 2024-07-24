import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { CoffeeItem } from 'coffee-scraper'

// TODO Refactor react-query
export const useCoffeeItemsQuery = () => {
  return useSuspenseQuery<CoffeeItem[]>({
    queryKey: ['coffeeItems'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/getCoffeeItems`)
      return response.json()
    },
    staleTime: Infinity,
  })
}
