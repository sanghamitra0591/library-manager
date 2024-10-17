// AdminSlicer.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    admins: [],
    loading: false,
    error: null,
};

const BaseURL = process.env.REACT_APP_BASE_URL;

export const fetchAdminsThunk = createAsyncThunk(
    'admins/fetchAdmins',
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/admin/admins`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
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

const adminSlice = createSlice({
    name: "admins",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminsThunk.fulfilled, (state, action) => {
                state.admins = action.payload;
                state.loading = false;
            })
            .addCase(fetchAdminsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
