'use client'

import { SearchBar } from './SearchBar'

export default function Header() {
  return (
    <header className="z-40 sticky top-0 bg-stone-700 shadow-lg w-full">
      <nav className="container mx-auto py-6 flex items-center justify-between">
        <a id="header-title" href="/" className="text-xl text-white font-semibold text-center mx-auto ">
          Beanstalk
        </a>
        <SearchBar />
      </nav>
    </header>
  )
}
