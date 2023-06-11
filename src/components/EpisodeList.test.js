import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodeList from '../components/EpisodeList';

const episodes = [
  {
    trackId: 1,
    trackName: 'Episode 1',
    releaseDate: '2023-06-01',
    trackTimeMillis: 1800000, // 30 minutes
  },
  {
    trackId: 2,
    trackName: 'Episode 2',
    releaseDate: '2023-06-02',
    trackTimeMillis: 2400000, // 40 minutes
  },
];

test('renders episode list correctly', () => {
  render(<EpisodeList episodes={episodes} />);
  const episode1Element = screen.getByText('Episode 1');
  const episode2Element = screen.getByText('Episode 2');
  expect(episode1Element).toBeInTheDocument();
  expect(episode2Element).toBeInTheDocument();
});

test('formats duration correctly', () => {
  render(<EpisodeList episodes={episodes} />);
  const duration1Element = screen.getByText('30:00');
  const duration2Element = screen.getByText('40:00');
  expect(duration1Element).toBeInTheDocument();
  expect(duration2Element).toBeInTheDocument();
});

test('formats date correctly', () => {
  render(<EpisodeList episodes={episodes} />);
  const date1Element = screen.getByText('1/6/2023');
  const date2Element = screen.getByText('2/6/2023');
  expect(date1Element).toBeInTheDocument();
  expect(date2Element).toBeInTheDocument();
});
