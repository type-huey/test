import { useGoogleLogin as useGoogleOAuthLogin } from '@react-oauth/google';
import { usePlatformSyncConfigActions } from '~/entities/platform-sync';
import { usePlatformTokenActions } from '~/entities/platform-token';
import { PLATFORM_NAME } from '~/shared/constants';
import { usePanelStateStore } from '~/shared/store/panel-state/panel-state.store';
import { setCookie } from '~/shared/utils';

export const useGoogleLogin = () => {
  const { setMainPanelState } = usePanelStateStore((state) => ({
    setMainPanelState: state.setMainPanelState,
  }));
  const { setAuthenticated, setUnauthenticated } = usePlatformTokenActions();
  const { removeSyncPlatform } = usePlatformSyncConfigActions();

  const loginSuccess = (credentialResponse: any) => {
    const { access_token } = credentialResponse;
    setCookie('AUTH_TOKEN', access_token || '');
    setMainPanelState('main');
    setAuthenticated(PLATFORM_NAME.GOOGLE_CALENDAR, access_token);
  };

  const login = useGoogleOAuthLogin({
    onSuccess: loginSuccess,
    onError: (error) => {
      console.error('Login Failed:', error);
      setUnauthenticated(PLATFORM_NAME.GOOGLE_CALENDAR);
      removeSyncPlatform(PLATFORM_NAME.GOOGLE_CALENDAR);
    },
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  });

  return {
    login,
  };
};
