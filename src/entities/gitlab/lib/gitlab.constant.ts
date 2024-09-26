export const GITLAB_BASE_URL = 'https://gitlab.rsupport.com/api/v4';

export const EVENTS_ENDPOINT = {
  default: 'events',
  version: 'version',
} as const;

export const EVENTS_ACTIONS = {
  PUSHED: 'pushed',
} as const;
