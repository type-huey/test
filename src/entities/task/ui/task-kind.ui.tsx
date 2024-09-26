import * as S from './task-kind-styled';

import { BootstrapTooltip } from '~/shared/common-ui';
import { ITaskKind } from '../model/task.kind';
import { PLATFORM_NAME } from '~/shared/constants';

interface TaskKindList {
  taskKinds: ITaskKind[];
}

export const TaskKind = ({ taskKinds }: TaskKindList) => {
  const platformName = {
    [PLATFORM_NAME.GOOGLE_CALENDAR]: 'GOOGLE CALENDAR',
    [PLATFORM_NAME.GITLAB]: 'GITLAB',
    [PLATFORM_NAME.REDMINE]: 'REDMINE',
  };

  return (
    <S.CountWrapper>
      {taskKinds.map((taskKind, index) => (
        <BootstrapTooltip
          key={index}
          title={
            taskKind.isSync
              ? `${platformName[taskKind.kind]} (${taskKind.value})`
              : `${platformName[taskKind.kind]} 일일 데이터 관리 동기화 미설정`
          }
          placement="bottom-end"
        >
          <S.TaskKindItem key={taskKind.kind} taskKindBgColor={taskKind.color} isSync={taskKind.isSync}>
            {taskKind.value}
          </S.TaskKindItem>
        </BootstrapTooltip>
      ))}
    </S.CountWrapper>
  );
};
