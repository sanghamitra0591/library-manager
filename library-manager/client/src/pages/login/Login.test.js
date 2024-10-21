import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Cookies from 'js-cookie'; 
import { toast } from 'react-toastify';
import Login from './Login';

jest.mock('js-cookie');
jest.mock('react-toastify');

const mockStore = configureStore();
let store;

beforeEach(() => {
    store = mockStore({});
});

test('shows error when login fails', async () => {
    store.dispatch = jest.fn(() => {
        return Promise.resolve({ type: 'loginUser/rejected', payload: 'Invalid response from server' });
    });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
        expect(screen.getByText(/Invalid response from server/i)).toBeInTheDocument();
    });
});

test('dispatches loginUserThunk on valid form submission', async () => {
    store.dispatch = jest.fn((action) => {
        return Promise.resolve({
            type: 'loginUser/fulfilled',
            payload: { token: 'fakeToken', user: { username: 'testuser' } },
        });
    });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
        expect(Cookies.set).toHaveBeenCalledWith('authToken', 'fakeToken', expect.any(Object));
        expect(toast.success).toHaveBeenCalledWith("Successfully Logged In");
    });
});
