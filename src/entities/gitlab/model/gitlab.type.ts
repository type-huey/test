export interface IGitlabDate {
  start: string;
  end: string;
}

interface IGitLabAuthor {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
}

interface IGitLabPushData {
  commit_count: number;
  action: string;
  ref_type: string;
  commit_from: string;
  commit_to: string;
  ref: string;
  commit_title: string;
  ref_count: null | number;
}

export interface IResponseGitLabEvent {
  id: number;
  project_id: number;
  action_name: string;
  target_id: null | number;
  target_iid: null | number;
  target_type: null | string;
  author_id: number;
  target_title: null | string;
  created_at: string;
  author: IGitLabAuthor;
  push_data: IGitLabPushData;
  author_username: string;
}
