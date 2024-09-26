import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOff from '@mui/icons-material/HighlightOffRounded';

import { PLATFORM_TOKEN_STATUS, PlatformTokenStatusUnion } from '~/shared/constants/platform';

const defaultSxProps = {};

function withStyled<P extends { sx?: SxProps<Theme> }>(Component: React.ComponentType<P>) {
  const getSx = (sx?: SxProps<Theme>): SxProps<Theme> => {
    if (Component === CircularProgress) {
      return { ...defaultSxProps, ...sx };
    }

    return {
      ...defaultSxProps,
      ...sx,
      marginLeft: '-2px',
      path: {
        strokeWidth: 1,
      },
    };
  };

  return (props: Omit<P, 'sx'> & { sx?: SxProps<Theme> }) => {
    const sx = getSx(props.sx);
    return <Component {...(props as P)} sx={sx} />;
  };
}

const LoadingIcon = withStyled(CircularProgress);
const SuccessIcon = withStyled(CheckCircleOutlined);
const FailureIcon = withStyled(HighlightOff);

export const PlatformTokenStatusIcon = ({
  checking,
  status = PLATFORM_TOKEN_STATUS.NONE,
}: {
  checking: boolean;
  status: PlatformTokenStatusUnion;
}) => {
  const Icon = (() => {
    if (checking) return <LoadingIcon size="100%" sx={{ color: '#9B9B9B' }} />;

    switch (status) {
      case PLATFORM_TOKEN_STATUS.AUTHENTICATED:
        return <SuccessIcon fontSize="medium" sx={{ color: '#18B127' }} />;
      case PLATFORM_TOKEN_STATUS.UNAUTHENTICATED:
        return <FailureIcon fontSize="medium" sx={{ color: '#FA3F3F' }} />;
      default:
        return <></>;
    }
  })();

  return (
    <Box display="flex" sx={{ width: '1.25em' }}>
      {Icon}
    </Box>
  );
};
