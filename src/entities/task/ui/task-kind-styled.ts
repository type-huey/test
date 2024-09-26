import styled from '@emotion/styled';

export const TaskKindItem = styled.div<{ taskKindBgColor: string; isSync: boolean }>`
  opacity: ${({ isSync }) => (isSync ? 1 : 0.4)};
  width: 27px;
  height: 20px;
  border-radius: 14px;
  background-color: ${({ taskKindBgColor }) => taskKindBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  text-align: center;
`;

export const CountWrapper = styled.div`
  display: flex;
  gap: 1px;
  margin-top: 17px;
  margin-bottom: 6px;
`;
