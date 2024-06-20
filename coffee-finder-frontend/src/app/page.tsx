import styles from './page.module.css'

const coffeeItems = [
  {
    name: 'Espresso',
    price: '3,000원',
    vendor: 'Starbucks',
    href: 'https://www.starbucks.co.kr/menu/drink_list.do',
  },
  {
    name: 'Cappuccino',
    price: '3,000원',
    vendor: 'Costa',
    href: 'https://www.starbucks.co.kr/menu/drink_list.do',
  },
  {
    name: 'Latte',
    price: '3,000원',
    vendor: 'Dunkin',
    href: 'https://www.starbucks.co.kr/menu/drink_list.do',
  },
  {
    name: 'Espresso',
    price: '3,000원',
    vendor: 'Starbucks',
    href: 'https://www.starbucks.co.kr/menu/drink_list.do',
  },
  {
    name: 'Cappuccino',
    price: '3,000원',
    vendor: 'Costa',
    href: 'https://www.starbucks.co.kr/menu/drink_list.do',
  },
  {
    name: 'Latte',
    price: '3,000원',
    vendor: 'Dunkin',
    href: 'https://www.starbucks.co.kr/menu/drink_list.do',
  },
]

const CoffeeItem = ({ item }: any) => (
  <a href={item.href} target="_blank" className="border border-black rounded shadow-md flex flex-col cursor-pointer">
    <img src="https://picsum.photos/200/200" className="w-full" />
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>
      <p className="text-lg text-gray-600 mb-1 font-semibold">{item.price}</p>
      <p className="text-sm text-gray-600 font-semibold text-end">{item.vendor}</p>
    </div>
  </a>
)

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="grid grid-cols-5 gap-4">
        {coffeeItems.map((item, index) => (
          <CoffeeItem key={index} item={item} />
        ))}
      </div>
    </main>
  )
}
