import { useGoogleLogin } from '../hooks/use-google-login';
import { Button } from '@mui/material';
import { Icon } from '~/shared/Icons';

export const GoogleLoginButton = () => {
  const { login } = useGoogleLogin();

  return (
    <Button
      sx={{
        borderRadius: 15,
        backgroundColor: '#FA3F3F',
        color: '#FFF',
        width: '177px',
        '&:hover': {
          backgroundColor: '#FA3F3F',
          color: '#FFF',
        },
      }}
      onClick={() => login()}
    >
      <Icon.GoogleLogo width="16" height="16" viewBox="0 0 10 10" />
      <span>구글로 로그인 하기</span>
    </Button>
  );
};
