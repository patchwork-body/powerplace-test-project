import { Card, Box, Typography } from '@mui/material';
import { memo, ReactNode } from 'react';

type AgendaCardProps = {
  title: string;
  children: ReactNode;
};

export const AgendaCard = memo(function AgendaCard({ title, children }: AgendaCardProps) {
  return (
    <Card>
      <Box padding=".5rem 1rem">
        <Typography variant="h2" fontSize="20px" fontWeight="500">
          {title}
        </Typography>

        {children}
      </Box>
    </Card>
  );
});
