import { PLATFORM_NAME } from '~/shared/constants';
import { EVENTS_ACTIONS } from '../lib/gitlab.constant';

export const GITLAB_QUERY_KEY = {
  default: [PLATFORM_NAME.GITLAB],
  pushed: (date: string) => [...GITLAB_QUERY_KEY.default, EVENTS_ACTIONS.PUSHED, date],
} as const;
