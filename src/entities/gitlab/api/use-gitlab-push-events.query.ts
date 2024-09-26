import { useQuery } from '@tanstack/react-query';

import { GITLAB_QUERY_KEY } from './gitlab.key';
import { getGitlabPushEvents } from './gitlab.api';

export const useGitlabPushEventsQuery = (token?: string, start?: string, end?: string) => {
  return useQuery({
    enabled: !!token && !!start && !!end,
    queryKey: GITLAB_QUERY_KEY.pushed(`${start}-${end}`),
    queryFn: async () => getGitlabPushEvents({ token: token as string, start: start as string, end: end as string }),
  });
};
