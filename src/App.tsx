import { Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AgendaCard } from './ui/agenda-card/AgendaCard';
import { AgendaContent } from './ui/agenda-content/AgendaContent';
import { AgendaItem } from './ui/agenda-list/AgendaList';
import { usePowerplaceApi } from './hooks/use-powerplace-api';

type Area = {
  id: number;
  title: string;
};

type AgendaMap = Record<number, Record<string, AgendaItem[]>>;

function App() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [agenda, setAgenda] = useState<AgendaMap>({});

  usePowerplaceApi({ resourceName: 'areas', setStateActionDispatcher: setAreas });
  usePowerplaceApi({
    resourceName: 'agenda',

    middleware: (data: Record<number, AgendaItem[]>) =>
      Object.entries(data).reduce<AgendaMap>(
        (map, [key, value]) => ({
          ...map,

          [key]: value.reduce<AgendaMap[number]>(
            (map, item) => ({
              ...map,

              [dayjs(item.startTime).format('MM.DD.YYYY')]: (
                map[dayjs(item.startTime).format('MM.DD.YYYY')] ?? []
              ).concat(item),
            }),

            {},
          ),
        }),

        {},
      ),

    setStateActionDispatcher: setAgenda,
  });

  return (
    <Container>
      <Typography variant="h1" fontSize="24px" fontWeight="500" margin="2rem" textAlign="center">
        Расписание
      </Typography>

      <Grid
        container
        height="100%"
        padding="0 1rem 0 1rem"
        justifyContent="center"
        alignContent="center"
        spacing={4}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {areas.length > 0 &&
          areas.map(({ id, title }) => (
            <Grid item xs={8} sm={6} md={4} key={id}>
              <AgendaCard title={title}>
                {agenda[id] &&
                  Object.entries(agenda[id]).map(([date, items]) => (
                    <AgendaContent key={`${id}#${date}`} title={date} items={items} />
                  ))}
              </AgendaCard>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default App;
