import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { reduce, omit } from 'lodash-es';

import { PLATFORM_NAME } from '~/shared/constants/platform';

import type { Actions, State } from './platform-sync-config.types';
import { actions } from './platform-sync-config.actions';

const STORAGE_KEY = 'platform-sync-config';

const initialState: State = {
  synchronized: [],
  ...reduce(
    PLATFORM_NAME,
    (acc, value) => {
      acc[value] = {
        interval: 24 * 60 * 60 * 1000,
        sync: false,
      } as any;

      if (value === PLATFORM_NAME.REDMINE) {
        acc[value].userId = '';
      }

      return acc;
    },
    {} as Omit<State, 'synchronized'>
  ),
};

export const usePlatformSyncConfigStore = create<State & { actions: Actions }>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        ...actions(set, get),
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

export const usePlatformSyncConfigActions = () => usePlatformSyncConfigStore((state) => state.actions);
