import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChatAiResponse = createAsyncThunk(
  "chatAi/fetchOpenAi",
  async (userMessage, { rejectWithValue }) => {
    try {
      const result = await axios.post("/api/text-generator", { userMessage });
      console.log(result);
      if(result.status === 200) {
        const data = result.data;
        return data.choices[0]?.message?.content || "No response generated.";
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch response.");
    }
  }
);

const chatAiSlice = createSlice({
  name: "chatAi",

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
      state.messages.push({
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
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChatAiResponse.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchChatAiResponse.fulfilled, (state, action) => {
        (state.loading = false),
          (state.messages[state.messages.length - 1] = {
            content: [
              {
                img: "",
                text: "",
                aiImg: "/images/team/avater.png",
                title: "ChatenAI",
                badge: "Bot",
                desc: action.payload,
              },
            ],
          });
      })
      .addCase(fetchChatAiResponse.rejected, (state, action) => {
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

export const { addUserMessage, addLoadingMessage } = chatAiSlice.actions;
export default chatAiSlice.reducer;
