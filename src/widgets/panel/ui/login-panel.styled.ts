import styled from '@emotion/styled';
import { default as _Typography } from '@mui/material/Typography';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 84px 20px;
  background: linear-gradient(#ffdddd, #fff);
`;

export const Typography = styled(_Typography)`
  white-space: nowrap;
`;
