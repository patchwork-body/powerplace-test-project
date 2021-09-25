import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { AgendaItem, AgendaList } from '../agenda-list/AgendaList';

type AgendaContentProps = {
  title: string;
  items: AgendaItem[];
};

export const AgendaContent = memo(function AgendaContent({ title, items }: AgendaContentProps) {
  return (
    <Box>
      <Typography
        variant="h3"
        fontSize="20px"
        padding=".4rem .7rem"
        marginTop=".6rem"
        fontWeight="500"
        bgcolor="#ececec"
      >
        {title}
      </Typography>

      <AgendaList items={items} />
    </Box>
  );
});
