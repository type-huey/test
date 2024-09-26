import { createRoot } from 'react-dom/client';

import './app/styles/index.css';
import { GlobalSuspenseBoundary } from '~/app/provider';
import { ProviderList } from '~/app/provider/provider-list';
import { RootPage } from '~/pages/root.page';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ProviderList>
    <GlobalSuspenseBoundary>
      <RootPage />
    </GlobalSuspenseBoundary>
  </ProviderList>
  // </StrictMode>
);
