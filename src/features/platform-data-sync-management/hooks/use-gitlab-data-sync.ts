// @ts-nocheck

import React from 'react';
import { isEmpty } from 'lodash-es';

import { useGitlabToken } from '~/entities/platform-token';
import { useGitlabPushEventsQuery } from '~/entities/gitlab';
import { usePlatformSyncConfigStore, usePlatformSyncDataActions } from '~/entities/platform-sync';

import type { StrictDateString } from '~/shared/types/date';
import { PLATFORM_NAME } from '~/shared/constants';
import dayjs from 'dayjs';

type UseGitlabDataSyncProps = {
  enable: boolean;
  selectedDate: StrictDateString;
};

// NOTE: 현재 특정 날짜만 조회 가능
export const useGitlabDataSync = (props: UseGitlabDataSyncProps) => {
  const { enable, selectedDate } = props;

  const platformToken = useGitlabToken();
  const syncConfig = usePlatformSyncConfigStore((state) => state);
  const syncDataAction = usePlatformSyncDataActions();

  const requestParams =
    enable && !!platformToken.token && !!syncConfig.gitlab.sync
      ? {
          token: platformToken.token,
          startDate: selectedDate,
          endDate: selectedDate,
        }
      : null;

  const { data } = useGitlabPushEventsQuery(requestParams?.token, requestParams?.startDate, requestParams?.endDate);

  const summarize = (raw: any) => {
    return raw
      .filter((data) => ['pushed', 'created'].includes(data.push_data.action))
      .map((data) => {
        return {
          id: `${PLATFORM_NAME.GITLAB}-${selectedDate}-${data.id}`,
          platform: PLATFORM_NAME.GITLAB,
          date: dayjs(new Date(data.created_at)).tz(dayjs.tz.guess()).format('HH:mm'),
          title: data.push_data.commit_title ?? '',
          text: [data.push_data.commit_title, JSON.stringify(data.push_data, null, 2)].join('\n'),
          raw: data,
        };
      });
  };

  React.useEffect(() => {
    if (data && !isEmpty(data)) {
      syncDataAction.updateDataPlatform(PLATFORM_NAME.GITLAB, selectedDate, data, summarize(data));
    }
  }, [data, syncDataAction]);
};
