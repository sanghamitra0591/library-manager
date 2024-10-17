import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    requests: [],
    loading: false,
    error: null,
    userRequests: {}
};

const BaseURL = process.env.REACT_APP_BASE_URL;

export const fetchRequestsThunk = createAsyncThunk(
    'requests/fetchRequests',
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/requests/all-requests`, {
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
            return data.reverse();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const handleRequestThunk = createAsyncThunk(
    'requests/handleRequest',
    async ({ requestId, status }, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/requests/handle`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId, status }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message);
            }
            const data = await response.json();
            return data; // Return the updated request
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const returnRequestThunk = createAsyncThunk(
    'requests/returnRequest',
    async ({ requestId, status }, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const response = await fetch(`${BaseURL}/api/requests/return`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId, status }),
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

export const fetchUserRequestsThunk = createAsyncThunk(
    'requests/fetchUserRequests',
    async (status, { rejectWithValue }) => {
        try {
            const token = Cookies.get('authToken');
            const endUrl= status? `/api/requests/my-requests?status=${status}` : `/api/requests/my-requests`
            const response = await fetch(`${BaseURL}${endUrl}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
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

const requestsSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequestsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRequestsThunk.fulfilled, (state, action) => {
                state.requests = action.payload;
                state.loading = false;
            })
            .addCase(fetchRequestsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(handleRequestThunk.fulfilled, (state, action) => {
                const updatedRequest = action.payload;
                const index = state.requests.findIndex(req => req._id === updatedRequest._id);
                if (index !== -1) {
                    state.requests[index] = updatedRequest;
                }
            })
            .addCase(returnRequestThunk.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(returnRequestThunk.fulfilled, (state, action) => {
                const updatedRequest = action.payload;
                const index = state.requests.findIndex(req => req._id === updatedRequest._id);
                if (index !== -1) {
                    state.requests[index] = updatedRequest;
                }
            })
            .addCase(handleRequestThunk.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchUserRequestsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserRequestsThunk.fulfilled, (state, action) => {
                state.userRequests = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserRequestsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default requestsSlice.reducer;