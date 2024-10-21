import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders welcome message', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome to book heaven/i)).toBeInTheDocument();
    expect(screen.getByText(/your gateway to knowledge and adventure!/i)).toBeInTheDocument();
  });

  test('renders features section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/explore our collection/i)).toBeInTheDocument();
    expect(screen.getByText(/extensive collection/i)).toBeInTheDocument();
    expect(screen.getByText(/community events \(coming soon\)/i)).toBeInTheDocument();
    expect(screen.getByText(/study spaces/i)).toBeInTheDocument();
  });

  test('navigates to /books when Extensive Collection is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const collectionFeature = screen.getByText(/extensive collection/i);
    fireEvent.click(collectionFeature);
    
    expect(mockNavigate).toHaveBeenCalledWith('/books');
  });

  test('navigates to /signup when Join Now button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const joinButton = screen.getByRole('button', { name: /join now/i });
    fireEvent.click(joinButton);

    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });
});