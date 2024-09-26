import { GoogleOAuthProvider } from '@react-oauth/google';
import { PropsWithChildren } from 'react';

import { CLIENT_ID } from '~/entities/google/lib/google-calendar.constant';
import { QueryProvider } from './query-provider';
import { MuiThemeProvider } from './mui-theme-provider';

export const ProviderList = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <MuiThemeProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
      </MuiThemeProvider>
    </QueryProvider>
  );
};
