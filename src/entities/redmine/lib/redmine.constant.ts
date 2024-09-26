export const BASE_URL = '/redmine/';

export const API_ENDPOINT = {
  GET_USER_INFO: () => 'users/current.json',
  GET_ISSUES: () => 'issues.json',
  GET_ISSUE_JOURNALS: (issueId: number) => `issues/${issueId}.json`,
} as const;

export const EVENTS_ACTIONS = {
  USER_INFO: 'userInfo',
  ISSUES: 'issues',
  ISSUE_IN_JOURNALS: 'issueInJournals',
} as const;
