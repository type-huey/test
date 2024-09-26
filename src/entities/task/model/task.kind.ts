import { PlatformNameUnion } from '~/shared/constants';

export const TASK_KIND = {
  GOOGLE: 'google',
  RED_MINE: 'redmine',
  GIT_LAB: 'gitlab',
} as const;

export type TTaskKindFormat = (typeof TASK_KIND)[keyof typeof TASK_KIND];

export interface ITaskKind {
  kind: PlatformNameUnion;
  value: number;
  color: string;
  isSync: boolean;
}
