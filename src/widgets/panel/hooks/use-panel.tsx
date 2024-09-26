import { usePanelStateStore } from '~/shared/store/panel-state/panel-state.store';

export const usePanel = () => {
  const { mainPanelState, subPanelState, setMainPanelState } = usePanelStateStore((state) => ({
    mainPanelState: state.mainPanelState,
    subPanelState: state.subPanelState,
    setMainPanelState: state.setMainPanelState,
  }));

  const handleVisiblePanel = () => {
    mainPanelState ? setMainPanelState(null) : setMainPanelState('login');
  };

  return {
    mainPanelState,
    subPanelState,
    setMainPanelState,
    onPanelVisible: handleVisiblePanel,
  };
};
