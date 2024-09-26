import { PLATFORM_TOKEN_STATUS } from './platform-token.constant';

export type PlatformTokenStatusUnion = (typeof PLATFORM_TOKEN_STATUS)[keyof typeof PLATFORM_TOKEN_STATUS];
