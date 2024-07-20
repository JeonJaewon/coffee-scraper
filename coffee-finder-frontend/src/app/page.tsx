import { CoffeeGrid } from './components/CoffeeGrid'
import Header from './components/Header'
import { SearchBar } from './components/SearchBar'

export default function Home() {
  return (
    <div className="bg-stone-200">
      <Header />
      <SearchBar />
      <main className="flex flex-col justify-between items-center min-h-dvh mt-10 ">
        <CoffeeGrid />
      </main>
    </div>
  )
}
