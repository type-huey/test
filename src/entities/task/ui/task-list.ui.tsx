import { List } from '@mui/material';

import { ITask } from '../model/task.type';
import { TaskItem } from './task-item.ui';

interface ITaskList {
  tasks: ITask[];
}

export const TaskList = ({ tasks }: ITaskList) => {
  return (
    <List
      sx={{
        borderTop: '1px solid #ebebeb',
        borderBottom: '1px solid #ebebeb',
        padding: '2px 0',
        overflowY: 'auto',
        height: '350px',
        scrollbarWidth: 'thin',
      }}
    >
      {tasks?.map((task, index) => <TaskItem key={task.id} isLast={tasks.length - 1 === index} {...task} />)}
    </List>
  );
};
