import { omit } from 'lodash-es';

import { usePlatformSyncConfigStore, usePlatformSyncConfigActions } from '~/entities/platform-sync';
import { useGoogleCalendarToken, useGitlabToken, useRedminToken } from '~/entities/platform-token';
import {
  PlatformDataSyncToggleButton,
  PlatformDataSyncToggleButtonProps,
} from '~/shared/common-ui/button/platform-data-sync-toggle-button';
import { PLATFORM_NAME, PlatformNameUnion } from '~/shared/constants/platform';
import { Icon } from '~/shared/Icons';

import * as S from './data-sync-platform-selector.styled';
import { PlatformDisplayItem } from './platform-display-item';

export const DataSyncPlatformSelector = () => {
  const dataSync = usePlatformSyncConfigStore((state) => state);
  const googleCalendarToken = useGoogleCalendarToken();
  const redminToken = useRedminToken();
  const gitlabToken = useGitlabToken();
  const { isSyncPlatform, addSyncPlatform, removeSyncPlatform } = usePlatformSyncConfigActions();

  const handleSelect = (platformName: PlatformNameUnion) => {
    return () => {
      if (isSyncPlatform(platformName)) {
        removeSyncPlatform(platformName);
      } else {
        addSyncPlatform(platformName);
      }
    };
  };

  const platforms: ({
    _id: PlatformNameUnion;
  } & PlatformDataSyncToggleButtonProps)[] = [
    {
      _id: PLATFORM_NAME.GOOGLE_CALENDAR,
      children: <PlatformDisplayItem icon={<Icon.GoogleCalendarLogo />} name="Google Calendar" />,
      selected: dataSync.googleCalendar.sync,
      disabled: !googleCalendarToken.isAuthenticated,
      onChange: handleSelect(PLATFORM_NAME.GOOGLE_CALENDAR),
    },
    {
      _id: PLATFORM_NAME.GITLAB,
      children: <PlatformDisplayItem icon={<Icon.GitLabLogo />} name="GitLab" />,
      selected: dataSync.gitlab.sync,
      disabled: !gitlabToken.isAuthenticated,
      onChange: handleSelect(PLATFORM_NAME.GITLAB),
    },
    {
      _id: PLATFORM_NAME.REDMINE,
      children: <PlatformDisplayItem icon={<Icon.RedmineLogo />} name="Redmine" />,
      selected: dataSync.redmine.sync,
      disabled: !redminToken.isAuthenticated,
      onChange: handleSelect(PLATFORM_NAME.REDMINE),
    },
  ];

  return (
    <S.Wrapper>
      {platforms.map((platform) => (
        <PlatformDataSyncToggleButton key={platform._id} {...omit(platform, ['_id', 'children'])}>
          {platform.children}
        </PlatformDataSyncToggleButton>
      ))}
    </S.Wrapper>
  );
};
