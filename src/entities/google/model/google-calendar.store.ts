import { create } from 'zustand';

import { actions } from './google-calendar.actions';
import { Actions, State } from './google-calendar.types';

const initialState: State = {
  googleCalendarList: [],
};

export const useGoogleCalendarStore = create<State & Actions>((set) => ({
  ...initialState,
  ...actions(set),
}));
