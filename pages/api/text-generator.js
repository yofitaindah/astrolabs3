// pages/api/join-event.js
import openAi from "@/lib/util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userMessage } = req.body;

    // Your logic to send OTP (using Twilio, Firebase, or any service)
    const response = await openAi.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });
    // Example response
    res.status(200).json(response);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}