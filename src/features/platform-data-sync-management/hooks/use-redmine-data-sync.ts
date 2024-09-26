// @ts-nocheck

import React from 'react';
import { isEmpty } from 'lodash-es';

import { useRedminToken } from '~/entities/platform-token';
import { useRedmineIssues } from '~/entities/redmine/hooks';
import { usePlatformSyncConfigStore, usePlatformSyncDataActions } from '~/entities/platform-sync';

import type { StrictDateString } from '~/shared/types/date';
import { PLATFORM_NAME } from '~/shared/constants';
import dayjs from 'dayjs';

type UseRedmineDataSyncProps = {
  enable: boolean;
  selectedDate: StrictDateString;
};

// NOTE: 현재 특정 날짜만 조회 가능
export const useRedmineDataSync = (props: UseRedmineDataSyncProps) => {
  const { enable, selectedDate } = props;

  const platformToken = useRedminToken();
  const syncConfig = usePlatformSyncConfigStore((state) => state);
  const syncDataAction = usePlatformSyncDataActions();

  const requestParams =
    enable && !!platformToken.token && !!syncConfig.redmine.sync
      ? {
          token: platformToken.token,
          userId: syncConfig.redmine.userId,
          startDate: selectedDate,
          endDate: selectedDate,
        }
      : null;

  const { data } = useRedmineIssues(requestParams);

  const summarize = (raws: any) =>
    raws.map((raw) => {
      const [notes, details] = raw.userJournals.reduce(
        (acc, journal) => {
          if (journal.notes) {
            acc[0].push(journal.notes);
          }
          if (journal.details) {
            acc[1].push(
              journal.details.map((detail) => {
                return Object.entries(detail)
                  .map(([key, value]) => `${key}: '${value}'`)
                  .join(', ');
              })
            );
          }
          return acc;
        },
        [[], []]
      );

      return {
        id: `${PLATFORM_NAME.REDMINE}-${selectedDate}-${raw.issue.id}-${raw.userJournals.id}`,
        platform: PLATFORM_NAME.REDMINE,
        date: dayjs(new Date(raw.issue.updated_on)).tz(dayjs.tz.guess()).format('HH:mm'),
        title: raw.issue.subject,
        text: [raw.issue.subject, notes.join('\n'), details.join('\n')].join('\n'),
        raw: raw,
      };
    });

  React.useEffect(() => {
    if (data && !isEmpty(data)) {
      for (const [_, raw] of Object.entries(data)) {
        syncDataAction.updateDataPlatform(PLATFORM_NAME.REDMINE, selectedDate, raw, summarize(raw));
      }
    }
  }, [data, syncDataAction]);
};
