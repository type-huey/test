// @ts-nocheck

import React from 'react';
import styled from '@emotion/styled';
import { Box, Stack } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { generateAIResponse } from '~/entities/ai';
import { TaskPanel } from '~/widgets/panel';
import { usePlatformSyncConfigStore } from '~/entities/platform-sync';
import { usePlatformDataSyncManagement } from '~/features/platform-data-sync-management';
import { AISummaryButton } from '~/features/ai-summary';
import { usePlatformSyncDataStore } from '~/entities/platform-sync';
import { TaskKind } from '~/entities/task/ui/task-kind.ui';
import { ITask } from '~/entities/task/model/task.type';
import { DATE_FORMAT, DateDisplay, FiveDayCalendar } from '~/entities/date';
import { usePanelStateStore } from '~/shared/store/panel-state/panel-state.store';
import { formatDateToStrictString } from '~/shared/utils/formatDateToStrictString';
import { PANEL_TYPE, PLATFORM_NAME } from '~/shared/constants';
import dayjs from 'dayjs';

export const MainPanel = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [aiSummaryData, setAiSummaryData] = React.useState<string>(null);
  const formattedDate = formatDateToStrictString(selectedDate);

  const { mainPanelState, subPanelState, setSubPanelState } = usePanelStateStore((state) => ({
    mainPanelState: state.mainPanelState,
    subPanelState: state.subPanelState,
    setSubPanelState: state.setSubPanelState,
  }));

  const syncConfig = usePlatformSyncConfigStore((state) => state);
  const { googleCalendar, gitlab, redmine } = usePlatformSyncDataStore((state) => state);

  usePlatformDataSyncManagement({ enable: true, selectedDate: formattedDate });

  const toggleSubPanel = () => {
    setSubPanelState(!subPanelState);
  };

  const googleCalendarTask: ITask[] = Object.values(googleCalendar.summary[formattedDate] ?? {});
  const gitlabTask: ITask[] = Object.values(gitlab.summary[formattedDate] ?? {});
  const redmineTask: ITask[] = Object.values(redmine.summary[formattedDate] ?? {});

  const tasks: ITask[] = [...googleCalendarTask, ...gitlabTask, ...redmineTask].sort((a, b) =>
    dayjs(a).isAfter(dayjs(b)) ? 1 : -1
  );

  const TaskKindList = [
    {
      kind: PLATFORM_NAME.GOOGLE_CALENDAR,
      value: googleCalendarTask.length,
      color: '#2c65f8',
      isSync: syncConfig.googleCalendar.sync,
    },
    { kind: PLATFORM_NAME.REDMINE, value: redmineTask.length, color: '#F82C44', isSync: syncConfig.redmine.sync },
    { kind: PLATFORM_NAME.GITLAB, value: gitlabTask.length, color: '#FF7F50', isSync: syncConfig.gitlab.sync },
  ];

  const getAiSummary = async () => {
    const { response } = await generateAIResponse(tasks);

    setAiSummaryData(response);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: 'inherit',
          padding: '18px 18px',
        }}
      >
        <Stack justifyContent="space-between" alignItems="center" direction="row">
          <Stack alignItems="center" direction="row">
            <BackupTableIcon onClick={toggleSubPanel} sx={{ marginRight: '10px', cursor: 'pointer' }} />
            <DateDisplay format={DATE_FORMAT.MONTH_YEAR} typoSize="overline" />
          </Stack>
          <AISummaryButton
            onSummary={getAiSummary}
            tasks={tasks}
            styles={{
              borderRadius: 15,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
        </Stack>
        <FiveDayCalendar selectedDate={selectedDate} handleClick={setSelectedDate} />
        <TaskKind taskKinds={TaskKindList} />
        {aiSummaryData ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
              marginRight: '-17px',
              paddingRight: '17px',
            }}
          >
            <ReactMarkdown children={aiSummaryData} remarkPlugins={[remarkGfm]} />
          </div>
        ) : (
          <Waitingsummation>{'AI 요약 대기중입니다.'}</Waitingsummation>
        )}
      </Box>

      {subPanelState && (
        <SubWidget>
          {mainPanelState === PANEL_TYPE.MAIN && <TaskPanel selectedDate={selectedDate} tasks={tasks} />}
        </SubWidget>
      )}
    </>
  );
};

const Waitingsummation = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 10.74px;
  text-align: center;
  height: 212px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.3px solid #0000004d;
`;

const SubWidget = styled.div`
  position: fixed;
  bottom: 80px;
  right: 330px;
  width: 300px;
  min-height: 500px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  z-index: 1000;
`;
