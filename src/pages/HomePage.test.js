import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import HomePage from './HomePage';

// Simular datos de podcasts
const mockPodcastData = [
  { title: { label: 'Podcast 1' }, id: { attributes: { 'im:id': '1' } }, 'im:image': [{}, {}, { label: 'https://test.image' }], 'im:artist': { label: 'Artist 1' } },
  { title: { label: 'Podcast 2' }, id: { attributes: { 'im:id': '2' } }, 'im:image': [{}, {}, { label: 'https://test.image' }], 'im:artist': { label: 'Artist 2' } }
];

// Simular fetch y localStorage
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ feed: { entry: mockPodcastData } }),
  })
);

let mockLocalStorage;
beforeEach(() => {
  mockLocalStorage = (function() {
    let store = {};
    return {
      getItem: function(key) {
        return store[key];
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      }
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
});

describe('HomePage', () => {
  it('renders without crashing', async () => {
    render(<HomePage />);
    expect(await screen.findByText('Cargando podcasts...')).toBeInTheDocument();
  });

  it('filters podcasts based on search term', async () => {
    render(<HomePage />);

    // Espera a que los podcasts se carguen
    await waitForElementToBeRemoved(() => screen.getByText('Cargando podcasts...'));

    // Comprueba que ambos podcasts se muestran inicialmente
    expect(screen.getByText('Podcast 1')).toBeInTheDocument();
    expect(screen.getByText('Podcast 2')).toBeInTheDocument();

    // Simula la escritura en el cuadro de búsqueda
    fireEvent.change(screen.getByPlaceholderText('Buscar podcast...'), { target: { value: 'Podcast 1' } });

    // Comprueba que solo el podcast 1 se muestra después de la búsqueda
    expect(screen.getByText('Podcast 1')).toBeInTheDocument();
    expect(screen.queryByText('Podcast 2')).toBeNull();
  });

  it('stores fetched data in localStorage', async () => {
    render(<HomePage />);

    // Espera a que los podcasts se carguen
    await waitForElementToBeRemoved(() => screen.getByText('Cargando podcasts...'));

    // Comprueba que se han almacenado los datos en localStorage
    expect(JSON.parse(localStorage.getItem('podcastsData'))).toEqual(mockPodcastData);
    expect(new Date(localStorage.getItem('lastFetch'))).toBeDefined();
  });
});