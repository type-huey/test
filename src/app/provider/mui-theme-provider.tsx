import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '~/app/styles/theme';

export const MuiThemeProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
