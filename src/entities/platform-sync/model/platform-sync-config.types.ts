import type { PlatformNameUnion, PLATFORM_NAME } from '~/shared/constants/platform';

export type DefaultPlatformSyncConfigValue = {
  interval: number;
  sync: boolean;
};

export type RedminePlatformSyncConfigValue = {
  userId: string;
} & DefaultPlatformSyncConfigValue;

export type State = { synchronized: PlatformNameUnion[] } & Record<PlatformNameUnion, DefaultPlatformSyncConfigValue> &
  Record<typeof PLATFORM_NAME.REDMINE, RedminePlatformSyncConfigValue>;

export type Actions = {
  isSyncPlatform: (platformName: PlatformNameUnion) => boolean;
  setConfigPlatform: (platformName: PlatformNameUnion, config?: unknown) => void;
  addSyncPlatform: (platformName: PlatformNameUnion) => void;
  removeSyncPlatform: (platformName: PlatformNameUnion) => void;
  restAll: () => void;
};
