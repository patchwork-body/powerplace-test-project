import { render, screen } from '@testing-library/react';
import { AgendaContent } from './AgendaContent';

describe('AgendaContent', () => {
  const agendaTitle = 'awesome agenda';
  test('check title', () => {
    render(<AgendaContent title={agendaTitle} items={[]} />);
    const agendaElement = screen.getByTestId('agenda-content');
    expect(agendaElement).toBeInTheDocument();

    const agendaHeading = screen.getByRole('heading');
    expect(agendaHeading).toBeInTheDocument();
    expect(agendaHeading).toHaveTextContent(agendaTitle);
  });
});
