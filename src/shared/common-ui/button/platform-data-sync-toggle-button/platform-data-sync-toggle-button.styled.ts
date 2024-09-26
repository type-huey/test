import { styled } from '@mui/material/styles';

import { default as _ToggleButton } from '@mui/material/ToggleButton';

export const ToggleButton = styled(_ToggleButton)(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
  border: selected ? '2px solid #000000' : '2px solid transparent',
  borderRadius: '25px',
  backgroundColor: '#F5F5F5',
  cursor: 'pointer',
  color: '#000000',
  '&.Mui-disabled': {
    border: '2px solid transparent',
  },
  '&.Mui-selected': {
    backgroundColor: '#ffffff',
  },
}));
