import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
    it('renders without crashing', () => {
        render(<Router><Header /></Router>);
    });

    it('renders correct header title', () => {
        render(<Router><Header /></Router>);
        const headerElement = screen.getByRole('heading', { name: /podcaster/i });
        expect(headerElement).toBeInTheDocument();
    });

    it('has a link that points to the home page', () => {
        render(<Router><Header /></Router>);
        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/');
    });
});
