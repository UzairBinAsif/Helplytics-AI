import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// We initialize safely, so that the server doesn't crash on boot if the key is missing.
const getGenAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables");
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

export async function POST(req: Request) {
  try {
    const genAI = getGenAI();
    const { message, history } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Convert generic history to Gemini format if needed, but assuming frontend sends the right structure
    // Gemini history expects: [{ role: "user" | "model", parts: [{ text: "..." }] }]
    let formattedHistory = history?.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })) || [];

    // Gemini API requires the history to start with a 'user' role.
    // Since our initial greeting is 'model', we need to remove it from the history sent to the API.
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    const chat = model.startChat({
      history: formattedHistory,
      systemInstruction: {
        parts: [{ text: "You are a helpful assistant for the HelpHub AI platform. Help users with their queries."}],
        role: "system"
      }
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat", details: error.message },
      { status: 500 }
    );
  }
}
