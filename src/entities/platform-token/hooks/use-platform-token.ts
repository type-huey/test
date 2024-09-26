import React from 'react';

/* eslint-disable react-hooks/rules-of-hooks */
import { PLATFORM_NAME, PLATFORM_TOKEN_STATUS, PlatformNameUnion } from '~/shared/constants/platform';

import { usePlatformTokenStore } from '../model';

const platformTokenHookCreator = (platformName: PlatformNameUnion) => {
  const platform = usePlatformTokenStore((state) => state[platformName]);
  const actions = usePlatformTokenStore((state) => state.actions);

  const data = React.useMemo(
    () => ({
      ...platform,
      isAuthenticated: platform.status === PLATFORM_TOKEN_STATUS.AUTHENTICATED,
      setAuthenticated: (token: string) => actions.setAuthenticated(platformName, token),
      setUnauthenticated: () => actions.setUnauthenticated(platformName),
      rest: () => actions.rest(platformName),
    }),
    [platformName, platform, actions]
  );

  return data;
};

export const useGoogleCalendarToken = () => platformTokenHookCreator(PLATFORM_NAME.GOOGLE_CALENDAR);

export const useGitlabToken = () => platformTokenHookCreator(PLATFORM_NAME.GITLAB);

export const useRedminToken = () => platformTokenHookCreator(PLATFORM_NAME.REDMINE);
