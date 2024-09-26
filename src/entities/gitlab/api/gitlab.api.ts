import ky from 'ky';

import { IResponseGitLabEvent, IGitlabDate } from '../model/gitlab.type';
import { EVENTS_ACTIONS, EVENTS_ENDPOINT, GITLAB_BASE_URL } from '../lib/gitlab.constant';
import dayjs from 'dayjs';

const gitlabClient = (token: string) =>
  ky.extend({
    prefixUrl: GITLAB_BASE_URL,
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set('PRIVATE-TOKEN', token);
        },
      ],
    },
  });

export const getGitlabVersion = async (token: string): Promise<{ version: string; revision: string }> => {
  return await gitlabClient(token).get(EVENTS_ENDPOINT.version).json();
};

export const getGitlabPushEvents = async ({
  token,
  start,
  end,
}: IGitlabDate & { token: string }): Promise<IResponseGitLabEvent[]> => {
  return await gitlabClient(token)
    .get(EVENTS_ENDPOINT.default, {
      searchParams: {
        action: EVENTS_ACTIONS.PUSHED,
        after: dayjs(start).subtract(1, 'day').format('YYYY-MM-DD'),
        before: dayjs(end).add(1, 'day').format('YYYY-MM-DD'),
        per_page: 100,
      },
    })
    .json();
};
