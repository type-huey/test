import React from 'react';
import { Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const AISummaryButton = ({
  styles,
  onSummary,
}: {
  tasks: any;
  styles: React.CSSProperties;
  onSummary: any;
}) => {
  return (
    <Button onClick={() => onSummary()} variant="contained" sx={styles} startIcon={<AutoAwesomeIcon />}>
      AI 요약
    </Button>
  );
};
