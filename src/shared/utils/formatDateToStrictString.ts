// @ts-nocheck

import dayjs from 'dayjs';

import type { StrictDateString } from '../types';

export const formatDateToStrictString = (date: Date): StrictDateString => {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  return formattedDate as StrictDateString;
};

export function generateDateStrings(startDate: StrictDateString, endDate: StrictDateString): StrictDateString[] {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const dateStrings: StrictDateString[] = [];

  let current = start;

  while (current.isBefore(end) || current.isSame(end, 'day')) {
    dateStrings.push(current.format('YYYY-MM-DD') as StrictDateString);
    current = current.add(1, 'day');
  }

  return dateStrings;
}
