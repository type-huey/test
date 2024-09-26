import { PLATFORM_NAME } from '~/shared/constants';
import { EVENTS_ACTIONS } from '../lib/google-calendar.constant';

export const GOOGLE_CALENDAR_QUERY_KEY = {
  default: [PLATFORM_NAME.GOOGLE_CALENDAR],
  pushed: (date: string) => [...GOOGLE_CALENDAR_QUERY_KEY.default, EVENTS_ACTIONS.PUSHED, date],
} as const;
