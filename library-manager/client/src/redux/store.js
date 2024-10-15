import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"
import bookReducer from "../slices/BookSlice"
import requestReducer from "../slices/RequestSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer,
        requests: requestReducer,
    }
})