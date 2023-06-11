import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('Check if the header renders correctly', () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  
  const headerElement = screen.getByRole('link', { name: /podcaster/i });
  expect(headerElement).toBeInTheDocument();
  expect(headerElement.getAttribute('href')).toBe('/');
});