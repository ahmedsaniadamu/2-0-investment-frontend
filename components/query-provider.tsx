'use client'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}
const QueryProvider: React.FC<Props> = ({ children }) => {
  const [queryClient] = useState<QueryClient>( () => new QueryClient() ) 
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider