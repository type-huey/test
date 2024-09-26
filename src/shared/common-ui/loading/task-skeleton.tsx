import { Box, Skeleton, List, ListItem } from '@mui/material';

interface ITaskSkeletonLoadingProps {
  count?: number;
}

export const TaskSkeletonLoading = ({ count = 5 }: ITaskSkeletonLoadingProps) => {
  return (
    <List>
      {[...Array(count)].map((_, index) => (
        <ListItem key={index}>
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="80%" height={16} />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
