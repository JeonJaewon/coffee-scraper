import { formatToKRW } from '@/utils'
import { CoffeeItem } from 'coffee-scraper'

export const CoffeeGrid = async () => {
  const getCoffeeItemsResponse = await fetch(`${process.env.HOST_NAME}/api/getCoffeeItems`)
  const coffeeItems: CoffeeItem[] = await getCoffeeItemsResponse.json()

  return (
    <div className="grid grid-cols-5 gap-4">
      {coffeeItems?.map((item) => <CoffeeGridItem key={item.url} {...item} />)}
    </div>
  )
}

const CoffeeGridItem = ({ thumbnailSrc, title, price, url, vendorName }: CoffeeItem) => (
  <a href={url} target="_blank" className="border border-black rounded shadow-md flex flex-col cursor-pointer">
    <img src={thumbnailSrc} className="w-full" />
    <div className="p-4 bg-gray-100 rounded-lg shadow-md flex-1">
      <h2 className="text-lg font-bold text-gray-800 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">{title}</h2>
      <p className="text-lg text-gray-600 mb-1 font-semibold">{formatToKRW(price)}</p>
      <p className="text-sm text-gray-600 font-semibold text-end">{vendorName}</p>
    </div>
  </a>
)
