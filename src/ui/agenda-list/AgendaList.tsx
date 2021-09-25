import { List, ListItem, ListItemText } from '@mui/material';
import dayjs from 'dayjs';
import { memo } from 'react';
import { Speaker, Speakers } from './speakers/Speakers';

export type AgendaItem = {
  id: number;
  areaId: number;
  name: string;
  startTime: string;
  endTime: string;
  speakers: Speaker[];
};

type AgendaListProps = {
  items: AgendaItem[];
};

export const AgendaList = memo(function AgendaList({ items }: AgendaListProps) {
  return (
    <List>
      {items.map(({ id, name, speakers, startTime, endTime }) => (
        <ListItem key={id}>
          <ListItemText>
            <span style={{ color: '#848484' }}>
              {dayjs(startTime).format('HH-mm')} {dayjs(endTime).format('HH-mm')}
            </span>{' '}
            <span>{name}</span> <Speakers speakers={speakers} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
});
