import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodeCount from '../components/EpisodeCount';

test('renders episode count correctly', () => {
  const count = 10;
  render(<EpisodeCount count={count} />);
  const episodeCountElement = screen.getByText(`Episodes: ${count}`);
  expect(episodeCountElement).toBeInTheDocument();
});

test('renders zero episode count correctly', () => {
  const count = 0;
  render(<EpisodeCount count={count} />);
  const episodeCountElement = screen.getByText(`Episodes: ${count}`);
  expect(episodeCountElement).toBeInTheDocument();
});
