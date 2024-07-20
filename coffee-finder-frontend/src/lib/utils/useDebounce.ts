import { debounce } from 'es-toolkit'
import { useRef } from 'react'

export const useDebounce = <Params, ReturnType>(func: (params: Params) => ReturnType, debounceMs: number) => {
  const funcRef = useRef(debounce(func, debounceMs))
  return funcRef.current
}
