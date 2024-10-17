import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"
import bookReducer from "../slices/BookSlice"
import requestReducer from "../slices/RequestSlice"
import adminReducer from "../slices/AdminSlice"
import categoriesReducer from '../slices/CategorySlice'; //

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer,
        requests: requestReducer,
        admins: adminReducer,
        categories: categoriesReducer
    }
})