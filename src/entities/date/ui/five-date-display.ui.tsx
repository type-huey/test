import dayjs from 'dayjs';

import * as S from './five-date-styled';

type FiveDayCalendarProps = {
  selectedDate: Date;
  handleClick: (date: Date) => void;
};

export const FiveDayCalendar = (props: FiveDayCalendarProps) => {
  const { selectedDate, handleClick } = props;

  const today = dayjs(selectedDate);
  const dates = [];

  for (let i = -2; i <= 2; i++) {
    dates.push(today.add(i, 'day'));
  }

  return (
    <S.CalendarContainer>
      {dates.map((date, index) => (
        <S.DateBox
          key={index}
          isToday={date.isSame(dayjs(selectedDate), 'day')}
          onClick={() => handleClick(date.toDate())}
        >
          <S.DateLabel>{date.format('D')} </S.DateLabel>
          <S.DateLabel>{date.format('ddd')}</S.DateLabel>
        </S.DateBox>
      ))}
    </S.CalendarContainer>
  );
};
