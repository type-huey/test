import { EVENTS_ACTIONS } from '../lib/ai.constant';

export const AI_QUERY_KEY = {
  default: ['ai'],
  pushed: (taskList: any) => [...AI_QUERY_KEY.default, EVENTS_ACTIONS.PUSHED, taskList],
} as const;
