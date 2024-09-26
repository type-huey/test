// @ts-nocheck

import { useQuery } from '@tanstack/react-query';
import { getGoogleCalendarEvents } from './google-calendar.api';
import { GOOGLE_CALENDAR_QUERY_KEY } from './google-calendar.key';

export const useGoogleCalendarPushEventsQuery = (token?: string, startDate?: string, endDate?: string) => {
  return useQuery({
    enabled: !!token && !!startDate && !!endDate,
    queryKey: GOOGLE_CALENDAR_QUERY_KEY.pushed(`${startDate}-${endDate}`),
    queryFn: async () =>
      getGoogleCalendarEvents({
        token: token as string,
        startDate: new Date(new Date(startDate as string).setHours(0, 0, 0, 0)) as Date,
        endDate: new Date(new Date(endDate as string).setHours(23, 59, 59, 999)) as Date,
      }),
  });
};
