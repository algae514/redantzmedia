import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site header and home route', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /redantz/i })).toBeInTheDocument();
  expect(screen.getByText(/capturing moments/i)).toBeInTheDocument();
});
