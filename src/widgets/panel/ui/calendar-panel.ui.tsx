import { useState } from 'react';

import * as S from './calendar.styles';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarPanel = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <S.StyleCalendar locale="en" onChange={onChange} value={value} />
    </div>
  );
};
