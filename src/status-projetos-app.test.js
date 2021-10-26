import { render, screen } from '@testing-library/react';
import StatusProjetosApp from './status-projetos-app';

test('renders learn react link', () => {
  render(<StatusProjetosApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
