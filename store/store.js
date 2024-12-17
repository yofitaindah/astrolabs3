import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './chatAiSlice';

export const store = configureStore({
    reducer: {
        chat: chatReducer
    }
})