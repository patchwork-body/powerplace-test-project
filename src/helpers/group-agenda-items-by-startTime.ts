import dayjs from 'dayjs';
import { AgendaItem } from '../ui/agenda-list/AgendaList';

export type AgendaApiResponseData = Record<number, AgendaItem[]>;
export type AgendaMap = Record<number, Record<string, AgendaItem[]>>;

export const groupAgendaItemsByStartTime = (data: AgendaApiResponseData): AgendaMap =>
  Object.entries(data).reduce<AgendaMap>(
    (map, [key, value]) => ({
      ...map,

      [key]: value.reduce<AgendaMap[number]>(
        (map, item) => ({
          ...map,

          [dayjs(item.startTime).format('MM.DD.YYYY')]: (map[dayjs(item.startTime).format('MM.DD.YYYY')] ?? []).concat(
            item,
          ),
        }),

        {},
      ),
    }),

    {},
  );
