import { Actions, State } from './google-calendar.types';

export const actions = (
  set: (fn: (state: State) => State) => void
): Actions => ({
  setGoogleCalendar: (calendarList) =>
    set((state) => ({
      googleCalendarList: [...state.googleCalendarList, ...calendarList],
    })),
});
