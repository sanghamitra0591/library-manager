import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"
import bookReducer from "../slices/BookSlice"

export const store = configureStore({
    reducer: {
        books: bookReducer,
        auth: authReducer,
    }
})