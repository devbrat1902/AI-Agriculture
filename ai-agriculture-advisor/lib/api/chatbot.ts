// Real AI Chatbot using Google Gemini

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  text: string;
  category: string;
}

// Quick reply suggestions for farmers
export function getQuickReplies(): QuickReply[] {
  return [
    {
      id: "1",
      text: "How do I control pests in my wheat crop?",
      category: "Pest Management",
    },
    {
      id: "2",
      text: "When is the best time to plant rice?",
      category: "Crop Planning",
    },
    {
      id: "3",
      text: "What fertilizer should I use for tomatoes?",
      category: "Fertilizers",
    },
    {
      id: "4",
      text: "How often should I irrigate during summer?",
      category: "Irrigation",
    },
    {
      id: "5",
      text: "What are the symptoms of leaf blight?",
      category: "Disease Detection",
    },
  ];
}

// Send message to Gemini AI
export async function sendMessage(
  userMessage: string,
  conversationHistory?: Message[]
): Promise<Message> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory?.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: data.response,
      timestamp: new Date(data.timestamp),
    };
  } catch (error) {
    console.error("Chatbot API Error:", error);

    // Fallback message on error
    return {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "I apologize, but I'm having trouble connecting right now. Please try again in a moment. If the issue persists, check your internet connection.",
      timestamp: new Date(),
    };
  }
}
