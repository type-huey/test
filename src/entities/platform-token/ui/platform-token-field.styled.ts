import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { default as _InputLabel } from '@mui/material/InputLabel';
import { default as _TextField } from '@mui/material/TextField';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const InputLabel = styled(_InputLabel)`
  cursor: pointer;
  color: #000;
`;

export const TextField = styled(_TextField)`
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #000000;

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: transparent;
    }
    &:hover fieldset {
      border-color: transparent;
    }
    &.Mui-focused fieldset {
      border-color: #007fff;
    }
  }
`;
