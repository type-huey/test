import type { PlatformNameUnion } from '~/shared/constants/platform';
import type { StrictDateString } from '~/shared/types/date';

export type PlatformSyncDataValue = {
  raw: Record<StrictDateString, unknown>;
  summary: Record<StrictDateString, unknown>;
};

export type State = Record<PlatformNameUnion, PlatformSyncDataValue>;

export type Actions = {
  updateDataPlatform: (platformName: PlatformNameUnion, date: StrictDateString, raw: unknown, summary: unknown) => void;
  deleteDataPlatform: (platformName: PlatformNameUnion, date: StrictDateString) => void;
  resetAll: () => void;
};
