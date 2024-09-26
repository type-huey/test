import { styled } from '@mui/material';
import { default as _Container } from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import { PlatformTokenForm } from '~/features/platform-token';
import { DataSyncPlatformSelector } from '~/features/data-sync-platform-selector';
import { useGoogleLogout } from '~/features/auth/google/hooks/use-google-logout';

const Container = styled(_Container)`
  display: flex;
  flex-direction: column;
  padding: 18px 18px;
  width: 100%;
  min-height: inherit;
  gap: 18px;
`;

const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TokenAuthWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DailyDataManagementWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const SettingPanel = () => {
  const { onLogout } = useGoogleLogout();

  return (
    <Container>
      <Section>
        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
          토큰 인증
        </Typography>
        <TokenAuthWrapper>
          <PlatformTokenForm />
        </TokenAuthWrapper>
      </Section>
      <Section>
        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
          일일 데이터 관리
        </Typography>
        <DailyDataManagementWrapper>
          <DataSyncPlatformSelector />
        </DailyDataManagementWrapper>
      </Section>
      <Section style={{ alignSelf: 'flex-end', marginTop: 'auto' }}>
        <Link
          onClick={() => onLogout()}
          component="button"
          sx={{ fontSize: '0.875rem', color: '#000000', textDecoration: 'underline' }}
        >
          로그아웃
        </Link>
      </Section>
    </Container>
  );
};
