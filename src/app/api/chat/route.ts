import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Send to local Ollama API
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "phi3", // your locally pulled model
        messages: [
          { role: "user", content: message }
        ],
        stream: false, // set to true if you want streaming responses
      }),
    });

    const data = await response.json();
    return NextResponse.json({ reply: data.message?.content || "No reply" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to connect to Ollama" }, { status: 500 });
  }
}
