import { PropsWithChildren } from 'react';

import { ErrorBoundary, Suspense } from '@suspensive/react';

export const GlobalSuspenseBoundary = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<div></div>}>
      <ErrorBoundary fallback={<div></div>}>{children}</ErrorBoundary>
    </Suspense>
  );
};
