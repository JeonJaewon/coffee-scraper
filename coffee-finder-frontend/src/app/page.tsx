import { Center, Loader } from '@mantine/core'
import dynamic from 'next/dynamic'
import Header from './components/Header'

const CoffeeGrid = dynamic(() => import('./components/CoffeeGrid'), {
  ssr: false,
  loading: () => (
    <Center className="h-dvh">
      <Loader color="dark" />
    </Center>
  ),
})

export default function Home() {
  return (
    <div className="bg-stone-200">
      <Header />
      <main className="flex flex-col justify-between items-center min-h-dvh py-6">
        <CoffeeGrid />
      </main>
    </div>
  )
}
