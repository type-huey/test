import { TMainPanelState, TSubPanelState } from './panel-state.types';

export type Actions = {
  setMainPanelState: (state: TMainPanelState) => void;
  setSubPanelState: (state: TSubPanelState) => void;
};
