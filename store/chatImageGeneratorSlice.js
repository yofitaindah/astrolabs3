import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OpenAI from "openai";

export const generateImage = createAsyncThunk(
  "chatAi/fetchOpenAi",
  async (userMessage, { rejectWithValue }) => {
    try {
      const openAi = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      const completion = await openAi.images.generate({
        model: "dall-e-3",
        prompt: userMessage,
        size: "1024x1024",
      });
      console.log(completion.data);
      const data = completion.data[0]?.url;
      return data || "No response generated.";
    } catch (error) {
      return rejectWithValue("Failed to fetch response.");
    }
  }
);

const dalleSlice = createSlice({
  name: "dalle",
  initialState: {
    loading: false,
    loadingMessage: null,
    imageUrl: null,
    error: null,
  },

  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.loadingMessage = null;
      state.imageUrl = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(generateImage.pending, (state) => {
        state.loading = true;
        state.loadingMessage = "Generating your image, please wait...";
        state.error = null;
      })
      // Fulfilled state
      .addCase(generateImage.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMessage = null;
        state.imageUrl = action.payload;
      })
      // Rejected state
      .addCase(generateImage.rejected, (state, action) => {
        state.loading = false;
        state.loadingMessage = null;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export const { clearState } = dalleSlice.actions;
export default dalleSlice.reducer;
