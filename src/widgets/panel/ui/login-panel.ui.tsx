import { useEffect } from 'react';
import { GoogleLoginButton } from '~/features/auth/google';
import { Icon } from '~/shared/Icons';
import { getCookie } from '~/shared/utils';

import * as S from './login-panel.styled';

export const LoginPanel = ({ mainPanelState, setMainPanelState }: any) => {
  const token = getCookie('AUTH_TOKEN');

  useEffect(() => {
    if (mainPanelState !== null) {
      if (token) {
        setMainPanelState('main');
      }
    }
  }, [mainPanelState]);

  return (
    <S.Wrapper>
      <Icon.WriteDailyLogo sx={{ width: '202px', height: '50px' }} />
      <S.Typography sx={{ marginTop: '150px' }} variant="h6">
        Write Daily에 오신걸 환영해요!
      </S.Typography>
      <S.Typography sx={{ marginBottom: '45px' }} variant="subtitle2">
        하루 정리를 지금 시작하세요.
      </S.Typography>
      <GoogleLoginButton />
    </S.Wrapper>
  );
};
