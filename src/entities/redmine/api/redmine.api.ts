import ky from 'ky';

import type { GetIssuesParams, GetIssueJournalsParams } from '../model/request-params.types';
import type { UserResponse } from '../model/redmine-user.types';
import type { IssuesResponse } from '../model/redmine-issue.types';
import type { IssueResponse } from '../model/redmine-journals.types';
import { BASE_URL, API_ENDPOINT } from '../lib';

const instance = (token: string) =>
  ky.extend({
    prefixUrl: BASE_URL,
    headers: {
      'X-Redmine-API-Key': token,
    },
  });

export const getUserInfo = async (token: string) => {
  try {
    const response = await instance(token).get<UserResponse>(API_ENDPOINT.GET_USER_INFO()).json();

    return response;
  } catch (error) {
    console.error('Error getUserInfo:', error);

    throw error;
  }
};

export const getIssues = async (token: string, params: GetIssuesParams) => {
  try {
    const response = await instance(token)
      .get<IssuesResponse>(API_ENDPOINT.GET_ISSUES(), {
        searchParams: {
          limit: 100, // 지원하는 최대치
          status_id: '*',
          assigned_to_id: 'me',
          updated_on: `><${params.startDate}|${params.endDate}`,
        },
      })
      .json();

    return response;
  } catch (error) {
    console.error('Error getAssignedIssues:', error);

    throw error;
  }
};

/** 특정 이슈의 변경 로그(댓글, 수정 내용 등) 가져오기 */
export const getIssueJournals = async (token: string, params: GetIssueJournalsParams) => {
  try {
    const response = await instance(token)
      .get<IssueResponse>(API_ENDPOINT.GET_ISSUE_JOURNALS(params.issueId), { searchParams: { include: 'journals' } })
      .json();

    return response;
  } catch (error) {
    console.error('Error getIssueJournals:', error);

    throw error;
  }
};
