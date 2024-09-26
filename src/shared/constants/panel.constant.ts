export const PANEL_TYPE = {
  LOGIN: 'login',
  MAIN: 'main',
  SETTING: 'setting',
  CALENDAR: 'calendar',
} as const;

export type TPanelType = (typeof PANEL_TYPE)[keyof typeof PANEL_TYPE];
