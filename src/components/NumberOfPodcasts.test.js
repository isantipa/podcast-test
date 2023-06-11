import { render, screen } from '@testing-library/react';
import NumberOfPodcasts from './NumberOfPodcasts';

test('Check if NumberOfPodcast renders and shows the correct number of podcast', () => {
  const numberOfPodcasts = 5;
  
  render(<NumberOfPodcasts podcastsCount={numberOfPodcasts} />);
  
  const countElement = screen.getByText(numberOfPodcasts.toString());
  expect(countElement).toBeInTheDocument();
});