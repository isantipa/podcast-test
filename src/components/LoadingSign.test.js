import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSign from './LoadingSign';

describe('LoadingSign', () => {
    it('renders without crashing', () => {
        render(<LoadingSign />);
    });

    it('renders loader-container div', () => {
        render(<LoadingSign />);
        const loaderContainer = screen.getByTestId('loader-container');
        expect(loaderContainer).toBeInTheDocument();
    });

    it('renders loader div', () => {
        render(<LoadingSign />);
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });
});
