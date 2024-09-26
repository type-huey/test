import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: false,
      staleTime: 1000 * 60 * 5,
      retry: 0,
    },
  },
});
