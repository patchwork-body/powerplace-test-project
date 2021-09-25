import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { AgendaItem, AgendaList } from './AgendaList';

describe('AgendaList', () => {
  const testItems1: AgendaItem[] = [
    {
      id: 1,
      name: 'awesome name 1',
      startTime: dayjs().subtract(5, 'days').toISOString(),
      endTime: dayjs().subtract(2, 'dayjs').toISOString(),
      areaId: 1,
      speakers: [],
    },
  ];

  const testItems2: AgendaItem[] = [
    ...testItems1,

    {
      id: 2,
      name: 'awesome name 2',
      startTime: dayjs().subtract(5, 'days').toISOString(),
      endTime: dayjs().subtract(2, 'dayjs').toISOString(),
      areaId: 2,
      speakers: [],
    },
  ];

  test('list items content', () => {
    const container = render(<AgendaList items={testItems1} />);
    const items1 = screen.getAllByRole('listitem');

    expect(items1).toHaveLength(testItems1.length);
    items1.forEach((item, index) => {
      expect(item).toHaveTextContent(testItems1[index].name);
      expect(item).toHaveTextContent(/\d{2}-\d{2} \d{2}-\d{2} \w+/i);
    });

    container.rerender(<AgendaList items={testItems2} />);
    const items2 = screen.getAllByRole('listitem');

    expect(items2).toHaveLength(testItems2.length);
    items2.forEach((item, index) => {
      expect(item).toHaveTextContent(testItems2[index].name);
      expect(item).toHaveTextContent(/\d{2}-\d{2} \d{2}-\d{2} \w+/i);
    });
  });
});
