import type { StrictDateString } from '~/shared/types/date';

export interface GetIssuesParams {
  startDate: StrictDateString;
  endDate: StrictDateString;
}

export interface GetIssueJournalsParams {
  issueId: number;
}
