import React from 'react';
import { render, screen } from '@testing-library/react';
import NumberOfPodcasts from './NumberOfPodcasts';

describe('NumberOfPodcasts', () => {
    it('renders without crashing', () => {
        render(<NumberOfPodcasts podcastsCount={1} />);
    });

    it('renders the correct number of podcasts', () => {
        render(<NumberOfPodcasts podcastsCount={1} />);
        const countContainer = screen.getByTestId('numberofpodcasts-container');
        expect(countContainer.textContent).toBe("1");
    });
});