import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { reduce, omit } from 'lodash-es';
import localforage from 'localforage';

import { PLATFORM_NAME } from '~/shared/constants/platform';

import type { Actions, State } from './platform-sync-data.types';
import { actions } from './platform-sync-data.actions';

localforage.config({
  name: 'write-daily',
  storeName: 'platform-sync-data',
});

const STORAGE_KEY = 'platform-sync-data';

const initialState: State = reduce(
  PLATFORM_NAME,
  (acc, value) => {
    acc[value] = { raw: {}, summary: {} };
    return acc;
  },
  {} as State
);

export const usePlatformSyncDataStore = create<State & { actions: Actions }>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        ...actions(set),
        resetAll: () =>
          set(() => ({
            ...initialState,
          })),
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => omit(state, ['actions']),
      getStorage: () => localforage,
    }
  )
);

export const usePlatformSyncDataActions = () => usePlatformSyncDataStore((state) => state.actions);
