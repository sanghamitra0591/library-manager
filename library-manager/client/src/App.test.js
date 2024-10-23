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

    expect(screen.getByRole('heading', { name: /bookheaven/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    const toastContainer = document.querySelector('.Toastify');
    expect(toastContainer).toBeInTheDocument();
  });
});
