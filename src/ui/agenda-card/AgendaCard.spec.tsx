import { render, screen } from '@testing-library/react';
import { AgendaCard } from './AgendaCard';

describe('AgendaCard', () => {
  const title = 'Awesome Title';
  const childNodeContent = 'child node';
  const childNodeTestId = 'child-node';
  const childNode = <div data-testid={childNodeTestId}>{childNodeContent}</div>;

  test('Check title rendering', () => {
    render(<AgendaCard title={title}>{childNode}</AgendaCard>);

    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
  });

  test('Check children rendering', () => {
    render(<AgendaCard title={title}>{childNode}</AgendaCard>);

    const foundChildNode = screen.getByTestId(childNodeTestId);
    expect(foundChildNode).toBeInTheDocument();
    expect(foundChildNode).toHaveTextContent(childNodeContent);
  });
});
