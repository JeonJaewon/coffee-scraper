'use client'

import { useFilterStore } from '@/lib/store/filterStore'
import { useDebounce } from '@/lib/utils/useDebounce'
import { FormEvent, useEffect, useState } from 'react'

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('')
  const setSearchKeyword = useFilterStore((state) => state.setSearchKeyword)
  const debouncedSetSearchKeyword = useDebounce(setSearchKeyword, 200)

  useEffect(() => {
    debouncedSetSearchKeyword(inputValue)
  }, [inputValue, debouncedSetSearchKeyword])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchKeyword(inputValue)
  }

  return (
    <div className="max-w-56 mx-auto">
      <form className="relative" onSubmit={onSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색어를 입력해 주세요"
          className="block w-full py-1.5 pl-4 pr-10 rounded-md border-slate-500 placeholder:text-sm"
        />
        <button type="submit" className="absolute h-full top-0 bottom-0 right-3 my-auto">
          <svg
            fill="#000000"
            height="18px"
            width="18px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 488.4 488.4"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
			s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
			S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
			S381.9,104.65,381.9,203.25z"
                />
              </g>
            </g>
          </svg>
        </button>
      </form>
    </div>
  )
}
