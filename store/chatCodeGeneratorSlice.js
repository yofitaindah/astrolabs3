import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCodeAiGenerator = createAsyncThunk(
  "chatAi/fetchOpenAi",
  async (userMessage, { rejectWithValue }) => {
    try {
      const result = await axios.post("/api/code-generator", { userMessage });
      console.log(result);
      if (result.status === 200) {
        const data = result.data;
        return data.choices[0]?.message?.content || "No response generated.";
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch response.");
    }
  }
);

const codeGeneratorSlice = createSlice({
  name: "codeGenerator",

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
              text: "Generating answers for you…",
              aiImg: "/images/team/avater.png",
              title: "ChatenAI",
              badge: "Bot",
              desc: "",
            },
          ],
        };
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCodeAiGenerator.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchCodeAiGenerator.fulfilled, (state, action) => {
        state.loading = false;
        const lastMessageIndex = state.messages.length - 1;
        if (lastMessageIndex >= 0) {
          state.messages[lastMessageIndex] = {
            ...state.messages[lastMessageIndex], // Preserve existing properties if needed
            content: [
              {
                img: "",
                text: "",
                aiImg: "/images/team/avater.png",
                title: "ChatenAI",
                badge: "Bot",
                desc: action.payload, // Add the payload as the description
              },
            ],
          };
        }
      })
      .addCase(fetchCodeAiGenerator.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload),
          (state.messages[state.messages.length - 1] = {
            content: [
              {
                img: "",
                text: "",
                aiImg: "/images/team/avater.png",
                title: "ChatenAI",
                badge: "Bot",
                desc: "Error: " + action.payload,
              },
            ],
          });
      });
  },
});

export const { addUserMessage, addLoadingMessage } = codeGeneratorSlice.actions;
export default codeGeneratorSlice.reducer;
