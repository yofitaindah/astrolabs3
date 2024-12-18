// pages/api/join-event.js
import openAi from "@/lib/util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userMessage } = req.body;

    const response = await openAi.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert programming assistant." },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 1000, // Adjust based on expected output
      temperature: 0.7, // Creativity level (higher = more creative)
    });
    // Example response
    res.status(200).json(response);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
