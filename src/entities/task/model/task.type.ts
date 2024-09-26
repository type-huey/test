import { PlatformNameUnion } from '~/shared/constants';

// Todo: 실제 데이터 형식이 되어야 함
export interface ITask {
  id: string;
  platform: PlatformNameUnion;
  date: string;
  title: string;
  text: string;
  raw?: unknown;
}
