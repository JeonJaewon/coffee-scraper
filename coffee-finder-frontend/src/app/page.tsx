import { Suspense } from 'react'
import { CoffeeGrid } from './components/CoffeeGrid'
import Header from './components/Header'
import { Spinner } from './components/Spinner'

export default function Home() {
  return (
    <div className="bg-stone-200">
      <Header />
      <main className="flex flex-col justify-between items-center min-h-dvh py-6">
        <Suspense fallback={<Spinner />}>
          <CoffeeGrid />
        </Suspense>
      </main>
    </div>
  )
}
