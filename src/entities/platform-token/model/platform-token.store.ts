import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { reduce, omit } from 'lodash-es';

import { PLATFORM_NAME, PLATFORM_TOKEN_STATUS } from '~/shared/constants/platform';

import type { Actions, State } from './platform-token.types';
import { actions } from './platform-token.actions';

const STORAGE_KEY = 'platform-token';

const initialState: State = reduce(
  PLATFORM_NAME,
  (acc, value) => {
    acc[value] = {
      token: '',
      status: PLATFORM_TOKEN_STATUS.NONE,
    };
    return acc;
  },
  {} as State
);

export const usePlatformTokenStore = create<State & { actions: Actions }>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        ...actions(set),
        restAll: () =>
          set(() => ({
            ...initialState,
          })),
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => omit(state, ['actions']),
    }
  )
);

export const usePlatformTokenActions = () => usePlatformTokenStore((state) => state.actions);
