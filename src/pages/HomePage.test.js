import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';
import { screen } from '@testing-library/react';

test('renders without crashing', () => {
  render(<HomePage />);
});

test('renders loading message', () => {
    render(<HomePage />);
    const loadingElement = screen.getByText(/Cargando podcasts.../i);
    expect(loadingElement).toBeInTheDocument();
  });
