import { Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { AgendaCard } from './ui/agenda-card/AgendaCard';
import { AgendaContent } from './ui/agenda-content/AgendaContent';
import { usePowerplaceApi } from './hooks/use-powerplace-api';
import {
  groupAgendaItemsByStartTime,
  AgendaMap,
  AgendaApiResponseData,
} from './helpers/group-agenda-items-by-startTime';

type Area = {
  id: number;
  title: string;
};

function App() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [agenda, setAgenda] = useState<AgendaMap>({});

  usePowerplaceApi({ resourceName: 'areas', setStateActionDispatcher: setAreas });
  usePowerplaceApi({
    resourceName: 'agenda',
    middleware: (data: AgendaApiResponseData) => groupAgendaItemsByStartTime(data),
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
