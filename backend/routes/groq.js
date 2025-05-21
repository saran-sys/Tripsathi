import { configDotenv } from 'dotenv';
import express from 'express';
import Groq from "groq-sdk";
configDotenv();
const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Initial welcome message
const welcomeMessage = `Welcome! I'm your sustainable travel assistant. I can help you with:
- Eco-friendly travel tips
- Sustainable accommodation options
- Green transportation advice
- Responsible tourism practices
- Local environmental initiatives

What would you like to know about sustainable travel?`;

// Store conversation history
const conversations = new Map();

// Get chat completion from Groq
async function getGroqChatCompletion(messages) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
    });
    return chatCompletion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Failed to get response from AI');
  }
}

// Get welcome message
router.get('/welcome', (req, res) => {
  res.json({ message: welcomeMessage });
});

// Handle chat messages
router.post('/chat', async (req, res) => {
  try {
    const { userId, message } = req.body;
    
    if (!userId || !message) {
      return res.status(400).json({ error: 'User ID and message are required' });
    }

    // Get or initialize conversation history
    if (!conversations.has(userId)) {
      conversations.set(userId, [
        { role: "system", content: "You are a helpful sustainable travel assistant. Provide practical, actionable advice about eco-friendly travel, sustainable tourism, and responsible travel practices. Keep responses concise and engaging." },
        { role: "assistant", content: welcomeMessage }
      ]);
    }

    const conversationHistory = conversations.get(userId);
    
    // Add user message to history
    conversationHistory.push({ role: "user", content: message });

    // Get AI response
    const response = await getGroqChatCompletion(conversationHistory);

    // Add AI response to history
    conversationHistory.push({ role: "assistant", content: response });

    // Keep conversation history manageable (last 10 messages)
    if (conversationHistory.length > 10) {
      conversationHistory.splice(1, 2); // Keep system message and remove oldest exchange
    }

    res.json({ message: response });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Clear conversation history
router.delete('/chat/:userId', (req, res) => {
  const { userId } = req.params;
  conversations.delete(userId);
  res.json({ message: 'Conversation history cleared' });
});

export default router;
