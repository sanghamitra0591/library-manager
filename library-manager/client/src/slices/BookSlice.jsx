import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    books: [],
    originalBooks: [],
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
        const token = Cookies.get('authToken');
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
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createBookThunk = createAsyncThunk(
    'books/createBook',
    async (bookData, { rejectWithValue }) => {
        const token = Cookies.get('authToken');
        try {
            const response = await fetch(`${BaseURL}/api/books`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
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

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        sortBooks(state, action) {
            state.books.sort((a, b) => {
                if (action.payload === 'title') {
                    return a.title.localeCompare(b.title);
                }
                return a.publishYear - b.publishYear;
            });
        },
        filterBooks(state, action) {
            const { searchTerm, selectedCategory } = action.payload;

            state.books = state.originalBooks.filter(book => {
                const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
                const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesCategory && matchesSearchTerm;
            });
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
                state.originalBooks = action.payload;
                state.loading = false;
            })
            .addCase(fetchBooksThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchBooksThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchBooksThunk.fulfilled, (state, action) => {
                state.books = action.payload;
                state.loading = false;
            })
            .addCase(searchBooksThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(requestBookThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(requestBookThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(requestBookThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createBookThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBookThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createBookThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { sortBooks, filterBooks } = booksSlice.actions;
export default booksSlice.reducer;
