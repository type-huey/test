import { PLATFORM_NAME } from './platform.constant';

export type PlatformNameUnion = (typeof PLATFORM_NAME)[keyof typeof PLATFORM_NAME];
