import { uniq } from 'lodash-es';

import type { Actions, State } from './platform-sync-config.types';

export const actions = (set: (fn: (state: State) => State) => void, get: () => State): Omit<Actions, 'restAll'> => ({
  isSyncPlatform: (platformName) => get().synchronized.includes(platformName),
  setConfigPlatform: (platformName, config) =>
    set((state) => ({
      ...state,
      [platformName]: { ...state[platformName], ...(config || {}) },
    })),
  addSyncPlatform: (platformName) =>
    set((state) => ({
      ...state,
      synchronized: uniq([...state.synchronized, platformName]),
      [platformName]: { ...state[platformName], sync: true },
    })),
  removeSyncPlatform: (platformName) =>
    set((state) => ({
      ...state,
      synchronized: state.synchronized.filter((syncedPlatform) => syncedPlatform !== platformName),
      [platformName]: { ...state[platformName], sync: false },
    })),
});
