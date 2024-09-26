import { DATE_FORMAT, TDateFormat } from '../model/date.type';

export const formatDate = (date: Date = new Date(), format: TDateFormat = DATE_FORMAT.DAY_WEEKDAY): string => {
  switch (format) {
    case DATE_FORMAT.MONTH_YEAR:
      return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    case DATE_FORMAT.DAY_WEEKDAY:
      return `${date.getDate()}, ${date.toLocaleString('en-US', { weekday: 'long' })}`;
    default:
      return date.toDateString();
  }
};
