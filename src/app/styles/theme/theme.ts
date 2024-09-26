import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  typography: {
    fontFamily: ['Pretendard', 'sans-serif', '-apple-system'].join(','),
  },
  palette: {
    primary: {
      main: '#FA3F3F',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});
