import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    currentUser: null,
    userLoggedIn: false,
    loading: true,
    error: null,
};

const BaseURL = process.env.REACT_APP_BASE_URL;

export const signupUserThunk = createAsyncThunk(
    'auth/signupUser',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BaseURL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
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

export const loginUserThunk = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BaseURL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload;
            state.userLoggedIn = !!action.payload;
            state.loading = false;
        },
        resetUser(state) {
            state.currentUser = null;
            state.userLoggedIn = false;
            state.loading = false;
            state.error = null;
            Cookies.remove('authToken');
            localStorage.setItem("penalty", JSON.stringify(0));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUserThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.userLoggedIn = true;
                state.loading = false;
            })
            .addCase(signupUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload.user;
                state.userLoggedIn = true;
                state.loading = false;
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;