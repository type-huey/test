import styled from '@emotion/styled';

export const Footer = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterIconWrapper = styled.div<{ isSelect: boolean }>`
  width: 81px;
  height: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: ${({ isSelect }) => isSelect && '1px solid #fa3f3f'};
`;
