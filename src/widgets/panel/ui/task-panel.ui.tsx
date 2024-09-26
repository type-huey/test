// @ts-nocheck

import { Box, Stack } from '@mui/material';

import { DATE_FORMAT, DateDisplay } from '~/entities/date';
import { useGitlabPushEventsQuery } from '~/entities/gitlab';
import { useGoogleCalendarPushEventsQuery } from '~/entities/google';
import { TaskList } from '~/entities/task';
import { ITask } from '~/entities/task/model/task.type';
import { AISummaryButton } from '~/features/ai-summary';
import { TaskRefreshButton } from '~/features/task-refresh';
import { PLATFORM_NAME } from '~/shared/constants';
import { formatDateToStrictString } from '~/shared/utils/formatDateToStrictString';

type TaskPanelProps = {
  selectedDate: Date;
  tasks: ITask[];
};

export const TaskPanel = (props: TaskPanelProps) => {
  const { selectedDate, tasks } = props;
  // const { data } = useGitlabPushEventsQuery('', '2024-08-28', '2024-09-03');

  // const today = new Date();
  // const { data } = useGoogleCalendarPushEventsQuery(
  //   new Date(today.setHours(0, 0, 0, 0)),
  //   new Date(today.setHours(23, 59, 59, 999))
  // );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        minHeight: 'inherit',
        padding: '18px 18px',
      }}
    >
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <DateDisplay date={selectedDate} format={DATE_FORMAT.DAY_WEEKDAY} typoSize="h6" />
        <TaskRefreshButton />
      </Stack>
      <Box>
        <TaskList tasks={tasks} />
      </Box>
      <AISummaryButton
        tasks={tasks}
        styles={{
          borderRadius: 50,
          width: 200,
          margin: 'auto',
        }}
      />
    </Box>
  );
};
