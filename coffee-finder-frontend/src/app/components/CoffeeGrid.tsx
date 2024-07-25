'use client'

import { useCoffeeItemsQuery } from '@/queries/useCoffeeItems'
import { formatToKRW } from '@/utils'
import { CoffeeItem } from 'coffee-scraper'
import { useFilterCoffeeItems } from './policy'

export const CoffeeGrid = () => {
  const { data: coffeeItems } = useCoffeeItemsQuery()
  const filteredCoffeeItems = useFilterCoffeeItems(coffeeItems)

  const isEmpty = filteredCoffeeItems.length === 0

  return (
    <div className="w-full max-w-7xl py-4 px-12 grid gap-8 grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]">
      {isEmpty && <p className="text-center text-lg text-gray-800">검색 결과가 없습니다.</p>}
      {filteredCoffeeItems.map((item) => (
        <CoffeeGridItem key={item.url} {...item} />
      ))}
    </div>
  )
}

const CoffeeGridItem = ({ thumbnailSrc, title, price, url, vendorName }: CoffeeItem) => (
  <a href={url} target="_blank" className="rounded shadow-lg flex flex-col cursor-pointer overflow-hidden">
    <img src={thumbnailSrc} className="flex-1 object-cover aspect-square p-1 bg-white" loading="lazy" />
    <div className="flex flex-col flex-1 p-4 bg-gray-100 rounded-b-lg h-2/5">
      <h2 className="text-base font-bold text-gray-800 mb-2 overflow-hidden text-ellipsis line-clamp-2">{title}</h2>
      <div className="mt-auto">
        <p className="text-md text-gray-800 mb-1 font-semibold">{formatToKRW(price)}</p>
        <p className="text-sm text-slate-700 font-semibold text-end">{vendorName}</p>
      </div>
    </div>
  </a>
)
