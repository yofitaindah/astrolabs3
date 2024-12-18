import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatAiSlice";
import dalleReducer from "./chatImageGeneratorSlice";
import codeGeneratorSlice from "./chatCodeGeneratorSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    dalle: dalleReducer,
    code: codeGeneratorSlice
  },
});
