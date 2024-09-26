import * as React from 'react';

import * as S from './platform-data-sync-toggle-button.styled';
import type { PlatformDataSyncToggleButtonProps } from './platform-data-sync-toggle-button.types';

export const PlatformDataSyncToggleButton = React.forwardRef(function PlatformDataSyncToggleButton(
  props: PlatformDataSyncToggleButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { children, ...restProps } = props;

  return (
    <S.ToggleButton ref={ref} size="small" value="check" {...restProps}>
      {children}
    </S.ToggleButton>
  );
});
