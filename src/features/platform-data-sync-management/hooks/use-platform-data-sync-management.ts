import { useGitlabDataSync } from './use-gitlab-data-sync';
import { useRedmineDataSync } from './use-redmine-data-sync';
import { useGoogleCalendarDataSync } from './use-google-calendar-data-sync';
import type { StrictDateString } from '~/shared/types/date';

type UsePlatformDataSyncManagementProps = {
  enable: boolean;
  selectedDate: StrictDateString;
};

export const usePlatformDataSyncManagement = (props: UsePlatformDataSyncManagementProps) => {
  const { enable, selectedDate } = props;

  useGoogleCalendarDataSync({ enable, selectedDate });
  useGitlabDataSync({ enable, selectedDate });
  useRedmineDataSync({ enable, selectedDate });
};
