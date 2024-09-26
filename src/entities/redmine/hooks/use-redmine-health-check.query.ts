import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../api';

export const useRedmineHealthCheckQuery = (token: string) => {
  return useQuery({
    enabled: !!token,
    queryKey: ['redmine-healthCheck'],
    queryFn: async () => getUserInfo(token),
  });
};
