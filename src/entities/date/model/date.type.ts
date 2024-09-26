export const DATE_FORMAT = {
  MONTH_YEAR: 'monthYear',
  DAY_WEEKDAY: 'dayWeekday',
} as const;

export type TDateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];
