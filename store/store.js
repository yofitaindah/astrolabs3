import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatAiSlice";
import dalleReducer from "./chatImageGeneratorSlice";
import codeGeneratorReducer from "./chatCodeGeneratorSlice";
import chatImageEditorGeneratorReducer from "./chatImageEditorGeneratorSlice";


export const store = configureStore({
  reducer: {
    chat: chatReducer,
    dalle: dalleReducer,
    code: codeGeneratorReducer,
    editImage: chatImageEditorGeneratorReducer
  },
});
