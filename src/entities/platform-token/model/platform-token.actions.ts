import { PLATFORM_TOKEN_STATUS } from '~/shared/constants/platform';

import type { Actions, State } from './platform-token.types';

export const actions = (set: (fn: (state: State) => State) => void): Omit<Actions, 'restAll'> => ({
  setAuthenticated: (platformName, token) =>
    set((state) => ({
      ...state,
      [platformName]: {
        token,
        status: PLATFORM_TOKEN_STATUS.AUTHENTICATED,
      },
    })),
  setUnauthenticated: (platformName) =>
    set((state) => ({
      ...state,
      [platformName]: {
        token: state[platformName].token,
        status: PLATFORM_TOKEN_STATUS.UNAUTHENTICATED,
      },
    })),
  rest: (platformName) =>
    set((state) => ({
      ...state,
      [platformName]: {
        token: '',
        status: PLATFORM_TOKEN_STATUS.NONE,
      },
    })),
});
