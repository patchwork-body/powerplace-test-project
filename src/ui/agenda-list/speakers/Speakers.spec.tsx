import { render, screen } from '@testing-library/react';
import { Speaker, Speakers } from './Speakers';

describe('Speakers', () => {
  const emptySpeakers: Speaker[] = [];
  const testSpeakers1: Speaker[] = [{ id: 0, name: 'Awesome Name 1' }];
  const testSpeakers2: Speaker[] = [...testSpeakers1, { id: 1, name: 'Awesome Name 2' }];

  test('empty speakers list', () => {
    render(<Speakers speakers={emptySpeakers} />);
    const foundSpeakers = screen.queryByTestId('agenda-point-speakers');
    expect(foundSpeakers).toBeNull();
  });

  test('speakers list with content', () => {
    const container = render(<Speakers speakers={testSpeakers1} />);

    const foundSpeakers1 = screen.getByTestId('agenda-point-speakers');
    expect(foundSpeakers1).toHaveTextContent(testSpeakers1.map(({ name }) => name).join(' '));

    container.rerender(<Speakers speakers={testSpeakers2} />);

    const foundSpeakers2 = screen.getByTestId('agenda-point-speakers');
    expect(foundSpeakers2).toHaveTextContent(testSpeakers2.map(({ name }) => name).join(' '));
  });
});
