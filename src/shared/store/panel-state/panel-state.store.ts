import { create } from 'zustand';

import { State, TMainPanelState, TSubPanelState } from './panel-state.types';
import { Actions } from './panel-state.action';
import { PANEL_TYPE } from '~/shared/constants';

export const usePanelStateStore = create<State & Actions>((set) => ({
  mainPanelState: null,
  subPanelState: false,

  setMainPanelState: (state: TMainPanelState) =>
    set(() => ({
      mainPanelState: state,
      subPanelState: state === (PANEL_TYPE.MAIN || PANEL_TYPE.CALENDAR) ? false : false,
    })),
  setSubPanelState: (state: TSubPanelState) =>
    set(() => ({
      subPanelState: state,
    })),
}));
