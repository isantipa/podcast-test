import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchButton from './SearchButton';

test('renders without crashing', () => {
  render(<SearchButton onSearch={() => {}} />);
});

test('calls onSearch prop when input changes', () => {
  const handleSearch = jest.fn();
  render(<SearchButton onSearch={handleSearch} />);
  
  fireEvent.change(screen.getByPlaceholderText(/Buscar podcast.../i), { target: { value: 'test podcast' } });
  
  expect(handleSearch).toHaveBeenCalledWith('test podcast');
});

test('does not call onSearch prop when Enter is pressed with empty input', () => {
  const handleSearch = jest.fn();
  render(<SearchButton onSearch={handleSearch} />);
  
  userEvent.type(screen.getByPlaceholderText(/Buscar podcast.../i), '{enter}');

  expect(handleSearch).not.toHaveBeenCalled();
});