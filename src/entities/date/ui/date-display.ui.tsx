import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

import { formatDate } from '../lib/formatDate.util';
import { DATE_FORMAT, TDateFormat } from '../model/date.type';

interface IDateDisplayProps {
  format?: TDateFormat;
  date?: Date;
  typoSize?: Variant;
}

export const DateDisplay = ({ format = DATE_FORMAT.DAY_WEEKDAY, date = new Date(), typoSize }: IDateDisplayProps) => {
  const formattedDate = formatDate(date, format);

  return <Typography variant={typoSize}>{formattedDate}</Typography>;
};
