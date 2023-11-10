'use client';
import { QueryClient, QueryClientProvider as ReactQueryHandler } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const QueryClientProvider = ( { children }: PropsWithChildren) => {
  return (
    <ReactQueryHandler client={queryClient}>
        {children}
    </ReactQueryHandler>
  )
}

export default QueryClientProvider