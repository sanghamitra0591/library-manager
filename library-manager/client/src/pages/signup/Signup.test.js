import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './Signup';
import { toast } from 'react-toastify';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'signupUser/fulfilled':
            return { ...state, user: action.payload };
        case 'signupUser/rejected':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const mockStore = createStore(reducer);

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
    },
}));

describe('Signup Component', () => {
    beforeEach(() => {
        render(
            <Provider store={mockStore}>
                <Router>
                    <Signup />
                </Router>
            </Provider>
        );
    });

    test('renders Signup form', () => {
        expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    });

    test('shows error when required fields are empty', async () => {
        fireEvent.click(screen.getByText(/Signup/i));
        expect(await screen.findByText(/All fields are required./i)).toBeInTheDocument();
    });

    test('shows error when username is too short', async () => {
        fireEvent.change(screen.getByPlaceholderText(/Enter User Name/i), { target: { value: 'ab' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Password1!' } });

        fireEvent.click(screen.getByText(/Signup/i));

        expect(await screen.findByText(/Username must be between 3 and 30 characters./i)).toBeInTheDocument();
    });

    test('shows error for invalid email format', async () => {
        fireEvent.change(screen.getByPlaceholderText(/Enter User Name/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'invalidemail' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Password1!' } });

        fireEvent.click(screen.getByText(/Signup/i));

        expect(await screen.findByText(/Invalid email format./i)).toBeInTheDocument();
    });

    test('shows error when password is too short', async () => {
        fireEvent.change(screen.getByPlaceholderText(/Enter User Name/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'Short1' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Short1' } });

        fireEvent.click(screen.getByText(/Signup/i));

        expect(await screen.findByText(/Password must be at least 8 characters long./i)).toBeInTheDocument();
    });

    test('shows error when passwords do not match', async () => {
        fireEvent.change(screen.getByPlaceholderText(/Enter User Name/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'DifferentPassword!' } });

        fireEvent.click(screen.getByText(/Signup/i));

        expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    test('dispatches signupUserThunk on valid form submission', async () => {
        mockStore.dispatch = jest.fn(() => async (dispatch) => {
            const action = { type: 'signupUser/fulfilled', payload: {} };
            dispatch(action);
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter User Name/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Password1!' } });

        fireEvent.click(screen.getByText(/Signup/i));

        await waitFor(() => {
            expect(mockStore.dispatch).toHaveBeenCalled();
        });
    });

    test('shows toast message on successful signup', async () => {
        mockStore.dispatch = jest.fn(() => async (dispatch) => {
            const action = { type: 'signupUser/fulfilled', payload: {} };
            dispatch(action);
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter User Name/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Password1!' } });

        fireEvent.click(screen.getByText(/Signup/i));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Account created successfully!");
        });
    });
});
