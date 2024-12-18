import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateImage = createAsyncThunk(
  "generateImage/fetchOpenAi",
  async (userMessage, { rejectWithValue }) => {
    try {
      const result = await axios.post("/api/image-generator", { userMessage, size: '1024x1024' });
      if(result.status === 200) {
        const data = result.data;
        return data.data[0]?.url || "No response generated.";
      }
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
