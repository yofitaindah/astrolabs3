import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatAiSlice";
import dalleReducer from "./chatImageGeneratorSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    dalle: dalleReducer,
  },
});
