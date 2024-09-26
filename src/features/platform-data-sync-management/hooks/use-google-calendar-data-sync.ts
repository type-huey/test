// @ts-nocheck

import React from 'react';
import { isEmpty } from 'lodash-es';

import { useGoogleCalendarToken } from '~/entities/platform-token';
import { useGoogleCalendarPushEventsQuery } from '~/entities/google';
import { usePlatformSyncConfigStore, usePlatformSyncDataActions } from '~/entities/platform-sync';

import type { StrictDateString } from '~/shared/types/date';
import { PLATFORM_NAME } from '~/shared/constants';
import dayjs from 'dayjs';

type UseGoogleCalendarDataSyncProps = {
  enable: boolean;
  selectedDate: StrictDateString;
};

export const useGoogleCalendarDataSync = (props: UseGoogleCalendarDataSyncProps) => {
  const { enable, selectedDate } = props;

  const platformToken = useGoogleCalendarToken();
  const syncConfig = usePlatformSyncConfigStore((state) => state);
  const syncDataAction = usePlatformSyncDataActions();

  const requestParams =
    enable && !!platformToken.token && !!syncConfig.googleCalendar.sync
      ? {
          token: platformToken.token,
          startDate: selectedDate,
          endDate: selectedDate,
        }
      : null;

  const { data } = useGoogleCalendarPushEventsQuery(
    requestParams?.token,
    requestParams?.startDate,
    requestParams?.endDate
  );

  const summarize = (raw: any) => {
    return raw.map((data) => {
      return {
        id: `${PLATFORM_NAME.GOOGLE_CALENDAR}-${selectedDate}-${data.id}`,
        platform: PLATFORM_NAME.GOOGLE_CALENDAR,
        date: dayjs(new Date(data.start.dateTime)).tz(dayjs.tz.guess()).format('HH:mm'),
        title: data.summary ?? '',
        text: [
          `주제: ${data.summary}`,
          `위치: ${data.location}`,
          `시간: ${data.start.dateTime}~${data.end.dateTime}`,
          `설정: ${data.description}`,
          `주최자: ${data.organizer.email}`,
          `참석자: [${data.attendees.map((attendee) => attendee.email).join(', ')}]`,
        ].join('\n'),
        raw: data,
      };
    });
  };

  React.useEffect(() => {
    if (data && !isEmpty(data)) {
      syncDataAction.updateDataPlatform(PLATFORM_NAME.GOOGLE_CALENDAR, selectedDate, data, summarize(data));
    }
  }, [data, syncDataAction]);
};
