import type { TPanelType } from '../../constants';

export type TMainPanelState = TPanelType | null;
export type TSubPanelState = true | false;

export type State = {
  mainPanelState: TMainPanelState;
  subPanelState: TSubPanelState;
};
