import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const editImageFetch = createAsyncThunk(
  "editImage/fetchOpenAi",
  async ({ base64Image, prompt }, { rejectWithValue }) => {
    try {
      const payload = {
        base64Image,
        prompt,
      };
      const result = await axios.post("/api/edit-image", payload);
      if (result.status === 200) {
        const data = result.data;
        return data.data[0]?.url || "No response generated.";
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch response.");
    }
  }
);


const editImageSlice = createSlice({
  name: "editImage",

  initialState: {
    messages: [],
    loading: false,
    error: null,
  },

  reducers: {
    addUserMessage: (state, action) => {
      const { base64Image, prompt } = action.payload; 
      state.messages.push({
        author: "/images/team/team-01.jpg",
        title: "You",
        desc: prompt,
        img: base64Image,
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
                "Sure, I autonomously fine-tune colors, eliminate imperfections, and amplify details also have Glass. Witness the outcome.:",
              generateImg: "",
              isBorder: false,
            },
          ],
        };
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(editImageFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(editImageFetch.fulfilled, (state, action) => {
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
                  "Sure, I autonomously fine-tune colors, eliminate imperfections, and amplify details also have Glass. Witness the outcome.:",
                generateImg: action.payload,
                isBorder: false,
              },
            ],
          };
        }
      })
      // Rejected state
      .addCase(editImageFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages[state.messages.length - 1] = {
          content: [
            {
              img: "/images/icons/loader-one.gif",
              aiImg: "/images/team/avater.png",
              text: "Generating answers for you…",
              scan: "Scanning the data...",
              title: "Failed.:",
              generateImg: "",
              isBorder: false,
            },
          ],
        };
      });
  },
});

export const { addUserMessage, addLoadingMessage } = editImageSlice.actions;
export default editImageSlice.reducer;
