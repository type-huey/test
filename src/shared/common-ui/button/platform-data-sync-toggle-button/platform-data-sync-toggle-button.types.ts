import * as React from 'react';
import type { ToggleButtonProps } from '@mui/material/ToggleButton';

export interface PlatformDataSyncToggleButtonProps
  extends React.PropsWithChildren,
    Pick<ToggleButtonProps, 'selected' | 'disabled' | 'onChange'> {}
