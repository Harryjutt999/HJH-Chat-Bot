import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const HF_TOKEN = process.env.HF_API_TOKEN;

// Hugging Face chatbot model
const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: {
          text: userMessage
        }
      })
    });

    const data = await response.json();

    // Hugging Face model se reply extract karna
    let botReply = "Sorry, main samajh nahi paaya.";
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      botReply = data[0].generated_text;
    }

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ reply: "Error: API request failed." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
