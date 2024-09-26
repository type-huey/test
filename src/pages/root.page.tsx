import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { LoginPanel, MainPanel, usePanel, CalendarPanel, SettingPanel } from '~/widgets/panel';

import { WidgetButton } from '~/shared/common-ui';
import { PANEL_TYPE } from '~/shared/constants';
import { TMainPanelState } from '~/shared/store';
import { Footer } from '~/shared/footer';

export const RootPage = () => {
  const { mainPanelState, onPanelVisible, setMainPanelState } = usePanel();

  return (
    <>
      <WidgetButton onPanelVisible={onPanelVisible} />
      <WidgetPanel $isVisible={mainPanelState}>
        <Box display="flex" flexGrow="1" sx={{ overflow: 'auto' }}>
          {mainPanelState === PANEL_TYPE.LOGIN && (
            <LoginPanel mainPanelState={mainPanelState} setMainPanelState={setMainPanelState} />
          )}
          {mainPanelState === PANEL_TYPE.MAIN && <MainPanel />}
          {mainPanelState === PANEL_TYPE.CALENDAR && <CalendarPanel />}
          {mainPanelState === PANEL_TYPE.SETTING && <SettingPanel />}
        </Box>
        {mainPanelState && mainPanelState !== PANEL_TYPE.LOGIN && <Footer type={mainPanelState} />}
      </WidgetPanel>
    </>
  );
};

const WidgetPanel = styled.div<{ $isVisible: TMainPanelState }>`
  position: fixed;
  display: ${(props) => (props.$isVisible !== null ? 'flex' : 'none')};
  flex-direction: column;
  bottom: 80px;
  right: 20px;
  width: 300px;
  min-height: 500px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  z-index: 1000;
`;
