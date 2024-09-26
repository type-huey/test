import { ITask } from '../model/task.type';
import { BootstrapTooltip } from '~/shared/common-ui';
import * as S from './task-item.styled';
import { Box } from '@mui/material';

interface TaskCardProps extends ITask {
  isLast: boolean;
}

export const TaskItem = ({ platform, date, title, text, isLast }: TaskCardProps) => {
  return (
    <S.TaskItem $isLast={isLast}>
      <BootstrapTooltip title={text} placement="left-start">
        <Box>
          <S.Time>{date}</S.Time>
          <S.Content>
            <Box>
              <S.Dot platform={platform} />
            </Box>
            <S.Text>{title}</S.Text>
          </S.Content>
        </Box>
      </BootstrapTooltip>
    </S.TaskItem>
  );
};
