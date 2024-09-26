import styled from '@emotion/styled';

interface DateBoxProps {
  isToday: boolean;
}

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin-top: 20px;
  width: 100%;
`;

export const DateBox = styled.div<DateBoxProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ isToday }) => isToday && '#FA3F3F'};
  width: 50px;
  height: 50px;
  border-radius: 7px;

  /* font */
  font-size: 9px;
  font-weight: 590;
  text-align: center;
  color: ${({ isToday }) => (isToday ? '#fff' : '#BCBCBC')};

  cursor: pointer;
`;

export const DateLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  user-select: none;
`;
