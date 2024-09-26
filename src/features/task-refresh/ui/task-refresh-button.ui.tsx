import { Button } from '@mui/material';
import { Icon } from '~/shared/Icons';

export const TaskRefreshButton = () => {
  return (
    <Button size="small" sx={{ borderRadius: 50, width: '10px' }}>
      <Icon.Refresh width="16" height="16" viewBox="0 0 10 10" />
    </Button>
  );
};
