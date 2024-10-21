import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Header from './Header';

const mockStore = (state) => {
  return createStore(() => state);
};

describe('Header Component', () => {
  test('renders header with links when user is logged out', () => {
    const store = mockStore({
      auth: { userLoggedIn: false, currentUser: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/bookheaven/i)).toBeInTheDocument();
    expect(screen.getByText(/books/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByText(/profile/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/requests/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/admins/i)).not.toBeInTheDocument();
  });

  test('renders header with profile link when user is logged in', () => {
    const store = mockStore({
      auth: { userLoggedIn: true, currentUser: { role: "user" } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
  });

  test('renders requests link for admin', () => {
    const store = mockStore({
      auth: { userLoggedIn: true, currentUser: { role: "admin" } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/requests/i)).toBeInTheDocument();
    expect(screen.queryByText(/admins/i)).not.toBeInTheDocument();
  });

  test('renders admins link for super admin', () => {
    const store = mockStore({
      auth: { userLoggedIn: true, currentUser: { role: "super_admin" } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/admins/i)).toBeInTheDocument();
  });
});
