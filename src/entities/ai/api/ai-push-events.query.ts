import { useSuspenseQuery } from '@tanstack/react-query';

import { AI_QUERY_KEY } from './ai.key';
import { getAiSummaryPushEvents } from './ai.api';

export const useGitlabPushEventsQuery = (taskList: any) => {
  return useSuspenseQuery({
    queryKey: AI_QUERY_KEY.pushed(taskList),
    queryFn: async () => getAiSummaryPushEvents(taskList),
  });
};
