import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { default as _Typography } from '@mui/material/Typography';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const Typography = styled(_Typography)`
  white-space: nowrap;
`;
