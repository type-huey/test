// @ts-nocheck

import React from 'react';
import dayjs from 'dayjs';
import { useQuery, useQueries } from '@tanstack/react-query';

import { QUERY_KEY, getIssues, getIssueJournals } from '../api';
import { GetIssuesParams } from '../model/request-params.types';
import { StrictDateString } from '~/shared/types';

export type UseRedmineIssuesProps = {
  token: string;
  userId: string;
} & Partial<GetIssuesParams>;

export const useRedmineIssues = (props?: null | UseRedmineIssuesProps) => {
  const { token, userId, startDate, endDate } = props ?? {};

  const requestDate = `${startDate}-${endDate}`;
  const [result, setResult] = React.useState({ data: null, isLoading: false, isError: false });

  const issuesQuery = useQuery({
    enabled: !!token && !!startDate && !!endDate,
    queryKey: QUERY_KEY.issues(requestDate),
    queryFn: async () =>
      getIssues(token as string, {
        startDate: startDate as StrictDateString,
        endDate: endDate as StrictDateString,
      }),
  });

  const journalsQueries = useQueries({
    queries: (issuesQuery.data?.issues || []).map((issue) => ({
      enabled: !!token && !!issue.id,
      queryKey: QUERY_KEY.issueInJournals(requestDate, issue.id),
      queryFn: async () => getIssueJournals(token as string, { issueId: issue.id }),
      // select: (data) => data.issue.journals.filter((journal) => journal.user.id === userId),
    })),
  });

  // 모든 쿼리가 로딩 중인지 체크
  const allLoading =
    issuesQuery.isLoading ||
    issuesQuery.isFetching ||
    journalsQueries.some((query) => query.isLoading || query.isFetching);

  React.useEffect(() => {
    // 모든 쿼리가 오류인 경우 체크
    const allError = issuesQuery.isError || journalsQueries.some((query) => query.isError);

    // 모든 쿼리가 완료되면 데이터를 반환
    if (!allLoading && !allError) {
      const userActivity = (issuesQuery.data?.issues || []).reduce(
        (acc, issue, index) => {
          const journals = journalsQueries[index]?.data || [];
          const userJournals = journals.issue.journals.filter((journal) => journal.user.id === userId);

          if (userJournals.length > 0) {
            const updatedOn = dayjs(issue.updated_on).format('YYYY-MM-DD') as StrictDateString;
            if (!acc[updatedOn]) acc[updatedOn] = [];
            acc[updatedOn].push({ issue, userJournals });
          }
          return acc;
        },
        {} as Record<StrictDateString, Array<{ issue: (typeof issuesQuery.data.issues)[0]; userJournals: Array<any> }>>
      );

      setResult({ data: userActivity, isLoading: false, isError: false });
    }
  }, [allLoading]);

  return result;
};
