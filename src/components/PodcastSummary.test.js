import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PodcastSummary from './PodcastSummary';

describe('PodcastSummary', () => {
    const mockPodcast = {
        title: { label: 'Test Title' },
        'im:image': [{}, {}, { label: 'http://testimage.com' }],
        'im:artist': { label: 'Test Artist' },
        summary: { label: 'Test Summary' },
        id: { attributes: { 'im:id': '1' } },
    };

    it('renders without crashing', () => {
        render(
          <BrowserRouter>
            <PodcastSummary podcast={mockPodcast} />
          </BrowserRouter>
        );
    });

    it('renders the correct title, artist, and summary', () => {
        render(
          <BrowserRouter>
            <PodcastSummary podcast={mockPodcast} />
          </BrowserRouter>
        );
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('by Test Artist')).toBeInTheDocument();
        expect(screen.getByText('Test Summary')).toBeInTheDocument();
    });
});