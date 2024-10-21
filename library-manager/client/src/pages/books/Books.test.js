import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Books from './Books';
import * as actions from '../../slices/BookSlice';
import { toast } from 'react-toastify';

const mockStore = configureStore([]);

jest.mock('../../slices/BookSlice');
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Books Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: { currentUser: { role: 'user' } },
            books: {
                books: [{ _id: '1', title: 'Test Book', author: 'Author', publishYear: 2021, category: 'Fiction', quantity: 3 }],
                loading: false,
                error: null,
            },
            categories: {
                categories: ['Fiction', 'Non-Fiction'],
                loading: false,
            },
            requests: { userRequests: [] },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Books />
                </MemoryRouter>
            </Provider>
        );
    });

    it('renders loading categories message', () => {
        store = mockStore({
            auth: { currentUser: { role: 'user' } },
            books: { books: [], loading: false, error: null },
            categories: { categories: [], loading: true },
            requests: { userRequests: [] },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Books />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Loading categories.../i)).toBeInTheDocument();
    });

    it('renders book information', () => {
        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('Author: Author')).toBeInTheDocument();
        expect(screen.getByText('Published Year: 2021')).toBeInTheDocument();
        expect(screen.getByText('Category: Fiction')).toBeInTheDocument();
        expect(screen.getByText('Available Quantity: 3')).toBeInTheDocument();
    });

    it('handles book request', async () => {
        const requestButton = screen.getByText(/Request Book/i);
        fireEvent.click(requestButton);

        await waitFor(() => {
            expect(actions.requestBookThunk).toHaveBeenCalledWith('1');
            expect(toast.success).toHaveBeenCalledWith("Request sent");
        });
    });

    it('displays error message if there is an error', () => {
        store = mockStore({
            auth: { currentUser: { role: 'user' } },
            books: { books: [], loading: false, error: 'An error occurred' },
            categories: { categories: [], loading: false },
            requests: { userRequests: [] },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Books />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    });

    it('displays no result message if no books found', () => {
        store = mockStore({
            auth: { currentUser: { role: 'user' } },
            books: { books: [], loading: false, error: null },
            categories: { categories: [], loading: false },
            requests: { userRequests: [] },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Books />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });
});
