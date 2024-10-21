import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

describe('App Component', () => {
  test('renders Header, AllRoutes and ToastContainer', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /bookheaven/i })).toBeInTheDocument(); // Adjust based on actual heading

    // You can also check for other specific headings if needed
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument(); // For the h1 heading

    // Check if ToastContainer is rendered
    const toastContainer = document.querySelector('.Toastify');
    expect(toastContainer).toBeInTheDocument();
  });
});
