import type { PlatformNameUnion, PlatformTokenStatusUnion } from '~/shared/constants/platform';

export type PlatformTokenData = {
  token: string;
  status: PlatformTokenStatusUnion;
};

export type State = Record<PlatformNameUnion, PlatformTokenData>;

export type Actions = {
  setAuthenticated: (platformName: PlatformNameUnion, token: string) => void;
  setUnauthenticated: (platformName: PlatformNameUnion) => void;
  rest: (platformName: PlatformNameUnion) => void;
  restAll: () => void;
};
