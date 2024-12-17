import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OpenAI from "openai";

export const fetchChatAiResponse = createAsyncThunk(
  "chatAi/fetchOpenAi",
  async (userMessage, { rejectWithValue }) => {
    try {
      const openAi = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      const completion = await openAi.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: userMessage,
          },
        ],
      });
      const data = completion.choices[0]?.message?.content;
      return data || "No response generated.";
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