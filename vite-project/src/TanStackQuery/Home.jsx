import React from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import UseQueryExample from './useQuery'
import UseMutationExample from './UseMutation'
import InvalidateQueriesExample from './invalidateQueries'

export default function Home() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      hello from Tanstack Query
      <UseQueryExample/>
      <UseMutationExample/>
      <InvalidateQueriesExample/>
    </QueryClientProvider>
  )
}
