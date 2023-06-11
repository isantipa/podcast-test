import { render, screen, fireEvent } from '@testing-library/react';
import SearchButton from './SearchButton';

test('Check if SearchButton renders and handles change events correc', () => {
  const handleSearch = jest.fn();
  
  render(<SearchButton onSearch={handleSearch} />);
  
  const inputElement = screen.getByPlaceholderText(/Filter podcast.../i);
  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: 'prueba' } });
  expect(handleSearch).toHaveBeenCalledTimes(1);
});