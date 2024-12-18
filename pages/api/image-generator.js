// pages/api/join-event.js
import openAi from "@/lib/util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userMessage, size } = req.body;

    const response = await openAi.images.generate({
      model: "dall-e-3",
      prompt: userMessage,
      size: size, 
      // "1024x1024",
    });
    // Example response
    res.status(200).json(response);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}