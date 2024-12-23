import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateImage = createAsyncThunk(
  "generateImage/fetchOpenAi",
  async (userMessage, { rejectWithValue }) => {
    try {
      const result = await axios.post("/api/image-generator", {
        userMessage,
        size: "1024x1024",
      });
      if (result.status === 200) {
        const data = result.data;
        return data.data || "No response generated.";
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch response.");
    }
  }
);

const dalleSlice = createSlice({
  name: "dalle",

  initialState: {
    messages: [],
    loading: false,
    error: null,
  },

  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        author: "/images/team/team-01.jpg",
        title: "You",
        desc: action.payload,
        content: [],
      });
    },
    addLoadingMessage: (state) => {
      const lastMessageIndex = state.messages.length - 1;
      if (lastMessageIndex >= 0) {
        state.messages[lastMessageIndex] = {
          ...state.messages[lastMessageIndex], // Preserve existing properties if needed
          content: [
            {
              img: "/images/icons/loader-one.gif",
              aiImg: "/images/team/avater.png",
              text: "Generating answers for you…",
              scan: "Scanning the data...",
              title:
                "Certainly! Your visual representation has been created using the provided prompt:",
              caption: "Aesthetic --aspect-ratio 3:1 --quality 4 --size 580",
              generateImg: "",
              generateImg2: "",
            },
          ],
        };
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(generateImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(generateImage.fulfilled, (state, action) => {
        state.loading = false;
        const lastMessageIndex = state.messages.length - 1;
        if (lastMessageIndex >= 0) {
          state.messages[lastMessageIndex] = {
            ...state.messages[lastMessageIndex], // Preserve existing properties if needed
            content: [
              {
                img: "/images/icons/loader-one.gif",
                aiImg: "/images/team/avater.png",
                text: "Generating answers for you…",
                scan: "Scanning the data...",
                title:
                  "Certainly! Your visual representation has been created using the provided prompt:",
                caption: "Aesthetic --aspect-ratio 3:1 --quality 4 --size 580",
                generateImg: action.payload?.[0]?.url,
                generateImg2: action.payload?.[1]?.url,
              },
            ],
          };
        }
      })
      // Rejected state
      .addCase(generateImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages[state.messages.length - 1] = {
          content: [
            {
              img: "/images/icons/loader-one.gif",
              aiImg: "/images/team/avater.png",
              text: "Generating answers for you…",
              scan: "Scanning the data...",
              title:
                "Certainly! Your visual representation has been created using the provided prompt:",
              caption: "Aesthetic --aspect-ratio 3:1 --quality 4 --size 580",
              generateImg: "",
              generateImg2: "",
            },
          ],
        };
      });
  },
});

export const { addUserMessage, addLoadingMessage } = dalleSlice.actions;
export default dalleSlice.reducer;
