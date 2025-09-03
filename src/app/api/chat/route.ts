import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, files } = await req.json();

    // Build the user content
    let userContent = message || "";
    if (files?.length) {
      userContent += `\n\nAttached files (JSON parsed):\n${JSON.stringify(files, null, 2)}`;
    }

    // Send to Ollama
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3:mini", // use the smaller variant you pulled
        messages: [{ role: "user", content: userContent }],
        stream: false,
      }),
    });

    const data = await response.json();
    console.log("Ollama raw response:", JSON.stringify(data, null, 2));

    const reply =
      data?.message?.content ||
      data?.content ||
      data?.choices?.[0]?.message?.content ||
      "No reply from model";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return NextResponse.json({ error: "Failed to connect to Ollama" }, { status: 500 });
  }
}
