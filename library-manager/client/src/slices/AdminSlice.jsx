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

export const addAdminThunk = createAsyncThunk(
    'admins/addAdmin',
    async ({ username, email, password, category }, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/admin/add-admin`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, category }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateAdminThunk = createAsyncThunk(
    'admins/updateAdmin',
    async ({ adminId, data }, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/admin/admins/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteAdminThunk = createAsyncThunk(
    'admins/deleteAdmin',
    async (adminId, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/admin/admins/${adminId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }

            return adminId;
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
            })
            .addCase(addAdminThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAdminThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.admins.push(action.payload);
            })
            .addCase(addAdminThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAdminThunk.fulfilled, (state, action) => {
                const index = state.admins.findIndex(admin => admin._id === action.payload._id);
                if (index !== -1) {
                    state.admins[index] = action.payload;
                }
            })
            .addCase(deleteAdminThunk.fulfilled, (state, action) => {
                state.admins = state.admins.filter(admin => admin._id !== action.payload);
            })
    },
});

export default adminSlice.reducer;
