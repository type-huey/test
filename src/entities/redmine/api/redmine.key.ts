import { PLATFORM_NAME } from '~/shared/constants';

import { EVENTS_ACTIONS } from '../lib/redmine.constant';

export const QUERY_KEY = {
  default: [PLATFORM_NAME.REDMINE],
  [EVENTS_ACTIONS.USER_INFO]: () => [...QUERY_KEY.default, EVENTS_ACTIONS.USER_INFO],
  [EVENTS_ACTIONS.ISSUES]: (date: string) => [...QUERY_KEY.default, EVENTS_ACTIONS.ISSUES, date],
  [EVENTS_ACTIONS.ISSUE_IN_JOURNALS]: (date: string, issueId: number) => [
    ...QUERY_KEY.default,
    EVENTS_ACTIONS.ISSUE_IN_JOURNALS,
    date,
    issueId,
  ],
} as const;
