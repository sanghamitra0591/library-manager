import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


const initialState = {
    books: [],
    loading: false,
    error: null,
};

const BaseURL = process.env.REACT_APP_BASE_URL;

export const fetchBooksThunk = createAsyncThunk(
    'books/fetchBooks',
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/books`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchBooksThunk = createAsyncThunk(
    'books/searchBooks',
    async (query, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/books/search/${query}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const requestBookThunk = createAsyncThunk(
    'books/requestBook',
    async (bookId, { rejectWithValue }) => {
        const token = Cookies.get('authToken'); // Get token from cookies
        try {
            const response = await fetch(`${BaseURL}/api/requests`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
            const data = await response.json();
            return data; // Return the created request data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        sortBooks(state, action) {
            state.books.sort((a, b) => {
                if (action.payload === 'title') {
                    return a.title.localeCompare(b.title);
                }
                return a.publishYear - b.publishYear; // Sorting by publish year
            });
        },
        filterBooks(state, action) {
            // Implement filtering logic if needed
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooksThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooksThunk.fulfilled, (state, action) => {
                state.books = action.payload;
                state.loading = false;
            })
            .addCase(fetchBooksThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchBooksThunk.fulfilled, (state, action) => {
                state.books = action.payload;
            })
            .addCase(searchBooksThunk.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(requestBookThunk.fulfilled, (state, action) => {
                console.log('Book request successful:', action.payload);
            })
            .addCase(requestBookThunk.rejected, (state, action) => {
                console.error('Book request failed:', action.payload);
            });
    },
});

export const { sortBooks, filterBooks } = booksSlice.actions;
export default booksSlice.reducer;
