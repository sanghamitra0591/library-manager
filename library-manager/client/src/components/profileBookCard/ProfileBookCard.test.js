import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ProfileBookCard from './ProfileBookCard';

describe('ProfileBookCard Component', () => {
    const mockRequest = {
        _id: '1',
        status: 'accepted',
        bookId: {
            title: 'Test Book',
            publishYear: 2021,
            category: 'Fiction',
        },
        requestDate: new Date().toISOString(),
        penalty: 0,
        requestAccepted: new Date().toISOString(),
        expectedReturnDate: new Date(Date.now() + 86400000).toISOString(),
        returnDate: null,
    };

    const mockOnReturn = jest.fn().mockResolvedValue();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders book details correctly', () => {
        render(<ProfileBookCard props={mockRequest} onReturn={mockOnReturn} />);
        expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
        expect(screen.getByText(/Published Year: 2021/i)).toBeInTheDocument();
        expect(screen.getByText(/Category: Fiction/i)).toBeInTheDocument();
        expect(screen.getByText(/Penalty: 0/i)).toBeInTheDocument();
    });

    test('shows the return button when status is accepted', () => {
        render(<ProfileBookCard props={mockRequest} onReturn={mockOnReturn} />);
        
        const returnButton = screen.getByRole('button', { name: /return/i });
        expect(returnButton).toBeInTheDocument();
        expect(returnButton).toBeEnabled();
    });

    test('calls onReturn with correct id when return button is clicked', async () => {
        render(<ProfileBookCard props={mockRequest} onReturn={mockOnReturn} />);
        
        const returnButton = screen.getByRole('button', { name: /return/i });

        fireEvent.click(returnButton);

        await waitFor(() => {
            expect(returnButton).toBeDisabled();
            expect(returnButton).toHaveTextContent(/returning.../i);
        });

        expect(mockOnReturn).toHaveBeenCalledWith('1');
    });

    test('enables the button again after loading completes', async () => {
        render(<ProfileBookCard props={mockRequest} onReturn={mockOnReturn} />);

        const returnButton = screen.getByRole('button', { name: /return/i });

        fireEvent.click(returnButton);

        await waitFor(() => {
            expect(returnButton).toBeDisabled();
            expect(returnButton).toHaveTextContent(/returning.../i);
        });

        await act(async () => {
            await mockOnReturn();
        });

        await waitFor(() => {
            expect(returnButton).toBeEnabled();
            expect(returnButton).toHaveTextContent(/return/i);
        });
    });
});
