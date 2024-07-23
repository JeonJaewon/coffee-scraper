'use client'

import { ReactNode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

type Props = {
  children: ReactNode
}

export const CustomErrorBoundary = ({ children }: Props) => {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>
}
