import { GetCoffeeItemsResponse } from '@/app/api/getCoffeeItems/route'
import { useSuspenseQuery } from '@tanstack/react-query'

// TODO Refactor react-query
export const useCoffeeItemsQuery = () => {
  return useSuspenseQuery<GetCoffeeItemsResponse>({
    queryKey: ['coffeeItems'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/getCoffeeItems`)
      return response.json()
    },
    staleTime: Infinity,
  })
}
