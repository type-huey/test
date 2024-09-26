import { googleLogout } from '@react-oauth/google';
import { usePanelStateStore } from '~/shared/store/panel-state/panel-state.store';
import { setCookie } from '~/shared/utils';
import { usePlatformSyncDataActions } from '~/entities/platform-sync';
import { usePlatformSyncConfigActions } from '~/entities/platform-sync';

export const useGoogleLogout = () => {
  const { setMainPanelState } = usePanelStateStore((state) => ({
    setMainPanelState: state.setMainPanelState,
  }));
  const { resetAll } = usePlatformSyncDataActions();
  const syncConfigActions = usePlatformSyncConfigActions();

  const logout = () => {
    setCookie('AUTH_TOKEN', '');
    syncConfigActions.restAll();
    resetAll();
    googleLogout();
    setMainPanelState('login');
  };

  return {
    onLogout: logout,
  };
};
