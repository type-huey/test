import type {  State } from './platform-sync-data.types';

export const actions = (set: (fn: (state: State) => State) => void): any => ({
  updateDataPlatform: (platformName: any, date: any, raw: any, summary: any) =>
    set((state: any) => {
      const platformRaw = Object.assign({}, state[platformName].raw);
      const platformSummary = Object.assign({}, state[platformName].summary);
      platformRaw[date] = raw;
      platformSummary[date] = summary;

      return {
        ...state,
        [platformName]: { raw: platformRaw, summary: platformSummary },
      };
    }),
  deleteDataPlatform: (platformName: any, date: any) =>
    set((state: any) => {
      const platformRaw = Object.assign({}, state[platformName].raw);
      const platformSummary = Object.assign({}, state[platformName].summary);
      delete platformRaw[date];
      delete platformSummary[date];

      return {
        ...state,
        [platformName]: { raw: platformRaw, summary: platformSummary },
      };
    }),
});
